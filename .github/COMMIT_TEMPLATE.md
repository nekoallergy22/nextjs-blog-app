# コミットメッセージテンプレート

このファイルは、プロジェクトで使用するコミットメッセージのテンプレートを提供します。

## 基本形式

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## タイプ

以下のタイプから適切なものを選択してください：

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

## スコープ（オプション）

変更が影響する範囲や機能を示します。例：

- `feat(auth):`
- `fix(api):`
- `docs(readme):`

## 説明

- 変更内容を簡潔に表す
- 小文字で始める
- 末尾にピリオドを付けない
- 命令形を使用する（"change" ではなく "changes"）

## 本文（オプション）

- 変更の動機を説明する
- 以前の動作と新しい動作を対比する
- 各行は 72 文字以内に収める

## フッター（オプション）

Breaking Changes の情報や、解決した Issue への参照を含めます。

### Breaking Changes

```
BREAKING CHANGE: <breaking change description>
```

### Issue の参照

```
Fixes #123
Closes #456
```

## 例

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

## Git コマンドでテンプレートを使用する方法

このテンプレートを Git のコミットテンプレートとして設定するには、以下のコマンドを実行します：

```bash
git config --local commit.template .github/COMMIT_TEMPLATE.md
```

または、コミットメッセージを作成する際に以下のコマンドを使用します：

```bash
git commit -t .github/COMMIT_TEMPLATE.md
```
