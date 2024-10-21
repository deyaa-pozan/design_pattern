// vehicle.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { Vehicle } from './vehicle.entity';
import { VehicleEventService } from './vehicle-event.service';
import { KafkaConsumerService } from 'src/kafka/kafka-consumer/kafka-consumer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  providers: [VehicleService, KafkaConsumerService, VehicleEventService],
  controllers: [VehicleController],
  exports: [VehicleService],
})
export class VehicleModule {}
