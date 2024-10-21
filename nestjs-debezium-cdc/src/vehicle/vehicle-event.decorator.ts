import { SetMetadata } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export const VEHICLE_EVENT_HANDLER = 'VEHICLE_EVENT_HANDLER';

export function OnVehicleEvent(eventType: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    SetMetadata(VEHICLE_EVENT_HANDLER, eventType)(target, propertyKey, descriptor);
    OnEvent(eventType)(target, propertyKey, descriptor);
  };
}
