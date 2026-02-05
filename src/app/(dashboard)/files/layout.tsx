// app/(dashboard)/layout.tsx
import CubeLayout from '@/layouts/CubeLayout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <CubeLayout>{children}</CubeLayout>;
}
