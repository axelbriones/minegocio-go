import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(@Request() req: any, @Body() createProductDto: CreateProductDto) {
    return this.productService.create(req.user.userId, createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products for the authenticated user' })
  findAll(@Request() req: any) {
    return this.productService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific product' })
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.productService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  update(@Param('id') id: string, @Request() req: any, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, req.user.userId, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  remove(@Param('id') id: string, @Request() req: any) {
    return this.productService.remove(id, req.user.userId);
  }
}
