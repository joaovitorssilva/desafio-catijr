import { ApiProperty } from '@nestjs/swagger';

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export class PriorityValue {
  @ApiProperty({ enum: Priority, example: Priority.HIGH })
  priority: Priority;
}
