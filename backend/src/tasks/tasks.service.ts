import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './interfaces/tasks.interface.js';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { TaskStatus } from './task-status.enum.js';
import { randomUUID } from 'crypto';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {
      private tasks: Task[] = [];


      findall(filter: GetTasksFilterDto): Task[] {
            if (this.tasks.length > 0) {
                  if (filter.status) {
                        return this.tasks.filter((task) => task.status === filter.status);

                  }
                  return this.tasks
            } else {
                  throw new NotFoundException('There are no tasks added to view.');
            }

      }

      findOne(id: string): Task {
            const task = this.tasks.find((t) => t.id === id);
            if (!task) {
                  throw new NotFoundException(`Task with id "${id}" not found`);
            }
            return task;

      }

      create(dto: CreateTaskDto): Task {
            const task = {
                  id: randomUUID(),
                  title: dto.title,
                  description: dto.description ?? '',
                  status: TaskStatus.OPEN
            }
            this.tasks.push(task)
            return task
      }

      update(id: string, dto: UpdateTaskDto): Task {
            const task = this.findOne(id);
            for (const key of Object.keys(dto) as (keyof UpdateTaskDto)[]) {
                  if (dto[key] !== undefined) {
                        task[key] = dto[key] as any;
                  }
            }
            return task;
      }


      remove(id: string): void {
            const task = this.findOne(id); // throws 404 if missing
            this.tasks = this.tasks.filter((t) => t.id !== task.id);
      }
}