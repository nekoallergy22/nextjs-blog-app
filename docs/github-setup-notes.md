# GitHub リポジトリセットアップ手順と注意点

このドキュメントは、Next.js プロジェクトを GitHub にセットアップする際の手順と、発生した問題点およびその解決策をまとめたものです。

## 実施した手順

1. **Git リポジトリの初期化**

   ```bash
   git init
   ```

2. **.gitignore ファイルの作成**

   ```bash
   # .gitignore ファイルを作成し、Next.js プロジェクト用の除外ファイルを設定
   ```

3. **GitHub リポジトリの作成**

   ```bash
   gh repo create nextjs-blog-app --public --description "Next.js 15 blog application with TypeScript and Tailwind CSS"
   ```

4. **リモートリポジトリの設定**

   ```bash
   git remote add origin https://github.com/sktrm-yz/nextjs-blog-app.git
   ```

5. **ブランチ構造の作成**

   ```bash
   git checkout -b main
   git checkout -b develop
   ```

6. **論理的なコミット管理**

   ```bash
   # 設定ファイル
   git add .gitignore next.config.ts package.json package-lock.json tsconfig.json eslint.config.mjs postcss.config.mjs tailwind.config.js .clinerules
   git commit -m "chore: initialize project configuration files"

   # ドキュメント
   git add README.md docs/
   git commit -m "docs: add project documentation and design files"

   # 公開アセット
   git add public/
   git commit -m "feat: add public assets and icons"

   # コアアプリケーション
   git add src/app/favicon.ico src/app/globals.css src/app/layout.tsx src/app/page.tsx
   git commit -m "feat: add core application structure and layout"

   # API ルート
   git add src/app/api/
   git commit -m "feat: implement API routes for posts"

   # ページルート
   git add src/app/posts/
   git commit -m "feat: add post pages for viewing, editing, creating and deleting"

   # UI コンポーネント
   git add src/components/ui/
   git commit -m "feat: add reusable UI components"

   # メインコンポーネント
   git add src/components/Footer.tsx src/components/Header.tsx src/components/MarkdownRenderer.tsx src/components/PostCard.tsx src/components/PostForm.tsx src/components/PostList.tsx
   git commit -m "feat: add main application components"

   # データレイヤー
   git add data/ src/lib/
   git commit -m "feat: add data layer and sample posts"
   ```

7. **認証の設定**

   ```bash
   gh auth login
   ```

8. **リモートリポジトリの更新**

   ```bash
   git remote set-url origin https://github.com/nekoallergy22/nextjs-blog-app.git
   ```

9. **ブランチのプッシュ**

   ```bash
   git push -u origin develop
   git checkout -b main
   git push -u origin main
   ```

10. **機能ブランチの作成とプルリクエスト**

    ```bash
    git checkout -b feature/readme-update
    # README.md を編集
    git add README.md
    git commit -m "docs: update README with project features"
    git push -u origin feature/readme-update
    gh pr create --title "READMEの機能セクション追加" --body "READMEに機能セクションを追加し、プロジェクトの概要を充実させました。" --base main --head feature/readme-update
    ```

11. **デフォルトブランチの修正**
    ```bash
    gh repo edit --default-branch main
    ```

## 発生した問題: デフォルトブランチの設定ミス

### 問題の内容

GitHub リポジトリを作成した際、`develop` ブランチが最初にプッシュされたブランチだったため、GitHub はこれをデフォルトブランチとして自動的に設定しました。これにより、以下の問題が発生しました：

1. プルリクエストのデフォルトのターゲットブランチが `develop` になっていた
2. GitHub 上でのリポジトリ表示が `develop` ブランチの内容になっていた
3. `main` ブランチが本来の役割（本番環境用のコードを管理する）を果たせていなかった

### 原因

この問題が発生した主な原因は以下の点です：

1. **ブランチの作成順序と初回プッシュ**：

   - 最初に `develop` ブランチを作成し、そのブランチで全てのコミットを行った
   - `develop` ブランチを最初に GitHub にプッシュした
   - GitHub は最初にプッシュされたブランチをデフォルトブランチとして自動設定する

2. **明示的なデフォルトブランチ設定の欠如**：
   - リポジトリ作成時にデフォルトブランチを明示的に指定しなかった
   - `main` ブランチをプッシュする前にデフォルトブランチ設定を確認・変更しなかった

### 解決策

問題を解決するために、以下の手順を実行しました：

1. **現在のデフォルトブランチの確認**：

   ```bash
   gh repo view --json defaultBranchRef
   ```

2. **デフォルトブランチの変更**：

   ```bash
   gh repo edit --default-branch main
   ```

3. **変更の確認**：
   ```bash
   gh repo view --json defaultBranchRef
   ```

## 今後の推奨手順

同様の問題を避けるために、以下の手順を推奨します：

1. **リポジトリ作成時の明示的な設定**：

   ```bash
   # リポジトリ作成時にデフォルトブランチを指定
   gh repo create [リポジトリ名] --public --default-branch main
   ```

2. **ブランチの作成順序**：

   - 最初に `main` ブランチを作成し、基本的な初期コミットを行う
   - `main` ブランチを最初に GitHub にプッシュする
   - その後、`develop` や機能ブランチを作成する

3. **プッシュ前の確認**：

   ```bash
   # 現在のブランチを確認
   git branch

   # リモートリポジトリの設定を確認
   git remote -v
   ```

4. **リポジトリ設定の確認**：

   ```bash
   # リポジトリのプッシュ後、デフォルトブランチを確認
   gh repo view --json defaultBranchRef

   # 必要に応じてデフォルトブランチを変更
   gh repo edit --default-branch main
   ```

5. **ブランチ保護の設定**：
   ```bash
   # main ブランチの保護設定（Web UI から設定することも可能）
   # 以下は GitHub API を使用した例（実際の構文は GitHub API のバージョンによって異なる場合があります）
   gh api repos/[ユーザー名]/[リポジトリ名]/branches/main/protection --method PUT -f required_status_checks='{"strict":true}' -f required_pull_request_reviews='{"required_approving_review_count":1}'
   ```

## まとめ

GitHub リポジトリのセットアップ時には、特にデフォルトブランチの設定に注意が必要です。最初にプッシュするブランチが自動的にデフォルトブランチとして設定されるため、意図したブランチ構造を実現するためには、明示的な設定と確認が重要です。

また、リポジトリ作成時に `--default-branch` オプションを使用することで、最初から正しいデフォルトブランチを設定することができます。これにより、後から修正する手間を省くことができます。
