import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async findAll(): Promise<Order[]> {
    return this.orders.findMany({
      where: { deletedAt: { not: undefined } },
      select: {
        id: true,
        name: true,
        category: true,
        status: true,
        quantity: true,
        createdAt: true,
        updateAt: true,
        deletedAt: true,
      },
    });
  }
}
