import React from "react";
import { IPostResponse } from "../../interfaces";
import { Button } from "antd";
import Link from "next/link";

export const PostCard = ({ id, title, body }: IPostResponse) => {
  return (
    <article className="flex flex-col border border-zinc-300 rounded-lg p-4 space-y-4">
      <section className="space-y-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p>{body.length > 100 ? `${body.slice(0, 100)}...` : body}</p>
      </section>
      <section>
        <Link href={`/post/${id}`}>
          <Button className="w-full" type="default">
            Read more
          </Button>
        </Link>
      </section>
    </article>
  );
};
