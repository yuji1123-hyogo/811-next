// // Client Component - プロフィール編集フォーム
// // TODO: "use client"ディレクティブを追加

// import { useActionState } from "react";

// interface ProfileData {
//   id: string;
//   name: string;
//   email: string;
//   bio?: string;
// }

// interface ProfileFormProps {
//   initialData: ProfileData;
// }

// // TODO: Server Actionを実装（updateProfile）
// // ヒント: "use server"ファイルに実装し、ここでimport
// // ヒント: async function updateProfile(prevState, formData): Promise<ActionResult>
// // ヒント: FormDataからname, email, bioを取得
// // ヒント: バリデーション後、成功/エラーメッセージを返す
// async function updateProfile(prevState: any, formData: FormData) {
//   // この関数は実際にはactions/profile-actions.tsに実装する
//   // ここでは仮の実装
//   return { success: true, message: "更新しました" };
// }

// export default function ProfileForm({ initialData }: ProfileFormProps) {
//   // TODO: useActionStateを使用してフォーム状態を管理
//   // ヒント: useActionState(updateProfile, { success: false, message: '', errors: {} })

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <form action={/* TODO: formActionを設定 */} className="space-y-4">
//         {/* 名前フィールド */}
//         <div>
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             名前 *
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             required
//             defaultValue={initialData.name}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="名前を入力"
//           />
//           {/* TODO: エラー表示 */}
//           {/* ヒント: state.errors?.name && <div className="text-red-600 text-sm mt-1">{state.errors.name}</div> */}
//         </div>

//         {/* メールフィールド */}
//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             メールアドレス *
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             required
//             defaultValue={initialData.email}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="メールアドレスを入力"
//           />
//           {/* TODO: エラー表示 */}
//         </div>

//         {/* 自己紹介フィールド */}
//         <div>
//           <label
//             htmlFor="bio"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             自己紹介
//           </label>
//           <textarea
//             id="bio"
//             name="bio"
//             rows={4}
//             defaultValue={initialData.bio || ''}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="自己紹介を入力（任意）"
//           />
//           {/* TODO: エラー表示 */}
//         </div>

//         {/* メッセージ表示 */}
//         {/* TODO: 成功/エラーメッセージの表示 */}
//         {/* ヒント: state.message && 条件分岐でメッセージ表示 */}
//         {/* ヒント: state.successの値で成功/エラーのスタイルを切り替え */}

//         {/* 送信ボタン */}
//         <button
//           type="submit"
//           disabled={/* TODO: pendingを設定 */}
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           {/* TODO: pendingの状態に応じてテキスト変更 */}
//           {/* ヒント: pending ? "更新中..." : "プロフィールを更新" */}
//         </button>
//       </form>
//     </div>
//   );
// }
