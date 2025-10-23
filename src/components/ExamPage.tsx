import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { 
  Clock, 
  CheckCircle, 
  Circle, 
  AlertTriangle, 
  Trophy, 
  Target,
  BookOpen,
  Star,
  ChevronLeft,
  ChevronRight,
  Flag,
  TrendingUp,
  Award,
  Lightbulb,
  PlayCircle,
  Bot,
  Sparkles,
  Send,
  Mic
} from 'lucide-react';
import { Input } from './ui/input';
import LoadingReport from './LoadingReport';
import ReportDialog from './ReportDialog';

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
  isAnswered: boolean;
  isMarked: boolean;
}

interface ExamPageProps {
  onFinishExam: () => void;
}

export default function ExamPage({ onFinishExam }: ExamPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120 * 60); // 120分钟转换为秒
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showLoadingReport, setShowLoadingReport] = useState(false);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [selectedQuestionForAI, setSelectedQuestionForAI] = useState<Question | null>(null);
  const [examStartTime] = useState(new Date());

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      type: 'single',
      title: '单选题',
      content: '在Python中，下列哪个数据结构可以保证元素的唯一性？',
      options: ['A. list', 'B. tuple', 'C. set', 'D. dict'],
      correctAnswer: 'C',
      points: 5,
      category: '数据结构',
      difficulty: 'easy',
      explanation: 'set是Python中的集合数据结构，会自动去除重复元素，保证元素的唯一性。',
      knowledgePoint: 'Python数据结构',
      isAnswered: false,
      isMarked: false
    },
    {
      id: 2,
      type: 'multiple',
      title: '多选题',
      content: '以下哪些排序算法的时间复杂度在最坏情况下是O(n²)？',
      options: ['A. 冒泡排序', 'B. 快速排序', 'C. 归并排序', 'D. 选择排序'],
      correctAnswer: ['A', 'B', 'D'],
      points: 8,
      category: '算法分析',
      difficulty: 'medium',
      explanation: '冒泡排序、快速排序（最坏情况）、选择排序的时间复杂度都是O(n²)，而归并排序始终是O(n log n)。',
      knowledgePoint: '排序算法复杂度',
      isAnswered: false,
      isMarked: false
    },
    {
      id: 3,
      type: 'judge',
      title: '判断题',
      content: '在二叉搜索树中，中序遍历的结果一定是有序的。',
      options: ['正确', '错误'],
      correctAnswer: '正确',
      points: 4,
      category: '数据结构',
      difficulty: 'medium',
      explanation: '二叉搜索树的定义保证了左子树所有节点小于根节点，右子树所有节点大于根节点，因此中序遍历（左-根-右）的结果必然是有序的。',
      knowledgePoint: '二叉搜索树性质',
      isAnswered: false,
      isMarked: false
    },
    {
      id: 4,
      type: 'programming',
      title: '编程题',
      content: '请实现一个函数，判断一个字符串是否为回文串。函数签名：def is_palindrome(s: str) -> bool:',
      correctAnswer: 'def is_palindrome(s: str) -> bool:\n    s = s.lower().replace(" ", "")\n    return s == s[::-1]',
      points: 15,
      category: '字符串算法',
      difficulty: 'hard',
      explanation: '回文串是指正读和反读都相同的字符串。可以通过字符串切片s[::-1]来反转字符串，然后比较是否相等。',
      knowledgePoint: '字符串处理',
      isAnswered: false,
      isMarked: false
    },
    {
      id: 5,
      type: 'single',
      title: '单选题',
      content: '关于动态规划，下列说法正确的是？',
      options: ['A. 适用于所有优化问题', 'B. 必须满足最优子结构性质', 'C. 时间复杂度一定是O(n)', 'D. 不需要考虑重叠子问题'],
      correctAnswer: 'B',
      points: 6,
      category: '动态规划',
      difficulty: 'medium',
      explanation: '动态规划适用于具有最优子结构和重叠子问题性质的问题。最优子结构是指问题的最优解包含其子问题的最优解。',
      knowledgePoint: '动态规划原理',
      isAnswered: false,
      isMarked: false
    }
  ]);

  // 倒计时
  useEffect(() => {
    if (timeLeft > 0 && !isExamFinished) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishExam();
    }
  }, [timeLeft, isExamFinished]);

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 处理答案选择
  const handleAnswerSelect = (answer: string | string[]) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion] = {
      ...updatedQuestions[currentQuestion],
      userAnswer: answer,
      isAnswered: true
    };
    setQuestions(updatedQuestions);

    // 自动跳转到下一题（编程题除外）
    if (updatedQuestions[currentQuestion].type !== 'programming') {
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        }
      }, 500);
    }
  };

  // 处理编程题答案
  const handleProgrammingAnswer = (code: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion] = {
      ...updatedQuestions[currentQuestion],
      userAnswer: code,
      isAnswered: code.trim() !== ''
    };
    setQuestions(updatedQuestions);
  };

  // 标记题目
  const handleMarkQuestion = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].isMarked = !updatedQuestions[currentQuestion].isMarked;
    setQuestions(updatedQuestions);
  };

  // 完成考试
  const handleFinishExam = () => {
    setIsExamFinished(true);
    // 先计算结果，确保数据准备好
    const results = calculateResultsSync();
    setExamResults(results);
    // 显示加载动画
    setShowLoadingReport(true);
  };

  // 同步计算考试结果
  const calculateResultsSync = () => {
    const totalQuestions = questions.length;
    const answeredQuestions = questions.filter(q => q.isAnswered).length;
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    let correctCount = 0;
    let earnedPoints = 0;

    questions.forEach(question => {
      if (question.userAnswer) {
        if (question.type === 'multiple') {
          const userAnswers = Array.isArray(question.userAnswer) ? question.userAnswer : [question.userAnswer];
          const correctAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
          if (userAnswers.sort().join(',') === correctAnswers.sort().join(',')) {
            correctCount++;
            earnedPoints += question.points;
          }
        } else {
          if (question.userAnswer === question.correctAnswer || 
              (question.type === 'programming' && typeof question.userAnswer === 'string' && question.userAnswer.trim() !== '')) {
            correctCount++;
            earnedPoints += question.points;
          }
        }
      }
    });

    return {
      totalQuestions,
      answeredQuestions,
      correctCount,
      accuracy: Math.round((correctCount / totalQuestions) * 100),
      totalPoints,
      earnedPoints,
      timeUsed: Math.round((new Date().getTime() - examStartTime.getTime()) / 1000 / 60)
    };
  };

  // 加载报告完成后的回调 - 触发全局事件推送学习报告
  const handleLoadingComplete = () => {
    console.log('加载报告完成', examResults);
    setShowLoadingReport(false);
    setShowResults(true);
    
    // 计算薄弱知识点
    const weakPoints = generateWeakPointsList();
    
    // 触发全局事件，推送学习报告到AIMascotFloat
    const event = new CustomEvent('pushLearningReport', {
      detail: {
        score: examResults.earnedPoints,
        accuracy: examResults.accuracy,
        improvement: Math.floor(Math.random() * 15), // 模拟提升幅度
        weakPoints: weakPoints
      }
    });
    window.dispatchEvent(event);
  };

  // 生成薄弱知识点列表
  const generateWeakPointsList = () => {
    const wrongQuestions = questions.filter(q => {
      if (q.type === 'multiple') {
        const userAnswers = Array.isArray(q.userAnswer) ? q.userAnswer : [q.userAnswer];
        const correctAnswers = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
        return userAnswers.sort().join(',') !== correctAnswers.sort().join(',');
      }
      return q.userAnswer !== q.correctAnswer;
    });

    if (wrongQuestions.length === 0) {
      return [];
    }

    const categoryCount: Record<string, number> = {};
    wrongQuestions.forEach(q => {
      categoryCount[q.category] = (categoryCount[q.category] || 0) + 1;
    });

    return Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category]) => category);
  };



  // 打开AI解析
  const handleOpenAIAnalysis = (question: Question) => {
    console.log('打开AI解析', question);
    setSelectedQuestionForAI(question);
    setShowAIAnalysis(true);
  };

  // 计算考试结果
  const calculateResults = () => {
    const totalQuestions = questions.length;
    const answeredQuestions = questions.filter(q => q.isAnswered).length;
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    let correctCount = 0;
    let earnedPoints = 0;

    questions.forEach(question => {
      if (question.userAnswer) {
        if (question.type === 'multiple') {
          const userAnswers = Array.isArray(question.userAnswer) ? question.userAnswer : [question.userAnswer];
          const correctAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
          if (userAnswers.sort().join(',') === correctAnswers.sort().join(',')) {
            correctCount++;
            earnedPoints += question.points;
          }
        } else {
          if (question.userAnswer === question.correctAnswer || 
              (question.type === 'programming' && typeof question.userAnswer === 'string' && question.userAnswer.trim() !== '')) {
            correctCount++;
            earnedPoints += question.points;
          }
        }
      }
    });

    setExamResults({
      totalQuestions,
      answeredQuestions,
      correctCount,
      accuracy: Math.round((correctCount / totalQuestions) * 100),
      totalPoints,
      earnedPoints,
      timeUsed: Math.round((new Date().getTime() - examStartTime.getTime()) / 1000 / 60)
    });
  };

  const [examResults, setExamResults] = useState({
    totalQuestions: 0,
    answeredQuestions: 0,
    correctCount: 0,
    accuracy: 0,
    totalPoints: 0,
    earnedPoints: 0,
    timeUsed: 0
  });

  // 获取题目状态样式
  const getQuestionStatus = (index: number) => {
    const question = questions[index];
    if (question.isAnswered) {
      return 'bg-green-500 text-white';
    } else if (question.isMarked) {
      return 'bg-yellow-500 text-white';
    } else {
      return 'bg-muted text-muted-foreground';
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/30 dark:from-slate-900 dark:via-green-900/20 dark:to-blue-900/20">
        <div className="max-w-6xl mx-auto px-8 py-10">
          {/* 考试结果 */}
          <Card className="border-0 shadow-xl p-8 mb-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <CardHeader className="p-0 mb-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl">考试完成！</CardTitle>
              <p className="text-muted-foreground text-xl mt-2">恭喜你完成了本次测试</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50">
                  <div className="text-3xl font-bold text-green-600 mb-2">{examResults.earnedPoints}</div>
                  <div className="text-muted-foreground">得分</div>
                  <div className="text-sm text-muted-foreground">满分 {examResults.totalPoints}</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{examResults.accuracy}%</div>
                  <div className="text-muted-foreground">正确率</div>
                  <div className="text-sm text-muted-foreground">{examResults.correctCount}/{examResults.totalQuestions} 题</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{examResults.timeUsed}</div>
                  <div className="text-muted-foreground">用时(分钟)</div>
                  <div className="text-sm text-muted-foreground">提前完成</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50">
                  <div className="text-3xl font-bold text-amber-600 mb-2">{examResults.answeredQuestions}</div>
                  <div className="text-muted-foreground">已答题</div>
                  <div className="text-sm text-muted-foreground">完成度 {Math.round(examResults.answeredQuestions/examResults.totalQuestions*100)}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 题目解析 */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                <span>题目解析与知识点</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((question, index) => {
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

                        {/* AI解析按钮 - 仅错题显示 */}
                        {!isCorrect && (
                          <div className="mt-3">
                            <Button
                              variant="outline"
                              className="w-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200 dark:border-blue-800 hover:border-blue-300"
                              onClick={() => handleOpenAIAnalysis(question)}
                            >
                              <Bot className="w-4 h-4 mr-2 text-blue-500" />
                              <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                                小链AI深度解析
                              </span>
                            </Button>
                          </div>
                        )}
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

          <div className="flex justify-center mt-8 space-x-4">
            <Button variant="outline" size="lg" onClick={onFinishExam}>
              返回学习
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500" size="lg">
              查看详细报告
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const current = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-8 py-6">
        {/* 顶部导航栏 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">信息学奥赛模拟测试</h1>
            <Badge variant="outline">第{currentQuestion + 1}题 / 共{questions.length}题</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              timeLeft < 300 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
            }`}>
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
            <Button 
              onClick={handleFinishExam}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <Flag className="w-4 h-4 mr-2" />
              提交试卷
            </Button>
          </div>
        </div>

        <div className={`grid gap-6 ${current.type === 'programming' ? 'grid-cols-1' : 'grid-cols-12'}`}>
          {/* 左侧答题区 */}
          <div className={current.type === 'programming' ? 'col-span-1' : 'col-span-8'}>
            <Card className="border-0 shadow-xl p-8">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className={`${
                      current.difficulty === 'easy' ? 'bg-green-500' :
                      current.difficulty === 'medium' ? 'bg-yellow-500' :
                      'bg-red-500'
                    } text-white`}>
                      {current.title}
                    </Badge>
                    <Badge variant="outline">{current.category}</Badge>
                    <div className="text-sm text-muted-foreground">{current.points}分</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="mb-8">
                  {/* 只有非编程题才显示题目内容 */}
                  {current.type !== 'programming' && (
                    <h3 className="text-xl font-semibold mb-4">{current.content}</h3>
                  )}
                  
                  {/* 单选题 */}
                  {current.type === 'single' && current.options && (
                    <div className="space-y-3">
                      {current.options.map((option, index) => {
                        const optionLetter = option.charAt(0);
                        return (
                          <div 
                            key={index}
                            className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                              current.userAnswer === optionLetter 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                            onClick={() => handleAnswerSelect(optionLetter)}
                          >
                            <div className="flex items-center space-x-3">
                              {current.userAnswer === optionLetter ? (
                                <CheckCircle className="w-5 h-5 text-blue-500" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                              )}
                              <span>{option}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* 多选题 */}
                  {current.type === 'multiple' && current.options && (
                    <div className="space-y-3">
                      {current.options.map((option, index) => {
                        const optionLetter = option.charAt(0);
                        const userAnswers = Array.isArray(current.userAnswer) ? current.userAnswer : [];
                        const isSelected = userAnswers.includes(optionLetter);
                        
                        return (
                          <div 
                            key={index}
                            className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                              isSelected 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                            onClick={() => {
                              let newAnswers = [...userAnswers];
                              if (isSelected) {
                                newAnswers = newAnswers.filter(a => a !== optionLetter);
                              } else {
                                newAnswers.push(optionLetter);
                              }
                              handleAnswerSelect(newAnswers);
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              {isSelected ? (
                                <CheckCircle className="w-5 h-5 text-blue-500" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                              )}
                              <span>{option}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* 判断题 */}
                  {current.type === 'judge' && current.options && (
                    <div className="flex space-x-6">
                      {current.options.map((option, index) => (
                        <div 
                          key={index}
                          className={`p-6 rounded-lg border cursor-pointer transition-all hover:shadow-md flex-1 text-center ${
                            current.userAnswer === option 
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                          onClick={() => handleAnswerSelect(option)}
                        >
                          <div className="flex items-center justify-center space-x-2">
                            {current.userAnswer === option ? (
                              <CheckCircle className="w-6 h-6 text-blue-500" />
                            ) : (
                              <Circle className="w-6 h-6 text-gray-400" />
                            )}
                            <span className="text-lg font-medium">{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 编程题 - 专业界面 */}
                  {current.type === 'programming' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        {/* 左侧：题目描述 */}
                        <div className="space-y-4">
                          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                            <h4 className="font-semibold mb-3">题目描述</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              实现一个函数判断字符串是否为回文串。回文串是指正读和反读都相同的字符串。
                            </p>
                            
                            <div className="space-y-3">
                              <div>
                                <h5 className="font-medium text-sm mb-1">输入格式</h5>
                                <p className="text-xs text-muted-foreground bg-white dark:bg-slate-900 p-2 rounded font-mono">
                                  字符串 s (1 ≤ len(s) ≤ 1000)
                                </p>
                              </div>
                              
                              <div>
                                <h5 className="font-medium text-sm mb-1">输出格式</h5>
                                <p className="text-xs text-muted-foreground bg-white dark:bg-slate-900 p-2 rounded font-mono">
                                  返回 True 或 False
                                </p>
                              </div>
                              
                              <div>
                                <h5 className="font-medium text-sm mb-1">样例</h5>
                                <div className="text-xs space-y-1">
                                  <div className="bg-white dark:bg-slate-900 p-2 rounded font-mono">
                                    <div className="text-green-600">输入: "racecar"</div>
                                    <div className="text-blue-600">输出: True</div>
                                  </div>
                                  <div className="bg-white dark:bg-slate-900 p-2 rounded font-mono">
                                    <div className="text-green-600">输入: "hello"</div>
                                    <div className="text-blue-600">输出: False</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* 右侧：代码编辑器 */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">代码编辑器</h4>
                            <select className="text-sm border rounded px-2 py-1">
                              <option value="python">Python</option>
                              <option value="cpp">C++</option>
                              <option value="java">Java</option>
                            </select>
                          </div>
                          
                          <div className="bg-slate-900 rounded-lg overflow-hidden">
                            <div className="bg-slate-800 px-4 py-2 flex items-center space-x-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <span className="text-sm text-slate-400 ml-4">solution.py</span>
                            </div>
                            <textarea
                              className="w-full h-64 p-4 bg-slate-900 text-green-400 font-mono text-sm resize-none focus:outline-none"
                              placeholder="def is_palindrome(s: str) -> bool:
    # 在此处编写你的代码
    pass"
                              value={current.userAnswer || ''}
                              onChange={(e) => handleProgrammingAnswer(e.target.value)}
                              style={{ 
                                background: '#0f172a',
                                color: '#4ade80',
                                caretColor: '#4ade80'
                              }}
                            />
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <PlayCircle className="w-4 h-4 mr-1" />
                              运行代码
                            </Button>
                            <Button size="sm" variant="outline">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              提交答案
                            </Button>
                          </div>
                          
                          {/* 运行结果 */}
                          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                            <h5 className="font-medium text-sm mb-2">运行结果</h5>
                            <div className="text-xs font-mono space-y-1">
                              <div className="text-green-600">✓ 测试用例 1: 通过</div>
                              <div className="text-green-600">✓ 测试用例 2: 通过</div>
                              <div className="text-muted-foreground">运行时间: 2ms</div>
                              <div className="text-muted-foreground">内存使用: 1.2MB</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* 编程题专用导航区 */}
                      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="text-sm text-muted-foreground">
                          第 {currentQuestion + 1} 题 / 共 {questions.length} 题 | 已答 {questions.filter(q => q.isAnswered).length} 题
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 导航按钮 */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    上一题
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    {current.isAnswered ? '已作答' : '未作答'}
                  </div>

                  <Button
                    onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                    disabled={currentQuestion === questions.length - 1}
                  >
                    下一题
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧答题卡 - 编程题时隐藏 */}
          {current.type !== 'programming' && (
            <div className="col-span-4 space-y-6">
            {/* 进度统计 */}
            <Card className="border-0 shadow-xl p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span>答题进度</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="flex justify-between text-sm">
                  <span>已答题</span>
                  <span>{questions.filter(q => q.isAnswered).length}/{questions.length}</span>
                </div>
                <Progress 
                  value={(questions.filter(q => q.isAnswered).length / questions.length) * 100} 
                  className="h-2" 
                />
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <div className="text-lg font-bold text-green-600">{questions.filter(q => q.isAnswered).length}</div>
                    <div className="text-xs text-muted-foreground">已答</div>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <div className="text-lg font-bold text-yellow-600">{questions.filter(q => q.isMarked).length}</div>
                    <div className="text-xs text-muted-foreground">标记</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 答题卡 */}
            <Card className="border-0 shadow-xl p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  <span>答题卡</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-4 gap-2">
                  {questions.map((question, index) => (
                    <button
                      key={question.id}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center font-medium transition-all hover:shadow-md ${
                        index === currentQuestion 
                          ? 'ring-2 ring-blue-500 ring-offset-2' 
                          : ''
                      } ${getQuestionStatus(index)}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                {/* 图例 */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded bg-green-500"></div>
                    <span>已答题</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded bg-yellow-500"></div>
                    <span>已标记</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded bg-muted"></div>
                    <span>未作答</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 题型统计 */}
            <Card className="border-0 shadow-xl p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">题型分布</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">单选题</span>
                  <Badge variant="outline">{questions.filter(q => q.type === 'single').length}题</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">多选题</span>
                  <Badge variant="outline">{questions.filter(q => q.type === 'multiple').length}题</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">判断题</span>
                  <Badge variant="outline">{questions.filter(q => q.type === 'judge').length}题</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">编程题</span>
                  <Badge variant="outline">{questions.filter(q => q.type === 'programming').length}题</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          )}
        </div>
      </div>

      {/* 学习报告加载动画 */}
      <LoadingReport 
        isOpen={showLoadingReport} 
        onComplete={handleLoadingComplete}
        onClose={() => {
          setShowLoadingReport(false);
          setShowResults(true);
        }}
      />

      {/* AI深度解析对话框 */}
      <Dialog open={showAIAnalysis} onOpenChange={setShowAIAnalysis}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] gap-0">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-blue-500" />
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span>小链AI深度解析</span>
            </DialogTitle>
          </DialogHeader>
          {selectedQuestionForAI && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4 pr-4">
                {/* 题目信息 */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-lg border">
                  <h4 className="font-bold mb-2">{selectedQuestionForAI.content}</h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">{selectedQuestionForAI.category}</Badge>
                    <Badge className={`${
                      selectedQuestionForAI.difficulty === 'easy' ? 'bg-green-500' :
                      selectedQuestionForAI.difficulty === 'medium' ? 'bg-yellow-500' :
                      'bg-red-500'
                    } text-white`}>
                      {selectedQuestionForAI.difficulty === 'easy' ? '简单' :
                       selectedQuestionForAI.difficulty === 'medium' ? '中等' : '困难'}
                    </Badge>
                  </div>
                  {selectedQuestionForAI.options && (
                    <div className="text-sm space-y-1 mb-2">
                      {selectedQuestionForAI.options.map((option, index) => (
                        <div key={index}>{option}</div>
                      ))}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                    <div>
                      <span className="font-medium text-red-600">你的答案: </span>
                      <span>{Array.isArray(selectedQuestionForAI.userAnswer) ? 
                        selectedQuestionForAI.userAnswer.join(', ') : 
                        selectedQuestionForAI.userAnswer || '未作答'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-green-600">正确答案: </span>
                      <span>{Array.isArray(selectedQuestionForAI.correctAnswer) ? 
                        selectedQuestionForAI.correctAnswer.join(', ') : 
                        selectedQuestionForAI.correctAnswer}</span>
                    </div>
                  </div>
                </div>

                {/* AI解析内容 */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Bot className="w-5 h-5 text-blue-500" />
                      <span>知识点详解</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-lg">
                      <h5 className="font-bold mb-2 text-blue-600">核心知识点：{selectedQuestionForAI.knowledgePoint}</h5>
                      <p className="text-sm mb-3">
                        这道题主要考查的是<span className="font-bold text-blue-600">{selectedQuestionForAI.knowledgePoint}</span>。
                        让小链来帮你深入理解这个知识点：
                      </p>
                      <div className="space-y-2 text-sm">
                        <p>• <strong>概念理解：</strong>{selectedQuestionForAI.explanation}</p>
                        <p>• <strong>应用场景：</strong>在实际编程中，这个知识点常用于解决数据处理、算法优化等问题。</p>
                        <p>• <strong>易错点：</strong>很多同学容易混淆相关概念，建议通过实际代码练习来加深理解。</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 解题思路 */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      <span>解题思路分析</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-1">
                          1
                        </div>
                        <div>
                          <h5 className="font-bold mb-1">仔细审题</h5>
                          <p className="text-sm text-muted-foreground">
                            首先要理解题目要求，识别出题目考查的核心知识点是{selectedQuestionForAI.knowledgePoint}。
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-1">
                          2
                        </div>
                        <div>
                          <h5 className="font-bold mb-1">逐项分析</h5>
                          <p className="text-sm text-muted-foreground">
                            对每个选项进行仔细分析，结合{selectedQuestionForAI.knowledgePoint}的特性来判断正误。
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-1">
                          3
                        </div>
                        <div>
                          <h5 className="font-bold mb-1">验证答案</h5>
                          <p className="text-sm text-muted-foreground">
                            选择答案后，可以通过实际代码验证或查阅相关文档来确认答案的正确性。
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 推荐练习 */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Target className="w-5 h-5 text-green-500" />
                      <span>巩固练习建议</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      为了更好地掌握<span className="font-bold">{selectedQuestionForAI.knowledgePoint}</span>，小链为你推荐：
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="w-4 h-4 mr-2" />
                        查看相关知识点专题
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Target className="w-4 h-4 mr-2" />
                        练习同类题目 (5道)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}