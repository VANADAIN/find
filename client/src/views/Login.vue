<template>
  <div class="mx-auto login">
    <h1 class="login-title">Login</h1>

    <div v-if="loggingInLoad">
      <img src="../assets/eclipse_loading.svg" alt="img" />
    </div>

    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>

    <div v-if="!loggingInLoad">
      <div class="form-group">
        <v-text-field v-model="user.username" label="Username" :rules="rules"></v-text-field>
        <p id="usernameHelp" class="form-text text-muted">Enter your username.</p>
      </div>

      <div class="form-group">
        <v-text-field
          v-model="user.password"
          type="password"
          id="password"
          label="Password"
          :rules="rules"
        ></v-text-field>
        <p id="passwordHelp" class="form-text text-muted">Enter your password.</p>
      </div>

      <v-btn color="teal darken-4" class="button" @click="changeVisibility()">{{ passwordButton }}</v-btn>
      <br />
      <br />
      <v-btn color="teal darken-4" class="button" @click="login()">Submit</v-btn>
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
    passwordButton: "Show password",
    loggingInLoad: false,
    errorMessage: "",

    user: {
      username: "",
      password: ""
    },

    rules: [value => !!value || "Required."]
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

<style lang="css" scoped>
.login-title {
  font-size: 40px;
  text-decoration: underline;
  margin-bottom: 40px;
  margin-top: 100px;
  color: #ffffff;
  opacity: 65%;
}
.login {
  min-width: 320px;
}
p {
  padding-bottom: 20px;
  margin: 0px;
  color: #ffffff;
  opacity: 65%;
}
.button {
  color: #ffffff;
  opacity: 65%;
}
</style>