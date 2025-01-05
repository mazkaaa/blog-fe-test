import React from "react";

interface PROPS {
  title: string;
  author: string;
  body: string;
}
export const PostDetailArticle = ({ author, body, title }: PROPS) => {
  return (
    <article className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{title}</h2>
        <h4 className="text-base">Written by {author}</h4>
      </div>
      <div>
        <p>{body}</p>
      </div>
    </article>
  );
};
