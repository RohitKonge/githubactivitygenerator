import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Copy, Check } from 'lucide-react';
import { CommitHistory } from '../types';
import clsx from 'clsx';

interface TerminalProps {
  history: CommitHistory[];
  script: string;
}

export function Terminal({ history, script }: TerminalProps) {
  const [copied, setCopied] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <div className="flex items-center">
          <TerminalIcon className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-sm text-gray-300">Git Command History</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-sm text-gray-300 hover:text-white"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span>{copied ? 'Copied!' : 'Copy Script'}</span>
        </button>
      </div>
      <div
        ref={terminalRef}
        className="p-4 h-64 overflow-y-auto font-mono text-sm"
      >
        {history.map((entry, index) => (
          <div
            key={index}
            className={clsx('mb-2', {
              'text-red-400': entry.error,
              'text-green-400': !entry.error,
            })}
          >
            <span className="text-blue-400">$ </span>
            {entry.command}
            <div className="ml-2 text-gray-300">{entry.output}</div>
          </div>
        ))}
      </div>
    </div>
  );
}