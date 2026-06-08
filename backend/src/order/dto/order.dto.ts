import {
  IsArray,
  ValidateNested,
  IsString,
  IsNumber,
  Min,
  Max,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderTicketDto {
  @IsString()
  @IsNotEmpty()
  film: string;

  @IsString()
  @IsNotEmpty()
  session: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  row: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  seat: number;

  @IsString()
  @IsOptional()
  daytime: string;

  @IsString()
  @IsOptional()
  day: string;

  @IsString()
  @IsOptional()
  time: string;

  @IsNumber()
  @IsOptional()
  price: number;
}

export class CreateOrderDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderTicketDto)
  tickets: OrderTicketDto[];
}

export class OrderResponseDto {
  id: string;
  film: string;
  session: string;
  row: number;
  seat: number;
  daytime: string;
  price: number;
}
