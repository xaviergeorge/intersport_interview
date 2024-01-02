"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../src/index"); // Adjust the path based on your directory structure
const CartModel_1 = __importDefault(require("../src/models/CartModel"));
// Mock Mongoose's connect method and Cart model
jest.mock('mongoose', () => ({
    connect: jest.fn(),
    model: jest.fn().mockReturnValue({
        findOne: jest.fn(),
        save: jest.fn(),
    }),
    connection: { readyState: 0 }
}));
const mockCartInstanceMethods = {
    save: jest.fn()
};
jest.mock('../src/models/CartModel', () => {
    return {
        __esModule: true, // This property makes it work with default exports
        default: jest.fn().mockImplementation((data) => {
            return Object.assign(Object.assign({}, data), mockCartInstanceMethods);
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
        mongoose_1.default.connect.mockClear();
        mockCartStaticMethods.findOne.mockClear();
        mockCartInstanceMethods.save.mockClear();
    });
    it('adds a new item to an empty cart', () => __awaiter(void 0, void 0, void 0, function* () {
        CartModel_1.default.findOne = jest.fn().mockResolvedValue(null);
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
        };
        const res = {
            set: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        yield (0, index_1.addToCart)(req, res);
        expect(CartModel_1.default.findOne).toHaveBeenCalledWith({ userId: 'user1' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    }));
    it('adds to an existing cart', () => __awaiter(void 0, void 0, void 0, function* () {
        const existingCart = {
            items: [{ productId: 'prod1', color: 'blue', size: 'L', quantity: 2 }],
            save: jest.fn()
        };
        CartModel_1.default.findOne = jest.fn().mockResolvedValue(existingCart);
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
        };
        const res = {
            set: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        yield (0, index_1.addToCart)(req, res);
        expect(CartModel_1.default.findOne).toHaveBeenCalledWith({ userId: 'user1' });
        expect(existingCart.items).toContainEqual({
            productId: 'prod2',
            color: 'red',
            size: 'M',
            quantity: 1
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Item added to cart', cart: existingCart });
    }));
    it('handles non-POST requests', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            headers: {
                origin: 'http://localhost:3000'
            },
            method: 'GET'
        };
        const res = {
            set: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        yield (0, index_1.addToCart)(req, res);
        expect(res.status).toHaveBeenCalledWith(405);
        expect(res.send).toHaveBeenCalledWith('Method Not Allowed');
    }));
    it('handles MongoDB connection failure', () => __awaiter(void 0, void 0, void 0, function* () {
        mongoose_1.default.connect.mockImplementationOnce(() => {
            throw new Error('Failed to connect to MongoDB');
        });
        const req = {
            method: 'POST',
            headers: {
                origin: 'http://localhost:3000'
            },
            body: {
            // ...request body...
            }
        };
        const res = {
            set: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        yield (0, index_1.addToCart)(req, res);
        expect(mongoose_1.default.connect).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    }));
    // Additional test cases...
});
