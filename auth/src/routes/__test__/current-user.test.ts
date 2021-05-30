import request from "supertest";
import { app } from "../../app";

it("should return user details when current user is called", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentUser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toBe("jeet@gmail.com");
});

it("should return null when not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentUser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
