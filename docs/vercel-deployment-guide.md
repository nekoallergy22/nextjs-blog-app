# Vercel デプロイガイド

このドキュメントでは、Next.js アプリケーションを Vercel にデプロイする手順を説明します。

## デプロイ手順

### 1. Vercel CLI のインストール

まず、Vercel CLI をグローバルにインストールします。

```bash
npm install -g vercel
```

### 2. Vercel アカウントにログイン

CLI から Vercel アカウントにログインします。

```bash
vercel login
```

ブラウザが起動し、GitHub などのアカウントで Vercel にログインするよう促されます。

### 3. プロジェクトのデプロイ

Next.js プロジェクトのルートディレクトリで以下のコマンドを実行します。

```bash
vercel
```

初回実行時は、以下のような設定を聞かれます：

- プロジェクトのセットアップと展開の確認
- プロジェクトを含めるスコープの選択
- 既存のプロジェクトとのリンク（新規の場合は「no」）
- プロジェクト名の設定
- コードが配置されているディレクトリの指定
- 自動検出されたプロジェクト設定の確認

### 4. 本番環境へのデプロイ

プレビュー環境ではなく本番環境に直接デプロイしたい場合は、以下のコマンドを使用します：

```bash
vercel --prod
```

## デプロイ情報（2025 年 3 月 23 日実施）

- **プロジェクト名**: nextjs-blog-app
- **本番環境 URL**: https://nextjs-blog-5m1oa7pb5-takaliates-projects.vercel.app
- **Vercel ダッシュボード**: https://vercel.com/takaliates-projects/nextjs-blog-app

## 今後の更新方法

プロジェクトに変更を加えた後、再度デプロイするには以下のコマンドを実行します：

```bash
vercel --prod
```

これにより、最新の変更が本番環境に反映されます。

## 設定の変更

ドメインやビルドコマンドなどの設定を変更する場合は、Vercel ダッシュボードの設定ページにアクセスしてください：
https://vercel.com/takaliates-projects/nextjs-blog-app/settings

## 環境変数の設定

環境変数を設定する必要がある場合は、以下のコマンドを使用できます：

```bash
vercel env add [環境変数名]
```

または、Vercel ダッシュボードの「Settings」→「Environment Variables」から設定することもできます。

## GitHub との連携

GitHub リポジトリと Vercel を連携させると、プッシュやプルリクエストごとに自動的にデプロイが行われます。
これは、Vercel ダッシュボードの「Settings」→「Git」から設定できます。
