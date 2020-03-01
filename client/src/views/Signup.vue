<template>
  <div class="flex-column text-center signup">
    <h1 class="signup_title">Sign Up</h1>

    <div v-if="signingUpLoad">
      <img src="../assets/eclipse_loading.svg" alt="img" />
    </div>

    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>

    <div class="d-flex justify-center">
      <div v-if="!signingUpLoad" class="col-6">
        <div class="form-group">
          <v-text-field v-model="user.email" label="Email" :rules="rules"></v-text-field>
        </div>

        <div class="form-group">
          <v-text-field v-model="user.username" label="Username" :rules="username_rules"></v-text-field>
          <p id="usernameHelp" class="form-text text-muted">
            Must be at least 3 characters.
            Use only alpanumeric characters and under_scores.
          </p>
        </div>

        <div class="form-row">
          <div class="form-group">
            <v-text-field
              id="password"
              v-model="user.password"
              label="Password"
              :type="show1 ? 'text' : 'password'"
              :rules="password_rules"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
            ></v-text-field>
            <p id="passwordHelp" class="form-text text-muted">Must be at least 8 characters.</p>
          </div>

          <div class="form-group">
            <v-text-field
              id="confirmPassword"
              v-model="user.confirmPassword"
              label="Confirm Password"
              :rules="password_rules"
              :type="show2 ? 'text' : 'password'"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
              v-on:keyup.enter="signup()"
            ></v-text-field>
            <p id="confirmPasswordHelp" class="form-text text-muted">Confirm your password.</p>
          </div>
        </div>

        <v-btn color="teal" type="submit" class="btn" @click="signup()">Submit</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Joi from "joi";

const SIGNUP_URL = "http://localhost:5000/auth/signup";

const schema = Joi.object().keys({
  username: Joi.string()
    .trim()
    .regex(/(^[a-zA-Z0-9_]*$)/)
    .min(3)
    .max(30),
  email: Joi.string()
    .trim()
    .email(),
  password: Joi.string()
    .trim()
    .min(8),
  confirmPassword: Joi.string()
    .trim()
    .min(8)
});

export default {
  data: () => ({
    passwordButton: "Show password",
    signingUpLoad: false,
    errorMessage: "",
    show1: false,
    show2: false,

    user: {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    },

    rules: [value => !!value || "Required."],
    username_rules: [
      value => !!value || "Required.",
      value => value.length >= 3 || "Username must be more than 3 characters"
    ],
    password_rules: [
      value => !!value || "Required.",
      value => value.length >= 8 || "Password must be more than 8 characters"
    ]
  }),

  watch: {
    user: {
      handler() {
        this.errorMessage = "";
      },
      deep: true
    }
  },

  methods: {
    signup() {
      this.errorMessage = "";
      if (this.validUser()) {
        //send data to server
        const body = {
          username: this.user.username,
          password: this.user.password,
          email: this.user.email
        };

        this.signingUpLoad = true;

        fetch(SIGNUP_URL, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "content-type": "application/json"
          }
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }

            return response.json().then(error => {
              throw new Error(error.message);
            });
          })
          .then(result => {
            localStorage.token = result.token;
            setTimeout(() => {
              this.signingUpLoad = false;
              this.$router.push("/dashboard");
            }, 1000);
          })
          .catch(error => {
            setTimeout(() => {
              this.signingUpLoad = false;
              // throwed error
              this.errorMessage = error.message;
            }, 1000);
          });
      }
    },

    validUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = "Passwords don't match";
        return false;
      }

      const result = Joi.validate(this.user, schema);

      if (result.error == null) {
        return true;
      }

      if (result.error.message.includes("username")) {
        this.errorMessage = "Username is invalid.";
      } else {
        this.errorMessage = "Invalid password.";
      }

      return false;
    }
  }
};
</script>

<style lang="sass" scoped>
.signup_title 
  font-size: 40px
  text-decoration: underline
  margin-bottom: 40px
  margin-top: 100px

p 
  padding-bottom: 20px
  margin: 0px

input 
  margin: 0px
  color: white

</style>