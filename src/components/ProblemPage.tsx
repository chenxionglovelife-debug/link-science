import React, { useState } from 'react';
import CodingProblemPage from './CodingProblemPage';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { 
  Play, 
  Send, 
  Clock, 
  User, 
  ThumbsUp, 
  MessageSquare, 
  Lightbulb,
  Code,
  Terminal,
  CheckCircle
} from 'lucide-react';

interface ProblemPageProps {
  problemType?: 'coding' | 'general';
}

export default function ProblemPage({ problemType = 'general' }: ProblemPageProps) {
  // 如果是编程题，使用新的编程题页面
  if (problemType === 'coding') {
    return <CodingProblemPage />;
  }
  const [code, setCode] = useState(`def solution(nums, target):
    # 在这里编写你的代码
    pass

# 示例测试
if __name__ == "__main__":
    nums = [2, 7, 11, 15]
    target = 9
    result = solution(nums, target)
    print(result)`);

  const [testResults, setTestResults] = useState([
    { input: '[2, 7, 11, 15], 9', expected: '[0, 1]', actual: '[0, 1]', status: 'passed' },
    { input: '[3, 2, 4], 6', expected: '[1, 2]', actual: '[1, 2]', status: 'passed' },
    { input: '[3, 3], 6', expected: '[0, 1]', actual: '[0, 1]', status: 'passed' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
          {/* Left Panel - Problem Description */}
          <div className="col-span-5 space-y-4 overflow-y-auto">
            {/* Problem Header */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500">简单</Badge>
                    <Badge variant="outline">数组</Badge>
                    <Badge variant="outline">哈希表</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      1.2k
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      89
                    </span>
                  </div>
                </div>
                <CardTitle className="text-2xl">两数之和</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    通过率: 52.3%
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    建议用时: 15分钟
                  </span>
                </div>
              </CardHeader>
            </Card>

            {/* Problem Description */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-blue-500" />
                  <span>题目描述</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  给定一个整数数组 <code className="bg-muted px-1 py-0.5 rounded">nums</code> 和一个整数目标值 <code className="bg-muted px-1 py-0.5 rounded">target</code>，
                  请你在该数组中找出 <strong>和为目标值</strong> <code className="bg-muted px-1 py-0.5 rounded">target</code> 的那 <strong>两个</strong> 整数，
                  并返回它们的数组下标。
                </p>
                <p>
                  你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
                </p>
                <p>你可以按任意顺序返回答案。</p>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">示例 1:</h4>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <div><strong>输入:</strong> nums = [2,7,11,15], target = 9</div>
                    <div><strong>输出:</strong> [0,1]</div>
                    <div><strong>解释:</strong> 因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">示例 2:</h4>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <div><strong>输入:</strong> nums = [3,2,4], target = 6</div>
                    <div><strong>输出:</strong> [1,2]</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">提示:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 2 ≤ nums.length ≤ 10⁴</li>
                    <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                    <li>• -10⁹ ≤ target ≤ 10⁹</li>
                    <li>• 只会存在一个有效答案</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Hints */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <span>解题提示</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                  <p className="text-sm">💡 可以使用哈希表来优化查找过程</p>
                </div>
                <div className="p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                  <p className="text-sm">⚡ 时间复杂度可以优化到 O(n)</p>
                </div>
                <div className="p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                  <p className="text-sm">🎯 记住要返回索引，不是数值本身</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="col-span-7 space-y-4">
            <Card className="border-0 shadow-lg h-full flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Terminal className="w-5 h-5 text-green-500" />
                    <span>代码编辑器</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Python 3</Badge>
                    <Button variant="ghost" size="sm">
                      切换语言
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col space-y-4">
                {/* Code Editor */}
                <div className="flex-1 relative">
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[400px] font-mono text-sm resize-none bg-slate-900 text-slate-100 border-slate-700"
                    placeholder="在这里编写你的代码..."
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-slate-700 text-slate-300">
                      第 1-12 行
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      className="flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>运行</span>
                    </Button>
                    <Button 
                      className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      <Send className="w-4 h-4" />
                      <span>提交</span>
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    已保存 • 2分钟前
                  </div>
                </div>

                {/* Test Results */}
                <Tabs defaultValue="results" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="results">测试结果</TabsTrigger>
                    <TabsTrigger value="console">控制台</TabsTrigger>
                    <TabsTrigger value="debug">调试</TabsTrigger>
                  </TabsList>
                  <TabsContent value="results" className="space-y-3">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
                      <div className="flex items-center space-x-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-green-700 dark:text-green-300">所有测试用例通过</span>
                        <Badge className="bg-green-500 text-white">3/3</Badge>
                      </div>
                      <div className="space-y-2">
                        {testResults.map((result, index) => (
                          <div key={index} className="flex items-center justify-between p-2 rounded bg-white/50 dark:bg-slate-800/50">
                            <div className="flex items-center space-x-3">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm">测试用例 {index + 1}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {result.input} → {result.actual}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="console">
                    <div className="p-4 rounded-lg bg-slate-900 text-slate-100 font-mono text-sm min-h-[120px]">
                      <div className="text-green-400">$ python solution.py</div>
                      <div>[0, 1]</div>
                      <div>[1, 2]</div>
                      <div>[0, 1]</div>
                      <div className="text-green-400 mt-2">✓ 程序执行完成</div>
                    </div>
                  </TabsContent>
                  <TabsContent value="debug">
                    <div className="p-4 rounded-lg bg-muted/50 min-h-[120px]">
                      <p className="text-sm text-muted-foreground">调试信息将在这里显示...</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}