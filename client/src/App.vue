<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-widgets</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-wrench</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Application</v-toolbar-title>
      </v-app-bar>
      <router-view class=".d-flex" />
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
    }
  }
};
</script>

