import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateCatDto } from "./dto/create-patch.dto";
import { Cat } from "./interfaces/patch.interface";

@Injectable()
export class CatsService {
  constructor(@Inject("CAT_MODEL") private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = this.catModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}
