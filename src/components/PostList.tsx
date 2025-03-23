import React from "react";
import { Post } from "@/lib/data/posts";
import PostCard from "@/components/PostCard";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">
          投稿がありません。新しい投稿を作成してください。
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post.id} className="h-full">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
