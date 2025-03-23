# Git 運用規約

このドキュメントは、プロジェクトにおける Git の運用規約をまとめたものです。チーム全体で一貫した Git の使用方法を維持するために、以下のガイドラインに従ってください。

## ブランチ命名規則

ブランチ名は、作業の種類を示すプレフィックスと、作業内容を簡潔に表す説明を組み合わせて命名します。単語の区切りにはハイフン（`-`）を使用します。

### プレフィックス

- `feature/` - 新機能の追加
- `fix/` - バグ修正
- `refactor/` - リファクタリング（機能変更なし）
- `docs/` - ドキュメントの更新のみ
- `style/` - コードスタイルの変更（空白、フォーマット、セミコロンの追加など）
- `test/` - テストの追加・更新
- `chore/` - ビルドプロセスやツールの変更
- `perf/` - パフォーマンス改善

### 例

```
feature/user-authentication
fix/login-validation-error
docs/api-documentation
refactor/redux-store
test/user-component
```

## コミットメッセージ規約

コミットメッセージは [Conventional Commits](https://www.conventionalcommits.org/) の形式に従います。

### 基本形式

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### タイプ

- `feat:` - 新機能
- `fix:` - バグ修正
- `docs:` - ドキュメントのみの変更
- `style:` - コードの意味に影響を与えない変更（空白、フォーマット、セミコロンの追加など）
- `refactor:` - バグ修正でも機能追加でもないコード変更
- `perf:` - パフォーマンスを向上させるコード変更
- `test:` - 不足しているテストの追加や既存のテストの修正
- `build:` - ビルドシステムや外部依存関係に影響する変更
- `ci:` - CI 設定ファイルと scripts の変更
- `chore:` - その他の変更（ソースやテストの変更を含まない）
- `revert:` - 以前のコミットを元に戻す

### スコープ

スコープはタイプの後に括弧で囲んで指定します。これは変更が影響する範囲や機能を示します。

例：

- `feat(auth):`
- `fix(api):`
- `docs(readme):`

### 説明

説明は簡潔に変更内容を表し、小文字で始め、末尾にピリオドを付けません。命令形（"change" ではなく "changes"）を使用します。

### 本文

コミットの本文は、変更の動機を説明し、以前の動作と新しい動作を対比します。各行は 72 文字以内に収めます。

### フッター

フッターには Breaking Changes の情報や、解決した Issue への参照を含めます。

#### Breaking Changes

```
BREAKING CHANGE: <breaking change description>
```

#### Issue の参照

```
Fixes #123
Closes #456
```

### 例

```
feat(auth): implement JWT authentication

- Add JWT token generation and validation
- Implement refresh token mechanism
- Update user model to store tokens

BREAKING CHANGE: Authentication API endpoints now require JWT token
Closes #123
```

```
fix(ui): correct button alignment in mobile view

Buttons were misaligned on small screens due to incorrect flex properties.
```

```
docs: update README with deployment instructions

Add detailed steps for deploying to production and staging environments.
```

## マージ戦略

### プルリクエスト

- 全ての変更はプルリクエストを通じて行います
- プルリクエストは少なくとも 1 人のレビューを受ける必要があります
- CI テストが成功している必要があります
- コードレビューで指摘された問題は修正する必要があります

### マージ方法

- `main` ブランチへのマージは Squash and Merge を基本とします
- `develop` ブランチへのマージは通常の Merge を使用します
- 履歴を保持する必要がある場合は Rebase and Merge を使用します

## タグ付け

リリースごとにタグを付けます。タグ名はセマンティックバージョニング（[SemVer](https://semver.org/)）に従います。

```
v1.0.0
v1.0.1
v1.1.0
v2.0.0
```

## その他のベストプラクティス

- コミットする前に `git diff` で変更内容を確認する
- 大きな変更は小さなコミットに分割する
- 関連のない変更は別々のコミットにする
- コミットメッセージは具体的かつ明確に書く
- 機能ブランチは定期的に `main` または `develop` ブランチと同期させる
- 不要になったブランチは削除する
