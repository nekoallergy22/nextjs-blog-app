# ミニマム Blog アプリ 設計書

## 要件定義書

### 概要

シンプルでミニマムなブログアプリケーションを開発します。ユーザーは記事の閲覧、投稿、編集、削除ができます。

### 機能要件

1. **記事一覧表示**

   - トップページに記事一覧を表示
   - 記事タイトル、投稿日時、概要を表示
   - 新着順にソート

2. **記事詳細表示**

   - 記事のタイトル、本文、投稿日時を表示
   - マークダウン形式での本文表示をサポート

3. **記事投稿**

   - タイトル、本文を入力して記事を投稿
   - マークダウンエディタを使用

4. **記事編集**

   - 既存記事の編集機能
   - タイトル、本文の更新

5. **記事削除**
   - 既存記事の削除機能
   - 削除前の確認ダイアログ

### 非機能要件

1. **パフォーマンス**

   - ページロード時間を最小限に抑える
   - Server Component と Client Component の適切な使い分け

2. **UI/UX**

   - レスポンシブデザイン
   - シンプルで直感的なインターフェース

3. **アクセシビリティ**
   - 基本的なアクセシビリティ対応

## 設計書

### システム概略

- フロントエンド: Next.js 15.2.3 (App Router)
- スタイリング: Tailwind CSS
- アイコン: Heroicons
- 開発環境: Docker / Docker Compose
- データ保存: ローカル JSON ファイル（シンプルさを重視）

### 機能設計

#### 記事データモデル

```typescript
interface Post {
  id: string; // 記事ID（UUID）
  title: string; // 記事タイトル
  content: string; // 記事本文（マークダウン）
  createdAt: string; // 作成日時（ISO形式）
  updatedAt: string; // 更新日時（ISO形式）
}
```

#### API 設計

- `GET /api/posts` - 記事一覧取得
- `GET /api/posts/[id]` - 特定の記事取得
- `POST /api/posts` - 記事作成
- `PUT /api/posts/[id]` - 記事更新
- `DELETE /api/posts/[id]` - 記事削除

### コンポーネント構成

#### ページコンポーネント

- `app/page.tsx` - トップページ（記事一覧）
- `app/posts/[id]/page.tsx` - 記事詳細ページ
- `app/posts/new/page.tsx` - 記事作成ページ
- `app/posts/[id]/edit/page.tsx` - 記事編集ページ

#### UI コンポーネント

- `components/ui/Button.tsx` - ボタンコンポーネント
- `components/ui/Card.tsx` - カードコンポーネント
- `components/ui/Input.tsx` - 入力フィールドコンポーネント
- `components/ui/TextArea.tsx` - テキストエリアコンポーネント

#### 機能コンポーネント

- `components/PostList.tsx` - 記事一覧表示コンポーネント
- `components/PostCard.tsx` - 記事カードコンポーネント
- `components/PostForm.tsx` - 記事投稿/編集フォームコンポーネント
- `components/MarkdownEditor.tsx` - マークダウンエディタコンポーネント
- `components/MarkdownRenderer.tsx` - マークダウンレンダラーコンポーネント

#### レイアウトコンポーネント

- `app/layout.tsx` - ルートレイアウト
- `components/Header.tsx` - ヘッダーコンポーネント
- `components/Footer.tsx` - フッターコンポーネント

## データフロー図

```mermaid
graph TD
    A[ユーザー] -->|記事一覧閲覧| B[トップページ]
    A -->|記事詳細閲覧| C[記事詳細ページ]
    A -->|記事投稿| D[記事作成ページ]
    A -->|記事編集| E[記事編集ページ]

    B -->|記事データ取得| F[API: GET /api/posts]
    C -->|記事詳細取得| G[API: GET /api/posts/[id]]
    D -->|記事保存| H[API: POST /api/posts]
    E -->|記事更新| I[API: PUT /api/posts/[id]]
    E -->|記事削除| J[API: DELETE /api/posts/[id]]

    F -->|データ読み込み| K[JSONファイル]
    G -->|データ読み込み| K
    H -->|データ書き込み| K
    I -->|データ書き込み| K
    J -->|データ削除| K
```

## 開発計画

1. プロジェクト初期化とベース設定

   - Next.js プロジェクト作成
   - Tailwind CSS 設定
   - Docker 環境構築

2. コアコンポーネント実装

   - UI コンポーネント
   - レイアウトコンポーネント

3. API エンドポイント実装

   - JSON ファイルを使用したデータ操作

4. ページコンポーネント実装

   - 記事一覧ページ
   - 記事詳細ページ
   - 記事作成/編集ページ

5. 機能テスト

   - 各機能の動作確認

6. UI/UX 改善
   - レスポンシブデザイン調整
   - アクセシビリティ対応
