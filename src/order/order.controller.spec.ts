import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  describe('create', () => {
    it('should create a new order', async () => {
      const createOrderDto: CreateOrderDto = {
        name: 'Test Order',
        category: 'Test Category',
        status: 'Active',
        quantity: '1',
      };

      jest.spyOn(orderService, 'create').mockResolvedValue({
        name: 'Test Order',
        category: 'Test Category',
        status: 'Active',
        quantity: '1',
      });

      expect(await controller.create(createOrderDto)).toEqual({
        name: 'Test Order',
        category: 'Test Category',
        status: 'Active',
        quantity: '1',
      });
    });
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
      jest.spyOn(orderService, 'findAll').mockResolvedValue([
        {
          name: 'Test Order 1',
          category: 'Test Category 1',
          status: 'Active',
          quantity: '1',
        },
        {
          name: 'Test Order 2',
          category: 'Test Category 2',
          status: 'Active',
          quantity: '2',
        },
      ]);

      expect(await controller.findAll()).toEqual([
        {
          name: 'Test Order 1',
          category: 'Test Category 1',
          status: 'Active',
          quantity: '1',
        },
        {
          name: 'Test Order 2',
          category: 'Test Category 2',
          status: 'Active',
          quantity: '2',
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a single order', async () => {
      const id = 'order-id-1';
      jest.spyOn(orderService, 'findOne').mockResolvedValue({
        id,
        name: 'Test Order',
        category: 'Test Category',
        status: 'Active',
        quantity: '1',
      });

      expect(await controller.findOne(id)).toEqual({
        id,
        name: 'Test Order',
        category: 'Test Category',
        status: 'Active',
        quantity: '1',
      });
    });
  });

  describe('update', () => {
    it('should update an existing order', async () => {
      const id = 'order-id-1';
      const updateOrderDto: UpdateOrderDto = {
        name: 'Updated Order',
        category: 'Updated Category',
        status: 'Inactive',
        quantity: '2',
      };

      jest.spyOn(orderService, 'update').mockResolvedValue({
        id,
        name: 'Updated Order',
        category: 'Updated Category',
        status: 'Inactive',
        quantity: '2',
      });

      expect(await controller.update(id, updateOrderDto)).toEqual({
        id,
        name: 'Updated Order',
        category: 'Updated Category',
        status: 'Inactive',
        quantity: '2',
      });
    });
  });

  describe('remove', () => {
    it('should mark an existing order as deleted', async () => {
      const id = 'order-id-1';
      jest.spyOn(orderService, 'remove').mockResolvedValue({
        id: id,
        deletedAt: new Date(),
        name: '',
        category: '',
        status: '',
        quantity: '',
        createdAt: new Date(),
        updateAt: new Date(),
      });

      expect(await controller.remove(id)).toEqual({
        id: id,
        deletedAt: expect.any(Date),
        name: '',
        category: '',
        status: '',
        quantity: '',
        createdAt: expect.any(Date),
        updateAt: expect.any(Date),
      });
    });
  });
});
