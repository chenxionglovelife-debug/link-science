import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Clock, CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface AssessmentPageProps {
  subject: string;
  level: string;
  onComplete: (results: AssessmentResults) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  knowledge_point: string;
  difficulty: string;
}

interface AssessmentResults {
  subject: string;
  level: string;
  score: number;
  correctRate: number;
  timeUsed: number;
  totalQuestions: number;
  correctAnswers: number;
  knowledgePoints: Record<string, { correct: number; total: number; time: number }>;
  weakPoints: string[];
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "在Python中，下列哪个是正确的变量命名？",
    options: ["2variable", "variable_name", "variable-name", "variable name"],
    correct: 1,
    knowledge_point: "变量命名",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Python中list的append()方法的作用是？",
    options: ["删除元素", "在列表末尾添加元素", "在列表开头添加元素", "清空列表"],
    correct: 1,
    knowledge_point: "列表操作",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "以下哪个循环结构在Python中不存在？",
    options: ["for循环", "while循环", "do-while循环", "嵌套循环"],
    correct: 2,
    knowledge_point: "循环结构",
    difficulty: "medium"
  },
  {
    id: 4,
    question: "Python中如何定义一个函数？",
    options: ["function myFunc():", "def myFunc():", "func myFunc():", "define myFunc():"],
    correct: 1,
    knowledge_point: "函数定义",
    difficulty: "easy"
  },
  {
    id: 5,
    question: "下列哪个是Python中的可变数据类型？",
    options: ["tuple", "string", "list", "int"],
    correct: 2,
    knowledge_point: "数据类型",
    difficulty: "medium"
  },
  {
    id: 6,
    question: "在二分查找算法中，时间复杂度是？",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1,
    knowledge_point: "算法复杂度",
    difficulty: "hard"
  },
  {
    id: 7,
    question: "栈的特点是？",
    options: ["先进先出", "后进先出", "随机访问", "按优先级访问"],
    correct: 1,
    knowledge_point: "数据结构",
    difficulty: "medium"
  },
  {
    id: 8,
    question: "Python中的异常处理使用哪个关键字？",
    options: ["catch", "try", "handle", "exception"],
    correct: 1,
    knowledge_point: "异常处理",
    difficulty: "medium"
  }
];

export default function AssessmentPage({ subject, level, onComplete }: AssessmentPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeUsed, setTimeUsed] = useState(0);
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [questionTimes, setQuestionTimes] = useState<Record<number, number>>({});

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswerSelect = (answerIndex: number) => {
    const questionTime = Date.now() - questionStartTime;
    setQuestionTimes(prev => ({
      ...prev,
      [sampleQuestions[currentQuestion].id]: questionTime
    }));
    
    setSelectedAnswers(prev => ({
      ...prev,
      [sampleQuestions[currentQuestion].id]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setQuestionStartTime(Date.now());
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // 计算结果
    let correctAnswers = 0;
    const knowledgePoints: Record<string, { correct: number; total: number; time: number }> = {};

    sampleQuestions.forEach(question => {
      const userAnswer = selectedAnswers[question.id];
      const isCorrect = userAnswer === question.correct;
      const questionTime = questionTimes[question.id] || 0;

      if (isCorrect) correctAnswers++;

      if (!knowledgePoints[question.knowledge_point]) {
        knowledgePoints[question.knowledge_point] = { correct: 0, total: 0, time: 0 };
      }

      knowledgePoints[question.knowledge_point].total++;
      knowledgePoints[question.knowledge_point].time += questionTime;
      if (isCorrect) {
        knowledgePoints[question.knowledge_point].correct++;
      }
    });

    // 找出薄弱知识点
    const weakPoints = Object.entries(knowledgePoints)
      .filter(([, data]) => data.correct / data.total < 0.6)
      .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))
      .slice(0, 5)
      .map(([point]) => point);

    const results: AssessmentResults = {
      subject,
      level,
      score: Math.round((correctAnswers / sampleQuestions.length) * 100),
      correctRate: correctAnswers / sampleQuestions.length,
      timeUsed,
      totalQuestions: sampleQuestions.length,
      correctAnswers,
      knowledgePoints,
      weakPoints
    };

    onComplete(results);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const question = sampleQuestions[currentQuestion];
  const hasAnswered = selectedAnswers[question.id] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-900 dark:via-purple-900/20 dark:to-blue-900/20 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 顶部信息栏 */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {subject} • {level}
                </Badge>
                <span className="text-muted-foreground">
                  水平测评
                </span>
              </div>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(timeUsed)}</span>
                </div>
                <span>{currentQuestion + 1} / {sampleQuestions.length}</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* 题目卡片 */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              {question.question}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {question.knowledge_point}
              </Badge>
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  question.difficulty === 'easy' ? 'border-green-500 text-green-600' :
                  question.difficulty === 'medium' ? 'border-yellow-500 text-yellow-600' :
                  'border-red-500 text-red-600'
                }`}
              >
                {question.difficulty === 'easy' ? '简单' : 
                 question.difficulty === 'medium' ? '中等' : '困难'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                  selectedAnswers[question.id] === index
                    ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500'
                    : 'hover:bg-muted/50 hover:border-muted-foreground/20'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center space-x-3">
                  {selectedAnswers[question.id] === index ? (
                    <CheckCircle className="w-5 h-5 text-purple-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className="font-medium text-sm bg-muted px-2 py-1 rounded">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 底部按钮 */}
        <div className="flex justify-between">
          <Button 
            variant="outline"
            disabled={currentQuestion === 0}
            onClick={() => {
              setCurrentQuestion(prev => prev - 1);
              setQuestionStartTime(Date.now());
            }}
          >
            上一题
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!hasAnswered}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            {currentQuestion === sampleQuestions.length - 1 ? '完成测评' : '下一题'}
          </Button>
        </div>
      </div>
    </div>
  );
}