<template>
	<div class="text-center">
		<h1 class="text-center">Patch User</h1>
		<div v-if="errorMessage" class="alert" role="alert">
			{{ errorMessage }}
		</div>
		<div v-if="successMessage" class="success" role="alert">
			{{ successMessage }}
		</div>
		<div class="form-group">
			<v-text-field
				v-model="search_fields.search_username"
				v-on:keyup.enter="search()"
				label="Username"
				:rules="rules"
			></v-text-field>
		</div>

		<div v-if="loggingInLoad">
			<img src="../assets/eclipse_loading.svg" alt="img" />
		</div>

		<div class="d-flex justify-center" v-if="$store.state.isUserLoggedIn">
			<div class="col-6" v-if="!loggingInLoad">
				<div class="form-group">
					<v-text-field
						v-model="user.id"
						label="ID"
						:rules="rules"
					></v-text-field>
				</div>
				<div class="form-group">
					<v-text-field
						v-model="user.username"
						label="Username"
						:rules="rules"
					></v-text-field>
				</div>

				<div class="form-group">
					<v-text-field
						v-model="user.email"
						label="eMail"
						:rules="rules"
					></v-text-field>
				</div>

				<div id="password" class="form-group">
					<v-text-field
						v-model="user.active"
						label="Active"
						:rules="rules"
					></v-text-field>
				</div>

				<div id="password" class="form-group">
					<v-text-field
						v-model="user.role"
						label="Role"
						:rules="rules"
						v-on:keyup.enter="search()"
					></v-text-field>
				</div>

				<v-row class="d-flex justify-space-around">
					<v-btn text color="teal" class="button" @click="search()"
						>Find</v-btn
					>
					<v-btn text color="teal" class="button" @click="patchUser()"
						>Patch</v-btn
					>
				</v-row>
			</div>
		</div>
	</div>
</template>

<script>
import Joi from "joi";

const PATCH_URL = "http://localhost:5000/api/users";
const API_URL = "http://localhost:5000/";

const schema = Joi.object().keys({
	username: Joi.string()
		.trim()
		.regex(/(^[a-zA-Z0-9_]*$)/)
		.min(3)
		.max(30),
	email: Joi.string()
		.trim()
		.email(),
	password: Joi.string()
		.trim()
		.min(8),
	role: Joi.string(),
	active: Joi.string()
});

export default {
	data: () => ({
		loggingInLoad: false,
		errorMessage: "",
		successMessage: "",
		search_fields: {
			search_username: ""
		},
		user: {
			id: "",
			username: "",
			password: "",
			email: "",
			active: "",
			role: ""
		},

		rules: [value => !!value || "Required."]
	}),
	watch: {
		user: {
			handler() {
				this.errorMessage = "";
				this.successMessage = "";
			},
			deep: true
		},
		search_fields: {
			handler() {
				this.errorMessage = "";
				this.successMessage = "";
			},
			deep: true
		}
	},
	methods: {
		async search() {
			this.errorMessage = "";
			this.successMessage = "";

			const body = {
				search_username: this.search_fields.search_username
			};

			try {
				const res = await fetch(PATCH_URL, {
					method: "POST",
					headers: {
						authorization: `Bearer ${localStorage.token}`,
						"content-type": "application/json"
					},
					body: JSON.stringify(body)
				});

				if (res.ok) {
					const res_user = await res.json();
					this.user.id = res_user._id;
					this.user.username = res_user.username;
					this.user.email = res_user.email;
					this.user.role = res_user.role;
					this.user.active = res_user.active;
				} else {
					throw new Error(error.message);
				}
			} catch (error) {
				this.errorMessage = error.message;
			}
		},

		async patchUser() {
			this.errorMessage = "";
			this.successMessage = "";

			const body = {
				id: this.user.id,
				username: this.user.username,
				email: this.user.email,
				role: this.user.role,
				active: Boolean(this.user.active)
			};

			try {
				const res = await fetch(PATCH_URL, {
					method: "PATCH",
					headers: {
						authorization: `Bearer ${localStorage.token}`,
						"content-type": "application/json"
					},
					body: JSON.stringify(body)
				});

				const res_user = await res.json();
				this.user.username = res_user.username;
				this.user.email = res_user.email;
				this.user.role = res_user.role;
				this.user.active = res_user.active;
				this.successMessage = "Sucess";
			} catch (error) {
				this.errorMessage = error.message;
			}
		}
	}
};
</script>

<style lang="sass" scoped></style>
