import React, { useEffect, useRef, useState } from "react";
import { IModalForm, IPostResponse } from "../../interfaces";
import { PostCard } from "./post-card";
import { Button, Input, message, Modal, Select } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/components/contexts";

interface PROPS {
  posts: IPostResponse[];
  filter: {
    search: string;
    sort: "title" | "body" | undefined;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      search: string;
      sort: "title" | "body" | undefined;
    }>
  >;
}
export const PostList = ({ filter, setFilter, posts }: PROPS) => {
  const [search, setSearch] = useState("");
  const [modalForm, setModalForm] = useState<IModalForm>({
    isOpen: false,
    type: "add",
  });
  const [modal, modalContext] = Modal.useModal();
  const [messageApi, messageContext] = message.useMessage();
  const { authData } = useAuth();

  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending: isDeletePending } = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      });
    },
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilter((prev) => ({ ...prev, search }));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, setFilter]);

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-3 gap-4">
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          size="large"
          placeholder="Search post..."
          className="col-span-2"
        />
        <Select
          size="large"
          options={[
            { label: "Title", value: "title" },
            { label: "Content", value: "body" },
          ]}
          placeholder="Sort by"
          value={filter.sort}
          onChange={(value) => {
            setFilter((prev) => ({ ...prev, sort: value }));
          }}
          className="col-span-1"
        />
        <Button
          onClick={() => {
            setModalForm({
              isOpen: true,
              type: "add",
            });
          }}
          type="primary"
          size="large"
          className="col-span-3"
        >
          Create post
        </Button>
      </section>
      <section className="space-y-4">
        {posts.map((post, index) => (
          <PostCard
            {...post}
            onClickDelete={async (id) => {
              modal.confirm({
                title: "Are you sure you want to delete this post?",
                content: "This action cannot be undone",
                onOk: () => {
                  deletePost(id, {
                    onSuccess: () => {
                      message.success("Post deleted successfully");
                      queryClient.invalidateQueries({ queryKey: ["posts"] });
                    },
                    onError: (err: any) => {
                      message.error(
                        err?.response?.data?.message || "Failed to delete post"
                      );
                    },
                  });
                },
              });
            }}
            onClickEdit={(id, title, body, user_id) => {}}
            key={index}
          />
        ))}
      </section>
      {modalContext}
      {messageContext}
    </div>
  );
};
