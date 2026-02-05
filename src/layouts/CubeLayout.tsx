// app/components/CubeLayout.tsx
import { cookies } from 'next/headers';
import CubeDashboard from '../components/CubeDashboard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090';
const CUBES_ENDPOINT = '/api/cubes';

interface Cube {
  id: string;
  name: string;
  apiKey: string;
  createdAt?: string;
}

async function fetchCubes(cookieHeader: string): Promise<Cube[]> {
  const response = await fetch(`${API_BASE_URL}${CUBES_ENDPOINT}`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cubes: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export default async function CubeLayout({ children }: { children: React.ReactNode }) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const cubes = await fetchCubes(cookieHeader);

    return (
      <div className="flex h-full w-full">
        {/* CubeDashboard sidebar */}
        <CubeDashboard initialCubes={cubes} />
        {/* Page content rendered to the right */}
        <div className="flex-1 p-10">{children}</div>
      </div>
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-red-600">Failed to Load Cubes</h1>
          <p className="mt-2 text-sm text-slate-600">{errorMessage}</p>
        </div>
      </div>
    );
  }
}
