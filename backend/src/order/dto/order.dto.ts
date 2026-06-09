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
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class OrderTicketDto {
  @ApiProperty({
    example: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
    description: 'ID фильма',
  })
  @IsString()
  @IsNotEmpty()
  film: string;

  @ApiProperty({
    example: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
    description: 'ID сеанса',
  })
  @IsString()
  @IsOptional()
  session: string;

  @ApiProperty({ example: 3, description: 'Номер ряда (1-10)' })
  @IsNumber()
  @Min(1)
  @Max(10)
  row: number;

  @ApiProperty({ example: 1, description: 'Номер места (1-10)' })
  @IsNumber()
  @Min(1)
  @Max(10)
  seat: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  daytime: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  day: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  time: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  price: number;
}

export class CreateOrderDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '+7 123 456 78 90',
    description: 'Телефон пользователя',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ type: [OrderTicketDto], description: 'Список билетов' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderTicketDto)
  tickets: OrderTicketDto[];
}

export class OrderResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  film: string;

  @ApiProperty()
  session: string;

  @ApiProperty()
  row: number;

  @ApiProperty()
  seat: number;

  @ApiProperty()
  daytime: string;

  @ApiProperty()
  price: number;
}
