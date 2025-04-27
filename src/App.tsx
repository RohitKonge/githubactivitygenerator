import React, { useState } from 'react';
import { Calendar } from './components/Calendar';
import { FAQ } from './components/FAQ';
import { Blog } from './components/Blog';
import { GitHubCredentials } from './types';
import { format } from 'date-fns';
import { Toaster } from 'react-hot-toast';
import { Github, Copy, Check, Code2, GitFork, Star, Users, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

function App() {
  const [credentials, setCredentials] = useState<GitHubCredentials>({
    username: '',
    email: '',
  });
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [copied, setCopied] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string>('');

  const generateScript = () => {
    if (!credentials.username || !credentials.email) {
      toast.error('Please fill in all credentials');
      return '';
    }
    if (selectedDates.length === 0) {
      toast.error('Please select at least one date');
      return '';
    }

    const dateCommands = selectedDates
      .map((date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        return `echo "# Dummy Commits Repository ${formattedDate}" > README.md
git add README.md
git commit --date="${formattedDate}T12:00:00" -m "Commit for ${formattedDate}"`;
      })
      .join('\n');

    return `git config --global --unset user.name
git config --global --unset user.email
git config --global user.name "${credentials.username}"
git config --global user.email "${credentials.email}"
mkdir DummyRepository
cd DummyRepository
git init
git remote add origin https://github.com/${credentials.username}/DummyRepository.git
${dateCommands}
git branch -M main
git push -u origin main
cd ..`;
  };

  const handleGenerate = () => {
    const script = generateScript();
    if (script) {
      setGeneratedScript(script);
      toast.success('Script generated successfully!');
    }
  };

  const handleCopy = async () => {
    if (generatedScript) {
      await navigator.clipboard.writeText(generatedScript);
      setCopied(true);
      toast.success('Script copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Generate a script first');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <Toaster position="top-right" />
      
      {/* Hero Section with Enhanced SEO Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Github className="h-16 w-16 mx-auto text-indigo-600 mb-4 animate-pulse" />
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            GitHub Activity Generator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create custom GitHub contribution patterns and enhance your profile visibility
          </p>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-16">
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <Activity className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Custom Patterns</h3>
              <p className="text-gray-600">Design unique contribution patterns that make your GitHub profile stand out</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <Users className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Profile Enhancement</h3>
              <p className="text-gray-600">Improve your GitHub profile's visual appeal and professional appearance</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <Star className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600">Simple interface to generate and customize your GitHub activity</p>
            </div>
          </div>
        </div>

        {/* Repository Creation Instructions */}
        <div className="mb-12 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <GitFork className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Before You Start</h2>
          </div>
          <div className="prose prose-indigo">
            <h3 className="text-lg font-medium text-gray-900">Create a GitHub Dummy Repository</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Go to <a 
                href="https://github.com/new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-500"
              >
                github.com/new
              </a></li>
              <li>Set Repository name as "DummyRepository"</li>
              <li>Make it Public</li>
              <li>Don't initialize with README</li>
              <li>Click "Create repository"</li>
            </ol>
            <p className="mt-4 text-gray-600">
              After creating the repository, proceed with entering your credentials and selecting dates below.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">GitHub Credentials</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Username
                </label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your GitHub username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Email
                </label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your GitHub email"
                />
              </div>
            </div>
          </div>

          <Calendar
            selectedDates={selectedDates}
            onSelect={setSelectedDates}
          />

          <button
            onClick={handleGenerate}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!credentials.username || !credentials.email || selectedDates.length === 0}
          >
            <Code2 className="h-5 w-5" />
            <span>Generate Script</span>
          </button>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Generated Script</h2>
              <button
                onClick={handleCopy}
                disabled={!generatedScript}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {copied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
                <span>{copied ? 'Copied!' : 'Copy Script'}</span>
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-300 p-6 rounded-lg overflow-x-auto min-h-[200px]">
              <code>{generatedScript || 'Click "Generate Script" to create the script'}</code>
            </pre>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ />

        {/* Blog Section */}
        <Blog />

        {/* Footer with SEO Links */}
        <footer className="mt-16 border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About</h4>
              <p className="text-gray-600">
                GitHub Activity Generator helps developers create custom contribution patterns 
                and enhance their GitHub profiles with an easy-to-use interface.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-indigo-600 hover:text-indigo-500">Features</a></li>
                <li><a href="#faq" className="text-indigo-600 hover:text-indigo-500">FAQ</a></li>
                <li><a href="#blog" className="text-indigo-600 hover:text-indigo-500">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="https://github.com" className="text-indigo-600 hover:text-indigo-500">GitHub</a></li>
                <li><a href="mailto:contact@githubactivitygenerator.site" className="text-indigo-600 hover:text-indigo-500">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} GitHub Activity Generator. All rights reserved.</p>
          </div>
        </footer>

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "GitHub Activity Generator",
            "url": "https://githubactivitygenerator.site",
            "description": "Create custom GitHub contribution patterns and enhance your profile visibility",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "creator": {
              "@type": "Organization",
              "name": "GitHub Activity Generator Team"
            }
          })}
        </script>
      </div>
    </div>
  );
}

export default App;