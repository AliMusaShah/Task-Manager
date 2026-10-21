import { Body, Controller, Delete, Get, Param, Patch, Post, Query, RawBody } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto.js';
import type { Task } from './interfaces/tasks.interface.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskservice: TasksService) { }

  @Get()
  findall(@Query() filter: GetTasksFilterDto): Task[] {
    return this.taskservice.findall(filter)
  }

  @Get(':id')
  findone(@Param('id') id: string): Task {
    return this.taskservice.findOne(id)
  }

  @Post()
  create(@Body() dto: CreateTaskDto): Task {
    return this.taskservice.create(dto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.taskservice.update(id, dto)

  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.taskservice.remove(id)
  }

}
