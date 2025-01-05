import { PostDetailArticle } from "@/components/containers";
import { AuthorInformationCard } from "@/components/containers/post/author-information-card";
import {
  IPostCommentResponse,
  IPostResponse,
  IUserResponse,
} from "@/components/interfaces";
import { useQuery } from "@tanstack/react-query";
import { Button, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: postDetailData,
    isPending: postDetailIsPending,
    isError: postDetailIsError,
    isSuccess: postDetailIsSuccess,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`
      );
      return response.data as IPostResponse;
    },
    enabled: !!id,
  });

  const {
    data: userData,
    isPending: userIsPending,
    isError: userIsError,
    isSuccess: userIsSuccess,
  } = useQuery({
    queryKey: ["user", postDetailIsSuccess],
    queryFn: async () => {
      const response = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${
          postDetailData?.user_id || 0
        }`
      );
      return response.data as IUserResponse;
    },
    enabled: postDetailIsSuccess,
  });

  const {
    data: commentsData,
    isPending: commentsIsPending,
    isError: commentsIsError,
    isSuccess: commentsIsSuccess,
  } = useQuery({
    queryKey: ["comments", postDetailIsSuccess],
    queryFn: async () => {
      const response = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/comments`
      );
      return response.data as IPostCommentResponse[];
    },
    enabled: postDetailIsSuccess,
  });

  const defineContent = useMemo(() => {
    if (postDetailIsPending || userIsPending || commentsIsPending) {
      return <Spin className="flex justify-center" size="large" />;
    }
    if (postDetailIsError || userIsError || commentsIsError) {
      return <div className="flex justify-center">Something went wrong...</div>;
    }
    if (postDetailIsSuccess && userIsSuccess && commentsIsSuccess) {
      return (
        <section className="space-y-6">
          <PostDetailArticle
            author={userData.name}
            body={postDetailData.body}
            title={postDetailData.title}
          />
          <div className="border border-zinc-100"></div>
          <div className="space-y-4">
            <h3 className="font-semibold text-base">
              Comments ({commentsData.length})
            </h3>
            <ul className="space-y-2">
              {commentsData.map((comment) => (
                <li key={comment.id}>
                  <p>
                    <span className="font-medium">{comment.name}: </span>
                    <span>{comment.body}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-zinc-100"></div>
          <div className="border border-zinc-300 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-base">Author Information</h3>
            <AuthorInformationCard
              email={userData.email}
              author={userData.name}
              gender={userData.gender}
              status={userData.status}
            />
          </div>
        </section>
      );
    }
  }, [
    commentsData,
    commentsIsError,
    commentsIsPending,
    commentsIsSuccess,
    postDetailData?.body,
    postDetailData?.title,
    postDetailIsError,
    postDetailIsPending,
    postDetailIsSuccess,
    userData?.email,
    userData?.gender,
    userData?.name,
    userData?.status,
    userIsError,
    userIsPending,
    userIsSuccess,
  ]);

  return (
    <div className="space-y-6">
      <section>
        <Button
          className="p-0"
          size="large"
          type="text"
          onClick={() => router.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
          <span>Back to homepage</span>
        </Button>
      </section>
      {defineContent}
    </div>
  );
}
