import { ApiBuilder } from "../../src";
import { HttpMethod, HttpSchema } from "../../src/enums/enums";

// Resource:
// https://rickandmortyapi.com

const api = new ApiBuilder()
  .withScheme(HttpSchema.HTTPS)
  .withHost("rickandmortyapi.com/api");

// GET - https://rickandmortyapi.com/api/character
const getCharacters = async () => {
  const characters = api
    .withMethod(HttpMethod.GET)
    .withPath("/character")
    .execute();

  return characters;
};

// GET - https://rickandmortyapi.com/api/character/{id}
const getCharacter = async (id: number) => {
  const character = api
    .withMethod(HttpMethod.GET)
    .withPath(`/character/${id}`)
    .execute();

  return character;
};
