const User = require('../models/User.js'); 
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@cvibe.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';

    
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

     
      await User.create({
        name: 'System Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });

      console.log('✅ Permanent Admin account created/verified successfully!');
    }
  } catch (error) {
    console.error('❌ Error seeding admin user:', error.message);
  }
};

module.exports = seedAdmin;