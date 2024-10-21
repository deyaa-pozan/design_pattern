import { Module } from '@nestjs/common';
import { VehicleModule } from '../vehicle/vehicle.module';
import { KafkaConsumerService } from './kafka-consumer/kafka-consumer.service';

@Module({
  imports: [VehicleModule],
  providers: [KafkaConsumerService],
})
export class KafkaModule {}
