import { BadRequestException, Injectable, OnModuleInit } from "@nestjs/common";
import { DiscoveredClassWithMeta, DiscoveryService } from "@golevelup/nestjs-discovery";
import { JOB_METADATA_KEY } from "../decorators/job.decorator";
import { JobMetadata } from "../interfaces/job-metadata.interface";
import { AbstractJob } from "./abstract.job";

@Injectable()
export class JobsService implements OnModuleInit {
    private jobs: DiscoveredClassWithMeta<JobMetadata>[] = [];

    constructor(private readonly discovery: DiscoveryService) {}

    async onModuleInit() {
       this.jobs = await this.discovery.providersWithMetaAtKey<JobMetadata>(JOB_METADATA_KEY);
    }

    getJobs() {
        return this.jobs.map(j => j.meta);
    }

    async executeJob(name: string) {
        const job = this.jobs.find(j => j.meta.name === name);
        if (!job) throw new BadRequestException(`Job ${name} is not found`);
        await (job.discoveredClass.instance as AbstractJob).execute();
        return job.meta;
    }
}