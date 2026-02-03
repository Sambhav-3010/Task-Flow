import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Task from './models/Task.js';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        await User.deleteMany({});
        await Task.deleteMany({});

        const hashedPassword = await bcrypt.hash('demo123', 10);

        const user = await User.create({
            name: 'Demo User',
            email: 'demo@example.com',
            password: hashedPassword,
            bio: 'I am a demo user.'
        });

        console.log('User created:', user.email);

        const tasks = [
            {
                title: 'Review Project Requirements',
                description: 'Check all the features requested in the assignment.',
                status: 'completed',
                priority: 'high',
                user: user._id
            },
            {
                title: 'Setup Database',
                description: 'Configure MongoDB and Mongoose connection.',
                status: 'completed',
                priority: 'high',
                user: user._id
            },
            {
                title: 'Implement Authentication',
                description: 'Create signup and login APIs with JWT.',
                status: 'in-progress',
                priority: 'medium',
                user: user._id
            },
            {
                title: 'Design Dashboard',
                description: 'Create a responsive dashboard using TailwindCSS.',
                status: 'pending',
                priority: 'medium',
                user: user._id
            }
        ];

        await Task.insertMany(tasks);
        console.log('Tasks created');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
