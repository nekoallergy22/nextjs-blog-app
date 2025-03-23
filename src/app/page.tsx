import React from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/data/posts";
import PostList from "@/components/PostList";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">最新の投稿</h1>
        <Link
          href="/posts/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          新規投稿
        </Link>
      </div>

      <PostList posts={posts} />
    </div>
  );
}
