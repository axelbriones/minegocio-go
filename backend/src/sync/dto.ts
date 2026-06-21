import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class SyncEventDto {
  @ApiProperty()
  @IsString()
  id!: string;

  @ApiProperty()
  @IsString()
  entity!: string;

  @ApiProperty()
  @IsString()
  entityId!: string;

  @ApiProperty()
  @IsString()
  action!: string;

  @ApiProperty()
  @IsObject()
  payload!: any;
}

export class SyncPayloadDto {
  @ApiProperty({ type: [SyncEventDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SyncEventDto)
  events!: SyncEventDto[];
}
