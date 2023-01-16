import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @MaxLength(50)
  id?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    description: 'Product of Order',
    example: 'Soccer Cleats',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    description: 'Description of categories of soccer cleats',
    example: 'IC',
  })
  category: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Informs whether the order is active or inactive',
    default: 'Active',
  })
  status: string = 'Active' || 'Inactive';

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Quantity of products',
    example: '2',
  })
  quantity: string;
}
