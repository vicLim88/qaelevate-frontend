/**
 * Header component
 */
'use client';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-blue-600">QA Elevate</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="/"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Dashboard
            </a>
            <a
              href="/crawler"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Crawler
            </a>
            <a
              href="/scenarios"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Scenarios
            </a>
            <a
              href="/graph"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Graph
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
