import React, { useEffect, useRef, useState } from "react";
import { IPostResponse } from "../../interfaces";
import { PostCard } from "./post-card";
import { Button, Input, Select } from "antd";

interface PROPS {
  posts: IPostResponse[];
}
export const PostList = (props: PROPS) => {
  const [filter, setFilter] = useState<{
    search: string;
    sort: "title" | "body" | undefined;
  }>({
    search: "",
    sort: undefined,
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilter((prev) => ({ ...prev, search }));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

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
        <Button type="primary" size="large" className="col-span-3">
          Create post
        </Button>
      </section>
      <section className="space-y-4">
        {props.posts
          .filter((item) => {
            if (filter.search) {
              if (filter.sort === "title") {
                return item.title
                  .toLowerCase()
                  .includes(filter.search.toLowerCase());
              }
              if (filter.sort === "body") {
                return item.body
                  .toLowerCase()
                  .includes(filter.search.toLowerCase());
              }
              return (
                item.title
                  .toLowerCase()
                  .includes(filter.search.toLowerCase()) ||
                item.body.toLowerCase().includes(filter.search.toLowerCase())
              );
            }
            return true;
          })
          .map((post, index) => (
            <PostCard {...post} key={index} />
          ))}
      </section>
    </div>
  );
};
