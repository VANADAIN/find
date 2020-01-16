<template>
  <div>
      <h1>Dashboard</h1>
      <h1 v-if="!user"> Getting user info...</h1>
      <h1 v-if="user">Hello, {{ user.username }}</h1>
      <button @click="logout()" class="btn btn-primary">Logout</button>
      <br>
      <br>
      <button @click="showForm = !showForm" class="btn btn-primary">Create page</button>

      <form class="main" v-if="showForm"  @submit.prevent="addPage()">
        
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="newPage.name" type="text" class="form-control" 
          id="name" aria-describedby="namehelp" placeholder="Name" required>
          <small id="namehelp" class="form-text text-muted">Enter your name</small>
        </div>

        <div class="form-group">
          <label for="age">Age</label>
          <input min="0" step="1" v-model="newPage.age" type="number" class="form-control" 
          id="age" aria-describedby="agehelp" placeholder="Age" required>
          <small id="agehelp" class="form-text text-muted">Enter your age</small>
        </div>

        <div class="form-group">
          <label for="experience">Years of experience</label>
          <input  min="0" step="1" v-model="newPage.experience" type="number" class="form-control" 
          id="experience" aria-describedby="experiencehelp" placeholder="Experience" required>
          <small id="experiencehelp" class="form-text text-muted">Enter your experience</small>
        </div>
        
        <div>
          <label for="genre">Genre</label>
          <v-select class="input_form" id="genre" v-model="newPage.genre" :options="genre_options"  
          placeholder="Genre">
            <template #search="{attributes, events}">
              <input
                class="vs__search"
                :required="!newPage.genre"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </v-select>
        </div>

        <div>
          <label for="main_instrument">Main Instrument</label>
          <v-select class="input_form" id="main_instrument" v-model="newPage.main_instrument" :options="mi_options"  
          placeholder="Main Instrument">
            <template #search="{attributes, events}">
              <input
                class="vs__search"
                :required="!newPage.main_instrument"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </v-select>
        </div>

        <div>
          <label for="second_instrument">Main Instrument</label>
          <v-select class="input_form" id="second_instrument" v-model="newPage.second_instrument" :options="mi_options"  
          placeholder="Second instrument">
            <template #search="{attributes, events}">
              <input
                class="vs__search"
                :required="!newPage.second_instrument"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </v-select>
        </div>

        <div>
          <label for="public">Have you performed in public?</label>
          <v-select class="input_form" id="public" v-model="newPage.public" :options="public_options"  
          placeholder="Public performances">
            <template #search="{attributes, events}">
              <input
                class="vs__search"
                :required="!newPage.public"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </v-select>
        </div>

        <!-- rewrite with genre style -->

        <div class="form-group">
          <label for="note">Additional info:</label>
          <textarea v-model="newPage.note" id="note" class="form-control" rows="10"></textarea>
        </div>

        <div class="form-group">
          <label for="avatar_link">Avatar link</label>
          <input v-model="newPage.avatar_link" type="text" class="form-control" 
          id="avatar_link" aria-describedby="avatar_linkhelp" placeholder="Avatar link" >
          <small id="avatar_linkhelp" class="form-text text-muted">Add link for your page avatar</small>
        </div>

        <div class="form-group">
          <label for="youtube">Youtube link</label>
          <input v-model="newPage.youtube" type="text" class="form-control" 
          id="youtube" aria-describedby="youtubehelp" placeholder="Youtube link" >
          <small id="youtubehelp" class="form-text text-muted">You can add video of your performance</small>
        </div>

        <br>
        <br>

        <button type="submit" class="btn btn-primary">Add page</button>

      </form>
  </div>
</template>

<script>

import vSelect from 'vue-select'

const API_URL = 'http://localhost:5000/'

export default {

  components: { vSelect },

  data: () => ({

    showForm: false,
    user: {},

    newPage: {
      name: '',
      age: null,
      experience: null,
      genre: '',
      main_instrument: '',
      second_instrument: '',
      public: '',
      note: '',
      avatar_link: '',
      youtube: '',
    },

    pages: [],

    value: null,
    mi_options: ['list', 'of', 'options'],
    genre_options: ['metal', 'pop'],
    public_options: ['Yes', 'No']

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
      this.newPage.age = Number(this.newPage.age)
      this.newPage.experience = Number(this.newPage.experience)
      fetch(`${API_URL}api/pages` , {
        method: 'POST',
        body: JSON.stringify(this.newPage),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then((page) => {
        this.pages.push(page)
        this.newPage = {
          name: '',
          age: null,
          experience: null,
          genre: '',
          main_instrument: '',
          second_instrument: '',
          public: '',
          note: '',
          avatar_link: '',
          youtube: ''
        }
        this.showForm = false
      })
    }

  }

}
</script>

<style>
.main {
  padding-top: 40px;
}
.input_form {
  margin-bottom: 24px;
  background-color: #fff;
  border: 1px solid #222;
  border-radius: 0.25rem;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.5;
  -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}

</style>
<style src="vue-select/dist/vue-select.css"></style>