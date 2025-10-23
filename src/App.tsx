import React, { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import ContestPage from './components/ContestPage';
import KnowledgePage from './components/KnowledgePage';
import ProblemPage from './components/ProblemPage';
import MistakesPage from './components/MistakesPage';
import ProfilePage from './components/ProfilePage';
import AccountPage from './components/AccountPage';
import ExamPage from './components/ExamPage';
import LevelAssessmentModal from './components/LevelAssessmentModal';
import AssessmentPage from './components/AssessmentPage';
import AssessmentReport from './components/AssessmentReport';
import AIMascotFloat from './components/AIMascotFloat';
import UserGuide from './components/UserGuide';

// CodeQuest T1.9.4 - 学习诊断重构、科目切换、发票流程版本
// 主要更新：学习诊断页面全面重构（预测通过率、探索学习、分类表现、学习统计）、
// 个人中心学习记录科目切换功能、发票申请完整流程、小链浮窗尺寸优化
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [assessmentConfig, setAssessmentConfig] = useState<{subject: string, level: string} | null>(null);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleNavigate = (page: string) => {
    setActiveTab(page);
  };

  const handleStartExam = (paperId: number) => {
    // Navigate to problem page with exam context
    setActiveTab('exam');
    console.log('Starting exam with paper ID:', paperId);
  };

  const handleStartProblem = (problemId: number, problemType: 'coding' | 'general' = 'general') => {
    // Navigate to problem page with problem context
    setActiveTab('problem');
    // Store problem type for rendering the correct page
    sessionStorage.setItem('currentProblemType', problemType);
    console.log('Starting problem with ID:', problemId, 'Type:', problemType);
  };

  // 处理用户登录成功后的测评弹窗
  const handleLoginSuccess = (userInfo: any) => {
    setIsLoggedIn(true);
    
    // 检查是否为新用户或未完成测评的用户
    const hasSeenAssessment = localStorage.getItem('hasSeenAssessment');
    if (!hasSeenAssessment) {
      setTimeout(() => {
        setShowAssessmentModal(true);
      }, 1500); // 登录成功1.5秒后弹出测评
    }
  };

  const handleStartAssessment = (subject: string, level: string) => {
    setAssessmentConfig({ subject, level });
    setShowAssessmentModal(false);
    setActiveTab('assessment');
  };

  const handleAssessmentComplete = (results: any) => {
    setAssessmentResults(results);
    setActiveTab('assessment-report');
    localStorage.setItem('hasSeenAssessment', 'true');
    localStorage.setItem('userWeakPoints', JSON.stringify(results.weakPoints));
  };

  const handleCloseAssessmentReport = () => {
    setActiveTab('home');
    setAssessmentResults(null);
    setAssessmentConfig(null);
  };

  const handleSkipAssessment = () => {
    setShowAssessmentModal(false);
    localStorage.setItem('hasSeenAssessment', 'true');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'contest':
        return <ContestPage onStartExam={handleStartExam} />;
      case 'knowledge':
        return <KnowledgePage onStartProblem={handleStartProblem} />;
      case 'mistakes':
        return <MistakesPage />;
      case 'profile':
        return <ProfilePage />;
      case 'account':
        return <AccountPage />;
      case 'exam':
        return <ExamPage onFinishExam={() => setActiveTab('profile')} />;
      case 'problem':
        const problemType = sessionStorage.getItem('currentProblemType') as 'coding' | 'general' || 'general';
        return <ProblemPage problemType={problemType} />;
      case 'assessment':
        return assessmentConfig ? (
          <AssessmentPage
            subject={assessmentConfig.subject}
            level={assessmentConfig.level}
            onComplete={handleAssessmentComplete}
          />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
      case 'assessment-report':
        return assessmentResults ? (
          <AssessmentReport
            results={assessmentResults}
            onClose={handleCloseAssessmentReport}
          />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  // 判断是否显示小链浮窗（不在首页、答题页面显示）
  const shouldShowMascot = activeTab !== 'home' && 
                           activeTab !== 'exam' && 
                           activeTab !== 'problem' && 
                           activeTab !== 'assessment';

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />
      <Navigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        onLoginSuccess={handleLoginSuccess}
      />
      <div className="ml-64">
        {renderContent()}
      </div>
      
      {/* 新用户水平测评弹窗 */}
      <LevelAssessmentModal
        open={showAssessmentModal}
        onOpenChange={(open) => {
          setShowAssessmentModal(open);
          if (!open) handleSkipAssessment();
        }}
        onStartAssessment={handleStartAssessment}
      />

      {/* 小链同学全局浮窗 - 不在首页、答题页面显示 */}
      {shouldShowMascot && <AIMascotFloat />}

      {/* 新手引导 - 仅在首页显示 */}
      {activeTab === 'home' && <UserGuide />}
    </div>
  );
}