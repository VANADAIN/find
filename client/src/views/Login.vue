<template>
  <div class="text-center login">
    <h1 class="text-center login-title">Login</h1>

    <div v-if="loggingInLoad">
      <img src="../assets/eclipse_loading.svg" alt="img" />
    </div>

    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>

    <div class="d-flex justify-center">
      <div class="col-6" v-if="!loggingInLoad">
        <div class="form-group">
          <v-text-field v-model="user.username" label="Username" :rules="rules"></v-text-field>
        </div>

        <div id="password" class="form-group">
          <v-text-field
            v-model="user.password"
            label="Password"
            :rules="rules"
            :type="show2 ? 'text' : 'password'"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show2 = !show2"
            v-on:keyup.enter="login()"
          ></v-text-field>
        </div>

        <v-btn text color="teal" class="button" @click="login()">Submit</v-btn>
      </div>
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
    show2: false,
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
            this.$store.dispatch("setToken", localStorage.token);
            this.$store.dispatch("setUserRights", result.user.role);

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

<style lang="sass" scoped>
#password
  margin-top: 20px
.login-title
  font-size: 40px
  text-decoration: underline
  margin-bottom: 40px
  margin-top: 100px

.login
  min-width: 320px
.button
  margin-top: 40px
p
  padding-bottom: 20px
  margin: 0px
</style>
