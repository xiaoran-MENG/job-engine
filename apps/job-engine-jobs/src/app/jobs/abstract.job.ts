import { log } from "console";

export abstract class AbstractJob {
    async execute() {
        log("Executing job");
    }
}