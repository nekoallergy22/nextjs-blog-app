import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// データファイルのパス
const DATA_DIR = path.join(process.cwd(), "data");
const POSTS_FILE = path.join(DATA_DIR, "posts.json");

// Postインターフェース
export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// データディレクトリが存在しない場合は作成
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// データファイルが存在しない場合は空の配列で初期化
if (!fs.existsSync(POSTS_FILE)) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify([], null, 2));
}

// 全ての投稿を取得
export async function getAllPosts(): Promise<Post[]> {
  try {
    const data = fs.readFileSync(POSTS_FILE, "utf8");
    const posts: Post[] = JSON.parse(data);
    return posts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("投稿の取得に失敗しました:", error);
    return [];
  }
}

// IDで投稿を取得
export async function getPostById(id: string): Promise<Post | null> {
  try {
    const posts = await getAllPosts();
    return posts.find((post) => post.id === id) || null;
  } catch (error) {
    console.error(`ID: ${id} の投稿の取得に失敗しました:`, error);
    return null;
  }
}

// 新しい投稿を作成
export async function createPost(postData: {
  title: string;
  content: string;
}): Promise<Post> {
  try {
    const posts = await getAllPosts();
    const newPost: Post = {
      id: uuidv4(),
      title: postData.title,
      content: postData.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    posts.push(newPost);
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));

    return newPost;
  } catch (error) {
    console.error("投稿の作成に失敗しました:", error);
    throw new Error("投稿の作成に失敗しました");
  }
}

// 投稿を更新
export async function updatePost(
  id: string,
  postData: { title?: string; content?: string }
): Promise<Post | null> {
  try {
    const posts = await getAllPosts();
    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      return null;
    }

    const updatedPost: Post = {
      ...posts[postIndex],
      ...postData,
      updatedAt: new Date().toISOString(),
    };

    posts[postIndex] = updatedPost;
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));

    return updatedPost;
  } catch (error) {
    console.error(`ID: ${id} の投稿の更新に失敗しました:`, error);
    throw new Error("投稿の更新に失敗しました");
  }
}

// 投稿を削除
export async function deletePost(id: string): Promise<boolean> {
  try {
    const posts = await getAllPosts();
    const filteredPosts = posts.filter((post) => post.id !== id);

    if (filteredPosts.length === posts.length) {
      return false; // 削除する投稿が見つからなかった
    }

    fs.writeFileSync(POSTS_FILE, JSON.stringify(filteredPosts, null, 2));
    return true;
  } catch (error) {
    console.error(`ID: ${id} の投稿の削除に失敗しました:`, error);
    throw new Error("投稿の削除に失敗しました");
  }
}
