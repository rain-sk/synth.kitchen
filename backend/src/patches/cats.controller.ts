import { Controller, Get, Post, Body } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-patch.dto";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/patch.interface";

@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
