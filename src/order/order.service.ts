import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorConstraintUnique } from 'src/utils/handle.constraint.unique';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  private OrderSelect = {
    id: true,
    name: true,
    category: true,
    status: true,
    quantity: true,
    createdAt: true,
    updateAt: true,
    deletedAt: true,
  };

  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const data: CreateOrderDto = {
      name: createOrderDto.name,
      category: createOrderDto.category,
      status: createOrderDto.status,
      quantity: createOrderDto.quantity,
    };
    return await this.prisma.orders
      .create({ select: this.OrderSelect, data })
      .catch(handleErrorConstraintUnique);
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
