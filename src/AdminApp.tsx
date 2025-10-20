import React, { useState } from 'react';
import AdminNavigation from './admin-components/AdminNavigation';
import AdminLoginPage from './admin-components/AdminLoginPage';
import DashboardPage from './admin-components/DashboardPage';
import UserManagePage from './admin-components/UserManagePage';
import ProblemManagePage from './admin-components/ProblemManagePage';
import OrderFinancePage from './admin-components/OrderFinancePage';
import DistributionPage from './admin-components/DistributionPage';
import SystemSettingsPage from './admin-components/SystemSettingsPage';
import CouponManagePage from './admin-components/CouponManagePage';
import MiniProgramManagePage from './admin-components/MiniProgramManagePage';

// CodeQuest B1.7 - 链科学后台管理系统
// 完整的后台管理系统，包含数据看板、用户管理、题库管理（含试卷审核）、订单财务、分销管理、系统设置、券码管理、小程序管理
export default function AdminApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState({
    id: 1,
    username: 'admin',
    role: 'super_admin',
    name: '系统管理员',
    avatar: '',
    lastLogin: new Date()
  });
  const [userSearchPhone, setUserSearchPhone] = useState<string | undefined>(undefined);

  const handleTabChange = (tab: string, searchPhone?: string) => {
    setActiveTab(tab);
    if (tab === 'users' && searchPhone) {
      setUserSearchPhone(searchPhone);
    } else {
      setUserSearchPhone(undefined);
    }
  };

  const handleLogin = (username: string, password: string) => {
    // 登录成功后更新状态
    setIsLoggedIn(true);
    setAdminUser({
      ...adminUser,
      username: username,
      lastLogin: new Date()
    });
  };

  const handleLogout = () => {
    // 退出登录
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'users':
        return <UserManagePage searchPhone={userSearchPhone} />;
      case 'problems':
        return <ProblemManagePage />;
      case 'order-finance':
        return <OrderFinancePage onTabChange={handleTabChange} />;
      case 'distribution':
        return <DistributionPage />;
      case 'settings':
        return <SystemSettingsPage />;
      case 'coupons':
        return <CouponManagePage />;
      case 'miniprogram':
        return <MiniProgramManagePage />;
      default:
        return <DashboardPage />;
    }
  };

  // 如果未登录，显示登录页面
  if (!isLoggedIn) {
    return <AdminLoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        adminUser={adminUser}
        onLogout={handleLogout}
      />
      <div className="ml-64">
        {renderContent()}
      </div>
    </div>
  );
}