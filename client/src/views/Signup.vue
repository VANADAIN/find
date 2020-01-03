<template>
  <div>

    <h1>Sign Up</h1>

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
export default {
    data: () => ({

        user: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
        
    }),
    methods: {
        signup() {
            console.log('form was submitted!')
        }
    }
}
</script>

<style>

</style>