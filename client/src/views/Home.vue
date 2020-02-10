<template>
  <div class="col s12 m6 text-center">
    <div class="card">
      <div class="card-content">
        <span id="bigtext" class="card-title">Authentication</span>
        <p id="smalltext">
          Be a part of FindYourMusic right now!
          Have a great day!
        </p>
      </div>
      <div id="field" class="card-action">
        <router-link :to="{ name: 'signup' }" role="button">Sign Up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="css" scoped>
#bigtext {
  font-size: 40px;
  padding-bottom: 20px;
}
#smalltext {
  font-size: 20px;
  padding-bottom: 5px;
}
</style>