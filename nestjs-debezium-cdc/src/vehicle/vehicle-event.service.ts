import { Injectable, Logger } from '@nestjs/common';
import { OnVehicleEvent } from './vehicle-event.decorator';
import { VehicleEventType } from './vehicle-event-types';

@Injectable()
export class VehicleEventService {
  private readonly logger = new Logger(VehicleEventService.name);

  @OnVehicleEvent(VehicleEventType.CREATED)
  handleVehicleCreated(event: any) {
    this.logger.log(`Handling vehicle created event: ${JSON.stringify(event)}`);
  }

  @OnVehicleEvent(VehicleEventType.UPDATED)
  handleVehicleUpdated(event: any) {
    this.logger.log(`Handling vehicle updated event: ${JSON.stringify(event)}`);
  }

  @OnVehicleEvent(VehicleEventType.DELETED)
  handleVehicleDeleted(event: any) {
    this.logger.log(`Handling vehicle deleted event: ${JSON.stringify(event)}`);
  }
}
