import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { PatchService } from './patch.service';
import { CreatePatchDto } from './dto/create-patch.dto';
import { UpdatePatchDto } from './dto/update-patch.dto';

@Controller('patch')
export class PatchController {
  constructor(private patchService: PatchService) {}

  @Post()
  async create(@Body() createPatchDto: CreatePatchDto) {
    return await this.patchService.create(createPatchDto);
  }

  @Get('/')
  async findAll(@Session() session: SessionContainer) {
    return await this.patchService.findAll(session);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patchService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFriendDto: UpdatePatchDto) {
    return this.patchService.update(id, updateFriendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patchService.remove(id);
  }
}
