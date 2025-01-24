import { Injectable, Inject } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Repository } from 'typeorm';

import { Patch } from './patch.entity';
import { CreatePatchDto } from './dto/create-patch.dto';
import { UpdatePatchDto } from './dto/update-patch.dto';

@Injectable()
export class PatchService {
  constructor(
    @Inject('PATCH_REPOSITORY')
    private patchRepository: Repository<Patch>,
  ) {}

  async create(createPatchDto: CreatePatchDto) {
    const patch = await this.patchRepository.create(createPatchDto);
    console.log(patch);
    return patch;
  }

  async findAll(session?: SessionContainer): Promise<Patch[]> {
    const findOptions = session
      ? [{ public: true }, { creatorId: session.getUserId() }]
      : [{ public: true }];
    return await this.patchRepository.find({
      where: findOptions,
    });
  }

  async findOne(id: string): Promise<Patch> {
    return await this.patchRepository.findOne({
      where: { id },
    });
  }
  async update(id: string, updatePatchDto: UpdatePatchDto) {
    return await this.patchRepository.update({ id }, updatePatchDto);
  }

  async remove(id: string) {
    return await this.patchRepository.remove(await this.findOne(id));
  }
}
