# Next.js 15.2.3 マイグレーション時の注意点

このドキュメントは、Next.js 15.2.3 へのアップグレード時に発生した問題と解決策をまとめたものです。今後の開発で同様の問題が発生した場合の参考にしてください。

## 1. API ルートハンドラーの問題

### 問題

`src/app/api/posts/[id]/route.ts`ファイルで以下のエラーが発生しました：

```
Type error: Route "src/app/api/posts/[id]/route.ts" has an invalid "GET" export:
  Type "{ params: { id: string; }; }" is not a valid type for the function's second argument.
```

### 原因

Next.js 15.2.3 では、API ルートハンドラーの型定義が変更されており、以前の方法では型エラーが発生します。また、`params.id`に対して不要な`await`を使用していました。

### 解決策

1. 第 2 引数を使用せず、`NextRequest`オブジェクトから URL パスを解析して ID を抽出する方法に変更：

```typescript
// 変更前
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = await params.id;
  // ...
}

// 変更後
export async function GET(request: NextRequest) {
  // URLからIDを抽出
  const pathname = request.nextUrl.pathname;
  const id = pathname.split("/").pop() || "";
  // ...
}
```

## 2. ページコンポーネントのパラメータ型の問題

### 問題

ページコンポーネント（`[id]/page.tsx`、`[id]/edit/page.tsx`、`[id]/delete/page.tsx`）で以下のエラーが発生しました：

```
Type error: Type 'DeletePostPageProps' does not satisfy the constraint 'PageProps'.
  Types of property 'params' are incompatible.
    Type '{ id: string; }' is missing the following properties from type 'Promise<any>': then catch finally [Symbol.toStringTag]
```

### 原因

Next.js 15.2.3 では、ページコンポーネントの`params`プロパティ自体が Promise となるように型定義が変更されています。以前は`params.id`が Promise でしたが、新しいバージョンでは`params`オブジェクト全体が Promise です。

### 解決策

#### サーバーコンポーネントの場合（`[id]/page.tsx`、`[id]/edit/page.tsx`）

1. `params`の型を`Promise<{ id: string }>`に変更
2. `params`オブジェクト全体を`await`してから`id`プロパティにアクセス

```typescript
// 変更前
interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const id = await params.id;
  // ...
}

// 変更後
interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  // ...
}
```

#### クライアントコンポーネントの場合（`[id]/delete/page.tsx`）

1. `params`の型を`Promise<{ id: string }>`に変更
2. `useEffect`フック内で`params`オブジェクト全体を`await`して状態変数に保存

```typescript
// 変更前
interface DeletePostPageProps {
  params: {
    id: string;
  };
}

export default function DeletePostPage({ params }: DeletePostPageProps) {
  // params.idを直接使用
  // ...
}

// 変更後
interface DeletePostPageProps {
  params: Promise<{ id: string }>;
}

export default function DeletePostPage({ params }: DeletePostPageProps) {
  const [postId, setPostId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  // postIdを使用
  // ...
}
```

## 3. ESLint エラーの対応

### 問題

未使用の変数に関する ESLint エラーが発生しました：

```
Error: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
```

### 解決策

1. 未使用の catch パラメータを完全に削除：

```typescript
// 変更前
try {
  // ...
} catch (error) {
  // errorを使用していない
  setError("IDの取得に失敗しました");
}

// 変更後
try {
  // ...
} catch {
  setError("IDの取得に失敗しました");
}
```

## まとめ

Next.js 15.2.3 では、以下の点に注意が必要です：

1. API ルートハンドラーでは、第 2 引数の型定義が変更されている
2. ページコンポーネントでは、`params`オブジェクト自体が Promise となる
3. サーバーコンポーネントとクライアントコンポーネントで、Promise の解決方法が異なる
4. 不要な`await`の使用に注意する（`params.id`が文字列の場合など）
5. ESLint の未使用変数に関するルールが厳格

これらの点に注意することで、Next.js 15.2.3 での開発をスムーズに進めることができます。
