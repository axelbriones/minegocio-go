import { Sidebar } from '@/components/layout/Sidebar';
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full antialiased bg-migo-bg">
      <body className="h-full font-sans text-migo-text flex">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-1 h-full overflow-y-auto p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
