/**
 * Crawler configuration form component
 */
'use client';

import { useState } from 'react';

interface CrawlerFormProps {
  onSubmit?: (data: CrawlerConfig) => void;
}

interface CrawlerConfig {
  url: string;
  maxDepth: number;
  maxPages: number;
  headless: boolean;
  userFlow?: string;
}

export default function CrawlerForm({ onSubmit }: CrawlerFormProps) {
  const [config, setConfig] = useState<CrawlerConfig>({
    url: '',
    maxDepth: 3,
    maxPages: 50,
    headless: true,
    userFlow: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(config);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          Target URL
        </label>
        <input
          type="url"
          id="url"
          value={config.url}
          onChange={(e) => setConfig({ ...config, url: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="maxDepth" className="block text-sm font-medium text-gray-700 mb-1">
            Max Depth
          </label>
          <input
            type="number"
            id="maxDepth"
            value={config.maxDepth}
            onChange={(e) => setConfig({ ...config, maxDepth: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="10"
          />
        </div>

        <div>
          <label htmlFor="maxPages" className="block text-sm font-medium text-gray-700 mb-1">
            Max Pages
          </label>
          <input
            type="number"
            id="maxPages"
            value={config.maxPages}
            onChange={(e) => setConfig({ ...config, maxPages: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="200"
          />
        </div>
      </div>

      <div>
        <label htmlFor="userFlow" className="block text-sm font-medium text-gray-700 mb-1">
          User Flow (optional)
        </label>
        <textarea
          id="userFlow"
          value={config.userFlow}
          onChange={(e) => setConfig({ ...config, userFlow: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Describe the user flow to test..."
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="headless"
          checked={config.headless}
          onChange={(e) => setConfig({ ...config, headless: e.target.checked })}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="headless" className="ml-2 block text-sm text-gray-700">
          Run in headless mode
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Start Crawl
      </button>
    </form>
  );
}
