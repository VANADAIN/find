<template>
  <v-card class="col-6" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title
          class="headline mb-1 welcome"
        >Welcome to FindYourMusic! Be a part of our society!</v-list-item-title>
        <v-list-item-subtitle>FindYourMusic is a service for all musicians to find each other!</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn text color="teal" :to="{name: 'signup'}">Sign Up</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="sass" scoped>

.card-button 
  margin-left: 8px
  margin-bottom: 8px

</style>