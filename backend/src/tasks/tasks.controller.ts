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
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Request() req: { user: { userId: number } },
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(createTaskDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req: { user: { userId: number } }) {
    return this.tasksService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(
    @Request() req: { user: { userId: number } },
    @Param('id') id: string,
  ) {
    const task = await this.tasksService.findOne(+id, req.user.userId);
    if (!task) throw new NotFoundException();
    return task;
  }

  @Patch(':id')
  async update(
    @Request() req: { user: { userId: number } },
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.update(
      +id,
      updateTaskDto,
      req.user.userId,
    );
    if (!task) throw new NotFoundException();
    return task;
  }

  @Patch(':id/position')
  async updatePosition(
    @Request() req: { user: { userId: number } },
    @Param('id') id: string,
    @Body() body: { position: number; listId: number },
  ) {
    const task = await this.tasksService.updatePosition(
      +id,
      body.position,
      body.listId,
      req.user.userId,
    );
    if (!task) throw new NotFoundException();
    return task;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Request() req: { user: { userId: number } },
    @Param('id') id: string,
  ) {
    const task = await this.tasksService.remove(+id, req.user.userId);
    if (!task) throw new NotFoundException();
  }
}
