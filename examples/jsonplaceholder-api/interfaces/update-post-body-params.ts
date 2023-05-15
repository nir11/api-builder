import { CreatePostBodyParams } from "./create-post-body-params";

export interface UpdatePostBodyParams extends CreatePostBodyParams {
  id: number;
}
