import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum.js';

export class GetTasksFilterDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}