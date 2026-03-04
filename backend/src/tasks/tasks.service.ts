import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) { }

  async create(createTaskDto: CreateTaskDto) {
    return await this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll() {
    return await this.prisma.task.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.task.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async updatePosition(id: number, newPosition: number, newListId: number) {
    const task = await this.prisma.task.findUnique({
      where: { id }
    })
    if (!task) {
      return null
    }

    const oldListId = task.listId
    const oldPosition = task.position

    if (oldListId !== newListId) {
      await this.prisma.task.updateMany({
        where: { listId: oldListId, position: { gt: oldPosition } },
        data: { position: { decrement: 1 } }
      })
      await this.prisma.task.updateMany({
        where: { listId: newListId, position: { gte: newPosition } },
        data: { position: { increment: 1 } }
      })
    }
    else {
      if (newPosition > oldPosition) {
        await this.prisma.task.updateMany({
          where: { listId: oldListId, position: { gte: oldPosition, lte: newPosition } },
          data: { position: { decrement: 1 } }
        })
      } else if (newPosition < oldPosition) {
        await this.prisma.task.updateMany({
          where: { listId: oldListId, position: { gte: newPosition, lte: oldPosition } },
          data: { position: { increment: 1 } }
        })
      }
    }
    return await this.prisma.task.update({
      where: {id},
      data: {position: newPosition, listId: newListId}
    })
  }

  async remove(id: number) {
    return await this.prisma.task.delete({
      where: { id },
    });
  }
}
