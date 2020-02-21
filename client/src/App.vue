<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer id="drawer" v-model="drawer" app clipped>
        <v-list dense>
          <v-list-item @click="$router.push({name: 'home'})">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="$router.push({name: 'signup'})">
            <v-list-item-action>
              <v-icon>mdi-checkbox-marked-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sign Up</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="$router.push({name: 'login'})">
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
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Find Your Music</v-toolbar-title>
      </v-app-bar>
      <router-view class="d-flex" />
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  }),

  methods: {
    menuItems() {
      return this.menu;
    },
    redirect(page_name) {
      $router.push({ name: page_name });
    }
  }
};
</script>

<style scoped>
.drawer {
  margin-bottom: 60px;
}
</style>