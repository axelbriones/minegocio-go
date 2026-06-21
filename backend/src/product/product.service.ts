import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(companyId: string) {
    return this.prisma.product.findMany({
      where: { companyId },
    });
  }

  async findOne(id: string, companyId: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, companyId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, userId: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id, userId); // Ensure it exists and belongs to user
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId); // Ensure it exists and belongs to user
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
