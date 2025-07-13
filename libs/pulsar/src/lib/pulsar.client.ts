import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { Client, Consumer, Message, Producer } from 'pulsar-client';


@Injectable()
export class PulsarClient implements OnModuleDestroy {
    private readonly pulsarClient = new Client({
        serviceUrl: this.configService.getOrThrow<string>('PULSAR_SERVICE_URL') // Address to the Pulsar cluster used by job-engine-jobs only
    });

    private readonly producers: Producer[] = [];
    private readonly consumers: Consumer[] = [];
    
    constructor(private readonly configService: ConfigService) {}

    async createProducer(topic: string) {
        const producer = await this. pulsarClient.createProducer({ topic });
        this.producers.push(producer);
        return producer;
    }

    async createConsumer(topic: string, listener: (message: Message) => void) {
        const consumer = await this.pulsarClient.subscribe({
            topic,
            subscriptionType: 'Shared',
            subscription: 'job-engine',
            listener,
        });
        this.consumers.push(consumer);
        return consumer;
    }

    async onModuleDestroy() {
        await Promise.all(this.producers.map(p => p.close()));
        await this.pulsarClient.close();
    }

}