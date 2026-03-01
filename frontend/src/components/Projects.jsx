import { useEffect, useState } from "react";

export default function Projects() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${import.meta.env.VITE_GITHUB_USERNAME}/repos?sort=updated`
    )
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter((repo) => !repo.fork)
          .slice(0, 6);
        setRepos(filtered);
      })
      .catch(() => console.error("Failed to load repos"));
  }, []);

  return (
    <section
      id="projects"
      className="w-full flex justify-center"
    >
      <div className="glass-card neon-border hover-lift w-full max-w-6xl p-10 rounded-3xl">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          GitHub Research Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-black/40 border border-gray-700 p-6 rounded-2xl hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold mb-3">
                {repo.name}
              </h3>

              <p className="text-gray-400 text-sm mb-4">
                {repo.description || "No description provided."}
              </p>

              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
              </div>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-blue-400 transition"
              >
                View Repository →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}