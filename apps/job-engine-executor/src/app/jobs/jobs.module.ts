import { PulsarModule } from "@job-engine/pulsar";
import { Module } from "@nestjs/common";
import { FibonacciConsumer } from "./fibonacci/fibonacci.consumer";

@Module({
    imports: [PulsarModule],
    providers: [FibonacciConsumer]
})
export class JobsModule {

}