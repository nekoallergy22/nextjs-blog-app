"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface DeletePostPageProps {
  params: Promise<{ id: string }>;
}

export default function DeletePostPage({ params }: DeletePostPageProps) {
  const router = useRouter();
  const [postId, setPostId] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // クライアントコンポーネントでPromiseを解決
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setPostId(resolvedParams.id);
        setIsLoading(false);
      } catch {
        setError("IDの取得に失敗しました");
        setIsLoading(false);
      }
    };

    resolveParams();
  }, [params]);

  const handleDelete = async () => {
    if (!postId) return;

    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "削除に失敗しました");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "削除に失敗しました");
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div className="max-w-4xl mx-auto p-6">読み込み中...</div>;
  }

  if (error && !postId) {
    return <div className="max-w-4xl mx-auto p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href={`/posts/${postId}`}
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
          記事に戻る
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">記事の削除</h1>

        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-800">
            この操作は取り消せません。本当にこの記事を削除しますか？
          </p>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="flex space-x-4">
          <Link href={`/posts/${postId}`}>
            <Button variant="secondary">キャンセル</Button>
          </Link>
          <Button
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            削除する
          </Button>
        </div>
      </div>
    </div>
  );
}
