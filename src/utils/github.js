export const extractRepoInfo = (url) => {
    try {
      const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
      const match = url.match(regex);
      if (!match) {
        throw new Error('Invalid GitHub URL format');
      }
      return {
        owner: match[1],
        repo: match[2].replace('.git', '')
      };
    } catch (error) {
      throw new Error('Invalid GitHub URL format');
    }
  };

export const repoHasPages = async (owner, repo) => {
  try {
    const response = await fetch(`https://github.com/${owner}/${repo}/settings/pages`);
    return response.status === 200;
  } catch {
    return false;
  }
};