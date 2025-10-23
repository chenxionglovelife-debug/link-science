import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Bell, Zap, Trophy, BookOpen, Target, BarChart3, Home, X, Sparkles, User, Crown, Calendar, AlertTriangle, Building, LogOut, CreditCard } from 'lucide-react';
import LoginModal from './LoginModal';
import logoImage from 'figma:asset/f28ef52e719d21ce79d3472720153a686f415b9b.png';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLoginSuccess?: (userInfo: any) => void;
}

export default function Navigation({ activeTab, onTabChange, onLoginSuccess }: NavigationProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMembershipReminder, setShowMembershipReminder] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  
  // 用户会员信息
  const userMemberships = [
    { type: '个人会员', active: true, expiryDate: '2024-02-15' },
    { type: '比赛会员', active: false, expiryDate: null }
  ];
  
  // 检查会员是否即将到期或已到期
  const checkMembershipExpiry = () => {
    const today = new Date();
    const activeMemberships = userMemberships.filter(m => m.active);
    
    for (const membership of activeMemberships) {
      if (membership.expiryDate) {
        const expiryDate = new Date(membership.expiryDate);
        const daysDifference = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
        
        if (daysDifference <= 5 && daysDifference >= -5) {
          return {
            show: true,
            message: daysDifference > 0 
              ? `您的${membership.type}将在${daysDifference}天后到期` 
              : `您的${membership.type}已到期${Math.abs(daysDifference)}天`,
            isExpired: daysDifference <= 0,
            membershipType: membership.type
          };
        }
      }
    }
    return { show: false };
  };
  
  const membershipStatus = checkMembershipExpiry();
  
  const handleLoginSuccess = (loginUserInfo: any) => {
    setIsLoggedIn(true);
    setUserInfo(loginUserInfo);
    // 通知App组件用户已登录
    if (onLoginSuccess) {
      onLoginSuccess(loginUserInfo);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    onTabChange('home'); // 退出登录后返回首页
  };

  const handleUpgradeMembership = () => {
    onTabChange('account'); // 跳转到个人中心会员页面
  };
  
  const menuItems = [
    { id: 'home', label: '首页', icon: Home, guide: '' },
    { id: 'contest', label: '闯关刷题', icon: Trophy, guide: '' },
    // { id: 'knowledge', label: '考点专练', icon: BookOpen }, // 暂时隐藏
    { id: 'mistakes', label: '攻克错题', icon: Target, guide: 'mistakes' },
    { id: 'profile', label: '学习诊断', icon: BarChart3, guide: 'profile' },
    { id: 'account', label: '个人中心', icon: User, guide: '' },
  ];

  const notifications = [
    {
      id: 1,
      title: '🎉 新增智能筛选功能',
      content: '现在可以使用更友好的标签按钮进行题目筛选，告别繁琐的下拉选择！',
      time: '2小时前',
      type: 'feature'
    },
    {
      id: 2,
      title: '✨ 错题分析升级',
      content: '错题本新增详细的错误原因分析和个性化学习建议，帮你更好地查漏补缺。',
      time: '1天前',
      type: 'update'
    },
    {
      id: 3,
      title: '🚀 界面优化完成',
      content: '调整了字体大小和卡片布局，让学习体验更加舒适友好。',
      time: '2天前',
      type: 'improvement'
    },
    {
      id: 4,
      title: '📊 学习报告新功能',
      content: '新增学习时长统计和错题率趋势分析，让你的学习进步可视化。',
      time: '3天前',
      type: 'feature'
    }
  ];

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-background/95 backdrop-blur-md border-r border-border/50 z-50">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-center">
            <img 
              src={logoImage} 
              alt="LINK链科学" 
              className="h-12 w-auto object-contain"
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                data-guide={item.guide || undefined}
                className={`w-full relative px-4 py-3 rounded-xl transition-all duration-300 flex items-center space-x-3 text-left ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-600 dark:text-purple-400 shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-br from-purple-500 to-blue-600 text-white' 
                    : 'bg-muted'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-medium">{item.label}</span>
                {activeTab === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Membership Status */}
        {isLoggedIn && (
          <div className="p-4">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-3 shadow-sm">
              <div className="text-xs text-muted-foreground mb-3 text-center">会员服务</div>
              <div className="grid grid-cols-2 gap-2">
                <div 
                  className="flex flex-col items-center p-3 rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => onTabChange('account')}
                >
                  <Crown className="w-4 h-4 mb-1 text-purple-600" />
                  <span className="text-xs font-medium">个人</span>
                  <Badge variant="outline" className="text-xs mt-1 border-purple-300 text-purple-700">已开通</Badge>
                </div>
                <div 
                  className="flex flex-col items-center p-3 rounded-lg border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => onTabChange('account')}
                >
                  <Trophy className="w-4 h-4 mb-1 text-orange-600" />
                  <span className="text-xs font-medium">赛事</span>
                  <Badge variant="outline" className="text-xs mt-1 border-orange-300 text-orange-700">未开通</Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 未登录时显示会员状态 */}
        {!isLoggedIn && (
          <div className="p-4">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-3 shadow-sm">
              <div className="text-xs text-muted-foreground mb-3 text-center">会员服务</div>
              <div className="grid grid-cols-2 gap-2">
                <div 
                  className="flex flex-col items-center p-3 rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setShowLoginModal(true)}
                >
                  <Crown className="w-4 h-4 mb-1 text-purple-600" />
                  <span className="text-xs font-medium">个人</span>
                  <Badge variant="outline" className="text-xs mt-1 border-purple-300 text-purple-700">未开通</Badge>
                </div>
                <div 
                  className="flex flex-col items-center p-3 rounded-lg border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setShowLoginModal(true)}
                >
                  <Trophy className="w-4 h-4 mb-1 text-orange-600" />
                  <span className="text-xs font-medium">赛事</span>
                  <Badge variant="outline" className="text-xs mt-1 border-orange-300 text-orange-700">未开通</Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Membership Reminder */}
        {membershipStatus.show && showMembershipReminder && (
          <div className="p-4">
            <Card className={`border-0 shadow-lg p-4 ${
              membershipStatus.isExpired 
                ? 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200' 
                : 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  membershipStatus.isExpired ? 'bg-red-500' : 'bg-amber-500'
                }`}>
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium mb-1">会员提醒</div>
                  <div className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {membershipStatus.message}，请及时续费享受完整学习服务
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="h-7 text-xs bg-gradient-to-r from-purple-500 to-blue-500"
                      onClick={() => onTabChange('account')}
                    >
                      立即续费
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 text-xs"
                      onClick={() => setShowMembershipReminder(false)}
                    >
                      稍后提醒
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-6 h-6 p-0"
                  onClick={() => setShowMembershipReminder(false)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* User Profile Section */}
        <div className="p-4 border-t border-border/50">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-background to-muted/30">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-3 flex-1 cursor-pointer hover:bg-accent/50 rounded-lg p-1 transition-colors">
                    <Avatar className="w-10 h-10 ring-2 ring-purple-500/20">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                        青
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-medium">青春编程者</div>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-48 mb-2" 
                  side="top" 
                  align="start"
                  sideOffset={8}
                >
                  <DropdownMenuItem 
                    onClick={() => onTabChange('account')}
                    className="cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    升级会员
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-4 h-4 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500">
                  {notifications.length}
                </Badge>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Button 
                onClick={() => setShowLoginModal(true)}
                size="lg"
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg"
              >
                <User className="w-5 h-5 mr-2" />
                登录/注册
              </Button>
            </div>
          )}
        </div>

        {/* Notifications Modal */}
        {showNotifications && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowNotifications(false)}
            />
            <Card className="fixed top-8 left-72 w-96 max-h-[80vh] overflow-y-auto z-[60] border-0 shadow-2xl">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    <span>功能更新通知</span>
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowNotifications(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/30">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{notification.content}</p>
                    <div className="mt-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          notification.type === 'feature' ? 'border-green-500 text-green-600' :
                          notification.type === 'update' ? 'border-blue-500 text-blue-600' :
                          'border-purple-500 text-purple-600'
                        }`}
                      >
                        {notification.type === 'feature' ? '新功能' : 
                         notification.type === 'update' ? '功能更新' : '体验优化'}
                      </Badge>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowNotifications(false)}
                  >
                    知道了
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </div>
  );
}