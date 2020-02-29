const bcrypt = require('bcryptjs');
const db = require('../db/connection');

const users = db.get('users');
require('dotenv').config();

const rl = require('readline-sync');

async function createAdminUser() {
  try {
    const input_username = rl.question('Enter your username: ');
    const input_email = rl.question('Enter your email: ');
    const input_password = rl.question('Enter your password: ');

    const new_user = {

      username: input_username,
      password: await bcrypt.hash(input_password, 12),
      email: input_email,
      role: 'admin',
      active: true,

    }

    await users.insert(new_user);
    console.log('Admin User Created!');
  } catch (error) {
    console.error(error);
  } finally {
    db.close();
  }
}

createAdminUser();
