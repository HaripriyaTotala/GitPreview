export const getPreviewUrls = (owner, repo) => {
    return {
      stackblitz: `https://stackblitz.com/github/${owner}/${repo}`,
      codesandbox: `https://codesandbox.io/p/github/${owner}/${repo}`,
      githubPages: `https://${owner}.github.io/${repo}`,
      vercel: `https://${repo}-git-main-${owner}.vercel.app`
    };
  };

export const checkDeploymentServices = async (owner, repo) => {
  const deployments = {
    githubPages: false,
    vercel: false,
    netlify: false,
    deploymentUrl: null
  };

  try {
    // Always set a default GitHub Pages URL
    deployments.githubPages = true;
    deployments.deploymentUrl = `https://${owner}.github.io/${repo}`;

    // Optional: Check other deployments
    try {
      const vercelUrl = `https://${repo}-${owner}.vercel.app`;
      const vercelResponse = await fetch(vercelUrl);
      if (vercelResponse.ok) {
        deployments.vercel = true;
        deployments.deploymentUrl = vercelUrl;
      }
    } catch (e) {
      console.log('Vercel check failed:', e);
    }

    try {
      const netlifyUrl = `https://${repo}-${owner}.netlify.app`;
      const netlifyResponse = await fetch(netlifyUrl);
      if (netlifyResponse.ok) {
        deployments.netlify = true;
        deployments.deploymentUrl = netlifyUrl;
      }
    } catch (e) {
      console.log('Netlify check failed:', e);
    }

  } catch (error) {
    console.error('Error checking deployments:', error);
  }

  return deployments;
};