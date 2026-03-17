import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService) {}

  async create(createListDto: CreateListDto, userId: number) {
    return await this.prisma.list.create({
      data: {
        ...createListDto,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.list.findMany({
      where: { userId },
      include: {
        tasks: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }

  async findOne(id: number, userId: number) {
    return await this.prisma.list.findFirst({
      where: { id, userId },
      include: {
        tasks: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }

  async update(id: number, updateListDto: UpdateListDto, userId: number) {
    return await this.prisma.list.update({
      where: { id, userId },
      data: updateListDto,
    });
  }

  async remove(id: number, userId: number) {
    await this.prisma.task.deleteMany({
      where: { listId: id, userId },
    });

    return await this.prisma.list.delete({
      where: { id, userId },
    });
  }
}
