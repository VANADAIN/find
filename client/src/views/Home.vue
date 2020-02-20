<template>
  <v-card id="main-card" class="mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title
          class="headline mb-1 welcome"
        >Welcome to FindYourMusic! Be a part of our society!</v-list-item-title>
        <v-list-item-subtitle>FindYourMusic is a service for all musicians to find each other!</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn class="card-button" text :to="{name: 'signup'}">Sign Up</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="css" scoped>
#main-card {
  margin-top: 80px;
}
.card-button {
  background-color: #004d40;
  margin-left: 8px;
  margin-bottom: 8px;
  color: antiquewhite;
}
.welcome {
  color: #ffffff;
  opacity: 65%;
}
</style>