import { ModalWelcome, PostList } from "@/components/containers";
import { PostSection } from "@/components/containers/post/post-section";
import { useAuth } from "@/components/contexts";

export default function Home() {
  const { status, setupLogin, authData } = useAuth();

  return (
    <div className="relative">
      <PostSection />
      <ModalWelcome
        onLogin={(data) => setupLogin(data)}
        isOpen={status === "logged-out"}
      />
    </div>
  );
}
