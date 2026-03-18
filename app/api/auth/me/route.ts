import { NextRequest, NextResponse } from 'next/server';

const MOCK_USER = {
  id: '1',
  name: 'Dr. Admin',
  email: 'admin@dentl.co.uk',
  role: 'Administrator',
};

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = auth.slice(7);
  if (!token || token.split('.').length !== 3) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  return NextResponse.json({ user: MOCK_USER });
}
