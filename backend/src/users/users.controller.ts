import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { getUser, User } from 'supertokens-node';

@Controller('me')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(new AuthGuard())
  async getMe(@Session() session: SessionContainer): Promise<User> {
    return await getUser(session.getUserId());
  }

  @Patch()
  update(@Param('id') id: string, @Body() updateUserDto: Partial<User>) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
