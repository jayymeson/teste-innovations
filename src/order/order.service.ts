import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  handleErrorConstraintUnique,
  handleErrorStatus,
} from 'src/utils/handle.constraint.unique';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

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

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const data: CreateOrderDto = {
      name: createOrderDto.name,
      category: createOrderDto.category,
      status: createOrderDto.status,
      quantity: createOrderDto.quantity,
    };

    if (data.status !== 'Active' && 'Inactive') {
      return handleErrorStatus(new Error());
    }

    return await this.prisma.orders
      .create({ select: this.OrderSelect, data })
      .catch(handleErrorConstraintUnique);
  }

  async findAll(): Promise<Order[]> {
    return this.prisma.findAll();
  }

  async verifyingTheOrder(id: string): Promise<Order> {
    const order: Order = await this.prisma.orders.findUnique({
      where: { id },
      select: { ...this.OrderSelect },
    });

    if (!order) {
      throw new NotFoundException(`ID record '${id}' not found`);
    }

    return order;
  }

  findOne(id: string): Promise<Order> {
    return this.verifyingTheOrder(id);
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order | void> {
    await this.verifyingTheOrder(id);

    return this.prisma.orders
      .update({
        where: { id },
        data: updateOrderDto,
        select: this.OrderSelect,
      })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.verifyingTheOrder(id);
    return this.prisma.orders.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
