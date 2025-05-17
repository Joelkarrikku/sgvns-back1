const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');
require('dotenv').config();

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ Connected to MongoDB');

        const existingAdmin = await User.findOne({ role: 'Admin' });
        if (existingAdmin) {
            console.log('⚠ Admin already exists:', existingAdmin.email);
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash('shanti123', 10);

        const admin = new User({
            name: 'Joel',
            email: 'joelsway19@gmail.com',
            password: hashedPassword,
            role: 'Admin'
        });

        await admin.save();
        console.log('🎉 Admin user created:', admin.email);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

createAdmin();
