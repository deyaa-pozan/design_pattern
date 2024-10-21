// kafka.controller.ts
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class KafkaController {
  private readonly logger = new Logger(KafkaController.name);

  @MessagePattern('dbserver1.public.vehicle')
  async handleVehicleEvent(@Payload() message) {
    const { value } = message;
    if (value) {
      try {
        const event = JSON.parse(value.toString());
        this.logger.log(`Received vehicle event: ${JSON.stringify(event)}`);
        // Implement event handling logic here
      } catch (error) {
        this.logger.error(`Error parsing message: ${error.message}`, error.stack);
      }
    } else {
      this.logger.warn('Received message with null value');
    }
  }
}
