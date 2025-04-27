import React from 'react';
import { Calendar, GitBranch, Github, Users } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "How to Create Custom GitHub Contribution Patterns",
    excerpt: "Learn how to design and generate custom contribution patterns on your GitHub profile using our GitHub Activity Generator tool.",
    author: "GitHub Activity Generator Team",
    date: "2025-04-27",
    readTime: "5 min read",
    category: "Tutorial",
    content: `GitHub profiles are becoming increasingly important in the developer community. 
    A well-maintained activity graph shows consistent contribution and dedication. Our GitHub 
    Activity Generator helps you create custom patterns that make your profile stand out.`
  },
  {
    id: 2,
    title: "Understanding GitHub Contribution Graphs",
    excerpt: "Deep dive into how GitHub contribution graphs work and why they matter for developers.",
    author: "GitHub Activity Generator Team",
    date: "2025-04-26",
    readTime: "4 min read",
    category: "Guide",
    content: `GitHub contribution graphs provide a visual representation of your coding activity. 
    They show not just the quantity but also the consistency of your contributions. Learn how 
    to leverage this feature to showcase your dedication to coding.`
  },
  {
    id: 3,
    title: "Best Practices for GitHub Profile Enhancement",
    excerpt: "Tips and tricks to enhance your GitHub profile and make it stand out to potential employers.",
    author: "GitHub Activity Generator Team",
    date: "2025-04-25",
    readTime: "6 min read",
    category: "Best Practices",
    content: `Your GitHub profile is your developer portfolio. Learn how to optimize it with 
    consistent contributions, meaningful projects, and engaging readme files. Use our Activity 
    Generator to maintain an active presence.`
  }
];

export function Blog() {
  return (
    <div className="bg-white/80 backdrop-blur-sm py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-lg text-gray-600">
            Tips, tutorials, and insights about GitHub activity and profile optimization
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {post.category}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "headline": "GitHub Activity Generator Blog",
            "description": "Tips, tutorials, and insights about GitHub activity and profile optimization",
            "url": "https://githubactivitygenerator.site/blog",
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "datePublished": post.date,
              "author": {
                "@type": "Organization",
                "name": post.author
              },
              "articleBody": post.content
            }))
          })}
        </script>
      </div>
    </div>
  );
}