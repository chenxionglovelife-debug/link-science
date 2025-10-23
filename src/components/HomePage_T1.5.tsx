import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Trophy, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Clock, 
  Users, 
  Star, 
  Zap,
  PlayCircle,
  ChevronRight,
  CheckCircle,
  Circle,
  Calendar,
  Gift,
  X,
  Bot,
  AlertTriangle
} from 'lucide-react';
import AIMascot from './AIMascot';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [showMembershipAlert, setShowMembershipAlert] = useState(true);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // 检查会员到期时间
  const membershipExpiry = new Date('2024-12-31');
  const currentDate = new Date();
  const daysUntilExpiry = Math.ceil((membershipExpiry.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  const shouldShowMembershipAlert = Math.abs(daysUntilExpiry) <= 5 && showMembershipAlert;

  // 今日任务数据
  const [dailyTasks, setDailyTasks] = useState([
    { id: 1, name: '每日签到', xp: 10, completed: false, type: 'checkin' },
    { id: 3, name: '完成每日首题', xp: 20, completed: false, type: 'first_problem' },
    { id: 4, name: '错题复习', xp: 15, completed: false, type: 'review' }
  ]);

  const [userXP, setUserXP] = useState(12580);

  // 推荐试卷数据
  const recommendedPapers = [
    { title: 'Python基础语法训练', participants: 2341, questions: 25 },
    { title: '算法思维入门', participants: 1876, questions: 18 },
    { title: '数据结构基础', participants: 1523, questions: 22 },
    { title: '循环与条件语句', participants: 2145, questions: 20 }
  ];

  // Banner轮播内容
  const bannerContents = [
    {
      title: '2024年度编程挑战赛',
      subtitle: '现在报名即可获得专属学习资料包',
      description: '与全国青少年一起编程，展示你的算法思维',
      primaryAction: '立即报名',
      secondaryAction: '了解详情',
      gradient: 'from-purple-600 via-purple-700 to-indigo-700'
    },
    {
      title: 'AI编程助手全新升级',
      subtitle: '智能代码补全，实时错误检测',
      description: '让AI成为你的编程伙伴，提升学习效率',
      primaryAction: '体验AI',
      secondaryAction: '查看功能',
      gradient: 'from-blue-600 via-blue-700 to-cyan-700'
    },
    {
      title: '新学期专享课程包',
      subtitle: '系统性学习路径，从零基础到进阶',
      description: '涵盖Python、C++、算法竞赛等热门方向',
      primaryAction: '开始学习',
      secondaryAction: '课程大纲',
      gradient: 'from-emerald-600 via-green-700 to-teal-700'
    }
  ];

  // Banner自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerContents.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerContents.length]);

  // 完成任务
  const completeTask = (taskId: number) => {
    setDailyTasks(prev => prev.map(task => {
      if (task.id === taskId && !task.completed) {
        setUserXP(prevXP => prevXP + task.xp);
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-blue-50/40 dark:from-slate-900 dark:via-indigo-900/30 dark:to-blue-900/30">
      {/* Membership Alert */}
      {shouldShowMembershipAlert && (
        <div className="fixed top-20 right-8 z-50 max-w-sm">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-amber-900 dark:text-amber-100">
                      {daysUntilExpiry > 0 ? '会员即将到期' : '会员已到期'}
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-200 mt-1">
                      {daysUntilExpiry > 0 
                        ? `还有${daysUntilExpiry}天到期，请及时续费享受完整学习服务` 
                        : `已到期${Math.abs(daysUntilExpiry)}天，请及时续费享受完整学习服务`
                      }
                    </p>
                    <Button 
                      size="sm" 
                      className="mt-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      onClick={() => onNavigate('account')}
                    >
                      立即续费
                    </Button>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowMembershipAlert(false)}
                  className="text-amber-600 hover:text-amber-700 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* 重构布局：第一行 + 下方区域 */}
        <div className="grid grid-rows-[280px_1fr] gap-6 min-h-[860px]">
          
          {/* 第一行：Future 考试智算、Banner、链小科 */}
          <div className="grid grid-cols-12 gap-6 items-stretch">
            {/* Future 考试智算 */}
            <div className="col-span-3">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-cyan-50/80 to-blue-50/80 dark:from-cyan-900/25 dark:to-blue-900/25 backdrop-blur-sm h-full min-h-[280px]">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">Future 考试智算</h3>
                      <p className="text-xs text-muted-foreground">基于学习数据预测</p>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center p-4 rounded-xl bg-gradient-to-br from-cyan-100/70 to-blue-100/70 dark:from-cyan-800/40 dark:to-blue-800/40 border border-cyan-200/50 dark:border-cyan-700/40">
                    <div className="text-center mb-4">
                      <div className="flex items-baseline justify-center space-x-2 mb-2">
                        <div className="text-3xl font-bold text-cyan-600">92%</div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm text-emerald-600 font-medium">+8%</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">Python等级考试</div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-sm"
                      onClick={() => onNavigate('contest')}
                    >
                      去提升
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Banner轮播 */}
            <div className="col-span-6">
              <Card className="border-0 shadow-xl h-full min-h-[280px] overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentBannerIndex}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className={`h-full bg-gradient-to-br ${bannerContents[currentBannerIndex].gradient} relative`}
                  >
                    <CardContent className="p-8 h-full flex items-center relative z-10">
                      <div className="text-white space-y-4">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                        >
                          <h2 className="text-3xl font-bold mb-2">{bannerContents[currentBannerIndex].title}</h2>
                          <h3 className="text-xl text-white/90 mb-3">{bannerContents[currentBannerIndex].subtitle}</h3>
                        </motion.div>
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                          className="text-white/80 text-lg leading-relaxed"
                        >
                          {bannerContents[currentBannerIndex].description}
                        </motion.p>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.6 }}
                          className="flex space-x-4 pt-2"
                        >
                          <Button 
                            size="lg" 
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/20 px-6 py-3"
                            onClick={() => onNavigate('contest')}
                          >
                            <PlayCircle className="w-4 h-4 mr-2" />
                            {bannerContents[currentBannerIndex].primaryAction}
                          </Button>
                          <Button 
                            size="lg" 
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10 px-6 py-3"
                            onClick={() => onNavigate('contest')}
                          >
                            {bannerContents[currentBannerIndex].secondaryAction}
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </motion.div>
                </AnimatePresence>

                {/* 轮播指示器 */}
                <div className="absolute bottom-4 left-8 flex space-x-2">
                  {bannerContents.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBannerIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentBannerIndex ? 'bg-white w-6' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </Card>
            </div>

            {/* 链小科 */}
            <div className="col-span-3">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50/80 to-indigo-50/80 dark:from-slate-900/40 dark:to-indigo-900/25 backdrop-blur-sm h-full min-h-[280px]">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="mb-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Bot className="w-6 h-6 text-slate-600" />
                      <span className="font-semibold text-xl">链小科</span>
                    </div>
                    <p className="text-sm text-muted-foreground">智能陪伴，个性化学习指导</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center bg-gradient-to-br from-slate-100/60 to-indigo-100/60 dark:from-slate-800/40 dark:to-indigo-800/40 rounded-xl p-4 border border-slate-200/40 dark:border-slate-700/40">
                      <div className="transform scale-110">
                        <AIMascot className="relative" inCard={true} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 第二行：Core 赛事争锋、中间区域（Neo真题练级 + Neural学习统计）、Deep练习 */}
          <div className="grid grid-cols-12 gap-6 items-stretch">
            {/* Core 赛事争锋 - 全高度 */}
            <div className="col-span-3">
              <Card className="border-0 shadow-xl p-8 bg-gradient-to-br from-violet-50/80 to-fuchsia-50/80 dark:from-violet-900/25 dark:to-fuchsia-900/25 backdrop-blur-sm h-full">
                <CardHeader className="p-0 mb-8">
                  <CardTitle className="flex items-center space-x-4 text-xl">
                    <Trophy className="w-7 h-7 text-violet-600" />
                    <span>Core 赛事争锋</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-6">
                  <div 
                    className="p-6 rounded-xl bg-gradient-to-r from-violet-100/60 to-fuchsia-100/60 dark:from-violet-800/40 dark:to-fuchsia-800/40 hover:from-violet-100/80 hover:to-fuchsia-100/80 dark:hover:from-violet-800/60 dark:hover:to-fuchsia-800/60 hover:shadow-md transition-all duration-300 cursor-pointer border border-violet-200/40 dark:border-violet-700/40"
                    onClick={() => onNavigate('contest')}
                  >
                    <h4 className="font-semibold mb-3 text-lg">青少年信息素养大赛</h4>
                    <p className="text-muted-foreground">Python编程、算法思维、图形化编程</p>
                  </div>
                  <div 
                    className="p-6 rounded-xl bg-gradient-to-r from-violet-100/60 to-fuchsia-100/60 dark:from-violet-800/40 dark:to-fuchsia-800/40 hover:from-violet-100/80 hover:to-fuchsia-100/80 dark:hover:from-violet-800/60 dark:hover:to-fuchsia-800/60 hover:shadow-md transition-all duration-300 cursor-pointer border border-violet-200/40 dark:border-violet-700/40"
                    onClick={() => onNavigate('contest')}
                  >
                    <h4 className="font-semibold mb-3 text-lg">CSP-J/S</h4>
                    <p className="text-muted-foreground">C++算法竞赛训练</p>
                  </div>
                  <div 
                    className="p-6 rounded-xl bg-gradient-to-r from-violet-100/60 to-fuchsia-100/60 dark:from-violet-800/40 dark:to-fuchsia-800/40 hover:from-violet-100/80 hover:to-fuchsia-100/80 dark:hover:from-violet-800/60 dark:hover:to-fuchsia-800/60 hover:shadow-md transition-all duration-300 cursor-pointer border border-violet-200/40 dark:border-violet-700/40"
                    onClick={() => onNavigate('contest')}
                  >
                    <h4 className="font-semibold mb-3 text-lg">蓝桥杯</h4>
                    <p className="text-muted-foreground">个人赛、视觉艺术设计赛、项目实战赛</p>
                  </div>
                  <div 
                    className="p-6 rounded-xl bg-gradient-to-r from-violet-100/60 to-fuchsia-100/60 dark:from-violet-800/40 dark:to-fuchsia-800/40 hover:from-violet-100/80 hover:to-fuchsia-100/80 dark:hover:from-violet-800/60 dark:hover:to-fuchsia-800/60 hover:shadow-md transition-all duration-300 cursor-pointer border border-violet-200/40 dark:border-violet-700/40"
                    onClick={() => onNavigate('contest')}
                  >
                    <h4 className="font-semibold mb-3 text-lg">NOIP</h4>
                    <p className="text-muted-foreground">全国青少年信息学奥林匹克联赛</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 中间区域：Neo真题练级 + Neural学习统计 */}
            <div className="col-span-6 flex flex-col gap-6">
              {/* Neo真题练级 - 缩小高度 */}
              <Card className="border-0 shadow-xl p-6 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/25 dark:to-purple-900/25 backdrop-blur-sm">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <Trophy className="w-7 h-7 text-indigo-600" />
                    <span>Neo真题练级</span>
                  </CardTitle>
                  <CardDescription className="text-base mt-2">选择你的编程考级方向，开始专业练习</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className="p-6 rounded-xl bg-gradient-to-br from-indigo-100/70 to-purple-100/70 dark:from-indigo-800/40 dark:to-purple-800/40 hover:from-indigo-100/90 hover:to-purple-100/90 dark:hover:from-indigo-800/60 dark:hover:to-purple-800/60 hover:shadow-lg transition-all duration-300 cursor-pointer border border-indigo-200/40 dark:border-indigo-700/40 group"
                      onClick={() => onNavigate('contest')}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-lg group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">Scratch</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">中国电子学会、中国计算机学会</p>
                    </div>
                    <div 
                      className="p-6 rounded-xl bg-gradient-to-br from-indigo-100/70 to-purple-100/70 dark:from-indigo-800/40 dark:to-purple-800/40 hover:from-indigo-100/90 hover:to-purple-100/90 dark:hover:from-indigo-800/60 dark:hover:to-purple-800/60 hover:shadow-lg transition-all duration-300 cursor-pointer border border-indigo-200/40 dark:border-indigo-700/40 group"
                      onClick={() => onNavigate('contest')}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-lg group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">Python</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">中国电子学会Python编程等级考试</p>
                    </div>
                    <div 
                      className="p-6 rounded-xl bg-gradient-to-br from-indigo-100/70 to-purple-100/70 dark:from-indigo-800/40 dark:to-purple-800/40 hover:from-indigo-100/90 hover:to-purple-100/90 dark:hover:from-indigo-800/60 dark:hover:to-purple-800/60 hover:shadow-lg transition-all duration-300 cursor-pointer border border-indigo-200/40 dark:border-indigo-700/40 group"
                      onClick={() => onNavigate('contest')}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-lg group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">C++</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">C++编程语言与算法竞赛进阶训练</p>
                    </div>
                    <div 
                      className="p-6 rounded-xl bg-gradient-to-br from-indigo-100/70 to-purple-100/70 dark:from-indigo-800/40 dark:to-purple-800/40 hover:from-indigo-100/90 hover:to-purple-100/90 dark:hover:from-indigo-800/60 dark:hover:to-purple-800/60 hover:shadow-lg transition-all duration-300 cursor-pointer border border-indigo-200/40 dark:border-indigo-700/40 group"
                      onClick={() => onNavigate('contest')}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-lg group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">机器人</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">机器人技术、无人机技术等级考试</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Neural 学习统计 - 标题移到左上角，优化布局 */}
              <Card className="border-0 shadow-xl p-6 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/25 dark:to-teal-900/25 backdrop-blur-sm flex-1 min-h-[140px]">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <TrendingUp className="w-7 h-7 text-emerald-600" />
                    <span>Neural 学习统计</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-100/70 to-green-100/70 dark:from-emerald-800/40 dark:to-green-800/40 border border-emerald-200/50 dark:border-emerald-700/40">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">85%</div>
                      <div className="text-sm text-muted-foreground">通过率</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-teal-100/70 to-cyan-100/70 dark:from-teal-800/40 dark:to-cyan-800/40 border border-teal-200/50 dark:border-teal-700/40">
                      <div className="text-2xl font-bold text-teal-600 mb-1">42h</div>
                      <div className="text-sm text-muted-foreground">本月学习</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-100/70 to-emerald-100/70 dark:from-green-800/40 dark:to-emerald-800/40 border border-green-200/50 dark:border-green-700/40">
                      <div className="text-2xl font-bold text-green-600 mb-1">12</div>
                      <div className="text-sm text-muted-foreground">连续天数</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-gradient-to-br from-emerald-50/60 to-teal-50/60 dark:from-emerald-800/20 dark:to-teal-800/20 border border-emerald-200/30 dark:border-emerald-700/30">
                      <div className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 mb-1">7级</div>
                      <div className="text-xs text-muted-foreground">当前等级</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-gradient-to-br from-teal-50/60 to-emerald-50/60 dark:from-teal-800/20 dark:to-emerald-800/20 border border-teal-200/30 dark:border-teal-700/30">
                      <div className="text-lg font-semibold text-teal-700 dark:text-teal-300 mb-1">312</div>
                      <div className="text-xs text-muted-foreground">积分经验</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Deep练习 - 全高度，显示5套试题 */}
            <div className="col-span-3">
              <Card className="border-0 shadow-xl p-8 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/25 dark:to-indigo-900/25 backdrop-blur-sm h-full">
                <CardHeader className="p-0 mb-8">
                  <CardTitle className="flex items-center space-x-4 text-xl">
                    <Star className="w-7 h-7 text-amber-500" />
                    <span>Deep练习</span>
                  </CardTitle>
                  <CardDescription className="text-base">根据你的薄弱知识点智能推荐</CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  {recommendedPapers.slice(0, 5).map((paper, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-xl bg-gradient-to-r from-blue-100/60 to-indigo-100/60 dark:from-blue-800/40 dark:to-indigo-800/40 hover:from-blue-100/80 hover:to-indigo-100/80 dark:hover:from-blue-800/60 dark:hover:to-indigo-800/60 hover:shadow-md transition-all duration-300 cursor-pointer group border border-blue-200/40 dark:border-blue-700/40"
                      onClick={() => onNavigate('exam')}
                    >
                      <h4 className="font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors mb-2">
                        {paper.title}
                      </h4>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {paper.participants}人
                          </span>
                          <span className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            {paper.questions}题
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      </div>
                    </div>
                  ))}
                  {/* 添加第5套试题 */}
                  <div 
                    className="p-4 rounded-xl bg-gradient-to-r from-blue-100/60 to-indigo-100/60 dark:from-blue-800/40 dark:to-indigo-800/40 hover:from-blue-100/80 hover:to-indigo-100/80 dark:hover:from-blue-800/60 dark:hover:to-indigo-800/60 hover:shadow-md transition-all duration-300 cursor-pointer group border border-blue-200/40 dark:border-blue-700/40"
                    onClick={() => onNavigate('exam')}
                  >
                    <h4 className="font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors mb-2">
                      信息学竞赛入门训练
                    </h4>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          1692人
                        </span>
                        <span className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          12题
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}