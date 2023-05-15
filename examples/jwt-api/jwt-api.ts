import { ApiBuilder } from "../../src";
import { HttpMethod, HttpSchema } from "../../src/enums/enums";

// Example of using JWT in the 'Bearer' header

const api = new ApiBuilder()
  .withScheme(HttpSchema.HTTPS)
  .withHost("api.example.com")
  .withAuth("Your_JWT_Access_Token");

// GET - https://your-server.api.com/users
const getOrders = async () => {
  // prettier-ignore
  const users = api
    .withMethod(HttpMethod.GET)
    .withPath("/users")
    .execute();

  return users;
};
