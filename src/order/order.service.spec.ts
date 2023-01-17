import { OrderService } from './order.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('OrderService', () => {
  let orderService: OrderService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    orderService = new OrderService(prismaService);
  });

  describe('create', () => {
    it('should create a new order', async () => {
      const createOrderDto = {
        name: 'Test Order',
        category: 'Test Category',
        status: 'Active',
        quantity: '1',
      };

      const order = await orderService.create(createOrderDto);
      expect(order).toEqual({
        name: 'Test Order',
        category: 'Test Category',
        status: 'Active',
        quantity: '1',
      });
    });

    it('should throw an error if status is not valid', async () => {
      const createOrderDto = {
        name: 'Test Order',
        category: 'Test Category',
        status: 'Invalid',
        quantity: '1',
      };

      try {
        await orderService.create(createOrderDto);
      } catch (error) {
        expect(error.message).toEqual('Invalid status');
      }
    });
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
      const order1 = await orderService.create({
        name: 'Test Order 1',
        category: 'Test Category 1',
        status: 'Active',
        quantity: '1',
      });

      const order2 = await orderService.create({
        name: 'Test Order 2',
        category: 'Test Category 2',
        status: 'Active',
        quantity: '2',
      });

      const orders = await orderService.findAll();
      expect(orders).toEqual([order1, order2]);
    });
  });

  describe('findOne', () => {
    it('should return one order', async () => {
      const order = await orderService.create({
        name: 'Test Order',
        category: 'Test Category',
        status: 'Active',
        quantity: '1',
      });

      const foundOrder = await orderService.findOne(order.id);
      expect(foundOrder).toEqual(order);
    });

    it('should throw an error if order is not found', async () => {
      try {
        await orderService.findOne('invalid-id');
      } catch (error) {
        expect(error.message).toEqual(`ID record 'invalid-id' not found`);
      }
    });
  });

  describe('update', () => {
    it('should update an existing order', async () => {
      const order = await orderService.create({
        name: 'Test Order',
        category: 'Test Category',
        status: 'Active',
        quantity: '1',
      });

      const updateOrderDto = {
        name: 'Updated Order',
        category: 'Updated Category',
        status: 'Inactive',
        quantity: '2',
      };

      const updatedOrder = await orderService.update(order.id, updateOrderDto);
      expect(updatedOrder).toEqual({
        id: order.id,
        name: 'Updated Order',
        category: 'Updated Category',
        status: 'Inactive',
        quantity: '2',
      });
    });

    it('should throw an error if order is not found', async () => {
      try {
        await orderService.update('invalid-id', {});
      } catch (error) {
        expect(error.message).toEqual(`ID record 'invalid-id' not found`);
      }
    });
  });

  describe('remove', () => {
    it('should mark an existing order as deleted', async () => {
      const order = await orderService.create({
        name: 'Test Order',
        category: 'Test Category',
        status: 'Active',
        quantity: '1',
      });

      const deletedOrder = await orderService.remove(order.id);
      expect(deletedOrder.deletedAt).toBeDefined();
    });

    it('should throw an error if order is not found', async () => {
      try {
        await orderService.remove('invalid-id');
      } catch (error) {
        expect(error.message).toEqual(`ID record 'invalid-id' not found`);
      }
    });
  });
});
