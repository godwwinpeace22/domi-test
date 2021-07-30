const request = require("supertest");
const app = require("../../app");

describe("Get Endpoint", () => {
  it("should return the last 40 messages from conversation1", async () => {
    const res = await request(app).get("/?conversation=1&limit=40").send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(40);
  });
  it("should return the last 40 messages from conversation2", async () => {
    const res = await request(app).get("/?conversation=2&limit=40").send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(40);
  });
});
