import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    return await this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.task.findMany({
      where: { userId },
    });
  }

  async findOne(id: number, userId: number) {
    return await this.prisma.task.findFirst({
      where: { id, userId },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    return await this.prisma.task.update({
      where: { id, userId },
      data: updateTaskDto,
    });
  }

  async updatePosition(
    id: number,
    newPosition: number,
    newListId: number,
    userId: number,
  ) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
    });
    if (!task) {
      return null;
    }

    const oldListId = task.listId;
    const oldPosition = task.position;

    if (oldListId !== newListId) {
      await this.prisma.task.updateMany({
        where: { listId: oldListId, position: { gt: oldPosition }, userId },
        data: { position: { decrement: 1 } },
      });
      await this.prisma.task.updateMany({
        where: { listId: newListId, position: { gte: newPosition }, userId },
        data: { position: { increment: 1 } },
      });
    } else {
      if (newPosition > oldPosition) {
        await this.prisma.task.updateMany({
          where: {
            listId: oldListId,
            position: { gte: oldPosition, lte: newPosition },
            userId,
          },
          data: { position: { decrement: 1 } },
        });
      } else if (newPosition < oldPosition) {
        await this.prisma.task.updateMany({
          where: {
            listId: oldListId,
            position: { gte: newPosition, lte: oldPosition },
            userId,
          },
          data: { position: { increment: 1 } },
        });
      }
    }
    return await this.prisma.task.update({
      where: { id },
      data: { position: newPosition, listId: newListId },
    });
  }

  async remove(id: number, userId: number) {
    return await this.prisma.task.delete({
      where: { id, userId },
    });
  }
}
