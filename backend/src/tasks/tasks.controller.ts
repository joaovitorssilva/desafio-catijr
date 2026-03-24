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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('tasks')
@ApiBearerAuth('access-token')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(
    @Request() req: { user: { userId: number } },
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(createTaskDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks for the authenticated user' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Request() req: { user: { userId: number } }) {
    return this.tasksService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async findOne(
    @Request() req: { user: { userId: number } },
    @Param('id') id: string,
  ) {
    const task = await this.tasksService.findOne(+id, req.user.userId);
    if (!task) throw new NotFoundException();
    return task;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Task not found' })
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
  @ApiOperation({ summary: 'Update a task position within a list' })
  @ApiResponse({
    status: 200,
    description: 'Task position updated successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        position: { type: 'integer', example: 0 },
        listId: { type: 'integer', example: 1 },
      },
    },
  })
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
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 204, description: 'Task deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async remove(
    @Request() req: { user: { userId: number } },
    @Param('id') id: string,
  ) {
    const task = await this.tasksService.remove(+id, req.user.userId);
    if (!task) throw new NotFoundException();
  }
}
