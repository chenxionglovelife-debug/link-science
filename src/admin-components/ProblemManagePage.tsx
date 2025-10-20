import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  FileText,
  Tag,
  Clock,
  Users,
  TrendingUp,
  Brain,
  Upload,
  Settings,
  X,
  GripVertical,
  Code,
  Calendar as CalendarIcon,
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield
} from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DateRangeFilter from './DateRangeFilter';
import StemManageDialog from './StemManageDialog';
import ExamPreviewDialog from './ExamPreviewDialog';
import { usePagination } from '../components/ui/usePagination';
import { DataPagination } from '../components/ui/data-pagination';

// 拖拽题目组件
const DraggableProblemRow = ({ problem, index, moveProblem, onEdit, onDelete }: any) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'problem',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'problem',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveProblem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <TableRow ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <TableCell>
        <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
      </TableCell>
      <TableCell>{problem.title}</TableCell>
      <TableCell><Badge variant="outline">{problem.type}</Badge></TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(problem)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDelete(problem.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default function ProblemManagePage() {
  const [isAddProblemOpen, setIsAddProblemOpen] = useState(false);
  const [isAddExamOpen, setIsAddExamOpen] = useState(false);
  const [isManualAddProblemOpen, setIsManualAddProblemOpen] = useState(false);
  const [isAIAssistOpen, setIsAIAssistOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [problemType, setProblemType] = useState('single');
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
  const [examProblems, setExamProblems] = useState<any[]>([]);
  const [isAddingProblemToExam, setIsAddingProblemToExam] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [stemContent, setStemContent] = useState('');
  
  // 会员权益数据
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

  // 模拟题目数据
  const problems = [
    {
      id: 1,
      title: '两数之和',
      type: '编程题',
      knowledgePoint: '数组遍历',
      difficulty: '简单',
      organizer: 'CodeQuest',
      subject: 'Python',
      level: '初级',
      examName: 'Python基础考试',
      addTime: '2024-01-15 10:30:25',
      vectorStatus: '已向量化'
    },
    {
      id: 2,
      title: '快速排序实现',
      type: '编程题',
      knowledgePoint: '排序算法',
      difficulty: '中等',
      organizer: 'CodeQuest',
      subject: 'C++',
      level: '中级',
      examName: 'C++算法考试',
      addTime: '2024-01-15 11:15:42',
      vectorStatus: '待向量化'
    },
    {
      id: 3,
      title: '面向对象基本概念',
      type: '单选题',
      knowledgePoint: '面向对象编程',
      difficulty: '简单',
      organizer: 'CodeQuest',
      subject: 'Java',
      level: '初级',
      examName: 'Java入门考试',
      addTime: '2024-01-15 14:20:18',
      vectorStatus: '已向量化'
    }
  ];

  // 模拟试卷数据
  const exams = [
    {
      id: 1,
      name: 'Python基础考试',
      organizer: 'CodeQuest',
      subject: 'Python',
      level: '初级',
      year: 2024,
      duration: 120,
      addTime: '2024-01-10 09:00:00',
      isVisible: true,
      problemCount: 25,
      auditStatus: 'approved'
    },
    {
      id: 2,
      name: 'C++算法竞赛模拟',
      organizer: 'ACM',
      subject: 'C++',
      level: '高级',
      year: 2024,
      duration: 180,
      addTime: '2024-01-12 14:30:00',
      isVisible: true,
      problemCount: 15,
      auditStatus: 'in_review'
    }
  ];

  const getDifficultyStars = (difficulty: string) => {
    const starMap: { [key: string]: number } = {
      '简单': 1,
      '中等': 3,
      '困难': 5
    };
    const stars = starMap[difficulty] || 1;
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className={index < stars ? "text-yellow-500" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const getVectorStatusBadge = (status: string) => {
    switch (status) {
      case '已向量化':
        return <Badge className="bg-green-500 hover:bg-green-600">已向量化</Badge>;
      case '待向量化':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">待向量化</Badge>;
      case '向量化失败':
        return <Badge variant="destructive">向量化失败</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const moveProblem = (fromIndex: number, toIndex: number) => {
    const updatedProblems = [...examProblems];
    const [movedProblem] = updatedProblems.splice(fromIndex, 1);
    updatedProblems.splice(toIndex, 0, movedProblem);
    setExamProblems(updatedProblems);
  };

  const handleEditProblemInExam = (problem: any) => {
    // 打开编辑弹窗逻辑
    console.log('编辑题目', problem);
  };

  const handleDeleteProblemFromExam = (problemId: number) => {
    setExamProblems(examProblems.filter(p => p.id !== problemId));
  };

  // 题目列表分页
  const problemPagination = usePagination(problems, 20);

  // 试卷列表分页
  const examPagination = usePagination(exams, 10);

  // 试卷审核相关状态
  type AuditStatus = 'pending_review' | 'in_review' | 'approved' | 'rejected';
  const [auditSearchQuery, setAuditSearchQuery] = useState('');
  const [auditStatusFilter, setAuditStatusFilter] = useState<string>('all');
  const [selectedAuditExam, setSelectedAuditExam] = useState<any>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewComment, setReviewComment] = useState('');

  // 模拟审核试卷数据
  const [auditExams, setAuditExams] = useState([
    {
      id: 1,
      title: 'Python基础考试2024',
      contest: 'CSP',
      subject: 'Python',
      level: '初级',
      year: 2024,
      totalQuestions: 25,
      createTime: '2024-10-10 10:30:25',
      auditStatus: 'approved' as AuditStatus,
      reviewer: '管理员张三',
      reviewTime: '2024-10-11 09:00:00',
      reviewComment: '试卷质量良好，题目难度适中',
      canDisplay: true
    },
    {
      id: 2,
      title: 'C++算法竞赛模拟',
      contest: 'NOI',
      subject: 'C++',
      level: '高级',
      year: 2024,
      totalQuestions: 15,
      createTime: '2024-10-12 14:20:18',
      auditStatus: 'pending_review' as AuditStatus,
      canDisplay: false
    },
    {
      id: 3,
      title: 'Java入门测试',
      contest: 'ICPC',
      subject: 'Java',
      level: '初级',
      year: 2024,
      totalQuestions: 20,
      createTime: '2024-10-13 16:45:12',
      auditStatus: 'in_review' as AuditStatus,
      canDisplay: false
    }
  ]);

  // 审核相关方法
  const getAuditStatusBadge = (status: AuditStatus) => {
    switch (status) {
      case 'pending_review':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600"><Clock className="w-3 h-3 mr-1" />待审核</Badge>;
      case 'in_review':
        return <Badge className="bg-blue-500 hover:bg-blue-600"><Clock className="w-3 h-3 mr-1" />审核中</Badge>;
      case 'approved':
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />已审核</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 hover:bg-red-600"><XCircle className="w-3 h-3 mr-1" />审核未通过</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };

  const handleSubmitForReview = (examId: number) => {
    setAuditExams(auditExams.map(exam => 
      exam.id === examId ? { ...exam, auditStatus: 'pending_review' as AuditStatus } : exam
    ));
  };

  const handleApprove = () => {
    if (selectedAuditExam) {
      setAuditExams(auditExams.map(exam => 
        exam.id === selectedAuditExam.id ? {
          ...exam,
          auditStatus: 'approved' as AuditStatus,
          reviewer: '当前管理员',
          reviewTime: new Date().toLocaleString('zh-CN'),
          reviewComment: reviewComment.trim() || '审核通过',
          canDisplay: true
        } : exam
      ));
      setIsReviewDialogOpen(false);
      setReviewComment('');
      setSelectedAuditExam(null);
    }
  };

  const handleReject = () => {
    if (selectedAuditExam && reviewComment.trim()) {
      setAuditExams(auditExams.map(exam => 
        exam.id === selectedAuditExam.id ? {
          ...exam,
          auditStatus: 'rejected' as AuditStatus,
          reviewer: '当前管理员',
          reviewTime: new Date().toLocaleString('zh-CN'),
          reviewComment: reviewComment.trim(),
          canDisplay: false
        } : exam
      ));
      setIsReviewDialogOpen(false);
      setReviewComment('');
      setSelectedAuditExam(null);
    }
  };

  const handleToggleDisplay = (examId: number, checked: boolean) => {
    setAuditExams(auditExams.map(exam => 
      exam.id === examId && exam.auditStatus === 'approved' ? { ...exam, canDisplay: checked } : exam
    ));
  };

  const openReviewDialog = (exam: any) => {
    setSelectedAuditExam(exam);
    setReviewComment('');
    setIsReviewDialogOpen(true);
  };

  // 筛选审核试卷
  const filteredAuditExams = auditExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(auditSearchQuery.toLowerCase());
    const matchesStatus = auditStatusFilter === 'all' || exam.auditStatus === auditStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // 审核试卷分页
  const auditPagination = usePagination(filteredAuditExams, 10);

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">题库管理</h1>
          <p className="text-muted-foreground">管理题目内容和试卷配置</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>题库统计</span>
          </Button>
        </div>
      </div>

      {/* 时间筛选器 */}
      <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-blue-900 dark:text-blue-100">
            筛选题库统计数据的时间范围
          </span>
        </div>
        <DateRangeFilter 
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          label="筛选时间范围"
        />
      </div>

      {/* 题库统计概览 - B1.5更新：3个统计指标 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. 题目总数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">题目总数</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">2,847</div>
            <p className="text-xs text-muted-foreground">
              编程题: 1,234
            </p>
          </CardContent>
        </Card>

        {/* 2. 试卷总数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">试卷总数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">156</div>
            <p className="text-xs text-muted-foreground">
              VIP专属: 68 | 公开: 88
            </p>
          </CardContent>
        </Card>

        {/* 3. 试卷刷题次数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">试卷刷题次数</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">45,678</div>
            <p className="text-xs text-muted-foreground">
              累计完成次数
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <Tabs defaultValue="problems" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="problems">题目管理</TabsTrigger>
          <TabsTrigger value="exams">试卷管理</TabsTrigger>
          <TabsTrigger value="audit">试卷审核</TabsTrigger>
        </TabsList>

        {/* 题目管理 */}
        <TabsContent value="problems">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>题目管理</span>
                  </CardTitle>
                  <CardDescription>
                    管理题目内容，支持AI辅助录题和向量化
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Dialog open={isAddProblemOpen} onOpenChange={setIsAddProblemOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center space-x-2">
                        <Brain className="w-4 h-4" />
                        <span>AI辅助录题</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[75vw]">
                      <DialogHeader>
                        <DialogTitle>AI辅助录题</DialogTitle>
                        <DialogDescription>
                          上传文本内容，AI将自动识别题型、答案和知识点
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>上传题目内容</Label>
                          <Textarea 
                            placeholder="粘贴题目内容，或上传文档文件..."
                            rows={8}
                          />
                        </div>
                        <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                          <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            <div className="mt-4">
                              <Label className="cursor-pointer text-primary hover:text-primary/80">
                                上传文档文件
                                <input type="file" className="hidden" accept=".txt,.doc,.docx,.pdf" />
                              </Label>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              支持 TXT, DOC, DOCX, PDF 格式
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsAddProblemOpen(false)}>
                            取消
                          </Button>
                          <Button>开始AI识别</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    className="flex items-center space-x-2"
                    onClick={() => setIsManualAddProblemOpen(true)}
                  >
                    <Plus className="w-4 h-4" />
                    <span>手动添加题目</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 筛选器 */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input placeholder="题目标题" className="w-40" />
                </div>
                <Input placeholder="所属试卷名称" className="w-40" />
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="题目类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">单选题</SelectItem>
                    <SelectItem value="multiple">多选题</SelectItem>
                    <SelectItem value="judge">判断题</SelectItem>
                    <SelectItem value="coding">编程题</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="知识点" className="w-32" />
              </div>

              <Separator />

              {/* 题目列表 */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>题目标题</TableHead>
                      <TableHead>题型</TableHead>
                      <TableHead>知识点</TableHead>
                      <TableHead>难度</TableHead>
                      <TableHead>主办方</TableHead>
                      <TableHead>科目</TableHead>
                      <TableHead>等级</TableHead>
                      <TableHead>所属试卷</TableHead>
                      <TableHead>添加时间</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {problemPagination.currentData.map((problem) => (
                      <TableRow key={problem.id}>
                        <TableCell>{problem.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{problem.type}</Badge>
                        </TableCell>
                        <TableCell>{problem.knowledgePoint}</TableCell>
                        <TableCell>{getDifficultyStars(problem.difficulty)}</TableCell>
                        <TableCell>{problem.organizer}</TableCell>
                        <TableCell>{problem.subject}</TableCell>
                        <TableCell>{problem.level}</TableCell>
                        <TableCell>{problem.examName}</TableCell>
                        <TableCell>{problem.addTime}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* 题目列表分页 */}
                <DataPagination
                  currentPage={problemPagination.currentPage}
                  totalPages={problemPagination.totalPages}
                  pageSize={problemPagination.pageSize}
                  totalItems={problemPagination.totalItems}
                  onPageChange={problemPagination.handlePageChange}
                  onPageSizeChange={problemPagination.handlePageSizeChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI辅助录题Dialog - 独立于其他Dialog */}
        <Dialog open={isAIAssistOpen} onOpenChange={setIsAIAssistOpen}>
          <DialogContent className="max-w-[75vw]">
            <DialogHeader>
              <DialogTitle>AI辅助录题</DialogTitle>
              <DialogDescription>
                AI将帮助你快速录入题目
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea placeholder="粘贴题目内容..." rows={8} />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAIAssistOpen(false)}>取消</Button>
                <Button>开始识别</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* 手动添加题目Dialog - 独立于其他Dialog，可从任何Tab访问 */}
        <Dialog open={isManualAddProblemOpen} onOpenChange={setIsManualAddProblemOpen}>
          <DialogContent className="!w-[95vw] !h-[95vh] !max-w-[95vw] !max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>手动添加题目</DialogTitle>
              <DialogDescription>
                创建新的题目并设置详细信息
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>题目类型</Label>
                  <Select value={problemType} onValueChange={setProblemType}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择题型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">单选题</SelectItem>
                      <SelectItem value="single_complete">单选题（完善程序）</SelectItem>
                      <SelectItem value="single_reading">单选题（阅读理解）</SelectItem>
                      <SelectItem value="multiple">多选题</SelectItem>
                      <SelectItem value="judge">判断题</SelectItem>
                      <SelectItem value="judge_reading">判断题（阅读理解）</SelectItem>
                      <SelectItem value="coding">编程题</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* B1.5新增：题干输入区（当选择需要题干的题型时显示） */}
              {['single_complete', 'single_reading', 'judge_reading'].includes(problemType) && (
                <div className="space-y-2 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <Label>题干（富文本）</Label>
                    <StemManageDialog 
                      onSelectStem={(stem) => {
                        setStemContent(stem.content);
                      }}
                    />
                  </div>
                  <Textarea 
                    placeholder="输入题干内容，或点击右侧按钮选择已有题干..." 
                    rows={6}
                    value={stemContent}
                    onChange={(e) => setStemContent(e.target.value)}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    支持HTML格式，如：&lt;b&gt;粗体&lt;/b&gt;、&lt;pre&gt;代码块&lt;/pre&gt;
                  </p>
                </div>
              )}

              {/* 题目标题 */}
              <div className="space-y-2">
                <Label>题目标题（富文本）</Label>
                <Textarea placeholder="输入题目标题，支持富文本格式..." rows={3} className="font-mono" />
                <p className="text-xs text-muted-foreground">支持HTML格式，如：&lt;b&gt;粗体&lt;/b&gt;、&lt;i&gt;斜体&lt;/i&gt;</p>
              </div>

              {problemType === 'coding' && (
                <div className="space-y-4 border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>运行时长限制（ms）</Label>
                      <Input type="number" placeholder="1000" />
                    </div>
                    <div className="space-y-2">
                      <Label>运行内存限制（MB）</Label>
                      <Input type="number" placeholder="256" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>输入格式（富文本）</Label>
                      <Textarea placeholder="描述输入格式，支持富文本..." rows={4} className="font-mono" />
                    </div>
                    <div className="space-y-2">
                      <Label>输出格式（富文本）</Label>
                      <Textarea placeholder="描述输出格式，支持富文本..." rows={4} className="font-mono" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>输入输出测试点（最多10组）</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (testCases.length < 10) {
                          setTestCases([...testCases, { input: '', output: '' }]);
                        }
                      }}
                      disabled={testCases.length >= 10}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      添加测试点
                    </Button>
                  </div>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {testCases.map((testCase, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <h4>测试点 {index + 1}</h4>
                          {testCases.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setTestCases(testCases.filter((_, i) => i !== index));
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>输入（富文本）</Label>
                            <Textarea
                              placeholder="测试输入，支持富文本..."
                              rows={3}
                              value={testCase.input}
                              onChange={(e) => {
                                const newTestCases = [...testCases];
                                newTestCases[index].input = e.target.value;
                                setTestCases(newTestCases);
                              }}
                              className="font-mono"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>期望输出（富文本）</Label>
                            <Textarea
                              placeholder="期望输出，支持富文本..."
                              rows={3}
                              value={testCase.output}
                              onChange={(e) => {
                                const newTestCases = [...testCases];
                                newTestCases[index].output = e.target.value;
                                setTestCases(newTestCases);
                              }}
                              className="font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(problemType === 'single' || problemType === 'single_complete' || problemType === 'single_reading' || problemType === 'multiple' || problemType === 'judge' || problemType === 'judge_reading') && (
                <div className="space-y-4 border-t pt-4">
                  <Label>选项设置（富文本）</Label>
                  {(problemType === 'single' || problemType === 'single_complete' || problemType === 'single_reading' || problemType === 'multiple') ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Textarea placeholder="选项A（支持富文本）" rows={2} className="font-mono" />
                        <Switch />
                        <span className="text-sm text-muted-foreground">正确</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Textarea placeholder="选项B（支持富文本）" rows={2} className="font-mono" />
                        <Switch />
                        <span className="text-sm text-muted-foreground">正确</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Textarea placeholder="选项C（支持富文本）" rows={2} className="font-mono" />
                        <Switch />
                        <span className="text-sm text-muted-foreground">正确</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Textarea placeholder="选项D（支持富文本）" rows={2} className="font-mono" />
                        <Switch />
                        <span className="text-sm text-muted-foreground">正确</span>
                      </div>
                    </div>
                  ) : (
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择正确答案" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">正确</SelectItem>
                        <SelectItem value="false">错误</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>知识点</Label>
                  <Input placeholder="数组遍历" />
                </div>
                <div className="space-y-2">
                  <Label>难度</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择难度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">简单</SelectItem>
                      <SelectItem value="medium">中等</SelectItem>
                      <SelectItem value="hard">困难</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>主办方</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择主办方" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="codequest">CodeQuest</SelectItem>
                      <SelectItem value="acm">ACM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>科目</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择科目" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>等级</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择等级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">初级</SelectItem>
                      <SelectItem value="2">中级</SelectItem>
                      <SelectItem value="3">高级</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>所属试卷</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择所属试卷" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Python基础考试</SelectItem>
                    <SelectItem value="2">C++算法实战</SelectItem>
                    <SelectItem value="3">Java企业开发实战</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>答案解析（富文本）</Label>
                <Textarea placeholder="输入答案解析，支持富文本格式..." rows={4} className="font-mono" />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => {
                  setIsManualAddProblemOpen(false);
                  setTestCases([{ input: '', output: '' }]);
                }}>
                  取消
                </Button>
                <Button>创建题目</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* 试卷管理 */}
        <TabsContent value="exams">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>试卷管理</span>
                  </CardTitle>
                  <CardDescription>
                    管理试卷配置和题目组织
                  </CardDescription>
                </div>
                <Dialog open={isAddExamOpen} onOpenChange={setIsAddExamOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>新增试卷</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="!w-[98vw] !h-[98vh] !max-w-[98vw] !max-h-[98vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                      <DialogTitle>新增试卷</DialogTitle>
                      <DialogDescription>
                        配置试卷基本信息并添加题目
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto">
                      <div className="grid grid-cols-5 gap-6">
                        {/* 左侧：试卷基础信息配置 */}
                        <div className="col-span-2 space-y-4 pr-4 border-r">
                          <h3 className="font-semibold">试卷基础信息</h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>试卷名称</Label>
                              <Input placeholder="输入试卷名称" />
                            </div>
                            <div className="space-y-2">
                              <Label>等级</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="选择等级" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="beginner">初级</SelectItem>
                                  <SelectItem value="intermediate">中级</SelectItem>
                                  <SelectItem value="advanced">高级</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>年份</Label>
                              <Input type="number" placeholder="2024" />
                            </div>
                            <div className="space-y-2">
                              <Label>考试时长(分钟)</Label>
                              <Input type="number" placeholder="120" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Switch id="is-visible" defaultChecked />
                                <Label htmlFor="is-visible">是否展示</Label>
                              </div>
                            </div>
                            
                            <Separator className="my-4" />
                            
                            {/* 关联权益选择 */}
                            <div className="space-y-3">
                              <Label className="text-base">关联会员权益</Label>
                              <div className="border rounded-lg p-4 space-y-3 bg-muted/30">
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
                                              type="button"
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
                              
                              {/* 已选权益展示 */}
                              {selectedBenefits.length > 0 && (
                                <div className="space-y-2">
                                  <Label className="text-sm">已选权益</Label>
                                  <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-background">
                                    {selectedBenefits.map((benefit, index) => (
                                      <Badge key={index} variant="secondary" className="flex items-center gap-1 pr-1">
                                        <span>{benefit.level1} - {benefit.level2}</span>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          type="button"
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
                          </div>
                        </div>

                        {/* 右侧：试卷题目列表 */}
                        <div className="col-span-3 space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">试卷题目 ({examProblems.length}题)</h3>
                            <div className="flex items-center space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Search className="w-4 h-4 mr-1" />
                                    从题库检索
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[75vw]">
                                  <DialogHeader>
                                    <DialogTitle>从题库检索题目</DialogTitle>
                                    <DialogDescription>
                                      搜索并选择要添加到试卷的题目
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                      <Select defaultValue="title">
                                        <SelectTrigger className="w-40">
                                          <SelectValue placeholder="检索方式" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="title">按题目标题</SelectItem>
                                          <SelectItem value="exam">按所属试卷</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <Input placeholder="输入检索关键词..." className="flex-1" />
                                      <Button>搜索</Button>
                                    </div>
                                    <div className="border rounded-lg max-h-96 overflow-y-auto">
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead className="w-12">选择</TableHead>
                                            <TableHead>题目标题</TableHead>
                                            <TableHead>题型</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {problems.map((problem) => (
                                            <TableRow key={problem.id}>
                                              <TableCell>
                                                <Switch 
                                                  checked={examProblems.some(p => p.id === problem.id)}
                                                  onCheckedChange={(checked) => {
                                                    if (checked) {
                                                      setExamProblems([...examProblems, problem]);
                                                    } else {
                                                      setExamProblems(examProblems.filter(p => p.id !== problem.id));
                                                    }
                                                  }}
                                                />
                                              </TableCell>
                                              <TableCell>{problem.title}</TableCell>
                                              <TableCell><Badge variant="outline">{problem.type}</Badge></TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                      <Button variant="outline">关闭</Button>
                                      <Button>确认添加</Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setIsAIAssistOpen(true)}
                              >
                                <Brain className="w-4 h-4 mr-1" />
                                AI辅助录题
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => setIsManualAddProblemOpen(true)}
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                新增题目
                              </Button>
                            </div>
                          </div>

                          {examProblems.length > 0 ? (
                            <DndProvider backend={HTML5Backend}>
                              <div className="border rounded-lg">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="w-12"></TableHead>
                                      <TableHead>题目标题</TableHead>
                                      <TableHead>题型</TableHead>
                                      <TableHead>操作</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {examProblems.map((problem, index) => (
                                      <DraggableProblemRow
                                        key={problem.id}
                                        problem={problem}
                                        index={index}
                                        moveProblem={moveProblem}
                                        onEdit={handleEditProblemInExam}
                                        onDelete={handleDeleteProblemFromExam}
                                      />
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </DndProvider>
                          ) : (
                            <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
                              <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                              <p>暂未添加题目，请从题库检索或新增题目</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between pt-4 border-t mt-4">
                      <ExamPreviewDialog examTitle="新建试卷预览" questions={examProblems.length > 0 ? undefined : undefined}>
                        <Button variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          预览试卷
                        </Button>
                      </ExamPreviewDialog>
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => {
                          setIsAddExamOpen(false);
                          setExamProblems([]);
                        }}>
                          取消
                        </Button>
                        <Button>创建试卷</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 筛选器 */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input placeholder="试卷名称" className="w-40" />
                </div>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="等级" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">初级</SelectItem>
                    <SelectItem value="intermediate">中级</SelectItem>
                    <SelectItem value="advanced">高级</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="审核状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="pending_review">待审核</SelectItem>
                    <SelectItem value="in_review">审核中</SelectItem>
                    <SelectItem value="approved">已审核</SelectItem>
                    <SelectItem value="rejected">审核未通过</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* 试卷列表（去掉封面字段） */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>试卷名称</TableHead>
                      <TableHead>主办方</TableHead>
                      <TableHead>科目</TableHead>
                      <TableHead>等级</TableHead>
                      <TableHead>年份</TableHead>
                      <TableHead>时长</TableHead>
                      <TableHead>题目数</TableHead>
                      <TableHead>审核状态</TableHead>
                      <TableHead>是否展示</TableHead>
                      <TableHead>添加时间</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examPagination.currentData.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell>{exam.name}</TableCell>
                        <TableCell>{exam.organizer}</TableCell>
                        <TableCell>{exam.subject}</TableCell>
                        <TableCell>{exam.level}</TableCell>
                        <TableCell>{exam.year}</TableCell>
                        <TableCell>{exam.duration}分钟</TableCell>
                        <TableCell>{exam.problemCount}</TableCell>
                        <TableCell>
                          {exam.auditStatus === 'pending_review' && <Badge className="bg-yellow-500 hover:bg-yellow-600">待审核</Badge>}
                          {exam.auditStatus === 'in_review' && <Badge className="bg-blue-500 hover:bg-blue-600">审核中</Badge>}
                          {exam.auditStatus === 'approved' && <Badge className="bg-green-500 hover:bg-green-600">已审核</Badge>}
                          {exam.auditStatus === 'rejected' && <Badge className="bg-red-500 hover:bg-red-600">审核未通过</Badge>}
                        </TableCell>
                        <TableCell>
                          <Switch checked={exam.isVisible} />
                        </TableCell>
                        <TableCell>{exam.addTime}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* 试卷列表分页 */}
                <DataPagination
                  currentPage={examPagination.currentPage}
                  totalPages={examPagination.totalPages}
                  pageSize={examPagination.pageSize}
                  totalItems={examPagination.totalItems}
                  onPageChange={examPagination.handlePageChange}
                  onPageSizeChange={examPagination.handlePageSizeChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 试卷审核 */}
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-purple-500" />
                    <span>试卷审核</span>
                  </CardTitle>
                  <CardDescription>
                    管理试卷审核状态和前台展示权限
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 筛选和搜索 */}
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="搜索试卷标题..."
                    value={auditSearchQuery}
                    onChange={(e) => setAuditSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={auditStatusFilter} onValueChange={setAuditStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="审核状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="pending_review">待审核</SelectItem>
                    <SelectItem value="in_review">审核中</SelectItem>
                    <SelectItem value="approved">已审核</SelectItem>
                    <SelectItem value="rejected">审核未通过</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* 试卷列表 */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>试卷标题</TableHead>
                      <TableHead>竞赛/科目</TableHead>
                      <TableHead>等级</TableHead>
                      <TableHead>题目数</TableHead>
                      <TableHead>创建时间</TableHead>
                      <TableHead>审核状态</TableHead>
                      <TableHead>审核信息</TableHead>
                      <TableHead>前台展示</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditPagination.currentData.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell>
                          <div className="font-medium">{exam.title}</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge variant="outline">{exam.contest}</Badge>
                            <div className="text-sm text-muted-foreground">{exam.subject}</div>
                          </div>
                        </TableCell>
                        <TableCell>{exam.level}</TableCell>
                        <TableCell>{exam.totalQuestions}题</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{exam.createTime}</TableCell>
                        <TableCell>{getAuditStatusBadge(exam.auditStatus)}</TableCell>
                        <TableCell>
                          {exam.reviewer ? (
                            <div className="space-y-1 text-sm">
                              <div className="text-muted-foreground">审核人：{exam.reviewer}</div>
                              <div className="text-muted-foreground">审核时间：{exam.reviewTime}</div>
                              {exam.reviewComment && (
                                <div className="text-xs text-muted-foreground max-w-xs">
                                  意见：{exam.reviewComment}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              checked={exam.canDisplay}
                              onCheckedChange={(checked) => handleToggleDisplay(exam.id, checked)}
                              disabled={exam.auditStatus !== 'approved'}
                            />
                            <Label className={exam.auditStatus !== 'approved' ? 'text-muted-foreground text-sm' : 'text-sm'}>
                              {exam.canDisplay ? '展示' : '隐藏'}
                            </Label>
                            {exam.auditStatus !== 'approved' && (
                              <Badge variant="outline" className="text-xs">
                                需审核通过
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <ExamPreviewDialog examTitle={exam.title} />
                            {exam.auditStatus === 'pending_review' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => openReviewDialog(exam)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                审核
                              </Button>
                            )}
                            {exam.auditStatus === 'in_review' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => openReviewDialog(exam)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                继续审核
                              </Button>
                            )}
                            {exam.auditStatus === 'rejected' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleSubmitForReview(exam.id)}
                              >
                                <Send className="w-4 h-4 mr-1" />
                                重新提交
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* 分页组件 */}
                <DataPagination
                  currentPage={auditPagination.currentPage}
                  totalPages={auditPagination.totalPages}
                  pageSize={auditPagination.pageSize}
                  totalItems={auditPagination.totalItems}
                  onPageChange={auditPagination.handlePageChange}
                  onPageSizeChange={auditPagination.handlePageSizeChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* 审核对话框 */}
          <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>试卷审核</DialogTitle>
                <DialogDescription>
                  审核试卷: {selectedAuditExam?.title}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* 试卷信息 */}
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">竞赛类型：</span>
                    <span>{selectedAuditExam?.contest}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">科目：</span>
                    <span>{selectedAuditExam?.subject}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">等级：</span>
                    <span>{selectedAuditExam?.level}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">题目数量：</span>
                    <span>{selectedAuditExam?.totalQuestions}题</span>
                  </div>
                </div>

                {/* 审核意见 */}
                <div className="space-y-2">
                  <Label>审核意见</Label>
                  <Textarea 
                    placeholder="请输入审核意见（拒绝时必填）"
                    rows={4}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                  />
                </div>

                {/* 操作说明 */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-900 dark:text-blue-100">
                      <p className="font-medium mb-1">审核说明</p>
                      <ul className="space-y-1 text-xs">
                        <li>• 审核通过后，试卷可在前台展示</li>
                        <li>• 审核拒绝时，必须填写拒绝原因</li>
                        <li>• 审核记录将被保存</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline"
                    onClick={() => setIsReviewDialogOpen(false)}
                  >
                    取消
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={handleReject}
                    disabled={!reviewComment.trim()}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    拒绝
                  </Button>
                  <Button 
                    onClick={handleApprove}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    通过审核
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}
