import { Controller, Get, UseGuards } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { getUser } from 'supertokens-node';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session/session.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello() {
    return {
      hello: true,
      guess: 42,
    };
  }

  @Get('/me')
  @UseGuards(new AuthGuard())
  async getMe(@Session() session: SessionContainer): Promise<{}> {
    return {
      user: await getUser(session.getUserId()),
    };
  }

  @Get('/sessioninfo')
  @UseGuards(new AuthGuard())
  getSessionInfo(
    @Session() session: SessionContainer,
  ): Record<string, unknown> {
    return {
      sessionHandle: session.getHandle(),
      userId: session.getUserId(),
      accessTokenPayload: session.getAccessTokenPayload(),
    };
  }
}
