import React from 'react';
import { IPostResponse } from '../../interfaces';
import { Button } from 'antd';
import Link from 'next/link';

interface PROPS extends IPostResponse {
  onClickEdit: (
    id: number,
    title: string,
    body: string,
    user_id: number,
  ) => void;
  onClickDelete: (id: number) => void;
}
export const PostCard = ({
  id,
  title,
  body,
  user_id,
  onClickEdit,
  onClickDelete,
}: PROPS) => {
  return (
    <article
      id={id.toString()}
      className="flex flex-col border border-zinc-300 rounded-lg p-4 space-y-4"
    >
      <section className="space-y-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p>{body.length > 100 ? `${body.slice(0, 300)}...` : body}</p>
      </section>
      <section className="grid grid-cols-12 gap-2">
        <Link
          className="col-span-8 md:col-span-6 lg:col-span-4 xl:col-span-2"
          href={`/post/${id}`}
        >
          <Button className="w-full" type="primary">
            Read more
          </Button>
        </Link>
        <Button
          id="post_edit"
          onClick={() => {
            onClickEdit(id, title, body, user_id);
          }}
          className="col-span-2 md:col-end-11 lg:col-span-2 lg:col-end-11 xl:col-span-1 xl:col-end-12"
          type="default"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
            <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
          </svg>
        </Button>
        <Button
          id="post_delete"
          onClick={() => {
            onClickDelete(id);
          }}
          className="col-span-2 md:col-end-13 lg:col-span-2 lg:col-end-13 xl:col-span-1 xl:col-end-13"
          type="default"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </Button>
      </section>
    </article>
  );
};
