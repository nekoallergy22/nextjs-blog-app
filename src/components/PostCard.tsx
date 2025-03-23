import React from "react";
import Link from "next/link";
import { Post } from "@/lib/data/posts";
import Card, { CardBody, CardFooter } from "@/components/ui/Card";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // 日付をフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 本文の一部を表示（最初の100文字）
  const excerpt =
    post.content.length > 100
      ? `${post.content.substring(0, 100)}...`
      : post.content;

  return (
    <Card className="h-full flex flex-col">
      <CardBody className="flex-grow">
        <Link href={`/posts/${post.id}`} className="block">
          <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 mb-4">{excerpt}</p>
      </CardBody>
      <CardFooter className="text-sm text-gray-500">
        <div className="flex justify-between w-full">
          <span>投稿日: {formatDate(post.createdAt)}</span>
          {post.updatedAt !== post.createdAt && (
            <span>更新日: {formatDate(post.updatedAt)}</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
