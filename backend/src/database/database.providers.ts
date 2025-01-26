import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'db',
        port: 3306,
        username: 'app',
        password: 'hMd7zQ1zsEwuAatwzCtBcuuAxTxPFstUywQtRhzDMVjnrp4K3S9WX37N',
        database: 'synth.kitchen',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      });

      return dataSource.initialize();
    },
  },
];
