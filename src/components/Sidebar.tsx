import type { TikTokFunction } from '../types/profile';

interface SidebarProps {
  functions: TikTokFunction[];
  selectedFunction: TikTokFunction | null;
  onFunctionSelect: (func: TikTokFunction) => void;
}

export default function Sidebar({ functions, selectedFunction, onFunctionSelect }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">TikTok Tools</h2>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <div className="p-2">
          {functions.map((func) => (
            <button
              key={func.id}
              onClick={() => onFunctionSelect(func)}
              className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                selectedFunction?.id === func.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{func.icon}</span>
                <div>
                  <div className="font-medium">{func.name}</div>
                  <div className="text-xs opacity-75">{func.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
