import { useState } from 'react';
import type { TikTokProfile } from '../types/profile';

interface ProfileManagerProps {
  onProfileSelect: (profile: TikTokProfile) => void;
}

export default function ProfileManager({ onProfileSelect }: ProfileManagerProps) {
  const [profiles, setProfiles] = useState<TikTokProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<TikTokProfile | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileUsername, setNewProfileUsername] = useState('');

  const handleCreateProfile = () => {
    if (!newProfileName.trim() || !newProfileUsername.trim()) return;

    const newProfile: TikTokProfile = {
      id: Date.now().toString(),
      name: newProfileName.trim(),
      username: newProfileUsername.trim(),
      createdAt: new Date(),
    };

    setProfiles([...profiles, newProfile]);
    setSelectedProfile(newProfile);
    onProfileSelect(newProfile);
    setShowCreateForm(false);
    setNewProfileName('');
    setNewProfileUsername('');
  };

  const handleSelectProfile = (profile: TikTokProfile) => {
    setSelectedProfile(profile);
    onProfileSelect(profile);
  };

  if (selectedProfile) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{selectedProfile.name}</h3>
            <p className="text-sm text-gray-400">@{selectedProfile.username}</p>
          </div>
          <button
            onClick={() => setSelectedProfile(null)}
            className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
          >
            Change Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">TikTok Profile</h3>

      {profiles.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2">Select a profile:</p>
          <div className="space-y-2">
            {profiles.map((profile) => (
              <button
                key={profile.id}
                onClick={() => handleSelectProfile(profile)}
                className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              >
                <div className="text-white font-medium">{profile.name}</div>
                <div className="text-sm text-gray-400">@{profile.username}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {!showCreateForm ? (
        <button
          onClick={() => setShowCreateForm(true)}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
        >
          Create New Profile
        </button>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Profile Name</label>
            <input
              type="text"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="Enter profile name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              type="text"
              value={newProfileUsername}
              onChange={(e) => setNewProfileUsername(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="@username"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCreateProfile}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              Create
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setNewProfileName('');
                setNewProfileUsername('');
              }}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
