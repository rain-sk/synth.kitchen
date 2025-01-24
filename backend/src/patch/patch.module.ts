import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { patchProviders } from './patch.providers';
import { PatchService } from './patch.service';
import { PatchController } from './patch.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...patchProviders, PatchService],
  controllers: [PatchController],
})
export class PatchModule {}
