import { Job } from "../decorators/job.decorator";
import { AbstractJob } from "./abstract.job";

@Job({
    name: 'Fibonacci',
    description: 'Generates a Fibonacci sequene'
})
export class FibonacciJob extends AbstractJob {

}