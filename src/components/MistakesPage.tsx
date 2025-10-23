import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { 
  Target, 
  Filter, 
  Clock, 
  TrendingDown, 
  RotateCcw,
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Calendar,
  Tag,
  PlayCircle,
  Shuffle,
  TrendingUp,
  Trash2,
  CalendarDays,
  Search
} from 'lucide-react';

interface MistakeProblem {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
  attempts: number;
  lastAttempt: string;
  lastError: string;
  description: string;
  analysis: string;
  suggestions: string[];
}

export default function MistakesPage() {
  const [selectedProblem, setSelectedProblem] = useState<MistakeProblem | null>(null);
  const [selectedProblems, setSelectedProblems] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    type: 'all',
    quickFilter: 'all', // 新增快捷筛选
    questionTypes: [] as string[] // 新增题型筛选
  });
  const [searchQuery, setSearchQuery] = useState('');

  const mistakeProblems: MistakeProblem[] = [
    {
      id: 1,
      title: '最长公共子序列',
      difficulty: 'medium',
      category: '动态规划',
      tags: ['DP', '字符串'],
      attempts: 5,
      lastAttempt: '2025-08-28',
      lastError: '状态转移方程错误',
      description: '给定两个字符串，求最长公共子序列的长度',
      analysis: '你在处理动态规划状态转移时，对于字符匹配和不匹配的情况理解有误。当s1[i] == s2[j]时，应该是dp[i+1][j+1] = dp[i][j] + 1，而不是dp[i+1][j+1] = max(dp[i][j+1], dp[i+1][j]) + 1。',
      suggestions: [
        '重新理解LCS的递推关系：字符相等时长度+1，不等时取两种情况的最大值',
        '多画状态转移图，理解每个状态的物理含义',
        '练习类似的字符串DP问题，如最长回文子序列',
        '掌握DP问题的一般解题思路：状态定义、转移方程、边界条件'
      ]
    },
    {
      id: 2,
      title: '二叉树的最大路径和',
      difficulty: 'hard',
      category: '树',
      tags: ['二叉树', '递归'],
      attempts: 6,
      lastAttempt: '2025-08-27',
      lastError: '递归返回值处理错误',
      description: '给定一个二叉树，找到其最大路径和',
      analysis: '你对递归函数的返回值理解有偏差。递归函数应该返回以当前节点为起点的最大路径和，而全局最大值在递归过程中更新。返回值不能包含\"拐弯\"的路径。',
      suggestions: [
        '区分递归函数的返回值和最终答案的区别',
        '理解树形DP中\"向上传递\"和\"内部最优\"的概念',
        '练习类似的树形递归问题，如二叉树的直径',
        '画出递归调用栈，理解每层递归的作用'
      ]
    },
    {
      id: 3,
      title: '滑动窗口最大值',
      difficulty: 'hard',
      category: '滑动窗口',
      tags: ['数组', '队列'],
      attempts: 4,
      lastAttempt: '2025-08-26',
      lastError: '单调队列实现错误',
      description: '给定数组和滑动窗口大小，返回每个窗口的最大值',
      analysis: '你在实现单调队列时，没有正确维护队列的单调性。应该在添加新元素前，从队尾移除所有小于等于新元素的元素，保证队列严格单调递减。',
      suggestions: [
        '深入理解单调队列的维护原理和操作步骤',
        '练习手动模拟滑动窗口的移动过程',
        '学习双端队列deque的使用方法',
        '掌握滑动窗口问题的通用解法模板'
      ]
    },
    {
      id: 4,
      title: '合并K个升序链表',
      difficulty: 'hard',
      category: '链表',
      tags: ['链表', '分治'],
      attempts: 7,
      lastAttempt: '2025-08-25',
      lastError: '分治边界条件错误',
      description: '将K个升序链表合并为一个升序链表',
      analysis: '你在分治递归时，对边界条件的处理不正确。当只有一个链表时应该直接返回，当没有链表时应该返回null。另外，合并两个链表的逻辑也有问题。',
      suggestions: [
        '掌握链表的基本操作，特别是指针的移动和连接',
        '理解分治算法的递归结构和边界处理',
        '先练习合并两个有序链表，再扩展到K个',
        '画图模拟分治过程，理解递归调用的层次结构'
      ]
    },
    {
      id: 5,
      title: '买卖股票的最佳时机 III',
      difficulty: 'hard',
      category: '动态规划',
      tags: ['DP', '数组'],
      attempts: 3,
      lastAttempt: '2025-07-20',
      lastError: '状态定义不清晰',
      description: '最多完成两笔交易的最大利润',
      analysis: '你对状态的定义不够清晰。应该用四个状态分别表示：第一次买入、第一次卖出、第二次买入、第二次卖出时的最大收益。状态转移要考虑当天操作和不操作两种情况。',
      suggestions: [
        '明确状态定义，理解每个状态的经济含义',
        '理解股票DP问题的通用状态机模型',
        '从简单的买卖股票I开始，逐步增加限制条件',
        '画出状态转移图，理解状态之间的转换关系'
      ]
    }
  ];

  const filteredProblems = mistakeProblems.filter(problem => {
    const problemDate = new Date(problem.lastAttempt);
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;
    
    // 日期筛选
    let matchesDate = (!startDate || problemDate >= startDate) && 
                     (!endDate || problemDate <= endDate);
    
    // 快捷时间筛选
    if (filters.quickFilter !== 'all') {
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      if (filters.quickFilter === 'week') {
        matchesDate = problemDate >= oneWeekAgo;
      } else if (filters.quickFilter === 'month') {
        matchesDate = problemDate >= oneMonthAgo;
      }
    }
    
    // 题型筛选
    const matchesQuestionType = filters.questionTypes.length === 0 || 
      filters.questionTypes.some(type => problem.category.includes(type));
    
    const matchesType = filters.type === 'all' || 
      (filters.type === '单选' && problem.category.includes('单选')) ||
      (filters.type === '多选' && problem.category.includes('多选')) ||
      (filters.type === '判断' && problem.category.includes('判断')) ||
      (filters.type === '编程' && problem.category.includes('编程'));
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDate && matchesType && matchesSearch && matchesQuestionType;
  });

  const handleFilterChange = (key: string, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">简单</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">中等</Badge>;
      case 'hard':
        return <Badge className="bg-red-500 hover:bg-red-600 text-white">困难</Badge>;
      default:
        return <Badge variant="secondary">{difficulty}</Badge>;
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '简单';
      case 'medium': return '中等';
      case 'hard': return '困难';
      default: return difficulty;
    }
  };

  const handleSelectProblem = (problemId: number) => {
    setSelectedProblems(prev => 
      prev.includes(problemId) 
        ? prev.filter(id => id !== problemId)
        : [...prev, problemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProblems.length === filteredProblems.length) {
      setSelectedProblems([]);
    } else {
      setSelectedProblems(filteredProblems.map(p => p.id));
    }
  };

  const handleBatchDelete = () => {
    // 实际项目中这里会调用API删除选中的错题
    console.log('删除选中的错题:', selectedProblems);
    setSelectedProblems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-pink-50/30 dark:from-slate-900 dark:via-red-900/20 dark:to-pink-900/20">
      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 p-8">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <span>攻克错题</span>
                  </h1>
                  <p className="text-muted-foreground mt-3 text-xl">查漏补缺，专项攻克薄弱知识点</p>
                </div>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="p-4">
                    <div className="text-3xl font-bold text-red-600">23</div>
                    <div className="text-muted-foreground">错题总数</div>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl font-bold text-orange-600">72%</div>
                    <div className="text-muted-foreground">平均错误率</div>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl font-bold text-green-600">8</div>
                    <div className="text-muted-foreground">已复习</div>
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
                  <span>筛选条件</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                {/* 搜索框 */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="搜索题目名称..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {/* Date Range */}
                <div className="space-y-3">
                  <Label className="flex items-center space-x-2">
                    <CalendarDays className="w-4 h-4" />
                    <span>错题添加时间</span>
                  </Label>
                  <div className="space-y-2">
                    <Input
                      type="date"
                      placeholder="开始日期"
                      value={filters.startDate}
                      onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value, quickFilter: 'all' }))}
                    />
                    <Input
                      type="date"
                      placeholder="结束日期"
                      value={filters.endDate}
                      onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value, quickFilter: 'all' }))}
                    />
                  </div>
                </div>

                {/* 快捷筛选按钮 */}
                <div className="space-y-2">
                  <Label>快捷筛选</Label>
                  <div className="flex space-x-2">
                    <Button
                      variant={filters.quickFilter === 'week' ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setFilters(prev => ({ ...prev, quickFilter: 'week', startDate: '', endDate: '' }))}
                    >
                      最近一周
                    </Button>
                    <Button
                      variant={filters.quickFilter === 'month' ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setFilters(prev => ({ ...prev, quickFilter: 'month', startDate: '', endDate: '' }))}
                    >
                      最近1月
                    </Button>
                  </div>
                </div>

                {/* 题型筛选 */}
                <div className="space-y-2">
                  <Label>题型</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['单选题', '多选题', '判断题', '编程题'].map(type => (
                      <Button
                        key={type}
                        variant={filters.questionTypes.includes(type) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            questionTypes: prev.questionTypes.includes(type)
                              ? prev.questionTypes.filter(t => t !== type)
                              : [...prev.questionTypes, type]
                          }));
                        }}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Problem List */}
          <div className="col-span-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-red-500" />
                    <span>错题复习</span>
                    <Badge variant="outline">{filteredProblems.length}</Badge>
                    <span className="text-muted-foreground">待复习</span>
                    {selectedProblems.length > 0 && (
                      <Badge className="bg-blue-500 text-white ml-2">
                        已选择 {selectedProblems.length} 项
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex space-x-2">
                    {selectedProblems.length > 0 && (
                      <>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={handleBatchDelete}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          批量删除
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedProblems([])}
                        >
                          取消选择
                        </Button>
                      </>
                    )}
                    <Button 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      size="sm"
                    >
                      <Shuffle className="w-4 h-4 mr-2" />
                      随机错题练习
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* 全选选项 */}
                {filteredProblems.length > 0 && (
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Checkbox
                      checked={selectedProblems.length === filteredProblems.length}
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm font-medium">
                      {selectedProblems.length === filteredProblems.length ? '取消全选' : '全选'}
                    </span>
                  </div>
                )}
                
                {filteredProblems.map((problem) => (
                  <div
                    key={problem.id}
                    className={`p-4 rounded-lg border bg-gradient-to-r from-background to-muted/30 hover:shadow-md transition-all duration-300 cursor-pointer ${
                      selectedProblems.includes(problem.id) ? 'ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : ''
                    }`}
                    onClick={() => setSelectedProblem(problem)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedProblems.includes(problem.id)}
                          onCheckedChange={() => handleSelectProblem(problem.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <h3 className="font-semibold">{problem.title}</h3>
                          {getDifficultyBadge(problem.difficulty)}
                        </div>
                        
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <span>{problem.category}</span>
                            <span>•</span>
                            <span>{problem.lastAttempt}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4 flex space-x-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-300 hover:bg-red-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle delete
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          删除
                        </Button>
                          <Button 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle practice
                            }}
                          >
                            一键再练
                          </Button>
                        </div>
                      </div>
                    </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Error Analysis Modal */}
        {selectedProblem && (
          <Card className="fixed top-4 left-72 right-4 bottom-4 z-50 border-0 shadow-2xl bg-background/95 backdrop-blur-md overflow-y-auto">
            <CardHeader className="border-b p-8">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                  <span>错题分析 - {selectedProblem.title}</span>
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="lg"
                  onClick={() => setSelectedProblem(null)}
                  className="text-2xl"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 text-xl">题目信息</h3>
                  <div className="space-y-3 text-lg">
                    <div className="flex justify-between">
                      <span>知识点:</span>
                      <span className="font-medium">{selectedProblem.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>难度:</span>
                      <span className="font-medium">{getDifficultyLabel(selectedProblem.difficulty)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>尝试次数:</span>
                      <span className="font-medium">{selectedProblem.attempts}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-xl">错误统计</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>语法错误</span>
                        <span className="font-medium">40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>逻辑错误</span>
                        <span className="font-medium">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>算法理解</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-xl">错误原因分析</h3>
                <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-lg leading-relaxed">
                    {selectedProblem.analysis}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-xl">学习建议</h3>
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <ul className="space-y-3 text-lg">
                    {selectedProblem.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle2 className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setSelectedProblem(null)}
                >
                  关闭
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  size="lg"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  立即练习
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedProblem && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setSelectedProblem(null)}
          ></div>
        )}
      </div>
    </div>
  );
}