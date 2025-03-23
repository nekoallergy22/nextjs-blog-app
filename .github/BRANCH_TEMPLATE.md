# ブランチ命名テンプレート

このファイルは、プロジェクトで使用するブランチ名のテンプレートを提供します。

## 基本形式

```
<type>/<description>
```

## タイプ

- `feature` - 新機能の追加
- `fix` - バグ修正
- `refactor` - リファクタリング
- `docs` - ドキュメントの更新
- `style` - コードスタイルの変更
- `test` - テストの追加・更新
- `chore` - ビルドプロセスやツールの変更
- `perf` - パフォーマンス改善

## 説明

説明は作業内容を簡潔に表し、単語の区切りにはハイフン（`-`）を使用します。

## 例

```
feature/user-authentication
fix/login-validation-error
docs/api-documentation
refactor/redux-store
test/user-component
```

## 注意事項

- ブランチ名は簡潔かつ説明的にしてください
- 関連する Issue がある場合は、Issue 番号を含めることを検討してください（例：`feature/user-auth-issue-123`）
- 特殊文字、スペース、日本語は避けてください
- 全て小文字を使用してください
