import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorConstraintUnique } from 'src/utils/handle.constraint.unique';
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
    return this.prisma.orders.findMany();
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

  findOne(id: string) {
    return this.verifyingTheOrder(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
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
    return this.prisma.orders.delete({
      where: { id: id },
      select: this.OrderSelect,
    });
  }
}
