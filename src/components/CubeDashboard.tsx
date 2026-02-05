'use client';

import { useState, useEffect } from 'react';

interface FileData {
  id: number;
  filename: string;
  relativePath: string;
  fileKey: string;
  uploadedAt: string;
}
export default function CubeDashboard({ initialCubes }: { initialCubes: any[] }) {
  const [selectedCube, setSelectedCube] = useState<string | null>(
    initialCubes.length > 0 ? initialCubes[0].name : null
  );
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCube) return;

    async function fetchFiles() {
      setLoading(true);
      try {
        const res = await fetch(`/api/proxy/files/${selectedCube}`);
        if (res.ok) {
          const data = await res.json();
          setFiles(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();
  }, [selectedCube]);

  return (
    <div className="flex h-full w-full gap-6 bg-slate-50 overflow-hidden">
      {/* LEFT PANEL: main content area */}
      <div className="flex-1 p-10 overflow-y-auto">
        <h2 className="text-3xl font-black text-slate-800 mb-8">
          {selectedCube ? `Cube: ${selectedCube}` : '← Select a Cube Instance'}
        </h2>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 bg-slate-200 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {files.map((file) => (
              <div
                key={file.fileKey}
                className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-400 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">📄</div>
                  <div>
                    <p className="font-bold text-slate-800">{file.filename}</p>
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      ID: {file.fileKey.slice(0, 8)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 mb-2">
                    {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                  <button className="px-4 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-lg uppercase tracking-tighter hover:bg-blue-600 transition-colors">
                    Download
                  </button>
                </div>
              </div>
            ))}

            {selectedCube && files.length === 0 && (
              <div className="py-20 text-center border-2 border-dashed rounded-3xl text-slate-400">
                No files found in this cube.
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT PANEL: sidebar stays fixed */}
      <div className="w-80 bg-white border-l border-slate-200 p-6 shadow-2xl flex-shrink-0 overflow-y-auto">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
          Inventory
        </h3>
        <div className="space-y-3">
          {initialCubes.map((cube) => (
            <button
              key={cube.apiKey}
              onClick={() => setSelectedCube(cube.name)}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                selectedCube === cube.name
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-transparent bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <h4 className="font-bold text-slate-800 text-sm">{cube.name}</h4>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <code className="text-[9px] text-slate-400 truncate">{cube.apiKey}</code>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
