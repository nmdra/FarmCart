import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import User from './userModel' // Adjust the path as needed

let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
})

afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
})

describe('User Model', () => {
    it('should create a new user', async () => {
        const user = new User({
            name: 'Test User',
            email: 'testuser@example.com',
            role: 'regular',
            password: 'password123',
            contactNumber: '0712345678',
        })

        await user.save()

        expect(user.name).toBe('Test User')
        expect(user.email).toBe('testuser@example.com')
        expect(user.role).toBe('regular')
        expect(user.contactNumber).toBe('0712345678')
    })

    it('should hash the password before saving', async () => {
        const user = new User({
            name: 'Test User',
            email: 'testuser2@example.com',
            role: 'regular',
            password: 'password123',
            contactNumber: '0712345678',
        })

        await user.save()

        expect(user.password).not.toBe('password123')
    })

    it('should validate email format', async () => {
        const user = new User({
            name: 'Test User',
            email: 'invalid_email',
            role: 'regular',
            password: 'password123',
            contactNumber: '0712345678',
        })

        await expect(user.save()).rejects.toThrow(
            'invalid_email is not a valid email!'
        )
    })

    it('should validate contact number format', async () => {
        const user = new User({
            name: 'Test User',
            email: 'testuser@example.com',
            role: 'regular',
            password: 'password123',
            contactNumber: '1234567890',
        })

        await expect(user.save()).rejects.toThrow(
            '1234567890 is not a valid contact number!'
        )
    })
})
