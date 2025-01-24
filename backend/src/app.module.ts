import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import * as SuperTokensConfig from './config';
import { PatchModule } from './patch/patch.module';
// import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule.forRoot({
      // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: SuperTokensConfig.connectionUri,
      apiKey: 'fEsSsBcX5=FbmVapXQ7gO1lI8B',
      appInfo: SuperTokensConfig.appInfo,
    }),
    PatchModule,
    UsersModule,
    // UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
