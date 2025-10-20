import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { 
  User, 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp, 
  Star, 
  Zap, 
  Award,
  Calendar,
  BookOpen,
  Brain,
  Flame,
  Bot,
  Lightbulb,
  Share2
} from 'lucide-react';

export default function ProfilePage() {
  // Mock data for charts
  const studyTimeData = [
    { date: '08-22', time: 2.5 },
    { date: '08-23', time: 3.2 },
    { date: '08-24', time: 1.8 },
    { date: '08-25', time: 4.1 },
    { date: '08-26', time: 2.9 },
    { date: '08-27', time: 3.7 },
    { date: '08-28', time: 2.3 },
  ];

  const errorRateData = [
    { date: '08-22', rate: 35 },
    { date: '08-23', rate: 32 },
    { date: '08-24', rate: 28 },
    { date: '08-25', rate: 25 },
    { date: '08-26', rate: 23 },
    { date: '08-27', rate: 20 },
    { date: '08-28', rate: 18 },
  ];

  const skillDistribution = [
    { name: '动态规划', value: 85, color: '#8B5CF6' },
    { name: '贪心算法', value: 78, color: '#06B6D4' },
    { name: '图论', value: 65, color: '#F59E0B' },
    { name: '树', value: 92, color: '#10B981' },
    { name: '排序', value: 88, color: '#EF4444' },
  ];

  const categoryStats = [
    { category: '动态规划', solved: 45, total: 60, accuracy: 85 },
    { category: '图论', solved: 23, total: 40, accuracy: 65 },
    { category: '贪心', solved: 67, total: 80, accuracy: 78 },
    { category: '树', solved: 89, total: 95, accuracy: 92 },
    { category: '排序', solved: 34, total: 40, accuracy: 88 },
  ];

  const achievements = [
    { name: '初出茅庐', description: '完成第一道题目', icon: Star, color: 'from-yellow-400 to-orange-500', earned: true },
    { name: '百题大师', description: '累计解决100道题目', icon: Trophy, color: 'from-purple-500 to-pink-500', earned: true },
    { name: '连击高手', description: '连续7天刷题', icon: Flame, color: 'from-red-500 to-pink-500', earned: true },
    { name: '算法专家', description: '所有分类通过率>80%', icon: Brain, color: 'from-blue-500 to-purple-500', earned: false },
    { name: '速度之王', description: '单题用时<平均用时50%', icon: Zap, color: 'from-green-500 to-blue-500', earned: false },
    { name: '完美主义', description: '连续20题零错误', icon: Award, color: 'from-indigo-500 to-purple-500', earned: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-slate-900 dark:via-indigo-900/20 dark:to-purple-900/20">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Header - User Profile */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="w-20 h-20 ring-4 ring-purple-500/20">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white text-xl">
                    青
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h1 className="text-2xl font-bold">青春编程者</h1>
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
          </CardContent>
        </Card>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-8 space-y-6">
            {/* Category Performance - 置顶，换为知识图谱形式 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-purple-500" />
                    <span>分类表现 - 知识图谱</span>
                  </CardTitle>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    分享
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* 知识图谱 - 使用网络状图形式 */}
                <div className="relative h-[400px] bg-gradient-to-br from-slate-50/50 to-indigo-50/50 dark:from-slate-800/50 dark:to-indigo-800/50 rounded-lg p-6 overflow-hidden">
                  {/* 中心核心节点 */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center mt-2">
                      <div className="font-medium text-sm">算法能力</div>
                      <div className="text-xs text-muted-foreground">总体水平</div>
                    </div>
                  </div>

                  {/* 周围的知识点节点 */}
                  {categoryStats.map((category, index) => {
                    const angle = (index * 72) - 90; // 每个节点间隔72度，从顶部开始
                    const radius = 120;
                    const x = Math.cos(angle * Math.PI / 180) * radius;
                    const y = Math.sin(angle * Math.PI / 180) * radius;
                    
                    const nodeColor = category.accuracy >= 80 
                      ? 'from-green-500 to-emerald-500' 
                      : category.accuracy >= 60 
                        ? 'from-yellow-500 to-orange-500' 
                        : 'from-red-500 to-pink-500';
                    
                    return (
                      <div key={index}>
                        {/* 连接线 */}
                        <div 
                          className="absolute top-1/2 left-1/2 origin-left bg-gradient-to-r from-purple-300 to-blue-300 dark:from-purple-600 dark:to-blue-600"
                          style={{
                            width: `${radius}px`,
                            height: '2px',
                            transform: `rotate(${angle}deg)`,
                            opacity: 0.6
                          }}
                        />
                        
                        {/* 知识点节点 */}
                        <div 
                          className="absolute transform -translate-x-1/2 -translate-y-1/2"
                          style={{
                            top: '50%',
                            left: '50%',
                            marginTop: `${y}px`,
                            marginLeft: `${x}px`
                          }}
                        >
                          <div className={`w-16 h-16 bg-gradient-to-br ${nodeColor} rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer`}>
                            <div className="text-white text-center">
                              <div className="text-xs font-bold">{category.accuracy}%</div>
                            </div>
                          </div>
                          <div className="text-center mt-2 max-w-20">
                            <div className="font-medium text-xs">{category.category}</div>
                            <div className="text-xs text-muted-foreground">
                              {category.solved}/{category.total}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* 图例 */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full"></div>
                      <span>优秀 (≥80%)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full"></div>
                      <span>良好 (≥60%)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-full"></div>
                      <span>需改进 (&lt;60%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Study Time Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>学习时长统计</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studyTimeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="time" 
                        stroke="url(#gradient1)" 
                        strokeWidth={3}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                      />
                      <defs>
                        <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                    <div className="text-xl font-bold text-blue-600">2.9h</div>
                    <div className="text-sm text-muted-foreground">日均学习</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                    <div className="text-xl font-bold text-green-600">20.3h</div>
                    <div className="text-sm text-muted-foreground">本周总计</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <div className="text-xl font-bold text-purple-600">+15%</div>
                    <div className="text-sm text-muted-foreground">环比上周</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error Rate Trend */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>错题率趋势</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={errorRateData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rate" 
                        stroke="url(#gradient2)" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      />
                      <defs>
                        <linearGradient id="gradient2" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#EF4444" />
                          <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-4 space-y-6">
            {/* 学习诊断 - 替换技能分析 */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-purple-500" />
                  <span>探索学习</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-sm">学习情况分析</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    基于你最近的练习表现，AI发现你在<strong>动态规划</strong>领域有显著进步，状态转移方程的理解更加深入。但在<strong>图论算法</strong>方面还需加强，特别是最短路径算法的应用。
                  </p>
                </div>
                
                <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-sm">薄弱知识点</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">图论算法</span>
                      <Badge className="bg-red-500 text-white text-xs">需关注</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">分治算法</span>
                      <Badge className="bg-yellow-500 text-white text-xs">中等</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">贪心策略</span>
                      <Badge className="bg-green-500 text-white text-xs">良好</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-sm">学习建议</span>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 每日练习1-2道图论题目</li>
                    <li>• 重点复习Dijkstra和Floyd算法</li>
                    <li>• 加强算法模板的记忆和应用</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span>最近活动</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">解决了"最长回文子串"</p>
                      <p className="text-xs text-muted-foreground">2小时前</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">参加了"周末编程挑战赛"</p>
                      <p className="text-xs text-muted-foreground">1天前</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">获得了"连击高手"徽章</p>
                      <p className="text-xs text-muted-foreground">2天前</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">复习了5道错题</p>
                      <p className="text-xs text-muted-foreground">3天前</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}