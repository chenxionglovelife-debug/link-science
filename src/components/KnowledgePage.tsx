import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import FriendlyFilters from './FriendlyFilters';
import { 
  BookOpen, 
  Filter, 
  Clock, 
  Users, 
  Star,
  PlayCircle,
  Trophy,
  TrendingUp,
  Target,
  Zap,
  Brain,
  CheckCircle,
  Lock,
  Bot,
  Terminal,
  Share2,
  Copy,
  Check,
  GitBranch,
  Circle
} from 'lucide-react';

interface Problem {
  id: number;
  title: string;
  subject: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  knowledgePoint: string;
  difficulty: number; // 1-5 stars
  acceptanceRate: number;
  submissions: number;
  timeLimit: number; // seconds
  memoryLimit: number; // MB
  tags: string[];
  description: string;
  status: 'not_attempted' | 'attempted' | 'solved' | 'locked';
  lastAttempt?: string;
  bestScore?: number;
  averageTime?: number; // minutes
  type?: 'coding' | 'general'; // 新增题目类型
}

interface KnowledgeNode {
  id: string;
  name: string;
  mastery: 'excellent' | 'good' | 'average' | 'poor' | 'none';
  children?: KnowledgeNode[];
  x?: number;
  y?: number;
}

interface KnowledgePageProps {
  onStartProblem: (problemId: number, problemType?: 'coding' | 'general') => void;
}

export default function KnowledgePage({ onStartProblem }: KnowledgePageProps) {
  const [filters, setFilters] = useState({
    subject: 'all',
    level: 'all',
    knowledgePoint: 'all',
    status: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentSubject, setCurrentSubject] = useState('Python基础');
  const [currentLevel, setCurrentLevel] = useState('Level 3');
  
  // 判断是否选择了特定知识点
  const hasSelectedKnowledgePoint = filters.knowledgePoint !== 'all';

  // 知识图谱数据
  const knowledgeGraph: KnowledgeNode[] = [
    {
      id: 'python-basics',
      name: 'Python基础语法',
      mastery: 'excellent',
      children: [
        { id: 'variables', name: '变量与数据类型', mastery: 'excellent' },
        { id: 'operators', name: '运算符', mastery: 'good' },
        { id: 'control-flow', name: '控制流程', mastery: 'average' }
      ]
    },
    {
      id: 'data-structures',
      name: '数据结构',
      mastery: 'good',
      children: [
        { id: 'lists', name: '列表与元组', mastery: 'excellent' },
        { id: 'dicts', name: '字典与集合', mastery: 'good' },
        { id: 'strings', name: '字符串处理', mastery: 'average' }
      ]
    },
    {
      id: 'functions',
      name: '函数与模块',
      mastery: 'average',
      children: [
        { id: 'basic-functions', name: '基础函数', mastery: 'good' },
        { id: 'advanced-functions', name: '高级函数特性', mastery: 'poor' },
        { id: 'modules', name: '模块导入', mastery: 'average' }
      ]
    },
    {
      id: 'oop',
      name: '面向对象编程',
      mastery: 'poor',
      children: [
        { id: 'classes', name: '类与对象', mastery: 'poor' },
        { id: 'inheritance', name: '继承与多态', mastery: 'none' },
        { id: 'encapsulation', name: '封装', mastery: 'poor' }
      ]
    },
    {
      id: 'algorithms',
      name: '算法基础',
      mastery: 'average',
      children: [
        { id: 'sorting', name: '排序算法', mastery: 'good' },
        { id: 'searching', name: '搜索算法', mastery: 'average' },
        { id: 'recursion', name: '递归', mastery: 'poor' }
      ]
    }
  ];

  const problems: Problem[] = [
    {
      id: 1,
      title: '两数之和',
      subject: '算法基础',
      level: 'beginner',
      knowledgePoint: '哈希表',
      difficulty: 1,
      acceptanceRate: 89.2,
      submissions: 15420,
      timeLimit: 1,
      memoryLimit: 128,
      tags: ['数组', '哈希表'],
      description: '给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。',
      status: 'solved',
      lastAttempt: '2024-01-15',
      bestScore: 100,
      averageTime: 5,
      type: 'coding' // 编程题
    },
    {
      id: 2,
      title: '二叉树的中序遍历',
      subject: '数据结构',
      level: 'intermediate',
      knowledgePoint: '二叉树',
      difficulty: 2,
      acceptanceRate: 72.5,
      submissions: 8934,
      timeLimit: 2,
      memoryLimit: 256,
      tags: ['树', '递归', '栈'],
      description: '给定一个二叉树，返回它的中序遍历结果。',
      status: 'attempted',
      lastAttempt: '2024-01-12',
      bestScore: 60,
      averageTime: 15
    },
    {
      id: 3,
      title: '最长公共子序列',
      subject: '算法进阶',
      level: 'advanced',
      knowledgePoint: '动态规划',
      difficulty: 4,
      acceptanceRate: 45.8,
      submissions: 5678,
      timeLimit: 3,
      memoryLimit: 512,
      tags: ['动态规划', '字符串'],
      description: '给定两个字符串，求它们的最长公共子序列的长度。',
      status: 'not_attempted',
      lastAttempt: undefined,
      bestScore: undefined,
      averageTime: undefined,
      type: 'coding' // 编程题
    },
    {
      id: 4,
      title: '快速排序实现',
      subject: '算法基础',
      level: 'intermediate',
      knowledgePoint: '排序算法',
      difficulty: 3,
      acceptanceRate: 67.3,
      submissions: 12345,
      timeLimit: 2,
      memoryLimit: 256,
      tags: ['排序', '分治', '递归'],
      description: '实现快速排序算法，要求时间复杂度为O(nlogn)。',
      status: 'solved',
      lastAttempt: '2024-01-10',
      bestScore: 95,
      averageTime: 12,
      type: 'coding' // 编程题
    },
    {
      id: 5,
      title: '图的深度优先搜索',
      subject: '数据结构',
      level: 'advanced',
      knowledgePoint: '图论',
      difficulty: 5,
      acceptanceRate: 38.9,
      submissions: 3456,
      timeLimit: 4,
      memoryLimit: 512,
      tags: ['图', 'DFS', '递归'],
      description: '实现图的深度优先搜索算法，遍历所有可达节点。',
      status: 'locked',
      lastAttempt: undefined,
      bestScore: undefined,
      averageTime: undefined
    },
    {
      id: 6,
      title: '滑动窗口最大值',
      subject: '算法进阶',
      level: 'intermediate',
      knowledgePoint: '滑动窗口',
      difficulty: 3,
      acceptanceRate: 55.7,
      submissions: 7890,
      timeLimit: 2,
      memoryLimit: 256,
      tags: ['数组', '滑动窗口', '单调队列'],
      description: '给定一个数组和滑动窗口大小，求每个窗口的最大值。',
      status: 'attempted',
      lastAttempt: '2024-01-08',
      bestScore: 75,
      averageTime: 18
    }
  ];

  const filteredProblems = problems.filter(problem => {
    const matchesSubject = filters.subject === 'all' || problem.subject === filters.subject;
    const matchesLevel = filters.level === 'all' || problem.level === filters.level;
    const matchesKnowledgePoint = filters.knowledgePoint === 'all' || problem.knowledgePoint === filters.knowledgePoint;
    const matchesStatus = filters.status === 'all' || problem.status === filters.status;
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesLevel && matchesKnowledgePoint && matchesStatus && matchesSearch;
  });

  const handleFilterChange = (key: string, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filterGroups = [
    {
      key: 'subject',
      label: '科目分类',
      options: [
        { value: '算法基础', label: '算法基础' },
        { value: '算法进阶', label: '算法进阶' },
        { value: '数据结构', label: '数据结构' },
        { value: '数学思维', label: '数学思维' },
      ]
    },
    {
      key: 'level',
      label: '难度等级',
      options: [
        { value: 'beginner', label: '入门级' },
        { value: 'intermediate', label: '进阶级' },
        { value: 'advanced', label: '高级' },
      ]
    },
    {
      key: 'knowledgePoint',
      label: '知识点',
      options: [
        { value: '哈希表', label: '哈希表' },
        { value: '二叉树', label: '二叉树' },
        { value: '动态规划', label: '动态规划' },
        { value: '排序算法', label: '排序算法' },
        { value: '图论', label: '图论' },
        { value: '滑动窗口', label: '滑动窗口' },
      ]
    },
    {
      key: 'status',
      label: '完成状态',
      options: [
        { value: 'not_attempted', label: '未尝试' },
        { value: 'attempted', label: '已尝试' },
        { value: 'solved', label: '已解决' },
      ]
    }
  ];

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">入门</Badge>;
      case 'intermediate':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">进阶</Badge>;
      case 'advanced':
        return <Badge className="bg-red-500 hover:bg-red-600 text-white">高级</Badge>;
      default:
        return <Badge variant="secondary">{level}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'solved':
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">已解决</Badge>;
      case 'attempted':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">已尝试</Badge>;
      case 'not_attempted':
        return <Badge variant="outline">未尝试</Badge>;
      case 'locked':
        return <Badge variant="outline">已锁定</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < difficulty ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'solved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'attempted':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return <Target className="w-5 h-5 text-blue-500" />;
    }
  };

  const getMasteryColor = (mastery: string) => {
    switch (mastery) {
      case 'excellent':
        return 'bg-green-500 border-green-600 text-white';
      case 'good':
        return 'bg-blue-500 border-blue-600 text-white';
      case 'average':
        return 'bg-yellow-500 border-yellow-600 text-white';
      case 'poor':
        return 'bg-orange-500 border-orange-600 text-white';
      case 'none':
        return 'bg-red-500 border-red-600 text-white';
      default:
        return 'bg-gray-500 border-gray-600 text-white';
    }
  };

  const handleShareReport = () => {
    const shareUrl = `https://codequest.app/report/share/${encodeURIComponent(currentSubject)}-${encodeURIComponent(currentLevel)}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/30 dark:from-slate-900 dark:via-green-900/20 dark:to-blue-900/20">
      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 p-8">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <span>学习诊断</span>
                  </h1>
                  <p className="text-muted-foreground mt-3 text-xl">AI智能诊断学习状况，生成个性化学习报告</p>
                </div>
                {/* 分享按钮 */}
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  onClick={() => setShowShareDialog(true)}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  分享报告
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 知识图谱展示 */}
        <div className="mb-8">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <GitBranch className="w-6 h-6 text-blue-500" />
                <span>分类表现 - {currentSubject} {currentLevel}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {knowledgeGraph.map((node, index) => (
                  <div key={node.id} className="space-y-3">
                    {/* 主节点 */}
                    <div className="flex items-center space-x-4">
                      <div className={`px-4 py-2 rounded-lg border-2 ${getMasteryColor(node.mastery)} shadow-sm`}>
                        <span className="font-medium">{node.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        掌握程度: {
                          node.mastery === 'excellent' ? '优秀' :
                          node.mastery === 'good' ? '良好' :
                          node.mastery === 'average' ? '一般' :
                          node.mastery === 'poor' ? '较差' : '未掌握'
                        }
                      </div>
                    </div>
                    
                    {/* 子节点 */}
                    {node.children && (
                      <div className="ml-8 grid grid-cols-3 gap-3">
                        {node.children.map((child) => (
                          <div key={child.id} className="flex items-center space-x-2">
                            <Circle className={`w-3 h-3 fill-current ${
                              child.mastery === 'excellent' ? 'text-green-500' :
                              child.mastery === 'good' ? 'text-blue-500' :
                              child.mastery === 'average' ? 'text-yellow-500' :
                              child.mastery === 'poor' ? 'text-orange-500' : 'text-red-500'
                            }`} />
                            <span className="text-sm">{child.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* 图例 */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>优秀</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>良好</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>一般</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span>较差</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>未掌握</span>
                  </div>
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
                <FriendlyFilters
                  filterGroups={filterGroups}
                  selectedFilters={filters}
                  onFilterChange={handleFilterChange}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  searchPlaceholder="搜索题目名称或标签..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Problem List */}
          <div className="col-span-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-green-500" />
                    <span>考点专练</span>
                    <Badge variant="outline">{filteredProblems.length}</Badge>
                    <span className="text-muted-foreground">个题目</span>
                  </CardTitle>
                  <div className="flex items-center space-x-3">
                    {hasSelectedKnowledgePoint && (
                      <>
                        <Button
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          onClick={() => {
                            console.log('开始练习：', filters.knowledgePoint);
                            // 这里可以添加开始练习的逻辑
                          }}
                        >
                          <PlayCircle className="w-4 h-4 mr-2" />
                          开始练习
                        </Button>
                        <Button
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          onClick={() => {
                            console.log('AI组卷：', filters.knowledgePoint);
                            // 这里可以添加AI组卷的逻辑
                          }}
                        >
                          <Bot className="w-4 h-4 mr-2" />
                          AI组卷
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredProblems.map((problem) => (
                  <div
                    key={problem.id}
                    className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getStatusIcon(problem.status)}
                          <h3 className="font-semibold">{problem.title}</h3>
                          {problem.type === 'coding' && (
                            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                              <Terminal className="w-3 h-3 mr-1" />
                              编程题
                            </Badge>
                          )}
                          <div className="flex items-center space-x-1">
                            {getDifficultyStars(problem.difficulty)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-green-600">{problem.acceptanceRate}%</span>
                            <span className="text-xs text-muted-foreground">通过率</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <span>{problem.subject}</span>
                          <span>•</span>
                          <span>{problem.knowledgePoint}</span>
                          <span>•</span>
                          <span>{problem.submissions} 次提交</span>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <Button 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                          disabled={problem.status === 'locked'}
                          onClick={() => problem.status !== 'locked' && onStartProblem(problem.id, problem.type || 'general')}
                        >
                          {problem.status === 'solved' ? '再次挑战' : problem.status === 'locked' ? '待解锁' : '开始答题'}
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

      {/* 分享弹窗 */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Share2 className="w-5 h-5 text-blue-500" />
              <span>分享学习报告</span>
            </DialogTitle>
            <DialogDescription>
              将你的学习诊断报告分享给老师或朋友，让他们了解你的学习进度。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">报告链接：</p>
              <div className="flex items-center space-x-2">
                <input
                  readOnly
                  value={`https://codequest.app/report/share/${encodeURIComponent(currentSubject)}-${encodeURIComponent(currentLevel)}`}
                  className="flex-1 px-3 py-2 text-sm bg-background border rounded"
                />
                <Button
                  size="sm"
                  onClick={handleShareReport}
                  className="shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              * 此链接包含你当前的学习进度和知识点掌握情况，请谨慎分享
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}