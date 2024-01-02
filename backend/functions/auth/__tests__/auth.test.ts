import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { auth } from '../src/index'; 
import User from '../src/models/UserModel';

// Mock Mongoose's connect method and User model
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  model: jest.fn().mockReturnValue({
    findOne: jest.fn(),
    save: jest.fn(),
  }),
  connection: { readyState: 0 }
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn()
}));


const mockUserInstanceMethods = {
    save: jest.fn()
};

jest.mock('../src/models/UserModel', () => {
    return {
      __esModule: true, // This property makes it work with default exports
      default: jest.fn().mockImplementation((data) => {
        return {
          ...data, // Optionally include the data passed to the constructor
          ...mockUserInstanceMethods
        };
      }),
      save: jest.fn(),
      findOne: jest.fn()
    };
  });

describe('auth function', () => {
    let req: any;
    let res: any;
  
    beforeEach(() => {
      req = {
        method: '',
        path: '',
        body: {},
        headers: { origin: 'http://localhost:3000' }
      };
      res = {
        set: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn()
      };
    });
  
    describe('loginUser', () => {
      it('successfully logs in a user', async () => {
        req.method = 'POST';
        req.path = '/login';
        req.body = { username: 'testUser', password: 'testPassword' };
        req.headers = { origin: 'http://localhost:3000' };
        User.findOne = jest.fn().mockResolvedValue({ username: 'testUser', password: 'hashedPassword' });
        
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
  
        await auth(req, res);
  
        expect(User.findOne).toHaveBeenCalledWith({ username: 'testUser'.trim() });
        expect(bcrypt.compare).toHaveBeenCalledWith('testPassword', 'hashedPassword');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.anything());
      });
  
      it('fails to log in with incorrect username', async () => {
        req.method = 'POST';
        req.path = '/login';
        req.body = { username: 'wrongUser', password: 'testPassword' };
        User.findOne = jest.fn().mockResolvedValue(null);
        
  
        await auth(req, res);
  
        expect(User.findOne).toHaveBeenCalledWith({ username: 'wrongUser'.trim() });
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'Invalid username ' });
      });
  
      // Additional tests for incorrect password, database errors, etc.
    });

    describe('signupUser', () => {
        beforeEach(() => {
          req.method = 'POST';
          req.path = '/signup';
          req.body = { username: 'newUser', password: 'newPassword', fullName: 'New User' };
          req.headers = { origin: 'http://localhost:3000' };
        });
      
        it('successfully creates a new user', async () => {
          User.findOne = jest.fn().mockResolvedValue(null);
          
          await auth(req, res);
      
          expect(User.findOne).toHaveBeenCalledWith({ username: 'newUser' });
          expect(res.status).toHaveBeenCalledWith(201);
          expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully', user: expect.anything() });
        });
      
        it('fails to create a user that already exists', async () => {
          User.findOne = jest.fn().mockResolvedValue({ username: 'newUser' });
      
          await auth(req, res);
      
          expect(User.findOne).toHaveBeenCalledWith({ username: 'newUser' });
          expect(res.status).toHaveBeenCalledWith(409);
          expect(res.send).toHaveBeenCalledWith({ message: 'Username already in use' });
        });
      
        // Add more tests for invalid input, database errors, etc.
      });
  
    
  });
  
