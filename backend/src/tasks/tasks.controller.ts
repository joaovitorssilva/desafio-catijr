import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(+id);
    if (!task) throw new NotFoundException();
    return task;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksService.update(+id, updateTaskDto);
    if (!task) throw new NotFoundException();
    return task;
  }

  @Patch(':id/position')
  async updatePosition(
    @Param('id') id: string,
    @Body() body: { position: number, listId: number }) {
    const task = await this.tasksService.updatePosition(+id, body.position, body.listId);
    if (!task) throw new NotFoundException();
    return task;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const task = await this.tasksService.remove(+id);
    if (!task) throw new NotFoundException();
  }
}
