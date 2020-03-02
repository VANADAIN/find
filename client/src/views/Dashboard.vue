<template>
  <div class="text-center flex-column">
    <h1 class="dashboard-title">Dashboard</h1>
    <h1 v-if="!user">Getting user info...</h1>
    <h1 v-if="user">Hello, {{ user.username }}</h1>
    <v-btn id="logout" color="teal" @click="logout()" class="btn btn-primary">Logout</v-btn>
    <br />
    <br />
    <v-btn color="teal" @click="showForm = !showForm" class="btn btn-primary">Create page</v-btn>

    <div class="d-flex justify-center">
      <div class="col-6 flex-column wrap" v-if="showForm" @submit.prevent="addPage()">
        <div>
          <v-text-field v-model="newPage.name" label="Name" :rules="rules"></v-text-field>
        </div>

        <div class="form-group">
          <v-text-field
            min="0"
            step="1"
            type="number"
            v-model="newPage.age"
            label="Age"
            :rules="rules"
          ></v-text-field>
        </div>

        <div class="form-group">
          <v-text-field
            min="0"
            step="1"
            type="number"
            v-model="newPage.experience"
            label="Experience"
            :rules="rules"
          ></v-text-field>
        </div>

        <div>
          <v-autocomplete
            class="input_form"
            id="genre"
            v-model="newPage.genre"
            :items="genre_options"
            label="Genre"
            :rules="rules"
          ></v-autocomplete>
        </div>

        <div>
          <v-autocomplete
            class="input_form"
            id="main_instrument"
            v-model="newPage.main_instrument"
            :items="mi_options"
            label="Main Instrument"
            :rules="rules"
          ></v-autocomplete>
        </div>

        <div>
          <v-autocomplete
            class="input_form"
            id="second_instrument"
            v-model="newPage.second_instrument"
            :items="mi_options"
            label="Second instrument"
          ></v-autocomplete>
        </div>

        <div>
          <v-autocomplete
            class="input_form"
            id="public"
            v-model="newPage.public"
            :items="public_options"
            label="Public performances"
            :rules="rules"
          ></v-autocomplete>
        </div>

        <div id="add" class="form-group">
          <label for="note">Additional info:</label>
          <v-textarea counter="200" v-model="newPage.note" id="note" class="form-control" rows="10"></v-textarea>
        </div>

        <div class="form-group">
          <v-text-field
            id="avatar-link"
            v-model="newPage.avatar_link"
            label="Avatar link"
            hint="Add link for your page avatar"
          ></v-text-field>
        </div>

        <div class="form-group">
          <v-text-field
            id="youtube-link"
            v-model="newPage.youtube"
            label="Youtube link"
            hint="Add link to your performance"
          ></v-text-field>
        </div>

        <br />
        <br />
        <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
        <br />
        <br />

        <v-btn color="teal" type="submit" @click="addPage()" class="btn btn-primary">Add page</v-btn>
      </div>
    </div>

    <v-card v-for="page in pages" :key="page.id" class="page-card">
      <v-container>
        <v-row justify="space-around">
          <v-col cols="auto">
            <v-img
              height="270"
              width="480"
              v-bind:src="page.avatar_link"
              alt="No photo"
              contain
              lazy-src
            ></v-img>
          </v-col>

          <v-col class="page-info">
            <v-row class="flex-column">
              <v-row class="personal info-element .align-self-start">
                <h2>{{ page.name }}, {{ page.age }} years</h2>
              </v-row>

              <v-row class="info-element .align-self-start">
                <h4>Genre: {{ page.genre }}</h4>
              </v-row>

              <v-row class="instr info-element">
                <h4>Main instrument: {{ page.main_instrument }}</h4>
              </v-row>

              <v-row class="info-element">
                <h4>Experience: {{ page.experience }}</h4>
              </v-row>

              <v-row class="info-element">
                <h4>Public performances: {{ page.public }}</h4>
              </v-row>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import MDemoji from "markdown-it-emoji";
import vSelect from "vue-select";
const md = new MarkdownIt();
md.use(MDemoji);
const API_URL = "http://localhost:5000/";
export default {
  components: { vSelect },
  data: () => ({
    errorMessage: "",
    showForm: false,
    user: null,
    newPage: {
      name: "",
      age: null,
      experience: null,
      genre: "",
      main_instrument: "",
      second_instrument: "",
      public: "",
      note: "",
      avatar_link: "",
      youtube: ""
    },
    pages: [],
    value: null,
    mi_options: ["list", "of", "options"],
    genre_options: ["metal", "pop"],
    public_options: ["Yes", "No"],
    rules: [value => !!value || "Required."]
  }),
  mounted() {
    fetch(API_URL, {
      headers: {
        authorization: `Bearer ${this.$store.state.token}`
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.user) {
          this.user = result.user;
          this.getPages();
        } else {
          this.logout();
        }
      });
  },
  methods: {
    logout() {
      this.$store.state.token = null;
      this.$router.push("/login");
    },
    renderMarkDown(page) {
      return md.render(page);
    },
    getPages() {
      fetch(`${API_URL}api/pages`, {
        headers: {
          authorization: `Bearer ${this.$store.state.token}`
        }
      })
        .then(res => res.json())
        .then(pages => {
          this.pages = pages;
        });
    },
    addPage() {
      this.newPage.age = Number(this.newPage.age);
      this.newPage.experience = Number(this.newPage.experience);

      if (this.newPage.experience <= this.newPage.age) {
        fetch(`${API_URL}api/pages`, {
          method: "POST",
          body: JSON.stringify(this.newPage),
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.token}`
          }
        })
          .then(res => res.json())
          .then(res => {
            this.pages.push(res);
            this.newPage = {
              name: "",
              age: null,
              experience: null,
              genre: "",
              main_instrument: "",
              second_instrument: "",
              public: "",
              note: "",
              avatar_link: "",
              youtube: ""
            };
            this.showForm = false;
          });
      } else {
        this.errorMessage = "Experience can't ne more than age";
      }
    }
  }
};
</script>

<style lang="sass" scoped>

.page-card 
  margin-top: 40px

.page-info 
  min-width: 100px
  margin-right: 35px

.info-element 
  padding: 4px

.personal 
  margin-bottom: 15px

.instr 
  margin-bottom: 15px

.wrap 
  min-width: 400px

#logout 
  margin-top: 20px


#add 
  margin-top: 20px

.dashboard-title 
  margin-top: 100px


section 
  margin-top: 100px

p 
  padding-bottom: 40px
  margin: 0px

.main 
  padding-top: 40px

.card 
  height: 90%
  margin-bottom: 1em

</style>