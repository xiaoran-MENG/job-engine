import { Producer } from "pulsar-client";
import { PulsarClient } from '@job-engine/pulsar'; // tsconfig.base.json

export abstract class AbstractJob<T> {
    private producer: Producer;

    constructor(private readonly pulsarClient: PulsarClient) {}

    /**
     * Producer only needs to be created once and to be reused
     * Pulsar cluster takes binary buffer as input
     */
    async execute(data: T, job: string) {
        if (!this.producer)
            this.producer = await this.pulsarClient.createProducer(job);
        await this.producer.send({ 
            data: Buffer.from(JSON.stringify(data))
        });
    }
}