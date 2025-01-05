import React, { useCallback, useMemo, useState } from "react";
import { PostList } from "./post-list";
import { IPostResponse } from "../../interfaces";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Pagination, Select, Spin } from "antd";

export const PostSection = () => {
  const [filter, setFilter] = useState<{
    search: string;
    sort: "title" | "body" | undefined;
  }>({
    search: "",
    sort: undefined,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });

  const fetchData = useCallback(async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/posts",
      {
        params: {
          page: pagination.page,
          per_page: pagination.limit,
          [filter.sort === "title" ? "title" : "body"]: filter.search,
        },
      }
    );
    return response.data as IPostResponse[];
  }, [filter.search, filter.sort, pagination.limit, pagination.page]);

  const { data, isPending, isError } = useQuery({
    queryKey: [
      "posts",
      pagination.limit,
      pagination.page,
      filter.search,
      filter.sort,
    ],
    queryFn: async () => fetchData(),
    placeholderData: keepPreviousData,
  });

  const defineContent = useMemo(() => {
    if (isPending) {
      return <Spin className="flex justify-center" size="large" />;
    }
    if (isError) {
      return <div className="flex justify-center">Something went wrong...</div>;
    }
    return (
      <>
        <PostList filter={filter} setFilter={setFilter} posts={data} />
        {data.length > 4 ? (
          <section className="flex justify-center">
            <Button
              loading={isPending}
              onClick={() => {
                setPagination((prev) => ({ ...prev, limit: prev.limit + 5 }));
              }}
              size="large"
              className="w-full"
              type="dashed"
            >
              Load more
            </Button>
          </section>
        ) : null}
      </>
    );
  }, [data, filter, isError, isPending]);

  return <div className="space-y-6">{defineContent}</div>;
};
