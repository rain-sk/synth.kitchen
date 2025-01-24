import { DataSource } from 'typeorm';
import { Patch } from './patch.entity';

export const patchProviders = [
  {
    provide: 'PATCH_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Patch),
    inject: ['DATA_SOURCE'],
  },
];
