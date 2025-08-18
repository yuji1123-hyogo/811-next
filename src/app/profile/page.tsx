// プロフィールページ（Static Generation）

// TODO: ユーザー統計データを取得する関数を実装
async function getUserProfile() {
  // ヒント: 静的なユーザーデータを返す
  // ヒント: id, name, email, joinedDate, taskCountを含むオブジェクト
  // ヒント: 実際のアプリではAPIやDBから取得
  return {
    id: "user-1",
    name: "田中 太郎",
    email: "tanaka@example.com",
    bio: "Next.js と TypeScript を愛用するフロントエンドエンジニアです。",
    joinedDate: "2024-01-15",
    taskCount: 24,
  };
}

export default async function ProfilePage() {
  // TODO: getUserProfile()を呼び出してデータを取得
  const profile = await getUserProfile();

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">プロフィール</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左側: ユーザー情報表示（Server Component） */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            ユーザー情報
          </h2>

          {/* TODO: ユーザー情報を表示 */}
          {/* ヒント: profile.name, profile.email, profile.joinedDate */}
          {/* ヒント: 登録日は new Date(profile.joinedDate).toLocaleDateString() で表示 */}

          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">名前: </span>
              {/* TODO: 名前を表示 */}
              {profile.name}
            </div>
            <div>
              <span className="font-medium text-gray-700">メール: </span>
              {/* TODO: メールアドレスを表示 */}
              {profile.email}
            </div>
            <div>
              <span className="font-medium text-gray-700">登録日: </span>
              {/* TODO: 登録日を表示 */}
              {new Date(profile.joinedDate).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium text-gray-700">総タスク数: </span>
              {/* TODO: タスク数を表示 */}
              {profile.taskCount}
            </div>
          </div>
        </div>

        {/* 右側: プロフィール編集フォーム（Client Component） */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            プロフィール編集
          </h2>
          {/* TODO: ProfileFormコンポーネントを配置 */}
          {/* ヒント: initialData propsでprofileデータを渡す */}
          ProfileForm Component
        </div>
      </div>
    </div>
  );
}

// TODO: 静的生成を強制する設定を追加
// ヒント: export const dynamic = '設定値';
export const dynamic = "force-static";
