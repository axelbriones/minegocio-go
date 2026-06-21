import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSaleItemDto {
  @ApiProperty()
  @IsString()
  productId!: string;

  @ApiProperty()
  @IsNumber()
  quantity!: number;

  @ApiProperty()
  @IsNumber()
  price!: number;
}

export class CreateSaleDto {
  @ApiProperty()
  @IsString()
  companyId!: string;

  @ApiProperty()
  @IsString()
  warehouseId!: string;

  @ApiProperty()
  @IsNumber()
  totalAmount!: number;

  @ApiProperty()
  @IsString()
  paymentType!: string;

  @ApiProperty({ type: [CreateSaleItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleItemDto)
  items!: CreateSaleItemDto[];
}
