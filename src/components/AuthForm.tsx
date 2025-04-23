import React, { useState } from 'react';
import { GitHubCredentials } from '../types';
import { Github, Key, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';

interface AuthFormProps {
  onSubmit: (credentials: GitHubCredentials) => void;
}

export function AuthForm({ onSubmit }: AuthFormProps) {
  const [credentials, setCredentials] = useState<GitHubCredentials>({
    username: '',
    email: '',
    token: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.email || !credentials.token) {
      toast.error('Please fill in all fields');
      return;
    }

    onSubmit(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          GitHub Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="octocat"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          GitHub Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="octocat@github.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Personal Access Token
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Key className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            value={credentials.token}
            onChange={(e) => setCredentials({ ...credentials, token: e.target.value })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
          />
        </div>
        <p className="text-sm text-gray-500">
          Generate your token at{' '}
          <a
            href="https://github.com/settings/tokens"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-500"
          >
            GitHub Settings
          </a>
        </p>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Github className="h-5 w-5 mr-2" />
        Connect GitHub
      </button>
    </form>
  );
}