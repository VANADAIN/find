<template>
  <div class="text-center flex-column align-center">
    <h1 class="dashboard-title">Dashboard</h1>
    <h1 v-if="!user">Getting user info...</h1>
    <h1 v-if="user">Hello, {{ user.username }}</h1>
    <v-btn color="teal darken-4" @click="logout()" class="btn btn-primary">Logout</v-btn>
    <br />
    <br />
    <v-btn color="teal darken-4" @click="showForm = !showForm" class="btn btn-primary">Create page</v-btn>

    <div class="d-flex flex-column wrap" v-if="showForm" @submit.prevent="addPage()">
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
        <v-select
          class="input_form"
          id="genre"
          v-model="newPage.genre"
          :options="genre_options"
          placeholder="Genre"
        >
          <template #search="{attributes, events}">
            <input class="vs__search" :required="!newPage.genre" v-bind="attributes" v-on="events" />
          </template>
        </v-select>
      </div>

      <div>
        <v-select
          class="input_form"
          id="main_instrument"
          v-model="newPage.main_instrument"
          :options="mi_options"
          placeholder="Main Instrument"
        >
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
        <v-select
          class="input_form"
          id="second_instrument"
          v-model="newPage.second_instrument"
          :options="mi_options"
          placeholder="Second instrument"
        >
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
        <v-select
          class="input_form"
          id="public"
          v-model="newPage.public"
          :options="public_options"
          placeholder="Public performances"
        >
          <template #search="{attributes, events}">
            <input class="vs__search" :required="!newPage.public" v-bind="attributes" v-on="events" />
          </template>
        </v-select>
      </div>

      <div class="form-group">
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

      <v-btn color="teal darken-4" type="submit" class="btn btn-primary">Add page</v-btn>
    </div>

    <section class="row mt-3">
      <div class="col-4" v-for="page in pages" :key="page._id">
        <div class="card border-dark mb-3">
          <div class="card-header">Header</div>
          <div class="card-body">
            <h4 class="card-title">{{ page.name }}</h4>
            <p class="card-text" v-html="renderMarkDown(page.note)">{{ page.note }}</p>
            <!--  -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
$(document).ready(function() {
  $("select").formSelect();
});
</script>

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
        authorization: `Bearer ${localStorage.token}`
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
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    renderMarkDown(page) {
      return md.render(page);
    },
    getPages() {
      fetch(`${API_URL}api/pages`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`
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

<style scoped>
.wrap {
  min-width: 400px;
}
#help {
  color: #ffffff;
  opacity: 65%;
}
.dashboard-title {
  margin-top: 100px;
}
h1 {
  color: #ffffff;
  opacity: 65%;
}
section {
  margin-top: 100px;
}
p {
  padding-bottom: 40px;
  margin: 0px;
}
.main {
  padding-top: 40px;
}
.card {
  height: 90%;
  margin-bottom: 1em;
}
.card-text img {
  width: 100%;
}
</style>