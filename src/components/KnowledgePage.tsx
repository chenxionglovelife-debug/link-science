// CodeQuest T1.9.4 - 学习诊断页面重构版本
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  BookOpen, 
  Users, 
  Star,
  Trophy,
  TrendingUp,
  Target,
  Brain,
  GitBranch,
  Circle,
  Clock,
  CheckCircle
} from 'lucide-react';

interface KnowledgeNode {
  id: string;
  name: string;
  mastery: 'excellent' | 'good' | 'average' | 'poor' | 'none';
  children?: KnowledgeNode[];
}

interface KnowledgePageProps {
  onStartProblem: (problemId: number, problemType?: 'coding' | 'general') => void;
}

export default function KnowledgePage({ onStartProblem }: KnowledgePageProps) {
  const [currentSubject, setCurrentSubject] = useState('Python基础');
  const [currentLevel, setCurrentLevel] = useState('Level 3');
  
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
      id: 'algorithms',
      name: '算法基础',
      mastery: 'average',
      children: [
        { id: 'sorting', name: '排序算法', mastery: 'good' },
        { id: 'searching', name: '查找算法', mastery: 'average' },
        { id: 'recursion', name: '递归思想', mastery: 'poor' }
      ]
    },
    {
      id: 'oop',
      name: '面向对象编程',
      mastery: 'poor',
      children: [
        { id: 'classes', name: '类与对象', mastery: 'average' },
        { id: 'inheritance', name: '继承与多态', mastery: 'poor' },
        { id: 'encapsulation', name: '封装', mastery: 'poor' }
      ]
    }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/30 dark:from-slate-900 dark:via-green-900/20 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header - 顶部卡片 */}
        <div className="mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 p-8">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <span>学习诊断</span>
                  </h1>
                  <p className="text-muted-foreground text-xl">AI智能诊断学习状况，生成个性化学习报告</p>
                </div>
                {/* 预测通过率 */}
                <div className="text-center bg-gradient-to-br from-green-100/70 to-emerald-100/70 dark:from-green-900/40 dark:to-emerald-900/40 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/40 min-w-[200px]">
                  <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
                  <div className="text-sm text-muted-foreground mb-2">预测通过率</div>
                  <div className="flex items-center justify-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    较上月提升12%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 第一行：探索学习 */}
        <div className="mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/25 dark:to-pink-900/25 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Trophy className="w-6 h-6 text-purple-600" />
                <span>探索学习</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-100/70 to-pink-100/70 dark:from-purple-800/40 dark:to-pink-800/40 hover:from-purple-100/90 hover:to-pink-100/90 dark:hover:from-purple-800/60 dark:hover:to-pink-800/60 hover:shadow-lg transition-all duration-300 cursor-pointer border border-purple-200/40 dark:border-purple-700/40 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">知识点专练</h4>
                  <p className="text-sm text-muted-foreground">精准突破薄弱点</p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-100/70 to-pink-100/70 dark:from-purple-800/40 dark:to-pink-800/40 hover:from-purple-100/90 hover:to-pink-100/90 dark:hover:from-purple-800/60 dark:hover:to-pink-800/60 hover:shadow-lg transition-all duration-300 cursor-pointer border border-purple-200/40 dark:border-purple-700/40 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">错题集</h4>
                  <p className="text-sm text-muted-foreground">重点复习错题</p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-100/70 to-pink-100/70 dark:from-purple-800/40 dark:to-pink-800/40 hover:from-purple-100/90 hover:to-pink-100/90 dark:hover:from-purple-800/60 dark:hover:to-pink-800/60 hover:shadow-lg transition-all duration-300 cursor-pointer border border-purple-200/40 dark:border-purple-700/40 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">模拟考试</h4>
                  <p className="text-sm text-muted-foreground">实战模拟提升</p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-100/70 to-pink-100/70 dark:from-purple-800/40 dark:to-pink-800/40 hover:from-purple-100/90 hover:to-pink-100/90 dark:hover:from-purple-800/60 dark:hover:to-pink-800/60 hover:shadow-lg transition-all duration-300 cursor-pointer border border-purple-200/40 dark:border-purple-700/40 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">AI推荐</h4>
                  <p className="text-sm text-muted-foreground">智能学习路径</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 第二行：分类表现 */}
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

        {/* 第三行：学习统计数据 */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/25 dark:to-teal-900/25 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <TrendingUp className="w-7 h-7 text-emerald-600" />
              <span>学习统计</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              {/* 刷题量及排名 */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-100/70 to-green-100/70 dark:from-emerald-800/40 dark:to-green-800/40 border border-emerald-200/50 dark:border-emerald-700/40">
                <div className="flex items-center justify-center mb-3">
                  <BookOpen className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-4xl font-bold text-emerald-600 mb-2">248题</div>
                <div className="text-sm text-muted-foreground mb-2">刷题量</div>
                <div className="flex items-center justify-center text-xs text-emerald-600">
                  <Trophy className="w-3 h-3 mr-1" />
                  排名 #127
                </div>
              </div>

              {/* 正确率及排名 */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-100/70 to-cyan-100/70 dark:from-blue-800/40 dark:to-cyan-800/40 border border-blue-200/50 dark:border-blue-700/40">
                <div className="flex items-center justify-center mb-3">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">78%</div>
                <div className="text-sm text-muted-foreground mb-2">正确率</div>
                <div className="flex items-center justify-center text-xs text-blue-600">
                  <Trophy className="w-3 h-3 mr-1" />
                  排名 #156
                </div>
              </div>

              {/* 学习时长及排名 */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-teal-100/70 to-cyan-100/70 dark:from-teal-800/40 dark:to-cyan-800/40 border border-teal-200/50 dark:border-teal-700/40">
                <div className="flex items-center justify-center mb-3">
                  <Clock className="w-8 h-8 text-teal-600" />
                </div>
                <div className="text-4xl font-bold text-teal-600 mb-2">42小时</div>
                <div className="text-sm text-muted-foreground mb-2">学习时长</div>
                <div className="flex items-center justify-center text-xs text-teal-600">
                  <Trophy className="w-3 h-3 mr-1" />
                  排名 #89
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
