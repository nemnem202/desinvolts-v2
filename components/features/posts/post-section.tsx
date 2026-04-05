import { useState } from "react";
import ButtonMinus from "@/components/ui/buttonMinus";
import ButtonPlus from "@/components/ui/buttonPlus";
import { Dialog } from "@/components/ui/dialog";
import { useAdmin } from "@/providers/adminProvider";
import { usePageState } from "@/providers/stateProvider";
import { HomePageContext } from "@/types/contexts";
import type { PostData } from "@/types/db";
import Post from "./post";
import PostForm from "./post-form";

export default function PostsSection() {
  const { pageContext, update } = usePageState(HomePageContext);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { isAdminDisplay } = useAdmin();

  const handlePostsChange = (newPost: PostData) => {
    const newPosts = pageContext.state.posts.map((post) => {
      if (post.id === newPost.id) {
        post = newPost;
      }
      return post;
    });
    update("posts", newPosts);
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
        <PostForm
          setDialogOpen={setDialogOpen}
          onPost={(post) => update("posts", [...pageContext.state.posts, post])}
        />
      </Dialog>
      <div className="flex flex-col">
        {pageContext.state.posts
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .map((post, index) => (
            <div className="relative" key={index}>
              <Post
                props={post}
                onChange={(e) => handlePostsChange(e)}
                borderBottom={index !== pageContext.state.posts.length - 1}
              />
              {isAdminDisplay && (
                <div className="absolute flex items-center -right-8 top-4">
                  <ButtonMinus
                    onClick={() =>
                      update("posts", [...pageContext.state.posts.filter((p) => p.id !== post.id)])
                    }
                  />
                </div>
              )}
            </div>
          ))}
        {isAdminDisplay && (
          <div className="mx-auto w-min">
            <ButtonPlus onClick={() => setDialogOpen(true)} />
          </div>
        )}
      </div>
    </>
  );
}
