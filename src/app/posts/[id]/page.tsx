import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/data/posts";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Button from "@/components/ui/Button";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  // 日付をフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          記事一覧に戻る
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-md p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="text-sm text-gray-500">
            <p>投稿日: {formatDate(post.createdAt)}</p>
            {post.updatedAt !== post.createdAt && (
              <p>更新日: {formatDate(post.updatedAt)}</p>
            )}
          </div>
        </header>

        <div className="prose max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>

        <div className="mt-8 flex space-x-4">
          <Link href={`/posts/${post.id}/edit`}>
            <Button>編集</Button>
          </Link>
          <Link href={`/posts/${post.id}/delete`}>
            <Button variant="danger">削除</Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
