import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  BookOpen,
  Award,
  Target,
  Brain,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

export default function LearningDataPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [dataType, setDataType] = useState('overview');

  // 用户学习趋势数据
  const learningTrendData = [
    { date: '12-15', users: 1200, studyTime: 2400, problems: 456 },
    { date: '12-16', users: 1350, studyTime: 2650, problems: 523 },
    { date: '12-17', users: 1180, studyTime: 2180, problems: 412 },
    { date: '12-18', users: 1420, studyTime: 2890, problems: 634 },
    { date: '12-19', users: 1560, studyTime: 3120, problems: 687 },
    { date: '12-20', users: 1380, studyTime: 2760, problems: 578 },
    { date: '12-21', users: 1450, studyTime: 2900, problems: 612 }
  ];

  // 学习科目分布
  const subjectDistribution = [
    { name: 'Python', students: 3456, hours: 8900, color: '#3b82f6' },
    { name: 'C++', students: 2134, hours: 6750, color: '#10b981' },
    { name: 'Scratch', students: 1876, hours: 4200, color: '#f59e0b' },
    { name: '机器人技术', students: 987, hours: 2340, color: '#8b5cf6' }
  ];

  // 学习时长分布
  const studyTimeDistribution = [
    { range: '0-30分钟', count: 2340, percentage: 23 },
    { range: '30-60分钟', count: 3456, percentage: 34 },
    { range: '1-2小时', count: 2890, percentage: 29 },
    { range: '2-4小时', count: 1234, percentage: 12 },
    { range: '4小时以上', count: 234, percentage: 2 }
  ];

  // 错题率分析
  const errorRateData = [
    { subject: 'Python基础', errorRate: 15, totalProblems: 1200 },
    { subject: 'C++语法', errorRate: 22, totalProblems: 890 },
    { subject: '算法设计', errorRate: 35, totalProblems: 567 },
    { subject: '数据结构', errorRate: 28, totalProblems: 678 },
    { subject: '图论算法', errorRate: 45, totalProblems: 234 }
  ];

  // 用户等级分布
  const userLevelData = [
    { level: '1-5级', count: 3456, percentage: 35 },
    { level: '6-10级', count: 2890, percentage: 29 },
    { level: '11-15级', count: 2234, percentage: 22 },
    { level: '16-20级', count: 1123, percentage: 11 },
    { level: '20级以上', count: 345, percentage: 3 }
  ];

  // AI助手使用数据
  const aiUsageData = [
    { date: '12-15', interactions: 890, avgResponse: 2.3, satisfaction: 4.2 },
    { date: '12-16', interactions: 1020, avgResponse: 2.1, satisfaction: 4.4 },
    { date: '12-17', interactions: 756, avgResponse: 2.5, satisfaction: 4.1 },
    { date: '12-18', interactions: 1134, avgResponse: 2.0, satisfaction: 4.5 },
    { date: '12-19', interactions: 1289, avgResponse: 1.9, satisfaction: 4.6 },
    { date: '12-20', interactions: 1067, avgResponse: 2.2, satisfaction: 4.3 },
    { date: '12-21', interactions: 1145, avgResponse: 2.1, satisfaction: 4.4 }
  ];

  // 会员学习数据对比
  const memberVsFreeData = [
    { date: '12-15', memberTime: 45.2, freeTime: 23.1, memberProblems: 12.3, freeProblems: 6.7 },
    { date: '12-16', memberTime: 48.7, freeTime: 25.4, memberProblems: 13.1, freeProblems: 7.2 },
    { date: '12-17', memberTime: 42.3, freeTime: 21.8, memberProblems: 11.5, freeProblems: 6.1 },
    { date: '12-18', memberTime: 51.2, freeTime: 26.9, memberProblems: 14.2, freeProblems: 7.8 },
    { date: '12-19', memberTime: 49.8, freeTime: 24.7, memberProblems: 13.7, freeProblems: 7.1 },
    { date: '12-20', memberTime: 46.5, freeTime: 23.8, memberProblems: 12.8, freeProblems: 6.9 },
    { date: '12-21', memberTime: 47.9, freeTime: 25.1, memberProblems: 13.3, freeProblems: 7.4 }
  ];

  const statsCards = [
    {
      title: '日活跃用户',
      value: '8,932',
      change: '+12.3%',
      icon: Users,
      color: 'blue'
    },
    {
      title: '日学习时长',
      value: '2,890',
      unit: '小时',
      change: '+8.7%',
      icon: Clock,
      color: 'green'
    },
    {
      title: '日解题数',
      value: '15,432',
      change: '+15.2%',
      icon: BookOpen,
      color: 'purple'
    },
    {
      title: 'AI对话次数',
      value: '3,567',
      change: '+23.1%',
      icon: Brain,
      color: 'amber'
    }
  ];

  const getStatColor = (color: string) => {
    const colors = {
      blue: 'from-blue-500/10 to-blue-600/10',
      green: 'from-green-500/10 to-green-600/10',
      purple: 'from-purple-500/10 to-purple-600/10',
      amber: 'from-amber-500/10 to-amber-600/10'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-green-50/30 dark:from-slate-900 dark:via-amber-900/20 dark:to-green-900/20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-500/10 to-green-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-green-500 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <span>学习数据分析</span>
                  </h1>
                  <p className="text-muted-foreground mt-2">全面分析用户学习行为和平台使用数据</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">最近7天</SelectItem>
                      <SelectItem value="30d">最近30天</SelectItem>
                      <SelectItem value="90d">最近90天</SelectItem>
                      <SelectItem value="1y">最近1年</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    刷新数据
                  </Button>
                  <Button className="bg-gradient-to-r from-amber-500 to-green-500 hover:from-amber-600 hover:to-green-600">
                    <Download className="w-4 h-4 mr-2" />
                    导出报告
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 关键指标卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className={`border-0 shadow-lg bg-gradient-to-br ${getStatColor(stat.color)}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                      <div className="flex items-baseline space-x-2">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        {stat.unit && <span className="text-sm text-muted-foreground">{stat.unit}</span>}
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="text-sm text-green-600">{stat.change}</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 bg-${stat.color}-500 rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 详细分析图表 */}
        <div className="space-y-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">学习概览</TabsTrigger>
              <TabsTrigger value="subjects">科目分析</TabsTrigger>
              <TabsTrigger value="errors">错题分析</TabsTrigger>
              <TabsTrigger value="ai">AI使用</TabsTrigger>
              <TabsTrigger value="members">会员对比</TabsTrigger>
            </TabsList>

            {/* 学习概览 */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                      <span>用户活跃度趋势</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={learningTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-green-500" />
                      <span>学习时长分布</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {studyTimeDistribution.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium min-w-0">{item.range}</span>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold">{item.count}</span>
                            <span className="text-xs text-muted-foreground ml-1">({item.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-purple-500" />
                    <span>综合学习数据趋势</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={learningTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line yAxisId="left" type="monotone" dataKey="studyTime" stroke="#8b5cf6" strokeWidth={2} name="学习时长(分钟)" />
                      <Line yAxisId="right" type="monotone" dataKey="problems" stroke="#10b981" strokeWidth={2} name="解题数量" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 科目分析 */}
            <TabsContent value="subjects" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-blue-500" />
                      <span>科目学习人数</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={subjectDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="students"
                          label={({ name, percentage }) => `${name}: ${(percentage * 100).toFixed(0)}%`}
                        >
                          {subjectDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5 text-green-500" />
                      <span>科目学习时长对比</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={subjectDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="hours" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>科目详细统计</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {subjectDistribution.map((subject, index) => (
                      <div key={index} className="p-4 bg-gradient-to-br from-background to-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: subject.color }}
                          />
                          <h4 className="font-medium">{subject.name}</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">学习人数:</span>
                            <span className="font-medium">{subject.students.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">学习时长:</span>
                            <span className="font-medium">{subject.hours.toLocaleString()}h</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">人均时长:</span>
                            <span className="font-medium">{(subject.hours / subject.students).toFixed(1)}h</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 错题分析 */}
            <TabsContent value="errors" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-red-500" />
                    <span>各科目错题率分析</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={errorRateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="errorRate" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span>用户等级分布</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userLevelData.map((level, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium min-w-0">{level.level}</span>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${level.percentage}%` }}
                              />
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold">{level.count}</span>
                            <span className="text-xs text-muted-foreground ml-1">({level.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>错题率详细统计</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {errorRateData.map((item, index) => (
                        <div key={index} className="p-3 bg-gradient-to-r from-background to-muted/30 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{item.subject}</h4>
                            <Badge variant={item.errorRate > 30 ? 'destructive' : item.errorRate > 20 ? 'secondary' : 'default'}>
                              {item.errorRate}%
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            总题数: {item.totalProblems} | 错题数: {Math.round(item.totalProblems * item.errorRate / 100)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* AI使用分析 */}
            <TabsContent value="ai" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-500" />
                    <span>AI助手使用趋势</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={aiUsageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line yAxisId="left" type="monotone" dataKey="interactions" stroke="#8b5cf6" strokeWidth={2} name="交互次数" />
                      <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={2} name="满意度评分" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10">
                  <CardContent className="p-6 text-center">
                    <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                    <p className="text-2xl font-bold mb-2">7,234</p>
                    <p className="text-sm text-muted-foreground">总交互次数</p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-green-600/10">
                  <CardContent className="p-6 text-center">
                    <Clock className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <p className="text-2xl font-bold mb-2">2.1s</p>
                    <p className="text-sm text-muted-foreground">平均响应时间</p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500/10 to-amber-600/10">
                  <CardContent className="p-6 text-center">
                    <Award className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <p className="text-2xl font-bold mb-2">4.4/5</p>
                    <p className="text-sm text-muted-foreground">平均满意度</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 会员对比分析 */}
            <TabsContent value="members" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span>会员vs免费用户学习对比</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={memberVsFreeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="memberTime" stroke="#3b82f6" strokeWidth={2} name="会员学习时长(分钟)" />
                      <Line type="monotone" dataKey="freeTime" stroke="#10b981" strokeWidth={2} name="免费用户学习时长(分钟)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>学习时长对比</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-blue-700 dark:text-blue-300">会员用户</span>
                          <Badge className="bg-blue-500">47.9 分钟/日</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          平均比免费用户多学习 22.8 分钟
                        </div>
                      </div>
                      
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-green-700 dark:text-green-300">免费用户</span>
                          <Badge className="bg-green-500">25.1 分钟/日</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          基础学习时长稳定增长
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>解题数量对比</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={memberVsFreeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="memberProblems" fill="#3b82f6" name="会员解题数" />
                        <Bar dataKey="freeProblems" fill="#10b981" name="免费用户解题数" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}