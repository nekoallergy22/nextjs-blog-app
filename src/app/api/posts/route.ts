import { NextRequest, NextResponse } from "next/server";
import { createPost, getAllPosts } from "@/lib/data/posts";

// GET: 全ての投稿を取得
export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("投稿の取得に失敗しました:", error);
    return NextResponse.json(
      { error: "投稿の取得に失敗しました" },
      { status: 500 }
    );
  }
}

// POST: 新しい投稿を作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // バリデーション
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "タイトルと本文は必須です" },
        { status: 400 }
      );
    }

    const newPost = await createPost({
      title: body.title,
      content: body.content,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("投稿の作成に失敗しました:", error);
    return NextResponse.json(
      { error: "投稿の作成に失敗しました" },
      { status: 500 }
    );
  }
}
