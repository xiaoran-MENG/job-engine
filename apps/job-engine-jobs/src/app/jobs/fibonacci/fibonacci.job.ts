import { PulsarClient } from "@job-engine/pulsar";
import { AbstractJob } from "../abstract.job";
import { FibonacciData } from "./fibonacci.job.interface";
import { Job } from "../../decorators/job.decorator";


@Job({
    name: 'Fibonacci',
    description: 'Generates a Fibonacci sequene'
})
export class FibonacciJob extends AbstractJob<FibonacciData> {
    constructor(pulsarClient: PulsarClient) {
        super(pulsarClient);
    }
}