import { NextRequest, NextResponse } from "next/server";
import { getPostById, updatePost, deletePost } from "@/lib/data/posts";

// GET: 特定の投稿を取得
export async function GET(request: NextRequest) {
  try {
    // URLからIDを抽出
    const pathname = request.nextUrl.pathname;
    const id = pathname.split("/").pop() || "";

    const post = await getPostById(id);

    if (!post) {
      return NextResponse.json(
        { error: "投稿が見つかりませんでした" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("投稿の取得に失敗しました:", error);
    return NextResponse.json(
      { error: "投稿の取得に失敗しました" },
      { status: 500 }
    );
  }
}

// PUT: 投稿を更新
export async function PUT(request: NextRequest) {
  try {
    // URLからIDを抽出
    const pathname = request.nextUrl.pathname;
    const id = pathname.split("/").pop() || "";

    const body = await request.json();

    // バリデーション
    if (!body.title && !body.content) {
      return NextResponse.json(
        { error: "タイトルまたは本文を指定してください" },
        { status: 400 }
      );
    }

    const updatedPost = await updatePost(id, {
      title: body.title,
      content: body.content,
    });

    if (!updatedPost) {
      return NextResponse.json(
        { error: "投稿が見つかりませんでした" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("投稿の更新に失敗しました:", error);
    return NextResponse.json(
      { error: "投稿の更新に失敗しました" },
      { status: 500 }
    );
  }
}

// DELETE: 投稿を削除
export async function DELETE(request: NextRequest) {
  try {
    // URLからIDを抽出
    const pathname = request.nextUrl.pathname;
    const id = pathname.split("/").pop() || "";

    const success = await deletePost(id);

    if (!success) {
      return NextResponse.json(
        { error: "投稿が見つかりませんでした" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("投稿の削除に失敗しました:", error);
    return NextResponse.json(
      { error: "投稿の削除に失敗しました" },
      { status: 500 }
    );
  }
}
