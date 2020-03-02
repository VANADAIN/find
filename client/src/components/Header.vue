<template>
  <v-card tile flat>
    <v-toolbar dense fixed dark flat>
      <v-toolbar-title class="logo nav-text" @click="navigateTo({name: 'home'})">FindYourMusic</v-toolbar-title>

      <v-spacer class="col-xs-1"></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-switch class="toggle" v-model="$vuetify.theme.dark" label="Theme Dark"></v-switch>
        <v-btn class="nav-text" depressed @click="navigateTo({name: 'home'})">Home</v-btn>
        <v-btn class="nav-text" depressed router @click="navigateTo({name: 'dashboard'})">Dashboard</v-btn>
        <v-btn
          v-if="!$store.state.isUserLoggedIn"
          class="nav-text"
          depressed
          @click="navigateTo({name: 'login'})"
        >Login</v-btn>
        <v-btn
          v-if="!$store.state.isUserLoggedIn"
          class="nav-text"
          depressed
          @click="navigateTo({name: 'signup'})"
        >Sign Up</v-btn>
        <v-btn
          v-if="$store.state.isUserLoggedIn"
          class="nav-text"
          @click="logout()"
          depressed
        >Log out</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-md-and-up">
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="$router.push({name: 'home'})">
              <v-list-item-action>
                <v-icon>mdi-home</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-if="!$store.state.isUserLoggedIn"
              @click="$router.push({name: 'signup'})"
            >
              <v-list-item-action>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Sign Up</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="!$store.state.isUserLoggedIn" @click="$router.push({name: 'login'})">
              <v-list-item-action>
                <v-icon>mdi-account</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Login</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click="$router.push({name: 'dashboard'})">
              <v-list-item-action>
                <v-icon>mdi-widgets</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-if="$store.state.isUserLoggedIn"
              @click="$router.push({name: 'dashboard'})"
            >
              <v-list-item-action>
                <v-icon>mdi-account</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title @click="logout()">Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-switch class="toggle" v-model="$vuetify.theme.dark" label="Theme Dark"></v-switch>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    menuItems() {
      return this.menu;
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="sass" >
.toggle
  position: relative
  top: 12px
  margin-right: 5px
.white-text
  color: #ffffff
  opacity: 65%
.logo
  cursor: pointer
</style>