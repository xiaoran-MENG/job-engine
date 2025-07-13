import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JobsService } from './jobs.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@job-engine/nestjs';
import { Job } from './models/job.model';
import { ExecuteJobInput } from './dto/execute-job.input';

@Resolver()
export class JobsResolver {
    constructor(private readonly jobsService: JobsService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [Job], { name: 'jobs' })
    async getJobs() {
        return this.jobsService.getJobs();
    }

    @Mutation(() => Job)
    @UseGuards(GqlAuthGuard)
    async executeJob(@Args('executeJobInput') input: ExecuteJobInput) {
        return this.jobsService.executeJob(input.name);
    }
}