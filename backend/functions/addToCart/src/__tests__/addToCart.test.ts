
import mongoose from 'mongoose';



import { Mock } from 'jest-mock';
import { mocked } from 'jest-mock';
import { validateProductOptions } from '../utils/validateOptions';
import Cart from '../models/CartModel';
import { addToCart } from '..';


// Mock Mongoose's connect method and Cart model
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  model: jest.fn().mockReturnValue({
    findOne: jest.fn(),
    save: jest.fn(),
  }),
  connection: { readyState: 0 }
}));

jest.mock('../utils/validateOptions', () => ({
  validateProductOptions: jest.fn(),
}));


const mockCartInstanceMethods = {
    save: jest.fn()
  };

jest.mock('../models/CartModel', () => {
    return {
      __esModule: true, // This property makes it work with default exports
      default: jest.fn().mockImplementation((data) => {
        return {
          ...data, // Optionally include the data passed to the constructor
          ...mockCartInstanceMethods
        };
      }),
      save: jest.fn(),
      findOne: jest.fn()
    };
  });
  

  

describe('addToCart', () => {
let mockCartInstanceMethods;
let mockCartStaticMethods;

beforeAll(() => {
  mockCartInstanceMethods = {
    save: jest.fn(),
    
  };

  mockCartStaticMethods = {
    findOne: jest.fn(),
    
  };


});

beforeEach(() => {
  (mongoose.connect as jest.Mock).mockClear();
  mockCartStaticMethods.findOne.mockClear();
  mockCartInstanceMethods.save.mockClear();
  mocked(validateProductOptions).mockResolvedValue(true);
});

  it('adds a new item to an empty cart', async () => {
    Cart.findOne = jest.fn().mockResolvedValue(null);

  
    const req = {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000' // Mock origin header
      },
      body: {
        userId: 'user1',
        productId: 'prod1',
        color: 'red',
        size: 'M',
        quantity: 1
      }
    } as any;
    const res = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    } as any;
  
    await addToCart(req, res);

    expect(Cart.findOne).toHaveBeenCalledWith({ userId: 'user1' });
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    
});

  it('adds to an existing cart', async () => {
    const existingCart = {
      items: [{ productId: 'prod1', color: 'blue', size: 'L', quantity: 2 }],
      save: jest.fn()
    };
    Cart.findOne = jest.fn().mockResolvedValue(existingCart);
  
    const req = {
      method: 'POST',
      body: {
        userId: 'user1',
        productId: 'prod2', // New product
        color: 'red',
        size: 'M',
        quantity: 1
      },
        headers: {
            origin: 'http://localhost:3000'
        }
    } as any;
    const res = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;
  
    await addToCart(req, res);
  
    expect(Cart.findOne).toHaveBeenCalledWith({ userId: 'user1' });
    expect(existingCart.items).toContainEqual({
      productId: 'prod2',
      color: 'red',
      size: 'M',
      quantity: 1
    });
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Item added to cart', cart: existingCart });
  });
  

  it('handles non-POST requests', async () => {
    const req = { 
      headers: {
        origin: 'http://localhost:3000'
      },
      method: 'GET' } as any;
    const res = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any;

    await addToCart(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.send).toHaveBeenCalledWith('Method Not Allowed');
  });

  it('handles MongoDB connection failure', async () => {
    (mongoose.connect as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Failed to connect to MongoDB');
    });

    const req = {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      },
      body: {
        userId: 'user1',
        productId: 'prod1',
        color: 'red',
        size: 'M',
        quantity: 1
      }
    } as any;
    const res = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any;

    await addToCart(req, res);

    expect(mongoose.connect).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Internal Server Error');
  });

});