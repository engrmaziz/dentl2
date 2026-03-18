import { NextRequest, NextResponse } from 'next/server';

// Mock admin credentials for development
const MOCK_ADMIN = {
  id: '1',
  name: 'Dr. Admin',
  email: 'admin@dentl.co.uk',
  password: 'admin123',
  role: 'Administrator',
};

function base64url(str: string): string {
  return Buffer.from(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function createMockJWT(payload: Record<string, unknown>): string {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body   = base64url(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 86400 }));
  const sig    = base64url('mock-signature');
  return `${header}.${body}.${sig}`;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }
    if (email !== MOCK_ADMIN.email || password !== MOCK_ADMIN.password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const token = createMockJWT({ id: MOCK_ADMIN.id, email: MOCK_ADMIN.email, role: MOCK_ADMIN.role });
    return NextResponse.json({
      token,
      user: { id: MOCK_ADMIN.id, name: MOCK_ADMIN.name, email: MOCK_ADMIN.email, role: MOCK_ADMIN.role },
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
