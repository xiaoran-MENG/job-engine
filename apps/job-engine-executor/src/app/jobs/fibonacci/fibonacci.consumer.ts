import { Injectable, OnModuleInit } from "@nestjs/common";
import { PulsarClient, PulsarConsumer } from '@job-engine/pulsar'
import { Message } from "pulsar-client";
import { log } from "console";

@Injectable()
export class FibonacciConsumer extends PulsarConsumer implements OnModuleInit {
    constructor(pulsarClient: PulsarClient) {
        super(pulsarClient, 'Fibonacci');
    }

    protected onMessage(message: Message): Promise<void> {
        log('FibonacciConsumer.onMessage');
        return;
    }
}