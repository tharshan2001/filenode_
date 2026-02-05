'use client';

import { useState, useEffect } from 'react';

interface FileData {
  id: number;
  filename: string;
  relativePath: string;
  fileKey: string;
  uploadedAt: string;
}

interface FileListProps {
  selectedCube: string | null;
}

export default function FileList({ selectedCube }: FileListProps) {
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
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();
  }, [selectedCube]);

  return (
    <div className="flex-1 p-10 overflow-auto">
      <h2 className="text-3xl font-black text-slate-800 mb-8">
        {selectedCube ? `Cube: ${selectedCube}` : '← Select a Cube'}
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
  );
}
