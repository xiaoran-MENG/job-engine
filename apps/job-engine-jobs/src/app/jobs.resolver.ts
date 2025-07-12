import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Job } from '../models/job.model';
import { JobsService } from './jobs.service';
import { ExecuteJobInput } from '../dto/execute-job.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@job-engine/nestjs';

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