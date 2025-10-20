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
  UserPlus
} from 'lucide-react';

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [copied, setCopied] = useState(false);
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
    { date: '2024-01-15', amount: 299, type: '个人年度会员', status: '成功' },
    { date: '2023-12-20', amount: 99, type: '比赛会员', status: '成功' },
    { date: '2023-11-10', amount: 199, type: '充值学习币', status: '成功' }
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
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>最近学习活动</span>
                  <Badge variant="outline">5条记录</Badge>
                </CardTitle>
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
                    {chargeRecords.slice(0, 3).map((record, index) => (
                      <div key={index} className="p-3 rounded-lg border bg-gradient-to-r from-background to-muted/30">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{record.type}</h4>
                            <div className="text-xs text-muted-foreground">{record.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">¥{record.amount}</div>
                          <Badge className="bg-green-500 text-white text-xs">{record.status}</Badge>
                        </div>
                      </div>
                    ))}
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
                    <Input
                      id="institution"
                      value={userInfo.institution}
                      disabled={!isEditing}
                      onChange={(e) => setUserInfo({...userInfo, institution: e.target.value})}
                    />
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
    </div>
  );
}