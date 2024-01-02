// getProducts/__tests__/getProducts.test.ts
import mongoose from 'mongoose';
import { getProducts } from '../src/index'; // Adjust the path based on your directory structure
import Product from '../src/models/ProductModel';

// Mock Mongoose's connect method and Product model
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  model: jest.fn().mockReturnValue({ find: jest.fn() }),
  connection: { readyState: 0 }
}));

jest.mock('../src/models/ProductModel', () => ({
  find: jest.fn()
}));

describe('getProducts', () => {
  beforeEach(() => {
    (mongoose.connect as jest.Mock).mockClear();
    (Product.find as jest.Mock).mockClear();
  });

  it('successfully retrieves products', async () => {
    (Product.find as jest.Mock).mockResolvedValue([{ title: 'Cozy Sweatshirt', description: 'A comfortable sweatshirt' }]);

    const req = { method: 'GET' } as any;
    const res = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    } as any;

    await getProducts(req, res);

    expect(mongoose.connect).toHaveBeenCalledTimes(1);
    expect(Product.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ title: 'Cozy Sweatshirt', description: 'A comfortable sweatshirt' }]);
  });

  it('handles MongoDB connection failure', async () => {
    // Mock mongoose.connect to throw an error
    (mongoose.connect as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Failed to connect to MongoDB');
    });
  
    const req = { method: 'GET' } as any;
    const res = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any;
  
    await getProducts(req, res);
  
    expect(mongoose.connect).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error connecting to the database');
  });

  it('returns an empty array when no products are found', async () => {
    (Product.find as jest.Mock).mockResolvedValue([]);
  
    const req = { method: 'GET' } as any;
    const res = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;
  
    await getProducts(req, res);
  
    expect(Product.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });
  
});
