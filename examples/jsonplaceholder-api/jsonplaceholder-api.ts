import { ApiBuilder } from "../../src";
import { HttpMethod, HttpSchema } from "../../src/enums/enums";
import {
  CreatePostBodyParams,
  UpdatePostBodyParams,
  UserPostQueryParams,
} from "./interfaces";

// Resource:
// https://jsonplaceholder.typicode.com

const api = new ApiBuilder()
  .withScheme(HttpSchema.HTTPS)
  .withHost("jsonplaceholder.typicode.com");

// GET - https://jsonplaceholder.typicode.com/posts
const getPosts = async () => {
  // prettier-ignore
  const posts = api
  .withMethod(HttpMethod.GET)
  .withPath("/posts")
  .execute();

  return posts;
};

// GET - https://jsonplaceholder.typicode.com/posts?userId={userId}&id={id}}
const getUserPosts = async (params: UserPostQueryParams) => {
  // prettier-ignore
  const userPosts =api
    .withMethod(HttpMethod.GET)
    .withPath(`/posts`)
    .withQueryParameters<UserPostQueryParams>(params)
    .execute();

  return userPosts;
};

// POST - https://jsonplaceholder.typicode.com/posts
const createPost = async (body: CreatePostBodyParams) => {
  const post = api
    .withMethod(HttpMethod.POST)
    .withPath("/posts")
    .withBodyParameters<CreatePostBodyParams>(body)
    .withHeaders({
      "Content-type": "application/json; charset=UTF-8",
    })
    .execute();

  return post;
};

// PUT - https://jsonplaceholder.typicode.com/posts/{index}
const updatePost = async (index: number, body: UpdatePostBodyParams) => {
  const post = api
    .withMethod(HttpMethod.PUT)
    .withPath(`/posts/${index}`)
    .withBodyParameters<UpdatePostBodyParams>(body)
    .withHeaders({
      "Content-type": "application/json; charset=UTF-8",
    })
    .execute();

  return post;
};

// Delete - https://jsonplaceholder.typicode.com/posts/{index}
const deletePost = async (index: number) => {
  // prettier-ignore
  api
    .withMethod(HttpMethod.DELETE)
    .withPath(`/posts/${index}`)
    .execute();
};
