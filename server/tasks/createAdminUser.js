const bcrypt = require('bcryptjs')
const db = require('../db/connection')
const users = db.get('users')
require('dotenv').config()

const rl = require('readline-sync')

async function createAdminUser() {
    try {

        var input_username = rl.question('Enter your username: ')
        var input_email = rl.question('Enter your email: ')

        const user = await users.findOne({ role: 'admin' }) 
        if (!user) {
            await users.insert({
                username: input_username,
                password: await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 12),
                email: input_email,
                role: 'admin',
                active: true
            })
            console.log('Admin User Created!')
        } else {
            console.log('Admin User already exists :(')
        }
    } catch (error) {
        console.error(error)
    } finally {
        db.close()
    }
} 

createAdminUser()
