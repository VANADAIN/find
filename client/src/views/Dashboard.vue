<template>
  <div>
      <h1>Dashboard</h1>
      <h1 v-if="!user"> Getting user info...</h1>
      <h1 v-if="user">Hello, {{ user.username }}</h1>
      <button @click="logout()" class="btn btn-primary">Logout</button>
      <br>
      <br>
      <button @click="showForm = !showForm" class="btn btn-primary">Create page</button>
      <form class="main" v-if="showForm">
        
        <div class="form-group" @submit.prevent="addPage()">
          <label for="name">Name</label>
          <input v-model="newPage.name" type="text" class="form-control" 
          id="name" aria-describedby="namehelp" placeholder="Name" required>
          <small id="namehelp" class="form-text text-muted">Enter your name</small>
        </div>

        <div class="form-group">
          <label for="age">Age</label>
          <input v-model="newPage.age" type="number" class="form-control" 
          id="age" aria-describedby="agehelp" placeholder="Age" required>
          <small id="agehelp" class="form-text text-muted">Enter your age</small>
        </div>

        <div class="form-group">
          <label for="experience">Years of experience</label>
          <input v-model="newPage.experience" type="number" class="form-control" 
          id="experience" aria-describedby="experiencehelp" placeholder="Experience" required>
          <small id="experiencehelp" class="form-text text-muted">Enter your experience</small>
        </div>

        <div class="form-group">
          <label for="instrument">Instrument</label>
          <input v-model="newPage.instrument" type="text" class="form-control" 
          id="instrument" aria-describedby="instrumenthelp" placeholder="Instrument" required>
          <small id="instrumenthelp" class="form-text text-muted">Enter your main instrument</small>
        </div>

        <div class="form-group">
          <label for="second_instrument">Second Instrument</label>
          <input v-model="newPage.second_instrument" type="text" class="form-control" 
          id="second_instrument" aria-describedby="second_instrumenthelp" placeholder="Second instrument" >
          <small id="second_instrumenthelp" class="form-text text-muted">Enter your second instrument</small>
        </div>

        <!-- add public performance -->

        <button @click="addPage()" class="btn btn-primary">Add page</button>

      </form>
  </div>
</template>

<script>

const API_URL = 'http://localhost:5000/'

export default {

  data: () => ({
    showForm: false,
    user: {},

    newPage: {
      name: '',
      age: '',
      experience: '',
      instrument: '',
      second_instrument: '',
    }

  }),

  mounted() {
    fetch(API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`
      }
    }).then(res => res.json())
    .then((result) => {
      if (result.user) {
        this.user = result.user
      } else {
        this.logout()
      }
    })
  },

  methods: {

    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },

    addPage() {

    }

  }

}
</script>

<style>
.main {
  padding-top: 40px;
}
</style>