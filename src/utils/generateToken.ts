import jwt, { Secret } from "jsonwebtoken";

export default function generateToken(id: number, email: string) {
  const SECRET_KEY: Secret = "your-secret-key-here";

  const payload = { id, email };

  const options = { expiresIn: "1h" };

  return jwt.sign(payload, SECRET_KEY, options);
}
