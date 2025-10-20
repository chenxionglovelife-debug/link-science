import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Trophy, 
  Filter, 
  Clock, 
  Users, 
  BookOpen,
  Calendar,
  Star,
  PlayCircle,
  Award,
  TrendingUp,
  Target,
  Lock,
  Crown,
  Search,
  AlertTriangle
} from 'lucide-react';

interface ExamPaper {
  id: number;
  title: string;
  contest: string;
  subject: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  year: number;
  duration: number; // minutes
  totalQuestions: number;
  participants: number;
  averageScore: number;
  averageTime: number; // minutes
  tags: string[];
  description: string;
  status: 'available' | 'completed' | 'locked';
  completionRate?: number;
  myBestScore?: number;
  requiredMembership?: string;
}

interface ContestPageProps {
  onStartExam: (paperId: number) => void;
}

export default function ContestPage({ onStartExam }: ContestPageProps) {
  const [filters, setFilters] = useState({
    contest: 'all',
    subject: 'all',
    level: 'all',
    year: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showMembershipDialog, setShowMembershipDialog] = useState(false);

  const examPapers: ExamPaper[] = [
    {
      id: 1,
      title: '2024年信息学奥林匹克竞赛初赛',
      contest: '信息学奥赛',
      subject: '算法与数据结构',
      level: 'intermediate',
      year: 2024,
      duration: 180,
      totalQuestions: 25,
      participants: 15420,
      averageScore: 72.5,
      averageTime: 156,
      tags: ['动态规划', '图论', '贪心'],
      description: '全国信息学奥林匹克竞赛初赛试卷，涵盖基础算法和数据结构',
      status: 'available'
    },
    {
      id: 2,
      title: 'ACM-ICPC 区域赛模拟试题',
      contest: 'ACM-ICPC',
      subject: '程序设计',
      level: 'advanced',
      year: 2024,
      duration: 300,
      totalQuestions: 12,
      participants: 8934,
      averageScore: 58.3,
      averageTime: 267,
      tags: ['算法竞赛', '数学', '图论'],
      description: 'ACM国际大学生程序设计竞赛区域赛水平试题',
      status: 'available'
    },
    {
      id: 3,
      title: 'CSP-J 2024年初赛试题',
      contest: 'CSP',
      subject: '编程基础',
      level: 'beginner',
      year: 2024,
      duration: 240,
      totalQuestions: 20,
      participants: 23567,
      averageScore: 82.1,
      averageTime: 198,
      tags: ['基础算法', '模拟', '枚举'],
      description: 'CSP-J（入门级）初赛试题，适合编程入门',
      status: 'completed',
      completionRate: 85,
      myBestScore: 89
    },
    {
      id: 4,
      title: 'CSP-J 2023年复赛试题',
      contest: 'CSP',
      subject: '算法与数据结构',
      level: 'intermediate',
      year: 2023,
      duration: 210,
      totalQuestions: 18,
      participants: 19234,
      averageScore: 67.8,
      averageTime: 189,
      tags: ['搜索', '动态规划', '数据结构'],
      description: 'CSP-J（入门级）复赛试题，注重算法思维培养',
      status: 'available'
    },
    {
      id: 5,
      title: 'USACO Gold 级别月赛',
      contest: 'USACO',
      subject: '算法竞赛',
      level: 'advanced',
      year: 2024,
      duration: 240,
      totalQuestions: 3,
      participants: 4567,
      averageScore: 65.2,
      averageTime: 198,
      tags: ['高级算法', '数学', '图论'],
      description: 'USACO Gold级别月赛，世界顶级青少年算法竞赛',
      status: 'available'
    },
    {
      id: 6,
      title: '2023年信息学奥赛省选模拟',
      contest: '信息学奥赛',
      subject: '算法与数据结构',
      level: 'advanced',
      year: 2023,
      duration: 300,
      totalQuestions: 15,
      participants: 12890,
      averageScore: 55.7,
      averageTime: 278,
      tags: ['高级算法', '数学', '计算几何'],
      description: '省选水平模拟试题，难度极高',
      status: 'completed'
    }
  ];

  const filteredPapers = examPapers.filter(paper => {
    const matchesContest = filters.contest === 'all' || paper.contest === filters.contest;
    const matchesSubject = filters.subject === 'all' || paper.subject === filters.subject;
    const matchesLevel = filters.level === 'all' || paper.level === filters.level;
    const matchesYear = filters.year === 'all' || paper.year.toString() === filters.year;
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesContest && matchesSubject && matchesLevel && matchesYear && matchesSearch;
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLockedClick = () => {
    setShowMembershipDialog(true);
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return <Badge className="bg-green-500 hover:bg-green-600">入门</Badge>;
      case 'intermediate':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">进阶</Badge>;
      case 'advanced':
        return <Badge className="bg-red-500 hover:bg-red-600">高级</Badge>;
      default:
        return <Badge variant="secondary">{level}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-blue-500 hover:bg-blue-600">未完成</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">已完成</Badge>;
      default:
        return <Badge variant="secondary">未完成</Badge>;
    }
  };

  const knowledgePoints = ['动态规划', '图论', '贪心', '算法竞赛', '数学', '计算几何', '搜索', '数据结构'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/30 dark:from-slate-900 dark:via-amber-900/20 dark:to-orange-900/20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <span>闯关刷题</span>
                  </h1>
                  <p className="text-muted-foreground mt-2">挑战各类编程竞赛真题，提升算法竞赛水平</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Filters */}
          <div className="col-span-4 space-y-4">
            <Card className="border-0 shadow-lg p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Filter className="w-5 h-5 text-blue-500" />
                  <span>智能筛选</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* 搜索框 */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="按试卷名称查找..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filters */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3 text-foreground">主办方</h3>
                    <div className="flex flex-wrap gap-2">
                      {['全部', '中国电子学会', '中国计算机学会', 'USACO', 'ACM-ICPC'].map((org) => (
                        <button
                          key={org}
                          onClick={() => handleFilterChange('contest', org === '全部' ? 'all' : org === '中国电子学会' ? 'CSP' : org === '中国计算机学会' ? '信息学奥赛' : org)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors border ${
                            (org === '全部' && filters.contest === 'all') ||
                            (org === '中国电子学会' && filters.contest === 'CSP') ||
                            (org === '中国计算机学会' && filters.contest === '信息学奥赛') ||
                            (org !== '全部' && org !== '中国电子学会' && org !== '中国计算机学会' && filters.contest === org)
                              ? 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-600'
                              : 'bg-background text-muted-foreground border-border hover:bg-accent hover:text-foreground'
                          }`}
                        >
                          {org}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3 text-foreground">科目</h3>
                    <div className="flex flex-wrap gap-2">
                      {['全部', '编程基础', '算法与数据结构', '程序设计', '算法竞赛'].map((subject) => (
                        <button
                          key={subject}
                          onClick={() => handleFilterChange('subject', subject === '全部' ? 'all' : subject)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors border ${
                            (subject === '全部' && filters.subject === 'all') ||
                            (subject !== '全部' && filters.subject === subject)
                              ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-600'
                              : 'bg-background text-muted-foreground border-border hover:bg-accent hover:text-foreground'
                          }`}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3 text-foreground">等级</h3>
                    <div className="flex flex-wrap gap-2">
                      {['全部', '入门', '进阶', '高级'].map((level) => (
                        <button
                          key={level}
                          onClick={() => handleFilterChange('level', level === '全部' ? 'all' : level === '入门' ? 'beginner' : level === '进阶' ? 'intermediate' : 'advanced')}
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors border ${
                            (level === '全部' && filters.level === 'all') ||
                            (level === '入门' && filters.level === 'beginner') ||
                            (level === '进阶' && filters.level === 'intermediate') ||
                            (level === '高级' && filters.level === 'advanced')
                              ? 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-600'
                              : 'bg-background text-muted-foreground border-border hover:bg-accent hover:text-foreground'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3 text-foreground">年份</h3>
                    <div className="flex flex-wrap gap-2">
                      {['全部', '2024', '2023', '2022'].map((year) => (
                        <button
                          key={year}
                          onClick={() => handleFilterChange('year', year === '全部' ? 'all' : year)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors border ${
                            (year === '全部' && filters.year === 'all') ||
                            (year !== '全部' && filters.year === year)
                              ? 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-600'
                              : 'bg-background text-muted-foreground border-border hover:bg-accent hover:text-foreground'
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 删除题目类型、考试类型、知识点、学习模式筛选项 */}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Exam Papers */}
          <div className="col-span-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span>试卷列表</span>
                    <Badge variant="outline">{filteredPapers.length}</Badge>
                    <span className="text-muted-foreground">套试卷</span>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredPapers.map((paper) => (
                  <div
                    key={paper.id}
                    className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{paper.title}</h3>
                          {getStatusBadge(paper.status)}
                        </div>
                        
                        <div className="grid grid-cols-4 gap-6 mb-3">
                          <div className="text-center">
                            <div className="font-bold text-blue-600">{paper.totalQuestions}题</div>
                            <div className="text-xs text-muted-foreground">题数</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-purple-600">{paper.participants}人</div>
                            <div className="text-xs text-muted-foreground">参与人数</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-green-600">{paper.averageTime}分钟</div>
                            <div className="text-xs text-muted-foreground">平均用时</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-amber-600">{paper.averageScore}分</div>
                            <div className="text-xs text-muted-foreground">平均分数</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4 flex flex-col space-y-2 items-end">
                        <Button 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                          onClick={() => onStartExam(paper.id)}
                        >
                          {paper.status === 'completed' ? '再次答题' : '开始答题'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 会员提示弹窗 */}
      <Dialog open={showMembershipDialog} onOpenChange={setShowMembershipDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <DialogTitle>需要开通会员</DialogTitle>
            </div>
            <DialogDescription className="text-base leading-relaxed">
              此试卷需要开通对应会员才能访问。开通会员后可享受更多专业学习资源和竞赛训练内容。
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setShowMembershipDialog(false)}>
              稍后再说
            </Button>
            <Button 
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              onClick={() => {
                setShowMembershipDialog(false);
                // 这里可以跳转到会员开通页面
              }}
            >
              立即开通
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}