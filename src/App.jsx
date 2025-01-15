import React, { useState, useEffect } from 'react';
import Layout from './components/layout/layout';
import Logo from './components/ui/Logo';
import UrlForm from './components/repository/UrlForm';
import RepoInfo from './components/repository/RepoInfo';
import FileStructure from './components/repository/FileStructure';
import LivePreview from './components/repository/LivePreview';
import Alert, { AlertTitle } from './components/ui/Alert';
import { useGithubApi } from './hooks/useGithubApi';
import { extractRepoInfo } from './utils/github';
import AiAnalysis from './components/repository/AiAnalysis';
import { useAiAnalysis } from './hooks/useAiAnalysis';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [fileStructure, setFileStructure] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [readme, setReadme] = useState('');

  const { fetchRepoData, fetchFileStructure, fetchReadme } = useGithubApi();
  const { analyzeRepository } = useAiAnalysis();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const { owner, repo } = extractRepoInfo(url);
      const [repoData, files, readmeContent] = await Promise.all([
        fetchRepoData(owner, repo),
        fetchFileStructure(owner, repo),
        fetchReadme(owner, repo)
      ]);

      setRepoData(repoData);
      setFileStructure(files);
      setReadme(readmeContent);
    } catch (error) {
      console.error('Submit error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!repoData || analysisLoading) return;
    
    setAnalysisLoading(true);
    try {
      const analysisResult = await analyzeRepository(repoData, fileStructure, readme);
      setAnalysis(analysisResult);
    } catch (error) {
      setError(error.message || 'Failed to analyze repository. Please check your API configuration.');
    } finally {
      setAnalysisLoading(false);
    }
  };

  return (
    <Layout darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Logo />
        
        <div className="space-y-6 animate-fadeIn delay-100">
          <UrlForm
            url={url}
            setUrl={setUrl}
            loading={loading}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto"
          />

          {error && (
            <Alert variant="destructive" className="animate-fadeIn">
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          {repoData && (
            <div className="space-y-8 animate-fadeIn">
              <RepoInfo repoData={repoData} />
              <AiAnalysis 
                analysis={analysis}
                loading={analysisLoading}
                onAnalyze={handleAnalyze}
              />
              <FileStructure fileStructure={fileStructure} />
              <LivePreview 
                owner={repoData.owner.login}
                repo={repoData.name}
                repoData={repoData}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;