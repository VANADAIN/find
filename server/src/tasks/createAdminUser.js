const bcrypt = require('bcryptjs');
const db = require('../db/connection');

const users = db.get('users');
require('dotenv').config();

const rl = require('readline-sync');

async function createAdminUser() {
  try {
    const input_username = rl.question('Enter your username: ');
    const input_email = rl.question('Enter your email: ');

    const user = await users.findOne({ role: 'admin' });

    await users.insert({
      username: input_username,
      password: await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 12),
      email: input_email,
      role: 'admin',
      active: true,
    });
    console.log('Admin User Created!');
  } catch (error) {
    console.error(error);
  } finally {
    db.close();
  }
}

createAdminUser();
