import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Priority } from './priority.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Complete project',
    description: 'Task title',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiPropertyOptional({
    example: 'Finish all remaining features',
    description: 'Task description',
  })
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    enum: Priority,
    example: Priority.HIGH,
    description: 'Task priority level',
  })
  @IsEnum(Priority)
  @IsNotEmpty()
  priority: Priority;

  @ApiPropertyOptional({
    example: '2026-03-30',
    description: 'Expected finish date (ISO 8601)',
  })
  @IsOptional()
  @IsDateString()
  expectedFinishDate?: Date;

  @ApiPropertyOptional({
    example: '2026-03-25',
    description: 'Actual finish date (ISO 8601)',
  })
  @IsOptional()
  @IsDateString()
  finishDate?: Date | null;

  @ApiProperty({
    example: 1,
    description: 'ID of the list this task belongs to',
  })
  @IsInt()
  @IsNotEmpty()
  listId: number;

  @ApiPropertyOptional({ example: 0, description: 'Task position in the list' })
  @IsInt()
  @IsOptional()
  position?: number;
}
