export interface IPostResponse {
  id: number;
  user_id: number;
  title: string;
  body: string;
}
export interface IpostDetailResponse extends IPostResponse {}

export interface IPostCommentResponse {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}
