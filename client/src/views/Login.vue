<template>
  <div>
    <h1 class="text-center">Login</h1>

    <div v-if="loggingInLoad">
      <img src="../assets/eclipse_loading.svg" alt="img" />
    </div>

    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>

    <div v-if="!loggingInLoad">
      <div class="form-group">
        <h5 for="username">Username</h5>
        <input
          type="text"
          v-model="user.username"
          class="form-control"
          id="username"
          placeholder="Username"
          aria-describedby="usernameHelp"
          required
        />
        <p id="usernameHelp" class="form-text text-muted">Enter your username.</p>
      </div>

      <div class="form-group">
        <h5 for="password">Password</h5>
        <input
          type="password"
          v-model="user.password"
          class="form-control"
          placeholder="Password"
          aria-describedby="passwordHelp"
          id="password"
          required
        />
        <p id="passwordHelp" class="form-text text-muted">Enter your password.</p>
      </div>

      <button class="btn btn-primary" @click="changeVisibility()">{{ passwordButton }}</button>
      <br />
      <br />
      <button class="btn btn-primary" @click="login()">Submit</button>
    </div>
  </div>
</template>

<script>
import Joi from "joi";

const schema = Joi.object().keys({
  username: Joi.string()
    .trim()
    .regex(/(^[a-zA-Z0-9_]*$)/)
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .trim()
    .min(8)
    .required()
});

const LOGIN_URL = "http://localhost:5000/auth/login";

export default {
  data: () => ({
    passwordButton: "Show",
    loggingInLoad: false,
    errorMessage: "",

    user: {
      username: "",
      password: ""
    }
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
    changeVisibility() {
      const passwordField = document.querySelector("#password");
      if (passwordField.getAttribute("type") === "password") {
        passwordField.setAttribute("type", "text");
        this.passwordButton = "Hide Password";
      } else {
        passwordField.setAttribute("type", "password");
        this.passwordButton = "Show Password";
      }
    },

    login() {
      this.errorMessage = "";

      if (this.validUser()) {
        this.loggingInLoad = true;
        const body = {
          username: this.user.username,
          password: this.user.password
        };

        fetch(LOGIN_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(body)
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
            // correct info
            localStorage.token = result.token;

            setTimeout(() => {
              this.loggingInLoad = false;
              this.$router.push("/dashboard");
            }, 1000);
          })
          .catch(error => {
            setTimeout(() => {
              this.loggingInLoad = false;
              // throwed error
              this.errorMessage = error.message;
            }, 1000);
          });
      }
    },

    validUser() {
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
