

// kafka-consumer.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Kafka, Consumer, Producer } from 'kafkajs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { VehicleEventType } from 'src/vehicle/vehicle-event-types';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private readonly logger = new Logger(KafkaConsumerService.name);
  private consumer: Consumer;
  private producer: Producer;

  constructor(private eventEmitter: EventEmitter2) {}

  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'vehicles-client',
      brokers: [process.env.KAFKA_BROKERS || 'localhost:29092'],
    });

    this.consumer = kafka.consumer({ groupId: 'vehicles-group' });
    this.producer = kafka.producer();

    await this.consumer.connect();
    await this.producer.connect();

    await this.consumer.subscribe({
      topic: 'dbserver1.public.vehicle',
      fromBeginning: true,
    });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (message.value) {
          try {
            const event = JSON.parse(message.value.toString());
            await this.handleEvent(event);
          } catch (error) {
            this.logger.error(`Error parsing message: ${error.message}`, error.stack);
          }
        } else {
          this.logger.warn('Received message with null value');
        }
      },
    });
  }

  private async handleEvent(event: any) {
    const { payload } = event;
    const { before, after, op } = payload;

    let eventType: string;
    let data: any;

    switch (op) {
      case 'c':
        eventType = VehicleEventType.CREATED;
        data = after;
        break;
      case 'u':
        eventType = VehicleEventType.UPDATED;
        data = after;
        break;
      case 'd':
        eventType = VehicleEventType.DELETED;
        data = before;
        break;
      default:
        this.logger.warn(`Unknown operation: ${op}`);
        return;
    }

    this.logger.log(`Emitting event ${eventType}: ${JSON.stringify(data)}`);
    this.eventEmitter.emit(eventType, data);
  }
}
