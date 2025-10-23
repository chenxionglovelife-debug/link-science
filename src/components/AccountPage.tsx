import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  User, 
  BookOpen, 
  Trophy, 
  FileCheck, 
  CreditCard, 
  Users, 
  Gift, 
  Camera,
  Phone,
  Building,
  Lock,
  Crown,
  Calendar,
  TrendingUp,
  Target,
  Clock,
  Star,
  Award,
  Edit,
  CheckCircle,
  Share2,
  Copy,
  Check,
  UserPlus,
  RefreshCw
} from 'lucide-react';

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const [showBindOrgDialog, setShowBindOrgDialog] = useState(false);
  const [showBindSuccessDialog, setShowBindSuccessDialog] = useState(false);
  const [showSubjectSwitchDialog, setShowSubjectSwitchDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [invoiceType, setInvoiceType] = useState<'personal' | 'company'>('personal');
  const [invoiceData, setInvoiceData] = useState({
    type: 'personal',
    title: '',
    taxNumber: ''
  });
  const [orgData, setOrgData] = useState({
    code: '',
    phone: ''
  });
  const [invoiceStatuses, setInvoiceStatuses] = useState<Record<number, 'pending' | 'processing' | 'completed'>>({});
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);
  const [showInvoiceDownloadDialog, setShowInvoiceDownloadDialog] = useState(false);
  const [currentSubject, setCurrentSubject] = useState({
    organizer: '中国电子学会',
    subject: 'Scratch',
    level: '一级'
  });
  const [tempSubject, setTempSubject] = useState(currentSubject);
  const [userInfo, setUserInfo] = useState({
    nickname: '青春编程者',
    phone: '138****5678',
    institution: '链科学编程学院',
    avatar: '/placeholder-avatar.jpg'
  });

  const learningRecords = [
    { date: '2024-01-20', activity: '完成动态规划专题', score: 95, duration: 120 },
    { date: '2024-01-19', activity: '参加ACM模拟赛', score: 88, duration: 180 },
    { date: '2024-01-18', activity: '错题复习 - 树结构', score: 92, duration: 45 },
    { date: '2024-01-17', activity: '考点专练 - 排序算法', score: 90, duration: 60 },
    { date: '2024-01-16', activity: '赛考刷题 - 蓝桥杯', score: 85, duration: 90 }
  ];

  const chargeRecords = [
    { date: '2024-01-15', amount: 299, type: '个人年度会员', id: 1 },
    { date: '2023-12-20', amount: 99, type: '比赛会员', id: 2 },
    { date: '2023-11-10', amount: 199, type: '充值学习币', id: 3 }
  ];

  // 邀请好友相关数据
  const inviteData = {
    inviteCode: 'CQ2024ABC123',
    inviteLink: 'https://codequest.app/invite/CQ2024ABC123',
    totalInvites: 12,
    successfulInvites: 8,
    totalRewards: 480,
    pendingRewards: 120
  };

  const inviteRecords = [
    { name: '小明', joinDate: '2024-01-20', status: '已注册', membershipPurchased: true, reward: 60 },
    { name: '小红', joinDate: '2024-01-18', status: '已注册', membershipPurchased: true, reward: 60 },
    { name: '小李', joinDate: '2024-01-15', status: '已注册', membershipPurchased: false, reward: 0 },
    { name: '小王', joinDate: '2024-01-12', status: '已注册', membershipPurchased: true, reward: 60 }
  ];

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case '简单':
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">{difficulty}</Badge>;
      case '中等':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">{difficulty}</Badge>;
      case '困难':
        return <Badge className="bg-red-500 hover:bg-red-600 text-white">{difficulty}</Badge>;
      default:
        return <Badge variant="secondary">{difficulty}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '已完成':
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">{status}</Badge>;
      case '进行中':
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">{status}</Badge>;
      case '已批改':
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">{status}</Badge>;
      case '批改中':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteData.inviteLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-slate-900 dark:via-indigo-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header - User Profile */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 mb-10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="w-20 h-20 ring-4 ring-purple-500/20">
                    <AvatarImage src={userInfo.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white text-xl">
                      青
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">25</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{userInfo.nickname}</h1>
                  {/* 删除"加入于 2024年6月" */}
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs">
                        个人会员
                      </Badge>
                      <span className="text-xs text-muted-foreground">至2024-12-31</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs">
                        比赛会员
                      </Badge>
                      <span className="text-xs text-muted-foreground">至2024-12-31</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">186</div>
                <div className="text-sm text-muted-foreground">陪伴学习天数</div>
              </div>
            </div>
            {/* 删除等级进度条 */}
          </CardContent>
        </Card>

        <Tabs defaultValue="learning" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-6xl grid-cols-4 bg-muted/50 p-2 rounded-xl">
              <TabsTrigger value="learning" className="text-lg py-3">
                <BookOpen className="w-5 h-5 mr-2" />
                学习记录
              </TabsTrigger>
              <TabsTrigger value="membership" className="text-lg py-3">
                <Crown className="w-5 h-5 mr-2" />
                会员与服务
              </TabsTrigger>
              <TabsTrigger value="invite" className="text-lg py-3">
                <UserPlus className="w-5 h-5 mr-2" />
                邀请好友
              </TabsTrigger>
              <TabsTrigger value="account" className="text-lg py-3">
                <User className="w-5 h-5 mr-2" />
                账号信息管理
              </TabsTrigger>
            </TabsList>
          </div>

          {/* 学习记录 */}
          <TabsContent value="learning" className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span>最近学习活动</span>
                    <Badge variant="outline">5条记录</Badge>
                  </CardTitle>
                  {/* 当前科目切换 */}
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground">
                      当前科目：<span className="font-medium text-foreground">{currentSubject.subject}{currentSubject.level}</span>
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setTempSubject(currentSubject);
                        setShowSubjectSwitchDialog(true);
                      }}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      切换科目
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {learningRecords.map((record, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border bg-gradient-to-r from-background to-muted/30 hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {record.score}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{record.activity}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{record.date}</span>
                        <span>•</span>
                        <span>用时 {record.duration}分钟</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1 text-yellow-500" />
                          {record.score}分
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      查看详情
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 会员与服务 */}
          <TabsContent value="membership" className="space-y-8">
            <div className="grid grid-cols-3 gap-6">
              {/* 券码激活卡片 */}
              <div className="col-span-3">
                <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Gift className="w-5 h-5 text-green-500" />
                      <span>券码激活</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-4">
                      <Input placeholder="请输入券码" className="flex-1" />
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                        激活
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      输入券码即可激活对应的会员服务或学习币
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 充值记录 */}
              <div className="col-span-1">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5 text-green-500" />
                      <span>充值记录</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {chargeRecords.slice(0, 3).map((record, index) => {
                      const status = invoiceStatuses[record.id] || 'pending';
                      return (
                        <div key={index} className="p-3 rounded-lg border bg-gradient-to-r from-background to-muted/30">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                <CreditCard className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">{record.type}</h4>
                                <div className="text-xs text-muted-foreground">{record.date}</div>
                              </div>
                            </div>
                            <div className="font-bold text-green-600">¥{record.amount}</div>
                          </div>
                          {status === 'pending' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full text-xs"
                              onClick={() => {
                                setSelectedInvoiceId(record.id);
                                setShowInvoiceDialog(true);
                              }}
                            >
                              申请开票
                            </Button>
                          )}
                          {status === 'processing' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full text-xs bg-blue-50 dark:bg-blue-950/50 text-blue-600 border-blue-200"
                              disabled
                            >
                              <Clock className="w-3 h-3 mr-1 animate-spin" />
                              开票中
                            </Button>
                          )}
                          {status === 'completed' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full text-xs bg-green-50 dark:bg-green-950/50 text-green-600 border-green-200 hover:bg-green-100"
                              onClick={() => {
                                setSelectedInvoiceId(record.id);
                                setShowInvoiceDownloadDialog(true);
                              }}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              已开票
                            </Button>
                          )}
                        </div>
                      );
                    })}
                    <Button variant="outline" size="sm" className="w-full">
                      查看更多
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* 赛事会员 */}
              <div className="col-span-1">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      <span>赛事会员</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4">
                        <h4 className="font-medium mb-2">年度赛事会员</h4>
                        <div className="text-2xl font-bold text-amber-600 mb-2">¥599</div>
                        <div className="text-sm text-muted-foreground mb-3">参与竞赛刷题</div>
                        <Button size="sm" className="w-full bg-gradient-to-r from-amber-500 to-orange-500">
                          购买
                        </Button>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 考级会员 */}
              <div className="col-span-1 space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Crown className="w-5 h-5 text-purple-500" />
                      <span>考级会员</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4">
                        <h4 className="font-medium mb-2">个人季度会员</h4>
                        <div className="text-2xl font-bold text-purple-600 mb-2">¥99</div>
                        <div className="text-sm text-muted-foreground mb-3">享受基础学习功能</div>
                        <Button size="sm" className="w-full bg-gradient-to-r from-purple-500 to-blue-500">
                          购买
                        </Button>
                      </Card>
                      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4">
                        <h4 className="font-medium mb-2">个人年度会员</h4>
                        <div className="text-2xl font-bold text-purple-600 mb-2">¥299</div>
                        <div className="text-sm text-muted-foreground mb-3">享受基础学习功能</div>
                        <Button size="sm" className="w-full bg-gradient-to-r from-purple-500 to-blue-500">
                          购买
                        </Button>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 邀请好友 - 替换作业批改 */}
          <TabsContent value="invite" className="space-y-8">
            {/* 邀请概览 */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserPlus className="w-5 h-5 text-blue-500" />
                    <span>邀请统计</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <div className="text-2xl font-bold text-blue-600">{inviteData.totalInvites}</div>
                      <div className="text-sm text-muted-foreground">总邀请人数</div>
                    </div>
                    <div className="p-4 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <div className="text-2xl font-bold text-green-600">{inviteData.successfulInvites}</div>
                      <div className="text-sm text-muted-foreground">成功邀请</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gift className="w-5 h-5 text-green-500" />
                    <span>返现统计</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <div className="text-2xl font-bold text-green-600">¥{inviteData.totalRewards}</div>
                      <div className="text-sm text-muted-foreground">累计返现</div>
                    </div>
                    <div className="p-4 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <div className="text-2xl font-bold text-orange-600">¥{inviteData.pendingRewards}</div>
                      <div className="text-sm text-muted-foreground">待结算</div>
                    </div>
                  </div>
                  {inviteData.pendingRewards > 0 && (
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      onClick={() => {
                        // 这里添加申请提现逻辑
                        alert('申请提现功能正在开发中');
                      }}
                    >
                      申请提现 ¥{inviteData.pendingRewards}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 邀请方式 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Share2 className="w-5 h-5 text-purple-500" />
                  <span>邀请方式</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <h3 className="font-semibold text-lg mb-4">分享邀请链接</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">我的邀请码</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Input value={inviteData.inviteCode} readOnly className="flex-1" />
                        <Button size="sm" onClick={handleCopyInviteLink}>
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">邀请链接</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Input value={inviteData.inviteLink} readOnly className="flex-1 text-sm" />
                        <Button size="sm" onClick={handleCopyInviteLink}>
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                  <h3 className="font-semibold text-lg mb-4">返现规则</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 好友通过你的邀请链接成功注册并购买会员，你可获得对应返现</li>
                    <li>• 好友购买个人会员：返现 ¥30</li>
                    <li>• 好友购买赛事会员：返现 ¥60</li>
                    <li>• 返现将在好友购买成功后 3-5 个工作日内到账</li>
                    <li>• 每月返现总额上限为 ¥1000</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 邀请记录 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span>邀请记录</span>
                  <Badge variant="outline">{inviteRecords.length}人</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {inviteRecords.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-background to-muted/30">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {record.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{record.name}</h4>
                        <div className="text-sm text-muted-foreground">
                          {record.joinDate} 注册
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className={record.membershipPurchased ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}>
                          {record.membershipPurchased ? "已购买会员" : "未购买会员"}
                        </Badge>
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        {record.reward > 0 ? `+¥${record.reward}` : '待购买'}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 账号信息管理 */}
          <TabsContent value="account" className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-blue-500" />
                    <span>基本信息</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? '保存' : '编辑'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nickname">昵称</Label>
                    <Input
                      id="nickname"
                      value={userInfo.nickname}
                      disabled={!isEditing}
                      onChange={(e) => setUserInfo({...userInfo, nickname: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">手机号</Label>
                    <Input
                      id="phone"
                      value={userInfo.phone}
                      disabled={!isEditing}
                      onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution">所属机构</Label>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50 border-purple-200 dark:border-purple-800 hover:border-purple-300"
                      onClick={() => setShowBindOrgDialog(true)}
                    >
                      <Building className="w-4 h-4 mr-2 text-purple-500" />
                      <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-medium">
                        绑定机构获取福利
                      </span>
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>密码</Label>
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="w-4 h-4 mr-2" />
                      修改密码
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Label>头像设置</Label>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={userInfo.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                        青
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      更换头像
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 发票申请对话框 */}
      <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
        <DialogContent className="sm:max-w-[500px] gap-0">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-blue-500" />
              <span>申请开票</span>
            </DialogTitle>
            <DialogDescription>
              请填写发票信息，我们将尽快为您开具发票
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* 开票类型选择 */}
            <div className="space-y-3">
              <Label>开票类型</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={invoiceType === 'personal' ? 'default' : 'outline'}
                  className={invoiceType === 'personal' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : ''}
                  onClick={() => {
                    setInvoiceType('personal');
                    setInvoiceData({...invoiceData, type: 'personal'});
                  }}
                >
                  个人
                </Button>
                <Button
                  variant={invoiceType === 'company' ? 'default' : 'outline'}
                  className={invoiceType === 'company' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : ''}
                  onClick={() => {
                    setInvoiceType('company');
                    setInvoiceData({...invoiceData, type: 'company'});
                  }}
                >
                  企业
                </Button>
              </div>
            </div>

            {/* 发票抬头 */}
            <div className="space-y-2">
              <Label htmlFor="invoice-title">发票抬头</Label>
              <Input
                id="invoice-title"
                placeholder={invoiceType === 'personal' ? '请输入个人姓名' : '请输入企业名称'}
                value={invoiceData.title}
                onChange={(e) => setInvoiceData({...invoiceData, title: e.target.value})}
              />
            </div>

            {/* 企业税号（仅企业类型显示） */}
            {invoiceType === 'company' && (
              <div className="space-y-2">
                <Label htmlFor="tax-number">单位税号</Label>
                <Input
                  id="tax-number"
                  placeholder="请输入统一社会信用代码"
                  value={invoiceData.taxNumber}
                  onChange={(e) => setInvoiceData({...invoiceData, taxNumber: e.target.value})}
                />
              </div>
            )}

            {/* 提交按钮 */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowInvoiceDialog(false)}>
                取消
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-500"
                onClick={() => {
                  if (selectedInvoiceId) {
                    // 提交后设置为开票中
                    setInvoiceStatuses(prev => ({
                      ...prev,
                      [selectedInvoiceId]: 'processing'
                    }));
                    
                    // 模拟3秒后开票成功
                    setTimeout(() => {
                      setInvoiceStatuses(prev => ({
                        ...prev,
                        [selectedInvoiceId]: 'completed'
                      }));
                    }, 3000);
                  }
                  setShowInvoiceDialog(false);
                }}
              >
                提交申请
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 绑定机构对话框 */}
      <Dialog open={showBindOrgDialog} onOpenChange={setShowBindOrgDialog}>
        <DialogContent className="sm:max-w-[450px] gap-0">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-purple-500" />
              <span>绑定机构获取福利</span>
            </DialogTitle>
            <DialogDescription>
              绑定机构后可享受专属优惠和学习资源
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* 机构编码 */}
            <div className="space-y-2">
              <Label htmlFor="org-code">机构编码</Label>
              <Input
                id="org-code"
                placeholder="请输入机构编码"
                value={orgData.code}
                onChange={(e) => setOrgData({...orgData, code: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                机构编码可向您的机构管理员获取
              </p>
            </div>

            {/* 考试报名手机号 */}
            <div className="space-y-2">
              <Label htmlFor="exam-phone">考试报名手机号</Label>
              <Input
                id="exam-phone"
                placeholder="请输入考试报名时使用的手机号"
                value={orgData.phone}
                onChange={(e) => setOrgData({...orgData, phone: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                用于验证您的考试报名信息
              </p>
            </div>

            {/* 提交按钮 */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowBindOrgDialog(false)}>
                取消
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-500 to-blue-500"
                onClick={() => {
                  setShowBindOrgDialog(false);
                  setShowBindSuccessDialog(true);
                }}
              >
                <Building className="w-4 h-4 mr-2" />
                绑定机构
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 绑定成功提示对话框 */}
      <Dialog open={showBindSuccessDialog} onOpenChange={setShowBindSuccessDialog}>
        <DialogContent className="sm:max-w-[400px] gap-0">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">绑定成功！</h3>
            <p className="text-muted-foreground text-center mb-6">
              恭喜您成功绑定机构<br/>
              现在可以享受机构专属福利了
            </p>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-blue-500 w-full"
              onClick={() => setShowBindSuccessDialog(false)}
            >
              确定
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 科目切换对话框 */}
      <Dialog open={showSubjectSwitchDialog} onOpenChange={setShowSubjectSwitchDialog}>
        <DialogContent className="sm:max-w-[450px] gap-0">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <span>切换科目</span>
            </DialogTitle>
            <DialogDescription>
              选择您要切换的主办方、科目和等级
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* 主办方选择 */}
            <div className="space-y-2">
              <Label>主办方</Label>
              <Select
                value={tempSubject.organizer}
                onValueChange={(value) => setTempSubject({...tempSubject, organizer: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择主办方" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="中国电子学会">中国电子学会</SelectItem>
                  <SelectItem value="中国计算机学会">中国计算机学会</SelectItem>
                  <SelectItem value="全国青少年信息学奥林匹克">全国青少年信息学奥林匹克</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 科目选择 */}
            <div className="space-y-2">
              <Label>科目</Label>
              <Select
                value={tempSubject.subject}
                onValueChange={(value) => setTempSubject({...tempSubject, subject: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择科目" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Scratch">Scratch</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="C++">C++</SelectItem>
                  <SelectItem value="机器人编程">机器人编程</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 等级选择 */}
            <div className="space-y-2">
              <Label>等级</Label>
              <Select
                value={tempSubject.level}
                onValueChange={(value) => setTempSubject({...tempSubject, level: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择等级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="一级">一级</SelectItem>
                  <SelectItem value="二级">二级</SelectItem>
                  <SelectItem value="三级">三级</SelectItem>
                  <SelectItem value="四级">四级</SelectItem>
                  <SelectItem value="五级">五级</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 提交按钮 */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowSubjectSwitchDialog(false)}>
                取消
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-500"
                onClick={() => {
                  setCurrentSubject(tempSubject);
                  setShowSubjectSwitchDialog(false);
                }}
              >
                确定
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 发票下载对话框 */}
      <Dialog open={showInvoiceDownloadDialog} onOpenChange={setShowInvoiceDownloadDialog}>
        <DialogContent className="sm:max-w-[450px] gap-0">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-green-500" />
              <span>电子发票</span>
            </DialogTitle>
            <DialogDescription>
              您的发票已开具完成，可以下载查看
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* 发票信息预览 */}
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-lg border border-green-200 dark:border-green-800">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">发票号码：</span>
                  <span className="font-mono">20240111{selectedInvoiceId?.toString().padStart(6, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">开票日期：</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">发票类型：</span>
                  <span>电子普通发票</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">金额合计：</span>
                  <span className="text-lg font-bold text-green-600">
                    ¥{chargeRecords.find(r => r.id === selectedInvoiceId)?.amount || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* 下载按钮 */}
            <Button 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              onClick={() => {
                // 模拟下载发票
                const link = document.createElement('a');
                link.href = '#';
                link.download = `电子发票_${selectedInvoiceId}.pdf`;
                // 实际项目中这里应该是真实的PDF文件URL
                alert('发票下载成功！');
                setShowInvoiceDownloadDialog(false);
              }}
            >
              <FileCheck className="w-4 h-4 mr-2" />
              下载发票PDF
            </Button>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowInvoiceDownloadDialog(false)}
            >
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}