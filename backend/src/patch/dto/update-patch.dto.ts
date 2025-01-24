import { PartialType } from '@nestjs/mapped-types';
import { CreatePatchDto } from './create-patch.dto';

export class UpdatePatchDto extends PartialType(CreatePatchDto) {}
