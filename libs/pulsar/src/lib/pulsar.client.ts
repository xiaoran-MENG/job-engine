import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { Client, Producer } from 'pulsar-client';


@Injectable()
export class PulsarClient implements OnModuleDestroy {
    private readonly pulsarClient = new Client({
        serviceUrl: this.configService.getOrThrow<string>('PULSAR_SERVICE_URL') // Address to the Pulsar cluster used by job-engine-jobs only
    });
    
    constructor(private readonly configService: ConfigService) {}

    async createProducer(topic: string): Promise<Producer> {
        return this.pulsarClient.createProducer({ topic });
    }

    async onModuleDestroy() {
        await this.pulsarClient.close();
    }

}