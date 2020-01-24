const { expect } = require("chai");
// const mocha = require("mocha");
const request = require("supertest");

const app = require("./app");

describe("app", () => {
	it("should respond in a message", async () => {
		const response = await request(app)
			.get("/")
			.expect(200);
		expect(response.body.message).to.equal("Hello there!..");
	});
});
