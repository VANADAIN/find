<template>
  <div id="app">
    <v-app>
      <page-header />

      <v-container fluid>
        <router-view />
      </v-container>
    </v-app>
  </div>
</template>

<script>
import PageHeader from "@/components/Header.vue";

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
  },
  components: {
    PageHeader
  }
};
</script>

<style scoped>
</style>