<template>
  <div class="text-center">
    <h1 class="text-center">User</h1>
    <div class="form-group">
      <v-text-field
        v-model="search_fields.username"
        v-on:keyup.enter="search()"
        label="Username"
        :rules="rules"
      ></v-text-field>
    </div>

    <div v-if="loggingInLoad">
      <img src="../assets/eclipse_loading.svg" alt="img" />
    </div>

    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>

    <div class="d-flex justify-center" v-if="$store.state.isUserLoggedIn">
      <div class="col-6" v-if="!loggingInLoad">
        <div class="form-group">
          <v-text-field v-model="user.username" label="Username" :rules="rules"></v-text-field>
        </div>

        <div class="form-group">
          <v-text-field v-model="user.email" label="eMail" :rules="rules"></v-text-field>
        </div>

        <div id="password" class="form-group">
          <v-text-field v-model="user.password" label="Password" :rules="rules"></v-text-field>
        </div>

        <div id="password" class="form-group">
          <v-text-field v-model="user.active" label="Active" :rules="rules"></v-text-field>
        </div>

        <div id="password" class="form-group">
          <v-text-field v-model="user.role" label="Role" :rules="rules" v-on:keyup.enter="search()"></v-text-field>
        </div>

        <v-row class="d-flex justify-space-around">
          <v-btn text color="teal" class="button" @click="search()">Find</v-btn>
          <v-btn text color="teal" class="button" @click="patchUser()">Patch</v-btn>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Joi from "joi";

const PATCH_URL = "http://localhost:5000/api/users";
const API_URL = "http://localhost:5000/";

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
  role: Joi.string(),
  active: Joi.string()
});

export default {
  data: () => ({
    loggingInLoad: false,
    errorMessage: "",
    search_fields: {
      username: ""
    },
    user: {
      username: "",
      password: "",
      email: "",
      active: "",
      role: ""
    },

    rules: [value => !!value || "Required."]
  }),
  methods: {
    async search() {
      this.errorMessage = "";

      const body = {
        username: this.search.username
      };

      try {
        const res = await fetch(PATCH_URL, {
          method: "POST",
          headers: {
            authorization: `Bearer ${localStorage.token}`,
            "content-type": "application/json"
          },
          body: JSON.stringify(body)
        });

        const res_user = await res.json();
        this.user.username = res_user.username;
        this.user.email = res_user.email;
        this.user.password = res_user.password;
        this.user.role = res_user.role;
        this.user.active = res_user.active;
      } catch (error) {
        this.errorMessage = error.message;
      }
    }
  }
};
</script>

<style lang="sass" scoped></style>
