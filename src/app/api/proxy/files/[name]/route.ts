import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`http://localhost:8090/api/files/${name}`, {
    headers: { 'Cookie': cookieHeader },
    cache: 'no-store',
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}