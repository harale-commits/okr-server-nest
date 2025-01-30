import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKeyresultDto } from './create-keyresult.dto';
import { Prisma } from '@prisma/client';
import { CreateObjectiveDto } from '../objectives/create-objective.dto';

@Injectable()
export class KeyresultsService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.keyResult.findMany();
  }

  create(data: CreateKeyresultDto) {
    return this.prisma.keyResult.create({ data });
  }

  update(id: string, dto: CreateKeyresultDto) {
    return this.prisma.keyResult.update({
      data: dto,
      where: {
        id: parseInt(id),
      },
    });
  }

  delete(id: string) {
    return this.prisma.keyResult.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  fetchUnique(id: number) {
    return this.prisma.keyResult.findUnique({
      where: {
        id: id,
      },
    });
  }
}
