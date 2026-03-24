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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('lists')
@ApiBearerAuth('access-token')
@Controller('lists')
@UseGuards(JwtAuthGuard)
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new list' })
  @ApiResponse({ status: 201, description: 'List created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Request() req: { user: { userId: number } },
    @Body() createListDto: CreateListDto,
  ) {
    return this.listsService.create(createListDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all lists for the authenticated user' })
  @ApiResponse({ status: 200, description: 'Lists retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Request() req: { user: { userId: number } }) {
    return this.listsService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a list by ID' })
  @ApiResponse({ status: 200, description: 'List retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'List not found' })
  async findOne(
    @Request() req: { user: { userId: number } },
    @Param('id') id: string,
  ) {
    const list = await this.listsService.findOne(+id, req.user.userId);
    if (!list) throw new NotFoundException();
    return list;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a list' })
  @ApiResponse({ status: 200, description: 'List updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'List not found' })
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
  @ApiOperation({ summary: 'Delete a list' })
  @ApiResponse({ status: 204, description: 'List deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'List not found' })
  async remove(
    @Request() req: { user: { userId: number } },
    @Param('id') id: string,
  ) {
    const list = await this.listsService.remove(+id, req.user.userId);
    if (!list) throw new NotFoundException();
  }
}
