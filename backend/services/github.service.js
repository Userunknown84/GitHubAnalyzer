import axios from "axios";

export async function analyzePortfolio(username) {
  const startTime = Date.now();

  const query = `
    query {
      user(login: "${username}") {
        login
        avatarUrl
        followers { totalCount }

        pinnedItems(first: 6) {
          nodes {
            ... on Repository {
              name
              stargazerCount
            }
          }
        }

        repositories(first: 50, orderBy: {field: UPDATED_AT, direction: DESC}) {
          totalCount
          nodes {
            name
            description
            stargazerCount
            forkCount
            primaryLanguage { name }

            issues { totalCount }
            pullRequests { totalCount }

            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 30) {
                    totalCount
                  }
                }
              }
            }

            object(expression: "HEAD:README.md") {
              ... on Blob {
                text
              }
            }
          }
        }
      }
    }
  `;

  const res = await axios.post(
    "https://api.github.com/graphql",
    { query },
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const user = res.data.data.user;
  if (!user) return null;

  let totalStars = 0;
  let totalForks = 0;
  let totalCommits = 0;
  let totalIssues = 0;
  let totalPRs = 0;
  let readmeCount = 0;
  let languages = {};

  user.repositories.nodes.forEach((repo) => {
    totalStars += repo.stargazerCount;
    totalForks += repo.forkCount;
    totalIssues += repo.issues.totalCount;
    totalPRs += repo.pullRequests.totalCount;

    if (repo.defaultBranchRef?.target?.history?.totalCount) {
      totalCommits += repo.defaultBranchRef.target.history.totalCount;
    }

    if (repo.object?.text) {
      readmeCount++;
    }

    if (repo.primaryLanguage?.name) {
      const lang = repo.primaryLanguage.name;
      languages[lang] = (languages[lang] || 0) + 1;
    }
  });

  const totalRepos = user.repositories.totalCount;
  const pinnedCount = user.pinnedItems.nodes.length;
  const languageDiversity = Object.keys(languages).length;

 
  let score = 0;

  
  if (totalRepos >= 5) score += 10;
  if (totalRepos >= 10) score += 10;

  
  if (user.followers.totalCount >= 5) score += 7;
  if (user.followers.totalCount >= 20) score += 8;

 
  if (totalStars > 0) score += 5;
  if (totalStars > 10) score += 10;


  const readmeRatio = totalRepos > 0 ? readmeCount / totalRepos : 0;
  if (readmeRatio > 0.5) score += 7;
  if (readmeRatio > 0.8) score += 8;


  if (totalCommits > 20) score += 7;
  if (totalCommits > 50) score += 8;

 
  if (languageDiversity >= 3) score += 5;
  if (languageDiversity >= 5) score += 5;


  if (totalIssues > 0 || totalPRs > 0) score += 5;
  if (totalIssues > 10 || totalPRs > 10) score += 5;


  if (pinnedCount >= 3) score += 5;
  if (pinnedCount >= 5) score += 5;


  let suggestions = [];

  if (totalRepos < 5)
    suggestions.push("Create more quality repositories.");

  if (readmeRatio < 0.5)
    suggestions.push("Improve README documentation for your projects.");

  if (totalStars === 0)
    suggestions.push("Build impactful projects that attract stars.");

  if (languageDiversity < 3)
    suggestions.push("Showcase more diverse technologies.");

  if (totalCommits < 20)
    suggestions.push("Maintain consistent commit activity.");

  if (pinnedCount < 3)
    suggestions.push("Pin your best repositories to highlight them.");

  if (suggestions.length === 0)
    suggestions.push("Excellent GitHub profile! Keep building 🚀");

  const responseTime = Date.now() - startTime;


  return {
    userData: {
      login: user.login,
      avatarUrl: user.avatarUrl,
      followers: user.followers.totalCount,
      totalRepos,
      pinnedCount,
    },
    metrics: {
      totalStars,
      totalForks,
      totalCommits,
      totalIssues,
      totalPRs,
      readmeCoverage: `${readmeCount}/${totalRepos}`,
      languageDiversity,
    },
    languages,
    score,
    suggestions,
    responseTime,
  };
}
