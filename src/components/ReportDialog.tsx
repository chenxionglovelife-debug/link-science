import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, X, TrendingDown, Target, BookOpen, Award, ChevronRight, BarChart3, PieChart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';

interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  examResults: {
    totalQuestions: number;
    answeredQuestions: number;
    correctCount: number;
    accuracy: number;
    totalPoints: number;
    earnedPoints: number;
    timeUsed: number;
  };
  onStartPractice?: () => void;
}

export default function ReportDialog({ isOpen, onClose, examResults, onStartPractice }: ReportDialogProps) {
  const [currentTab, setCurrentTab] = useState<'overview' | 'analysis'>('overview');

  // 模拟薄弱知识点数据
  const weakPoints = [
    { name: '数据结构', mastery: 45, problemCount: 3, category: '基础知识' },
    { name: '排序算法', mastery: 60, problemCount: 2, category: '算法设计' },
    { name: '递归思想', mastery: 35, problemCount: 4, category: '编程思维' },
    { name: '动态规划', mastery: 50, problemCount: 3, category: '高级算法' }
  ];

  // 题目分类正确率数据
  const categoryData = [
    { category: '数据结构', correct: 2, wrong: 3, total: 5 },
    { category: '算法分析', correct: 4, wrong: 1, total: 5 },
    { category: '编程基础', correct: 3, wrong: 2, total: 5 },
    { category: '代码实现', correct: 1, wrong: 2, total: 3 }
  ];

  // 难度分布数据
  const difficultyData = [
    { name: '简单', value: 6, fill: '#10b981' },
    { name: '中等', value: 8, fill: '#f59e0b' },
    { name: '困难', value: 4, fill: '#ef4444' }
  ];

  // 图表数据 - 各知识点表现
  const chartData = categoryData.map(item => ({
    name: item.category,
    正确: item.correct,
    错误: item.wrong,
    正确率: Math.round((item.correct / item.total) * 100)
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] max-h-[90vh] p-0 overflow-hidden border-0 shadow-2xl gap-0 [&>button]:text-white [&>button]:hover:text-purple-300">
        <div className="flex flex-col h-full">
          {/* 头部 */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">小链同学的学习报告</h3>
                <p className="text-sm text-white/80">为你精心分析本次答题情况</p>
              </div>
            </div>

            {/* 总体成绩 */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{examResults.accuracy}%</div>
                <div className="text-xs text-white/80">正确率</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{examResults.earnedPoints}</div>
                <div className="text-xs text-white/80">得分</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{examResults.correctCount}/{examResults.totalQuestions}</div>
                <div className="text-xs text-white/80">答对题数</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{examResults.timeUsed}分</div>
                <div className="text-xs text-white/80">用时</div>
              </div>
            </div>
          </div>

          {/* 内容区域 */}
          <ScrollArea className="flex-1 p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-blue-900/20">
            <div className="space-y-6">
              {/* AI 分析评语 */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-blue-500" />
                    <span>AI 智能分析</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 p-4 rounded-lg">
                    <p className="mb-2">
                      本次测试表现{examResults.accuracy >= 80 ? '优秀' : examResults.accuracy >= 60 ? '良好' : '还需努力'}！
                      你在<span className="font-bold text-blue-600">算法分析</span>方面表现出色，正确率达到80%。
                    </p>
                    <p className="mb-2">
                      但在<span className="font-bold text-orange-600">数据结构</span>和<span className="font-bold text-orange-600">递归思想</span>方面还有提升空间，
                      建议重点复习这两个知识点。
                    </p>
                    <p className="text-sm text-muted-foreground">
                      💡 小链建议：每天坚持练习2-3道相关题目，一周后会有明显进步哦！
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 知识点掌握情况图表 */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-purple-500" />
                    <span>各类题目表现分析</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="正确" fill="#10b981" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="错误" fill="#ef4444" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* 薄弱知识点详细分析 */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingDown className="w-5 h-5 text-orange-500" />
                    <span>薄弱知识点诊断</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weakPoints.map((point, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-background to-muted/30 border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-bold">{point.name}</h4>
                            <Badge variant="outline" className="mt-1">{point.category}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${
                            point.mastery >= 60 ? 'text-green-600' :
                            point.mastery >= 40 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {point.mastery}%
                          </div>
                          <div className="text-sm text-muted-foreground">掌握度</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">错题数量</span>
                          <span className="font-medium text-red-600">{point.problemCount} 道</span>
                        </div>
                        <Progress value={point.mastery} className="h-2" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 针对性练习推荐 */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-500" />
                    <span>专项突破练习</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    小链已经根据你的薄弱知识点，为你精心挑选了针对性练习题目：
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border-2 border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold mb-1">数据结构专项突破</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            包含栈、队列、链表等15道精选题目
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge>推荐</Badge>
                            <Badge variant="outline">15题</Badge>
                            <Badge variant="outline">预计60分钟</Badge>
                          </div>
                        </div>
                        <Button 
                          className="bg-gradient-to-r from-green-500 to-blue-500"
                          onClick={onStartPractice}
                        >
                          开始练习
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold mb-1">递归算法强化训练</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            从基础到进阶，12道递归专题
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">12题</Badge>
                            <Badge variant="outline">预计50分钟</Badge>
                          </div>
                        </div>
                        <Button variant="outline" onClick={onStartPractice}>
                          开始练习
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 学习建议 */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span>小链的学习建议</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <p>建议每天花30分钟复习数据结构的基础概念，重点理解栈和队列的应用场景</p>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-purple-50 dark:bg-purple-950/50 rounded-lg">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <p>通过画图和实际代码调试来理解递归的执行过程，从简单问题入手逐步提升</p>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-950/50 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <p>保持你在算法分析方面的优势，可以尝试更有挑战性的算法题目</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>

          {/* 底部操作 */}
          <div className="p-4 border-t bg-background flex items-center justify-between">
            <Button variant="outline" onClick={onClose}>
              稍后再看
            </Button>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                查看错题本
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-500"
                onClick={onStartPractice}
              >
                开始专项练习
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
