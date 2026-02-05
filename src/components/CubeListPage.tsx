import { cookies } from 'next/headers';
import CubeDashboard from '@/components/CubeDashboard';

export default async function CubeListPage() {
  // In Next.js 15, cookies() must be awaited
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    const response = await fetch('http://localhost:8090/api/cubes', {
      method: 'GET',
      headers: {
        'Cookie': cookieHeader,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
          <div className="p-6 bg-white rounded-xl shadow-lg border border-red-100">
            <h2 className="text-red-600 font-bold text-xl">Access Denied</h2>
            <p className="text-slate-500 italic">API Status: {response.status}</p>
          </div>
        </div>
      );
    }

    const cubes = await response.json();

    return (
      <div className="h-screen bg-slate-50 overflow-y-auto">
        {/* We pass initialCubes to the interactive client component */}
        <CubeDashboard initialCubes={cubes} />
      </div>
    );
  } catch (err) {
    return <div className="p-10 text-red-500">Backend server at :8090 is unreachable.</div>;
  }
}