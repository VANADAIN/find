<template>
  <div class="home text-center">
    <div class="jumbotron">
      <h1 class="display-3">Authentication</h1>
      <p class="lead">
        Be a part of society right now!
      </p>
      <hr class="my-4">
      <p>
        Have a great day!
      </p>
      <p class="lead">
        <router-link
        :to="{ name: 'signup' }"
        class="btn btn-primary btn-lg" 
        href="#" 
        role="button">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>
