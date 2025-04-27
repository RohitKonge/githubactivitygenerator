import React from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is GitHub Activity Generator?",
    answer: "GitHub Activity Generator is a tool that helps you create custom contribution patterns on your GitHub profile by generating commits for specified dates. It's perfect for designing creative contribution graphs or filling gaps in your activity history."
  },
  {
    question: "How does GitHub Activity Generator work?",
    answer: "Simply enter your GitHub credentials, select the dates you want to generate activity for using our interactive calendar, and we'll create a script that makes commits on those dates. The tool creates a new repository and makes legitimate commits that appear on your GitHub contribution graph."
  },
  {
    question: "Is it safe to use GitHub Activity Generator?",
    answer: "Yes, it's completely safe. The tool only creates a new repository and makes commits using your provided credentials. It doesn't access or modify any of your existing repositories. All operations are transparent and you can review the generated script before running it."
  },
  {
    question: "Will this affect my existing repositories?",
    answer: "No, GitHub Activity Generator creates a new, separate repository for the generated commits. It doesn't modify any of your existing repositories or their commit history."
  },
  {
    question: "Can I customize the commit messages?",
    answer: "Currently, the tool uses standard commit messages. We're working on adding custom commit message support in a future update to provide more personalization options."
  }
];

export function FAQ() {
  return (
    <div className="py-16 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about GitHub Activity Generator
          </p>
        </div>
        <div className="mt-12">
          <dl className="space-y-6 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="pt-6">
                <dt className="text-lg">
                  <button
                    className="flex w-full items-start justify-between text-left text-gray-900"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <ChevronDown className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </button>
                </dt>
                <dd className="mt-2 pr-12">
                  <p className="text-base text-gray-600">{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        
        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </div>
    </div>
  );
}