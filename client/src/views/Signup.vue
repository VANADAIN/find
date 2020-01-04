<template>
  <div>

    <h1>Sign Up</h1>

    <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
    </div>

    <form @submit.prevent="signup">
        <div class="form-group">
            <h5 for="email">Email address</h5>
            <input 
            v-model="user.email"
            type="email" 
            class="form-control" 
            id="email" 
            placeholder="Email"
            aria-describedby="emailHelp"
            required>
            <p id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
            </p>
        </div>

        <div class="form-group">
            <h5 for="username">Username</h5>
            <input 
            type="text"
            v-model="user.username" 
            class="form-control" 
            id="username" 
            placeholder="Username"
            aria-describedby="usernameHelp"
            required>
            <p id="usernameHelp" class="form-text text-muted">
                Must be at least 3 characters. 
                Use only alpanumeric characters and under_scores.
            </p>
        </div>

        <div class="form-row">

            <div class="form-group col-md-6">
                <h5 for="password">Password</h5>
                <input type="password" 
                v-model="user.password"
                class="form-control" 
                placeholder="Password"
                aria-describedby="passwordHelp"
                id="password"
                required>
                <p id="passwordHelp" class="form-text text-muted">
                    Must be at least 8 characters. 
                </p>
            </div>

            <div class="form-group col-md-6">
                <h5 for="confirmPassword">Confirm Password</h5>
                <input type="password" 
                v-model="user.confirmPassword"
                class="form-control" 
                placeholder="Confirm Password"
                aria-describedby="confirmPasswordHelp"
                id="confirmPassword"
                required>
                <p id="confirmPasswordHelp" class="form-text text-muted">
                    Confirm your password. 
                </p>
            </div>

        </div>
        
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

  </div>
</template>

<script>

import Joi from 'joi'

const schema = Joi.object().keys({
    username: Joi.string().trim().regex(/(^[a-zA-Z0-9_]*$)/).min(3).max(30).required(), 
    email: Joi.string().trim().email(),
    password: Joi.string().trim().min(8).required(),
    confirmPassword: Joi.string().trim().min(8).required()
})

export default {
    data: () => ({

        errorMessage: "",

        user: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
        
    }),

    watch: {
        user: {
            handler() {
                this.errorMessage = ''
            },
            deep: true
        }
    },

    methods: {

        signup() {
            this.errorMessage = ""
            if (this.validUser()){
                //send data to server
                console.log("FINEEE")
            } 
        },

        validUser() {
            if (this.user.password !== this.user.confirmPassword) {
                this.errorMessage = "Passwords don't match"
                return false
            } 

            const result = Joi.validate(this.user, schema)

            if (result.error == null) {
                return true
            } 

            if (result.error.message.includes('username')) {
                this.errorMessage = "Username is invalid."
            } else {
                this.errorMessage = "Invalid password."
            }
            return false
            
        }

    }
}
</script>

<style>

</style>