const bcrypt = require('bcryptjs')
const db = require('../db/connection')
const users = db.get('users')
require('dotenv').config()

'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    
    main();    
});

function readline() {
    return inputString[currentLine++];
}


async function createAdminUser() {
    console.log('Enter your username: ')
    const input_username = readline()
    console.log('Enter your email: ')
    const input_email = readline()

    try {
        const user = await users.findOne({ role: 'admin' }) 
        if (!user) {
            await users.create({
                username: input_username,
                password: await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 12),
                email: input_email,
                role: 'admin',
                active: true
            })
            console.log('Admin User Created!')
        }
    } catch (error) {
        console.error(error)
    }
} 

createAdminUser()
