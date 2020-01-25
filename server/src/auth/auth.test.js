const { expect } = require("chai");
const request = require("supertest");

const app = require("./../app");
const db = require("../db/connection");
const users = db.get("users");

describe("GET /auth", () => {
	it("should respond in a message", async () => {
		const response = await request(app)
			.get("/auth")
			.expect(200);
		expect(response.body.message).to.equal("Lock");
	});
});

describe("POST /auth/signup", () => {
	before(async () => {
		await users.remove({});
	});

	it("should require a username", async () => {
		const response = await request(app)
			.post("/auth/signup")
			.send({})
			.expect(422);
		expect(response.body.message).to.equal(
			'child "username" fails because ["username" is required]'
		);
	});
	it("should require a password", async () => {
		const response = await request(app)
			.post("/auth/signup")
			.send({ username: "testuser" })
			.expect(422);
		expect(response.body.message).to.equal(
			'child "password" fails because ["password" is required]'
		);
	});
	it("should create a new user", async () => {
		const newUser = {
			username: "testuser",
			password: "1234567890",
			email: "test@gmail.com"
		};
		const response = await request(app)
			.post("/auth/signup")
			.send(newUser)
			.expect(200);
		expect(response.body).to.have.property("token");
	});
	it("should not allow username with existing username", async () => {
		const newUser = {
			username: "testuser",
			password: "1234567890",
			email: "test@gmail.com"
		};
		const response = await request(app)
			.post("/auth/signup")
			.send(newUser)
			.expect(409);
		expect(response.body.message).to.equal("That username is already taken");
	});
});

describe("POST /auth/login", () => {
	it("should require a username", async () => {
		const response = await request(app)
			.post("/auth/signup")
			.send({})
			.expect(422);
		expect(response.body.message).to.equal(
			'child "username" fails because ["username" is required]'
		);
	});
	it("should require a password", async () => {
		const response = await request(app)
			.post("/auth/signup")
			.send({ username: "testuser" })
			.expect(422);
		expect(response.body.message).to.equal(
			'child "password" fails because ["password" is required]'
		);
	});
	it("should allow only valid users to login", async () => {
		const response = await request(app)
			.post("/auth/login")
			.send({
				username: "testuser",
				password: "testtesttest"
			})
			.expect(422);
		expect(response.body.message).to.equal("Unable to login.");
	});
	it("should allow to login", async () => {
		const newUser = {
			username: "testuser",
			password: "1234567890",
			email: "test@gmail.com"
		};
		const response = await request(app)
			.post("/auth/login")
			.send(newUser)
			.expect(200);
		expect(response.body).to.have.property("token");
	});
});
