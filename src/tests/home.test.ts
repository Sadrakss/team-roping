import { app } from "../app";
import request from "supertest";

describe("Test status code", () => {
  it("Main route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
