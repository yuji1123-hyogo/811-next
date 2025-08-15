import { jwtVerify, SignJWT, type JWTPayload as JoseJWTPayload } from "jose";

export interface AppJWTPayload extends JoseJWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);
const EXPIRES_IN = "24h";
const ALGORITHM = "HS256";

// トークンの生成
//ヘッダー、ペイロード、秘密鍵を使ってトークンを生成
export async function generateToken(payload: {
  userId: string;
  email: string;
}): Promise<string> {
  const jwt = new SignJWT({ sub: payload.userId, ...payload })
    .setProtectedHeader({ alg: ALGORITHM, type: "JWT" })
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN);

  return await jwt.sign(SECRET_KEY);
}

// トークンの検証ーすべてのペイロードを取得
export async function verifyToken(
  token: string
): Promise<AppJWTPayload | null> {
  try {
    const { payload } = await jwtVerify<AppJWTPayload>(token, SECRET_KEY, {
      algorithms: [ALGORITHM],
    });
    return payload;
  } catch {
    return null;
  }
}

// トークンの検証ーペイロードからユーザー情報のみを取得
export async function getCurrentUser(
  token: string
): Promise<{ userId: string; email: string } | null> {
  const payload = await verifyToken(token);
  if (!payload) return null;

  return {
    userId: payload.userId,
    email: payload.email,
  };
}
