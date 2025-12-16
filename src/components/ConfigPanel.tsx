import { useState } from 'react';
import type { TikTokFunction, FunctionConfig } from '../types/profile';

interface ConfigPanelProps {
  selectedFunction: TikTokFunction | null;
  onRun: (config: FunctionConfig) => void;
}

export default function ConfigPanel({ selectedFunction, onRun }: ConfigPanelProps) {
  const [config, setConfig] = useState<FunctionConfig>({});
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    onRun(config);
    // Simulate async operation
    setTimeout(() => {
      setIsRunning(false);
    }, 2000);
  };

  if (!selectedFunction) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-lg">Select a function from the sidebar to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="border-b border-gray-700 p-6">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{selectedFunction.icon}</span>
          <div>
            <h2 className="text-2xl font-bold text-white">{selectedFunction.name}</h2>
            <p className="text-gray-400">{selectedFunction.description}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl">
          <h3 className="text-lg font-semibold text-white mb-4">Configuration</h3>
          <div className="space-y-4">
            {selectedFunction.id === 'video-downloader' && (
              <>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Video URL</label>
                  <input
                    type="text"
                    value={config.videoUrl as string || ''}
                    onChange={(e) => setConfig({ ...config, videoUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="https://www.tiktok.com/@username/video/..."
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.downloadWithWatermark as boolean || false}
                      onChange={(e) => setConfig({ ...config, downloadWithWatermark: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span>Download with watermark</span>
                  </label>
                </div>
              </>
            )}
            {selectedFunction.id === 'analytics' && (
              <>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date Range</label>
                  <select
                    value={config.dateRange as string || 'last7days'}
                    onChange={(e) => setConfig({ ...config, dateRange: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="last7days">Last 7 days</option>
                    <option value="last30days">Last 30 days</option>
                    <option value="last90days">Last 90 days</option>
                  </select>
                </div>
              </>
            )}
            {selectedFunction.id === 'scheduler' && (
              <>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Schedule Time</label>
                  <input
                    type="datetime-local"
                    value={config.scheduleTime as string || ''}
                    onChange={(e) => setConfig({ ...config, scheduleTime: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Caption</label>
                  <textarea
                    value={config.caption as string || ''}
                    onChange={(e) => setConfig({ ...config, caption: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                    rows={4}
                    placeholder="Enter your caption..."
                  />
                </div>
              </>
            )}
            {selectedFunction.id === 'hashtag-generator' && (
              <>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Content Description</label>
                  <textarea
                    value={config.description as string || ''}
                    onChange={(e) => setConfig({ ...config, description: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                    rows={3}
                    placeholder="Describe your content..."
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Number of Hashtags</label>
                  <input
                    type="number"
                    value={config.hashtagCount as number || 10}
                    onChange={(e) => setConfig({ ...config, hashtagCount: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                    min="1"
                    max="30"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 p-6">
        <button
          onClick={handleRun}
          disabled={isRunning}
          className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
            isRunning
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isRunning ? 'Running...' : 'Run'}
        </button>
      </div>
    </div>
  );
}
