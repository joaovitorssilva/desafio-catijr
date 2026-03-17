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

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsEnum(Priority)
  @IsNotEmpty()
  priority: Priority;

  @IsOptional()
  @IsDateString()
  expectedFinishDate?: Date;

  @IsOptional()
  @IsDateString()
  finishDate?: Date | null;

  @IsInt()
  @IsNotEmpty()
  listId: number;

  @IsInt()
  @IsOptional()
  position?: number;
}
