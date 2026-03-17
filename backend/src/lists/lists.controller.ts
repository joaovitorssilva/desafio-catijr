import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { JwtAuthGuard } from '../auth/guards';

@Controller('lists')
@UseGuards(JwtAuthGuard)
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  create(
    @Request() req: { user: { userId: number } },
    @Body() createListDto: CreateListDto,
  ) {
    return this.listsService.create(createListDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req: { user: { userId: number } }) {
    return this.listsService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(
    @Request() req: { user: { userId: number } },
    @Param('id') id: string,
  ) {
    const list = await this.listsService.findOne(+id, req.user.userId);
    if (!list) throw new NotFoundException();
    return list;
  }

  @Patch(':id')
  async update(
    @Request() req: { user: { userId: number } },
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
  ) {
    const list = await this.listsService.update(
      +id,
      updateListDto,
      req.user.userId,
    );
    if (!list) throw new NotFoundException();
    return list;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Request() req: { user: { userId: number } },
    @Param('id') id: string,
  ) {
    const list = await this.listsService.remove(+id, req.user.userId);
    if (!list) throw new NotFoundException();
  }
}
