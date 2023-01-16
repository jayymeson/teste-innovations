import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateOrderDto {
  // @IsUUID()
  // @Length(300)
  id?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: 'Product of Order',
    example: 'Soccer Cleats',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
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
  @IsString()
  @ApiProperty({
    description: 'Quantity of products',
    example: '2',
  })
  quantity: string;
}
