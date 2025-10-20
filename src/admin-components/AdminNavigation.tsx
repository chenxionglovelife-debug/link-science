import React from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import logoImage from 'figma:asset/f28ef52e719d21ce79d3472720153a686f415b9b.png';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ShoppingCart,
  Share2,
  Settings,
  Ticket,
  LogOut,
  Shield,
  Smartphone
} from 'lucide-react';

interface AdminUser {
  id: number;
  username: string;
  role: string;
  name: string;
  avatar: string;
  lastLogin: Date;
}

interface AdminNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  adminUser: AdminUser;
  onLogout: () => void;
}

export default function AdminNavigation({ activeTab, onTabChange, adminUser, onLogout }: AdminNavigationProps) {
  const navigationItems = [
    {
      id: 'dashboard',
      label: '数据看板',
      icon: LayoutDashboard,
      description: '核心业务指标'
    },
    {
      id: 'users',
      label: '用户管理',
      icon: Users,
      description: '用户信息管理'
    },
    {
      id: 'problems',
      label: '题库管理',
      icon: BookOpen,
      description: '题目试卷审核'
    },
    {
      id: 'order-finance',
      label: '订单财务',
      icon: ShoppingCart,
      description: '订单发票管理'
    },
    {
      id: 'distribution',
      label: '分销管理',
      icon: Share2,
      description: '提现分销设置'
    },
    {
      id: 'settings',
      label: '系统设置',
      icon: Settings,
      description: '商品内容字典'
    },
    {
      id: 'coupons',
      label: '券码管理',
      icon: Ticket,
      description: '券码信息管理'
    },
    {
      id: 'miniprogram',
      label: '小程序管理',
      icon: Smartphone,
      description: 'Banner比赛考级'
    }
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Badge className="bg-red-500 hover:bg-red-600">超级管理员</Badge>;
      case 'admin':
        return <Badge className="bg-blue-500 hover:bg-blue-600">管理员</Badge>;
      case 'moderator':
        return <Badge className="bg-green-500 hover:bg-green-600">内容审核员</Badge>;
      default:
        return <Badge variant="secondary">普通用户</Badge>;
    }
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border z-40">
      <div className="p-6">
        {/* Logo区域 */}
        <div className="flex items-center space-x-3 mb-8">
          <img 
            src={logoImage} 
            alt="链科学 LINK SCIENCE" 
            className="h-12 w-auto object-contain"
          />
        </div>
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">后台管理系统</p>
        </div>

        {/* 管理员信息 */}
        <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={adminUser.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {adminUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <p className="font-medium text-sm truncate">{adminUser.name}</p>
              </div>
              {getRoleBadge(adminUser.role)}
              <p className="text-xs text-muted-foreground mt-1">
                上次登录: {adminUser.lastLogin.toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>

        <Separator className="mb-6" />

        {/* 导航菜单 */}
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${isActive ? 'text-primary-foreground' : ''}`}>
                    {item.label}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>

        <Separator className="my-6" />

        {/* 退出登录 */}
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-left hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="w-5 h-5" />
          <div>
            <p className="font-medium text-sm">退出登录</p>
            <p className="text-xs text-muted-foreground">安全退出系统</p>
          </div>
        </button>
      </div>
    </div>
  );
}