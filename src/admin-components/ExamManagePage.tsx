import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Clock,
  Users,
  BarChart3,
  Calendar,
  Award,
  Target,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Play,
  X
} from 'lucide-react';

type AuditStatus = 'pending_review' | 'in_review' | 'approved' | 'rejected';

interface ExamPaper {
  id: number;
  title: string;
  contest: string;
  subject: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  year: number;
  duration: number; // 分钟
  totalQuestions: number;
  participants: number;
  averageScore: number;
  averageTime: number; // 分钟
  tags: string[];
  description: string;
  status: 'available' | 'completed' | 'draft';
  auditStatus: AuditStatus;
  problems: number[]; // 题目ID列表
  createdAt: Date;
  updatedAt: Date;
  completionRate?: number;
  passRate?: number;
}

export default function ExamManagePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contestFilter, setContestFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [auditStatusFilter, setAuditStatusFilter] = useState('all');
  const [selectedExam, setSelectedExam] = useState<ExamPaper | null>(null);
  const [showExamDetail, setShowExamDetail] = useState(false);
  const [showAddExam, setShowAddExam] = useState(false);
  
  // 会员权益数据（模拟）
  const level1Benefits = [
    { id: 1, name: '刷题闯关' },
    { id: 2, name: '学习诊断' },
    { id: 3, name: '错题集' }
  ];

  const level2Benefits = [
    { id: 1, parentId: 1, parentName: '刷题闯关', name: '无限制刷题' },
    { id: 2, parentId: 1, parentName: '刷题闯关', name: '题目解析' },
    { id: 3, parentId: 2, parentName: '学习诊断', name: 'AI学习报告' },
    { id: 4, parentId: 2, parentName: '学习诊断', name: '知识图谱' },
    { id: 5, parentId: 3, parentName: '错题集', name: '错题自动收录' }
  ];
  
  const [selectedBenefits, setSelectedBenefits] = useState<{ level1: string; level2: string }[]>([]);

  // 模拟考试数据 - 对应前台ContestPage的examPapers数据结构
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
      status: 'available',
      auditStatus: 'approved',
      problems: [1, 2, 3, 4, 5],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-12-20'),
      completionRate: 85,
      passRate: 78
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
      status: 'available',
      auditStatus: 'in_review',
      problems: [6, 7, 8, 9, 10],
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-12-18'),
      completionRate: 68,
      passRate: 45
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
      auditStatus: 'approved',
      problems: [11, 12, 13, 14, 15],
      createdAt: new Date('2024-03-05'),
      updatedAt: new Date('2024-12-15'),
      completionRate: 92,
      passRate: 89
    },
    {
      id: 4,
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
      status: 'draft',
      auditStatus: 'pending_review',
      problems: [16, 17, 18],
      createdAt: new Date('2024-04-12'),
      updatedAt: new Date('2024-12-10'),
      completionRate: 34,
      passRate: 28
    }
  ];

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
        return <Badge className="bg-blue-500 hover:bg-blue-600"><Play className="w-3 h-3 mr-1" />可考试</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />已结束</Badge>;
      case 'draft':
        return <Badge className="bg-gray-500 hover:bg-gray-600"><Edit className="w-3 h-3 mr-1" />草稿</Badge>;
      default:
        return <Badge variant="secondary">未知</Badge>;
    }
  };
  
  const getAuditStatusBadge = (auditStatus: AuditStatus) => {
    switch (auditStatus) {
      case 'pending_review':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">待审核</Badge>;
      case 'in_review':
        return <Badge className="bg-blue-500 hover:bg-blue-600">审核中</Badge>;
      case 'approved':
        return <Badge className="bg-green-500 hover:bg-green-600">已审核</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 hover:bg-red-600">审核未通过</Badge>;
      default:
        return <Badge variant="secondary">未知</Badge>;
    }
  };

  const filteredExams = examPapers.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesContest = contestFilter === 'all' || exam.contest === contestFilter;
    const matchesLevel = levelFilter === 'all' || exam.level === levelFilter;
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
    const matchesAuditStatus = auditStatusFilter === 'all' || exam.auditStatus === auditStatusFilter;
    
    return matchesSearch && matchesContest && matchesLevel && matchesStatus && matchesAuditStatus;
  });

  const handleViewExam = (exam: ExamPaper) => {
    setSelectedExam(exam);
    setShowExamDetail(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <span>考试管理</span>
                  </h1>
                  <p className="text-muted-foreground mt-2">管理考试试卷、题目配置和考试统计</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="px-3 py-1">
                    总试卷: {examPapers.length}
                  </Badge>
                  <Button 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    onClick={() => setShowAddExam(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    创建试卷
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">可考试卷</p>
                  <p className="text-2xl font-bold">{examPapers.filter(e => e.status === 'available').length}</p>
                </div>
                <Play className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-green-600/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">已结束</p>
                  <p className="text-2xl font-bold">{examPapers.filter(e => e.status === 'completed').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500/10 to-yellow-600/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">草稿试卷</p>
                  <p className="text-2xl font-bold">{examPapers.filter(e => e.status === 'draft').length}</p>
                </div>
                <Edit className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">总参与数</p>
                  <p className="text-2xl font-bold">{examPapers.reduce((sum, e) => sum + e.participants, 0).toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 筛选和搜索 */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="搜索试卷标题或标签..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={contestFilter} onValueChange={setContestFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="竞赛筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部竞赛</SelectItem>
                  <SelectItem value="CSP">CSP</SelectItem>
                  <SelectItem value="信息学奥赛">信息学奥赛</SelectItem>
                  <SelectItem value="ACM-ICPC">ACM-ICPC</SelectItem>
                  <SelectItem value="USACO">USACO</SelectItem>
                </SelectContent>
              </Select>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="难度筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部难度</SelectItem>
                  <SelectItem value="beginner">入门</SelectItem>
                  <SelectItem value="intermediate">进阶</SelectItem>
                  <SelectItem value="advanced">高级</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="available">可考试</SelectItem>
                  <SelectItem value="completed">已结束</SelectItem>
                  <SelectItem value="draft">草稿</SelectItem>
                </SelectContent>
              </Select>
              <Select value={auditStatusFilter} onValueChange={setAuditStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="审核状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部审核</SelectItem>
                  <SelectItem value="pending_review">待审核</SelectItem>
                  <SelectItem value="in_review">审核中</SelectItem>
                  <SelectItem value="approved">已审核</SelectItem>
                  <SelectItem value="rejected">审核未通过</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 试卷列表 */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-purple-500" />
              <span>试卷列表</span>
              <Badge variant="outline">{filteredExams.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>试卷信息</TableHead>
                  <TableHead>竞赛/难度</TableHead>
                  <TableHead>题目配置</TableHead>
                  <TableHead>参与统计</TableHead>
                  <TableHead>成绩统计</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>审核状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{exam.title}</p>
                        <p className="text-sm text-muted-foreground">{exam.subject}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{exam.year}年</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Badge variant="outline">{exam.contest}</Badge>
                        {getLevelBadge(exam.level)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center space-x-2 mb-1">
                          <BookOpen className="w-3 h-3 text-muted-foreground" />
                          <span>{exam.totalQuestions} 题</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span>{exam.duration} 分钟</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {exam.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center space-x-2 mb-1">
                          <Users className="w-3 h-3 text-blue-500" />
                          <span>{exam.participants.toLocaleString()} 人</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Target className="w-3 h-3 text-green-500" />
                          <span>{exam.completionRate}% 完成</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-purple-500" />
                          <span>{exam.averageTime} 分钟</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center space-x-2 mb-1">
                          <BarChart3 className="w-3 h-3 text-amber-500" />
                          <span>{exam.averageScore} 分</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="w-3 h-3 text-green-500" />
                          <span>{exam.passRate}% 通过</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(exam.status)}
                    </TableCell>
                    <TableCell>
                      {getAuditStatusBadge(exam.auditStatus)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewExam(exam)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 试卷详情弹窗 */}
        <Dialog open={showExamDetail} onOpenChange={setShowExamDetail}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <FileText className="w-6 h-6" />
                <span>{selectedExam?.title}</span>
              </DialogTitle>
            </DialogHeader>
            
            {selectedExam && (
              <div className="space-y-6">
                {/* 基本信息 */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">试卷信息</h4>
                      <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">竞赛类型:</span>
                          <Badge variant="outline">{selectedExam.contest}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">科目:</span>
                          <span className="text-sm">{selectedExam.subject}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">难度:</span>
                          {getLevelBadge(selectedExam.level)}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">年份:</span>
                          <span className="text-sm">{selectedExam.year}年</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">考试配置</h4>
                      <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">题目数量:</span>
                          <span className="text-sm font-medium">{selectedExam.totalQuestions} 题</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">考试时长:</span>
                          <span className="text-sm font-medium">{selectedExam.duration} 分钟</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">题目ID:</span>
                          <span className="text-sm">{selectedExam.problems.join(', ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">状态:</span>
                          {getStatusBadge(selectedExam.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 统计数据 */}
                <div>
                  <h4 className="font-medium mb-4">参与统计</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                      <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{selectedExam.participants.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">参与人数</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                      <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{selectedExam.completionRate}%</p>
                      <p className="text-sm text-muted-foreground">完成率</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-center">
                      <BarChart3 className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{selectedExam.averageScore}</p>
                      <p className="text-sm text-muted-foreground">平均分</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                      <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{selectedExam.averageTime}</p>
                      <p className="text-sm text-muted-foreground">平均用时(分钟)</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 试卷描述和标签 */}
                <div>
                  <h4 className="font-medium mb-2">试卷描述</h4>
                  <p className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg">
                    {selectedExam.description}
                  </p>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">知识点标签</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExam.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 操作按钮 */}
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">
                    编辑试卷
                  </Button>
                  <Button variant="outline">
                    查看详细统计
                  </Button>
                  {selectedExam.status === 'draft' && (
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                      发布试卷
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* 创建试卷弹窗 */}
        <Dialog open={showAddExam} onOpenChange={setShowAddExam}>
          <DialogContent className="!w-[98vw] !h-[98vh] !max-w-[98vw] !max-h-[98vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>创建新试卷</DialogTitle>
              <DialogDescription>配置试卷基本信息和题目组织</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* 试卷基础信息 */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">试卷基础信息</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="examTitle">试卷标题</Label>
                    <Input id="examTitle" placeholder="输入试卷标题" />
                  </div>
                  <div>
                    <Label htmlFor="examContest">所属竞赛</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择竞赛" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CSP">CSP</SelectItem>
                        <SelectItem value="信息学奥赛">信息学奥赛</SelectItem>
                        <SelectItem value="ACM-ICPC">ACM-ICPC</SelectItem>
                        <SelectItem value="USACO">USACO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="examLevel">难度等级</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择难度" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">入门</SelectItem>
                        <SelectItem value="intermediate">进阶</SelectItem>
                        <SelectItem value="advanced">高级</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="examDuration">考试时长(分钟)</Label>
                    <Input id="examDuration" type="number" placeholder="180" />
                  </div>
                  <div>
                    <Label htmlFor="examYear">考试年份</Label>
                    <Input id="examYear" type="number" placeholder="2024" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="examDescription">试卷描述</Label>
                  <Textarea 
                    id="examDescription" 
                    placeholder="详细描述试卷内容和适用范围"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="examProblems">选择题目 (输入题目ID，用逗号分隔)</Label>
                  <Input 
                    id="examProblems" 
                    placeholder="1,2,3,4,5" 
                  />
                </div>
              </div>
              
              <Separator />
              
              {/* 关联权益选择 */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">关联会员权益</h3>
                <div className="space-y-2">
                  <Label>选择会员权益 <span className="text-muted-foreground text-sm">(可多选)</span></Label>
                  <div className="border rounded-lg p-4 space-y-3">
                    {level1Benefits.map((level1) => {
                      const relatedLevel2 = level2Benefits.filter(l2 => l2.parentId === level1.id);
                      return (
                        <div key={level1.id} className="space-y-2">
                          <div className="font-medium text-sm">{level1.name}</div>
                          <div className="pl-4 space-y-1">
                            {relatedLevel2.map((level2) => (
                              <div key={level2.id} className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const exists = selectedBenefits.some(
                                      b => b.level1 === level1.name && b.level2 === level2.name
                                    );
                                    if (!exists) {
                                      setSelectedBenefits([...selectedBenefits, { level1: level1.name, level2: level2.name }]);
                                    }
                                  }}
                                  disabled={selectedBenefits.some(
                                    b => b.level1 === level1.name && b.level2 === level2.name
                                  )}
                                >
                                  <Plus className="w-3 h-3 mr-1" />
                                  {level2.name}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* 已选权益展示 */}
                {selectedBenefits.length > 0 && (
                  <div className="space-y-2">
                    <Label>已选权益</Label>
                    <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/30">
                      {selectedBenefits.map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1 pr-1">
                          <span>{benefit.level1} - {benefit.level2}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => {
                              setSelectedBenefits(selectedBenefits.filter((_, i) => i !== index));
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={() => {
                  setShowAddExam(false);
                  setSelectedBenefits([]);
                }}>
                  取消
                </Button>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  创建试卷
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}