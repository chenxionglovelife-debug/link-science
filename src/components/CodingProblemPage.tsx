import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  Play, 
  Send, 
  Clock, 
  MemoryStick,
  Code,
  Terminal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Timer,
  Database
} from 'lucide-react';
import { toast } from "sonner@2.0.3";

export default function CodingProblemPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState(`def solution(nums, target):
    # 在这里编写你的代码
    pass

# 示例测试
if __name__ == "__main__":
    nums = [2, 7, 11, 15]
    target = 9
    result = solution(nums, target)
    print(result)`);

  const [showResultModal, setShowResultModal] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const languages = [
    { id: 'python', name: 'Python 3', template: `def solution(nums, target):
    # 在这里编写你的代码
    pass

# 示例测试
if __name__ == "__main__":
    nums = [2, 7, 11, 15]
    target = 9
    result = solution(nums, target)
    print(result)` },
    { id: 'cpp', name: 'C++', template: `#include <iostream>
#include <vector>
using namespace std;

vector<int> solution(vector<int>& nums, int target) {
    // 在这里编写你的代码
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = solution(nums, target);
    
    cout << "[";
    for(int i = 0; i < result.size(); i++) {
        cout << result[i];
        if(i < result.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
    
    return 0;
}` },
    { id: 'java', name: 'Java', template: `import java.util.*;

public class Solution {
    public int[] solution(int[] nums, int target) {
        // 在这里编写你的代码
        return new int[]{};
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] result = sol.solution(nums, target);
        System.out.println(Arrays.toString(result));
    }
}` }
  ];

  const handleLanguageChange = (languageId: string) => {
    const language = languages.find(lang => lang.id === languageId);
    if (language) {
      setSelectedLanguage(languageId);
      setCode(language.template);
    }
  };

  const handleRunCode = () => {
    // 模拟代码运行
    const mockResult = {
      status: 'success',
      runtime: '45ms',
      memory: '14.2MB',
      testCases: [
        { input: '[2, 7, 11, 15], 9', expected: '[0, 1]', actual: '[0, 1]', status: 'passed' },
        { input: '[3, 2, 4], 6', expected: '[1, 2]', actual: '[1, 2]', status: 'passed' },
        { input: '[3, 3], 6', expected: '[0, 1]', actual: '[0, 1]', status: 'passed' }
      ]
    };
    
    setEvaluationResult(mockResult);
    setShowResultModal(true);
  };

  const handleSubmitCode = () => {
    // 模拟代码提交
    toast.success("代码提交成功！", {
      description: "您的解答已提交至OJ系统进行评分",
      duration: 2000,
    });

    // 延迟触发AI学习报告推送（发送到小链同学聊天窗口）
    setTimeout(() => {
      const reportEvent = new CustomEvent('pushLearningReport', {
        detail: {
          score: 85,
          accuracy: 85,
          improvement: 12,
          weakPoints: ['循环结构', 'For循环']
        }
      });
      window.dispatchEvent(reportEvent);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8 h-[calc(100vh-12rem)]">
          {/* Left Panel - Problem Description */}
          <div className="col-span-5 space-y-6 overflow-y-auto">
            {/* Problem Header */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">简单</Badge>
                    <Badge variant="outline" className="border-blue-200 text-blue-600">数组</Badge>
                    <Badge variant="outline" className="border-purple-200 text-purple-600">哈希表</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>通过率: 52.3%</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>建议用时: 15分钟</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Problem Requirements */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <span>题目要求</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200/50">
                    <div className="flex items-center space-x-2 mb-1">
                      <Timer className="w-4 h-4 text-red-500" />
                      <span className="font-medium text-red-600">时间限制</span>
                    </div>
                    <div className="text-lg font-bold text-red-700">1000ms</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200/50">
                    <div className="flex items-center space-x-2 mb-1">
                      <Database className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-blue-600">内存限制</span>
                    </div>
                    <div className="text-lg font-bold text-blue-700">256MB</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Problem Description */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Code className="w-5 h-5 text-blue-500" />
                  <span>题目描述</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-relaxed">
                  给定一个整数数组 <code className="bg-muted px-2 py-1 rounded text-sm font-mono">nums</code> 和一个整数目标值 <code className="bg-muted px-2 py-1 rounded text-sm font-mono">target</code>，
                  请你在该数组中找出 <strong>和为目标值</strong> <code className="bg-muted px-2 py-1 rounded text-sm font-mono">target</code> 的那 <strong>两个</strong> 整数，
                  并返回它们的数组下标。
                </p>
                <p className="leading-relaxed">
                  你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
                </p>
                <p className="leading-relaxed">你可以按任意顺序返回答案。</p>
              </CardContent>
            </Card>

            {/* Input/Output Format */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">输入格式</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                  第一行包含数组长度 n<br/>
                  第二行包含 n 个整数，表示数组 nums<br/>
                  第三行包含一个整数，表示目标值 target
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">输出格式</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                  输出两个整数，表示和为目标值的两个数的下标
                </div>
              </CardContent>
            </Card>

            {/* Sample Input/Output */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">输入输出样例</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">样例输入 1</h4>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg font-mono text-sm border border-green-200">
                    4<br/>
                    2 7 11 15<br/>
                    9
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">样例输出 1</h4>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg font-mono text-sm border border-blue-200">
                    0 1
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-purple-600">样例输入 2</h4>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg font-mono text-sm border border-purple-200">
                    3<br/>
                    3 2 4<br/>
                    6
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-orange-600">样例输出 2</h4>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg font-mono text-sm border border-orange-200">
                    1 2
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="col-span-7 space-y-6">
            <Card className="border-0 shadow-xl h-full flex flex-col">
              <CardHeader className="flex-shrink-0 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Terminal className="w-5 h-5 text-green-500" />
                    <span>代码编辑器</span>
                  </CardTitle>
                  <div className="flex items-center space-x-3">
                    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.id} value={lang.id}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col space-y-6">
                {/* Code Editor */}
                <div className="flex-1 relative min-h-[400px]">
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="h-full font-mono text-sm resize-none bg-slate-900 text-slate-100 border-slate-700 leading-6"
                    placeholder="在这里编写你的代码..."
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-slate-700 text-slate-300 text-xs">
                      {languages.find(lang => lang.id === selectedLanguage)?.name}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <Badge variant="outline" className="bg-slate-800 border-slate-600 text-slate-300 text-xs">
                      {code.split('\n').length} 行
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <Button 
                      onClick={handleRunCode}
                      variant="outline" 
                      className="flex items-center space-x-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Play className="w-4 h-4" />
                      <span>运行</span>
                    </Button>
                    <Button 
                      onClick={handleSubmitCode}
                      className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      <Send className="w-4 h-4" />
                      <span>提交</span>
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>已保存</span>
                    </span>
                    <span>2分钟前</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Evaluation Result Modal */}
      <Dialog open={showResultModal} onOpenChange={setShowResultModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-blue-500" />
              <span>代码评分结果</span>
            </DialogTitle>
            <DialogDescription>
              您的代码已通过OJ系统评测，以下是详细结果
            </DialogDescription>
          </DialogHeader>
          
          {evaluationResult && (
            <div className="space-y-6">
              {/* Overall Status */}
              <div className="flex items-center justify-center p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-green-600 mb-2">通过所有测试用例！</h3>
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Timer className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">运行时间：{evaluationResult.runtime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MemoryStick className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">运行内存：{evaluationResult.memory}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Cases */}
              <div className="space-y-3">
                <h4 className="font-semibold">测试用例详情</h4>
                {evaluationResult.testCases.map((testCase, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-medium">测试用例 {index + 1}</div>
                        <div className="text-sm text-muted-foreground">
                          输入: {testCase.input}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">输出: {testCase.actual}</div>
                      <Badge className="mt-1 bg-green-500 text-white text-xs">通过</Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-4 border-t">
                <Button onClick={() => setShowResultModal(false)}>
                  知道了
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}