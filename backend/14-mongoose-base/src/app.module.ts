import { Module } from "@nestjs/common";
import { CatsModule } from "./patches/cats.module";

@Module({
  imports: [CatsModule],
})
export class AppModule {}
