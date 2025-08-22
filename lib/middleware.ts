import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

function extractTokenFromHeader(authorization: string | null): string | null {
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }
  return authorization.substring(7);
}

function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function getAuthenticatedUser(request: NextRequest): Promise<{ userId: string; email: string } | null> {
  const token = extractTokenFromHeader(request.headers.get('authorization'));
  
  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  if (!payload) {
    return null;
  }

  return {
    userId: payload.userId,
    email: payload.email
  };
}

export function createAuthError(message: string = 'Unauthorized') {
  return NextResponse.json({ error: message }, { status: 401 });
}
