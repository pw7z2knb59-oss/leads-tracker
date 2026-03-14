import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Second Brain",
  description: "Local-only second brain for notes, tasks, and review."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <div className="brand">
              <div className="logo-wrap">
                <img src="/logo.svg" alt="Slate" />
              </div>
              <div>
                <h1>Slate OS</h1>
                <p className="subtitle">Second Brain + Ops hub</p>
              </div>
            </div>
            <nav className="topnav">
              <Link href="/">Hub</Link>
              <Link href="/brain">Second Brain</Link>
              <Link href="/leads">Leads</Link>
              <Link href="/dashboard">Dashboard</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
