import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { DataPagination } from '../components/ui/data-pagination';
import { usePagination } from '../components/ui/usePagination';
import { 
  FileText, 
  Search, 
  Filter, 
  Send,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  AlertCircle,
  Edit
} from 'lucide-react';

// 审核状态类型
type AuditStatus = 'pending_review' | 'in_review' | 'approved' | 'rejected';

interface ExamWithAudit {
  id: number;
  title: string;
  contest: string;
  subject: string;
  level: string;
  year: number;
  totalQuestions: number;
  createTime: string;
  auditStatus: AuditStatus;
  reviewer?: string;
  reviewTime?: string;
  reviewComment?: string;
  canDisplay: boolean;
}

export default function ExamAuditManagePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [auditStatusFilter, setAuditStatusFilter] = useState<string>('all');
  const [selectedExam, setSelectedExam] = useState<ExamWithAudit | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewComment, setReviewComment] = useState('');

  // 模拟试卷数据（包含审核状态）
  const [exams, setExams] = useState<ExamWithAudit[]>([
    {
      id: 1,
      title: 'Python基础考试2024',
      contest: 'CSP',
      subject: 'Python',
      level: '初级',
      year: 2024,
      totalQuestions: 25,
      createTime: '2024-10-10 10:30:25',
      auditStatus: 'approved',
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
      auditStatus: 'pending_review',
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
      auditStatus: 'in_review',
      canDisplay: false
    },
    {
      id: 4,
      title: '数据结构专项练习',
      contest: 'CSP',
      subject: 'Python',
      level: '中级',
      year: 2024,
      totalQuestions: 18,
      createTime: '2024-10-14 11:15:33',
      auditStatus: 'rejected',
      reviewer: '管理员李四',
      reviewTime: '2024-10-14 15:30:00',
      reviewComment: '部分题目难度不符合中级标准，需要调整',
      canDisplay: false
    }
  ]);

  // 获取审核状态徽章
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

  // 筛选试卷
  const filteredExams = useMemo(() => {
    return exams.filter(exam => {
      const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = auditStatusFilter === 'all' || exam.auditStatus === auditStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [exams, searchQuery, auditStatusFilter]);

  // 使用分页
  const {
    currentPage,
    pageSize,
    totalPages,
    currentData: paginatedExams,
    totalItems,
    handlePageChange,
    handlePageSizeChange
  } = usePagination(filteredExams, 10);

  // 提交审核
  const handleSubmitForReview = (examId: number) => {
    setExams(exams.map(exam => 
      exam.id === examId ? { ...exam, auditStatus: 'pending_review' as AuditStatus } : exam
    ));
  };

  // 审核通过
  const handleApprove = () => {
    if (selectedExam) {
      setExams(exams.map(exam => 
        exam.id === selectedExam.id ? {
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
      setSelectedExam(null);
    }
  };

  // 审核拒绝
  const handleReject = () => {
    if (selectedExam && reviewComment.trim()) {
      setExams(exams.map(exam => 
        exam.id === selectedExam.id ? {
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
      setSelectedExam(null);
    }
  };

  // 切换展示状态
  const handleToggleDisplay = (examId: number, checked: boolean) => {
    setExams(exams.map(exam => 
      exam.id === examId && exam.auditStatus === 'approved' ? { ...exam, canDisplay: checked } : exam
    ));
  };

  // 打开审核对话框
  const openReviewDialog = (exam: ExamWithAudit) => {
    setSelectedExam(exam);
    setReviewComment('');
    setIsReviewDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">试卷审核管理</h1>
          <p className="text-muted-foreground">管理试卷审核状态和前台展示权限</p>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">待审核</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{exams.filter(e => e.auditStatus === 'pending_review').length}</div>
            <p className="text-xs text-muted-foreground">需要审核</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">审核中</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{exams.filter(e => e.auditStatus === 'in_review').length}</div>
            <p className="text-xs text-muted-foreground">正在审核</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">已审核</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{exams.filter(e => e.auditStatus === 'approved').length}</div>
            <p className="text-xs text-muted-foreground">可以发布</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">审核未通过</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{exams.filter(e => e.auditStatus === 'rejected').length}</div>
            <p className="text-xs text-muted-foreground">需要修改</p>
          </CardContent>
        </Card>
      </div>

      {/* 筛选和搜索 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="搜索试卷标题..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
        </CardContent>
      </Card>

      {/* 试卷列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-purple-500" />
            <span>试卷列表</span>
            <Badge variant="outline">{totalItems}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              {paginatedExams.map((exam) => (
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
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </CardContent>
      </Card>

      {/* 审核对话框 */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>试卷审核</DialogTitle>
            <DialogDescription>
              审核试卷: {selectedExam?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* 试卷信息 */}
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">竞赛类型：</span>
                <span>{selectedExam?.contest}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">科目：</span>
                <span>{selectedExam?.subject}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">等级：</span>
                <span>{selectedExam?.level}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">题目数量：</span>
                <span>{selectedExam?.totalQuestions}题</span>
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
    </div>
  );
}
