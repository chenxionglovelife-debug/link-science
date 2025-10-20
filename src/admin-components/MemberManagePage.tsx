import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Crown, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  Target,
  Clock,
  RefreshCw,
  Download,
  Settings
} from 'lucide-react';

interface Member {
  id: number;
  userId: number;
  userName: string;
  email: string;
  memberType: 'personal_quarterly' | 'personal_yearly' | 'contest_yearly';
  status: 'active' | 'expired' | 'cancelled';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  totalPaid: number;
  studyTime: number; // 分钟
  problemsSolved: number;
  lastActive: Date;
}

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: number; // 月数
  features: string[];
  isActive: boolean;
  subscriberCount: number;
}

export default function MemberManagePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [memberTypeFilter, setMemberTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showMemberDetail, setShowMemberDetail] = useState(false);

  // 会员数据 - 对应前台用户的会员系统
  const members: Member[] = [
    {
      id: 1,
      userId: 1001,
      userName: '张明',
      email: 'zhang.ming@example.com',
      memberType: 'contest_yearly',
      status: 'active',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2025-01-15'),
      autoRenew: true,
      totalPaid: 599,
      studyTime: 2450,
      problemsSolved: 189,
      lastActive: new Date('2024-12-22')
    },
    {
      id: 2,
      userId: 1002,
      userName: '李小丽',
      email: 'li.xiaoli@example.com',
      memberType: 'personal_yearly',
      status: 'active',
      startDate: new Date('2024-02-20'),
      endDate: new Date('2025-02-20'),
      autoRenew: true,
      totalPaid: 299,
      studyTime: 1890,
      problemsSolved: 156,
      lastActive: new Date('2024-12-21')
    },
    {
      id: 3,
      userId: 1003,
      userName: '王浩',
      email: 'wang.hao@example.com',
      memberType: 'personal_quarterly',
      status: 'active',
      startDate: new Date('2024-09-10'),
      endDate: new Date('2024-12-10'),
      autoRenew: false,
      totalPaid: 99,
      studyTime: 567,
      problemsSolved: 98,
      lastActive: new Date('2024-12-20')
    },
    {
      id: 4,
      userId: 1004,
      userName: '陈小雨',
      email: 'chen.xiaoyu@example.com',
      memberType: 'personal_yearly',
      status: 'expired',
      startDate: new Date('2023-05-15'),
      endDate: new Date('2024-05-15'),
      autoRenew: false,
      totalPaid: 299,
      studyTime: 890,
      problemsSolved: 67,
      lastActive: new Date('2024-12-18')
    }
  ];

  // 会员套餐配置 - 对应前台AccountPage的会员系统
  const membershipPlans: MembershipPlan[] = [
    {
      id: 'personal_quarterly',
      name: '个人季度会员',
      price: 99,
      duration: 3,
      features: ['AI助手无限制', '完整题库访问', '学习报告详细版', '错题本不限制'],
      isActive: true,
      subscriberCount: 1234
    },
    {
      id: 'personal_yearly',
      name: '个人年度会员',
      price: 299,
      duration: 12,
      features: ['个人季度权益', '年度学习报告', '专属学习顾问', '优先客服支持'],
      isActive: true,
      subscriberCount: 1567
    },
    {
      id: 'contest_yearly',
      name: '赛事年度会员',
      price: 599,
      duration: 12,
      features: ['所有功能', '竞赛题库', '赛事培训', '1对1辅导', '证书认证'],
      isActive: true,
      subscriberCount: 655
    }
  ];

  // 会员收入趋势数据
  const revenueData = [
    { month: '01月', personal_quarterly: 12300, personal_yearly: 45600, contest_yearly: 39200 },
    { month: '02月', personal_quarterly: 13200, personal_yearly: 48900, contest_yearly: 42100 },
    { month: '03月', personal_quarterly: 11800, personal_yearly: 46700, contest_yearly: 38900 },
    { month: '04月', personal_quarterly: 14100, personal_yearly: 52300, contest_yearly: 44800 },
    { month: '05月', personal_quarterly: 15600, personal_yearly: 55400, contest_yearly: 47200 },
    { month: '06月', personal_quarterly: 14800, personal_yearly: 53100, contest_yearly: 45600 }
  ];

  // 会员分布数据
  const memberDistribution = [
    { name: '个人季度会员', value: 1234, color: '#3b82f6' },
    { name: '个人年度会员', value: 1567, color: '#10b981' },
    { name: '赛事年度会员', value: 655, color: '#f59e0b' }
  ];

  // 会员留存率数据
  const retentionData = [
    { month: 1, rate: 100 },
    { month: 2, rate: 89 },
    { month: 3, rate: 78 },
    { month: 6, rate: 65 },
    { month: 12, rate: 52 }
  ];

  const getMemberTypeBadge = (type: string) => {
    switch (type) {
      case 'contest_yearly':
        return <Badge className="bg-purple-500 hover:bg-purple-600"><Crown className="w-3 h-3 mr-1" />赛事年度</Badge>;
      case 'personal_yearly':
        return <Badge className="bg-blue-500 hover:bg-blue-600"><Crown className="w-3 h-3 mr-1" />个人年度</Badge>;
      case 'personal_quarterly':
        return <Badge className="bg-green-500 hover:bg-green-600"><Crown className="w-3 h-3 mr-1" />个人季度</Badge>;
      default:
        return <Badge variant="secondary">未知</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">有效</Badge>;
      case 'expired':
        return <Badge className="bg-red-500 hover:bg-red-600">已过期</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-500 hover:bg-gray-600">已取消</Badge>;
      default:
        return <Badge variant="secondary">未知</Badge>;
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = memberTypeFilter === 'all' || member.memberType === memberTypeFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    setShowMemberDetail(true);
  };

  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const calculateDaysRemaining = (endDate: Date) => {
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-purple-50/30 dark:from-slate-900 dark:via-amber-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-500/10 to-purple-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <span>会员管理</span>
                  </h1>
                  <p className="text-muted-foreground mt-2">管理会员用户、套餐配置和收入统计</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="px-3 py-1">
                    总会员: {members.filter(m => m.status === 'active').length}
                  </Badge>
                  <Button className="bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600">
                    <Settings className="w-4 h-4 mr-2" />
                    套餐配置
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 关键指标卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-green-600/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">活跃会员</p>
                  <p className="text-2xl font-bold">{members.filter(m => m.status === 'active').length}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-sm text-green-600">+8.7%</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">月收入</p>
                  <p className="text-2xl font-bold">¥53,100</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-sm text-green-600">+12.3%</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">续费率</p>
                  <p className="text-2xl font-bold">78%</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-sm text-green-600">+3.2%</span>
                  </div>
                </div>
                <RefreshCw className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500/10 to-amber-600/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">平均价值</p>
                  <p className="text-2xl font-bold">¥365</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-sm text-green-600">+5.4%</span>
                  </div>
                </div>
                <Award className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 主要内容区域 */}
        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="members">会员列表</TabsTrigger>
            <TabsTrigger value="plans">套餐管理</TabsTrigger>
            <TabsTrigger value="analytics">收入分析</TabsTrigger>
            <TabsTrigger value="retention">留存分析</TabsTrigger>
          </TabsList>

          {/* 会员列表 */}
          <TabsContent value="members" className="space-y-6">
            {/* 筛选和搜索 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="搜索会员姓名或邮箱..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={memberTypeFilter} onValueChange={setMemberTypeFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="会员类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部类型</SelectItem>
                      <SelectItem value="personal_quarterly">个人季度</SelectItem>
                      <SelectItem value="personal_yearly">个人年度</SelectItem>
                      <SelectItem value="contest_yearly">赛事年度</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="状态筛选" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部状态</SelectItem>
                      <SelectItem value="active">有效</SelectItem>
                      <SelectItem value="expired">已过期</SelectItem>
                      <SelectItem value="cancelled">已取消</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* 会员表格 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-amber-500" />
                  <span>会员列表</span>
                  <Badge variant="outline">{filteredMembers.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>会员信息</TableHead>
                      <TableHead>会员类型</TableHead>
                      <TableHead>有效期</TableHead>
                      <TableHead>学习数据</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{member.userName}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                            <p className="text-xs text-muted-foreground">ID: {member.userId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            {getMemberTypeBadge(member.memberType)}
                            <p className="text-sm text-muted-foreground mt-1">¥{member.totalPaid}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{member.endDate.toLocaleDateString()}</p>
                            <p className="text-muted-foreground">
                              剩余 {calculateDaysRemaining(member.endDate)} 天
                            </p>
                            {member.autoRenew && (
                              <Badge variant="outline" className="text-xs mt-1">自动续费</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>学习: {formatStudyTime(member.studyTime)}</p>
                            <p>解题: {member.problemsSolved} 题</p>
                            <p className="text-muted-foreground">
                              活跃: {member.lastActive.toLocaleDateString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(member.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewMember(member)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 套餐管理 */}
          <TabsContent value="plans" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {membershipPlans.map((plan) => (
                <Card key={plan.id} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Crown className="w-5 h-5 text-amber-500" />
                        <span>{plan.name}</span>
                      </CardTitle>
                      <Switch checked={plan.isActive} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-amber-600">¥{plan.price}</p>
                      <p className="text-sm text-muted-foreground">{plan.duration}个月</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">功能特权</h4>
                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">订阅用户</span>
                      <span className="font-medium">{plan.subscriberCount.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        编辑
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Target className="w-4 h-4 mr-2" />
                        统计
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 收入分析 */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <span>月度收入趋势</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="personal_quarterly" stackId="a" fill="#3b82f6" name="个人季度" />
                      <Bar dataKey="personal_yearly" stackId="a" fill="#10b981" name="个人年度" />
                      <Bar dataKey="contest_yearly" stackId="a" fill="#f59e0b" name="赛事年度" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    <span>会员类型分布</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={memberDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {memberDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>收入详细统计</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    导出报告
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <p className="text-2xl font-bold mb-2">¥318,600</p>
                    <p className="text-sm text-muted-foreground">总收入(6个月)</p>
                    <p className="text-xs text-green-600 mt-1">+15.6% 同比</p>
                  </div>
                  
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-2xl font-bold mb-2">3,456</p>
                    <p className="text-sm text-muted-foreground">付费用户总数</p>
                    <p className="text-xs text-blue-600 mt-1">+12.3% 环比</p>
                  </div>
                  
                  <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                    <Award className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                    <p className="text-2xl font-bold mb-2">¥365</p>
                    <p className="text-sm text-muted-foreground">用户平均价值</p>
                    <p className="text-xs text-purple-600 mt-1">+5.4% 提升</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 留存分析 */}
          <TabsContent value="retention" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <RefreshCw className="w-5 h-5 text-purple-500" />
                  <span>会员留存率分析</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={retentionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>续费情况统计</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div>
                        <p className="font-medium">自动续费用户</p>
                        <p className="text-sm text-muted-foreground">开启自动续费的会员</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">78%</p>
                        <p className="text-xs text-green-600">+3.2% 上月</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div>
                        <p className="font-medium">手动续费用户</p>
                        <p className="text-sm text-muted-foreground">主动续费的会员</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">15%</p>
                        <p className="text-xs text-blue-600">-1.1% 上月</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div>
                        <p className="font-medium">流失用户</p>
                        <p className="text-sm text-muted-foreground">未续费的会员</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">7%</p>
                        <p className="text-xs text-red-600">-2.1% 上月</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>会员价值分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h4 className="font-medium mb-2">高价值用户(赛事年度)</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">平均学习时长</p>
                          <p className="font-bold">47.9 分钟/日</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">续费率</p>
                          <p className="font-bold">89%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium mb-2">中价值用户(个人年度)</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">平均学习时长</p>
                          <p className="font-bold">32.4 分钟/日</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">续费率</p>
                          <p className="font-bold">76%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-medium mb-2">基础用户(个人季度)</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">平均学习时长</p>
                          <p className="font-bold">18.9 分钟/日</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">续费率</p>
                          <p className="font-bold">65%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* 会员详情弹窗 */}
        <Dialog open={showMemberDetail} onOpenChange={setShowMemberDetail}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <Crown className="w-6 h-6" />
                <span>会员详情</span>
              </DialogTitle>
            </DialogHeader>
            
            {selectedMember && (
              <div className="space-y-6">
                {/* 基本信息 */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">会员姓名</p>
                      <p className="font-medium">{selectedMember.userName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">邮箱地址</p>
                      <p className="font-medium">{selectedMember.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">会员类型</p>
                      {getMemberTypeBadge(selectedMember.memberType)}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">开始时间</p>
                      <p className="font-medium">{selectedMember.startDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">到期时间</p>
                      <p className="font-medium">{selectedMember.endDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">状态</p>
                      {getStatusBadge(selectedMember.status)}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 付费信息 */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">¥{selectedMember.totalPaid}</p>
                    <p className="text-sm text-muted-foreground">累计付费</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{formatStudyTime(selectedMember.studyTime)}</p>
                    <p className="text-sm text-muted-foreground">学习时长</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                    <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{selectedMember.problemsSolved}</p>
                    <p className="text-sm text-muted-foreground">解题数量</p>
                  </div>
                </div>

                <Separator />

                {/* 操作按钮 */}
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">
                    续期会员
                  </Button>
                  <Button variant="outline">
                    修改套餐
                  </Button>
                  <Button variant="outline" className="text-red-600 hover:text-red-700">
                    取消会员
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}