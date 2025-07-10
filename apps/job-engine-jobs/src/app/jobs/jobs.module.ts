import { Module } from "@nestjs/common";
import { FibonacciJob } from "./fibonacci.job";
import { JobsService } from "./jobs.service";
import { JobsResolver } from "./jobs.resolver";
import { DiscoveryModule } from "@golevelup/nestjs-discovery";

@Module({
    imports: [DiscoveryModule],
    providers: [FibonacciJob, JobsService, JobsResolver]
})
export class JobsModule {

}