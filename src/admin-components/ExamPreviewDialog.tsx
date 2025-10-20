import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Eye, BookOpen, Lightbulb, CheckCircle, AlertTriangle } from 'lucide-react';

interface Question {
  id: number;
  type: 'single' | 'multiple' | 'judge' | 'programming';
  title: string;
  content: string;
  options?: string[];
  correctAnswer: string | string[];
  userAnswer?: string | string[];
  points: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  knowledgePoint: string;
}

interface ExamPreviewDialogProps {
  examTitle?: string;
  questions?: Question[];
  children?: React.ReactNode;
}

export default function ExamPreviewDialog({ examTitle = '试卷预览', questions, children }: ExamPreviewDialogProps) {
  // 模拟题目数据（如果没有传入）
  const defaultQuestions: Question[] = [
    {
      id: 1,
      type: 'single',
      title: '单选题',
      content: '在Python中，下列哪个数据结构可以保证元素的唯一性？',
      options: ['A. list', 'B. tuple', 'C. set', 'D. dict'],
      correctAnswer: 'C',
      userAnswer: 'C',
      points: 5,
      category: '数据结构',
      difficulty: 'easy',
      explanation: 'set是Python中的集合数据结构，会自动去除重复元素，保证元素的唯一性。',
      knowledgePoint: 'Python数据结构'
    },
    {
      id: 2,
      type: 'multiple',
      title: '多选题',
      content: '以下哪些排序算法的时间复杂度在最坏情况下是O(n²)？',
      options: ['A. 冒泡排序', 'B. 快速排序', 'C. 归并排序', 'D. 选择排序'],
      correctAnswer: ['A', 'B', 'D'],
      userAnswer: ['A', 'D'],
      points: 8,
      category: '算法分析',
      difficulty: 'medium',
      explanation: '冒泡排序、快速排序（最坏情况）、选择排序的时间复杂度都是O(n²)，而归并排序始终是O(n log n)。',
      knowledgePoint: '排序算法复杂度'
    },
    {
      id: 3,
      type: 'judge',
      title: '判断题',
      content: '在二叉搜索树中，中序遍历的结果一定是有序的。',
      options: ['正确', '错误'],
      correctAnswer: '正确',
      userAnswer: '正确',
      points: 4,
      category: '数据结构',
      difficulty: 'medium',
      explanation: '二叉搜索树的定义保证了左子树所有节点小于根节点，右子树所有节点大于根节点，因此中序遍历（左-根-右）的结果必然是有序的。',
      knowledgePoint: '二叉搜索树性质'
    }
  ];

  const displayQuestions = questions || defaultQuestions;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-1" />
            预览
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>{examTitle}</span>
          </DialogTitle>
          <DialogDescription>
            用户前台试卷展示效果预览
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* 题目解析 */}
          <Card className="border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                <span>题目解析与知识点</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {displayQuestions.map((question, index) => {
                const isCorrect = question.type === 'multiple' ? 
                  Array.isArray(question.userAnswer) && Array.isArray(question.correctAnswer) &&
                  question.userAnswer.sort().join(',') === question.correctAnswer.sort().join(',') :
                  question.userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="p-6 rounded-xl border bg-gradient-to-r from-background to-muted/30">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="outline">{question.title}</Badge>
                          <Badge className={`${
                            question.difficulty === 'easy' ? 'bg-green-500' :
                            question.difficulty === 'medium' ? 'bg-yellow-500' :
                            'bg-red-500'
                          } text-white`}>
                            {question.difficulty === 'easy' ? '简单' :
                             question.difficulty === 'medium' ? '中等' : '困难'}
                          </Badge>
                          <Badge variant="outline">{question.category}</Badge>
                          <div className="flex items-center">
                            {isCorrect ? 
                              <CheckCircle className="w-5 h-5 text-green-500" /> :
                              <AlertTriangle className="w-5 h-5 text-red-500" />
                            }
                            <span className={`ml-1 font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                              {isCorrect ? '正确' : '错误'}
                            </span>
                          </div>
                        </div>
                        <h4 className="font-semibold mb-2">{question.content}</h4>
                        
                        {question.options && (
                          <div className="space-y-1 mb-4">
                            {question.options.map((option, optIndex) => (
                              <div key={optIndex} className="text-sm text-muted-foreground">
                                {option}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="font-medium text-red-600">你的答案: </span>
                            <span>{Array.isArray(question.userAnswer) ? 
                              question.userAnswer.join(', ') : 
                              question.userAnswer || '未作答'}</span>
                          </div>
                          <div>
                            <span className="font-medium text-green-600">正确答案: </span>
                            <span>{Array.isArray(question.correctAnswer) ? 
                              question.correctAnswer.join(', ') : 
                              question.correctAnswer}</span>
                          </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-3">
                          <div className="flex items-center mb-2">
                            <Lightbulb className="w-4 h-4 text-blue-500 mr-2" />
                            <span className="font-medium text-blue-600">解析</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{question.explanation}</p>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <BookOpen className="w-4 h-4 text-purple-500 mr-2" />
                            <span className="font-medium text-purple-600">知识点</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{question.knowledgePoint}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {isCorrect ? question.points : 0}/{question.points}
                        </div>
                        <div className="text-sm text-muted-foreground">分</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
