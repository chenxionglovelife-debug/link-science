import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp, 
  Award, 
  BookOpen,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface AssessmentReportProps {
  results: {
    subject: string;
    level: string;
    score: number;
    correctRate: number;
    timeUsed: number;
    totalQuestions: number;
    correctAnswers: number;
    knowledgePoints: Record<string, { correct: number; total: number; time: number }>;
    weakPoints: string[];
  };
  onClose: () => void;
}

export default function AssessmentReport({ results, onClose }: AssessmentReportProps) {
  const isPassed = results.score >= 60;
  const ranking = Math.floor(Math.random() * 30) + 60; // 模拟排名分位
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}分${secs}秒`;
  };

  // 准备雷达图数据
  const radarData = Object.entries(results.knowledgePoints).map(([point, data]) => ({
    knowledge: point.length > 6 ? point.substring(0, 6) + '...' : point,
    fullName: point,
    score: Math.round((data.correct / data.total) * 100),
    fill: data.correct / data.total >= 0.8 ? '#10b981' : 
          data.correct / data.total >= 0.6 ? '#f59e0b' : '#ef4444'
  }));

  // 准备柱状图数据
  const barData = Object.entries(results.knowledgePoints).map(([point, data]) => ({
    name: point.length > 8 ? point.substring(0, 8) + '...' : point,
    fullName: point,
    correctRate: Math.round((data.correct / data.total) * 100),
    avgTime: Math.round(data.time / data.total / 1000),
    questions: data.total
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-900 dark:via-purple-900/20 dark:to-blue-900/20 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 标题 */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            学习诊断报告
          </h1>
          <p className="text-muted-foreground text-lg">
            基于您的测评表现，为您提供详细的学习分析
          </p>
        </div>

        {/* 考试概览卡 */}
        <Card className="border-0 shadow-2xl overflow-hidden">
          <div className={`h-2 ${isPassed ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-pink-500'}`}></div>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span className="text-2xl">测评概览</span>
              <Badge className={`text-lg px-4 py-2 ${isPassed ? 'bg-green-500' : 'bg-red-500'}`}>
                {isPassed ? '通过' : '未通过'}
                {isPassed ? <CheckCircle className="w-4 h-4 ml-2" /> : <XCircle className="w-4 h-4 ml-2" />}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600">{results.score}</div>
                <div className="text-sm text-muted-foreground">总分</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-600">{Math.round(results.correctRate * 100)}%</div>
                <div className="text-sm text-muted-foreground">正确率</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600">{ranking}%</div>
                <div className="text-sm text-muted-foreground">排名分位</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-orange-600">{formatTime(results.timeUsed)}</div>
                <div className="text-sm text-muted-foreground">用时</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-indigo-600">{results.correctAnswers}/{results.totalQuestions}</div>
                <div className="text-sm text-muted-foreground">正确题数</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 知识点掌握雷达图 */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-500" />
                <span>知识点掌握程度</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={radarData}>
                    <RadialBar 
                      dataKey="score" 
                      cornerRadius={4}
                      fill="#8884d8"
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload[0]) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border">
                              <p className="font-medium">{data.fullName}</p>
                              <p className="text-sm text-muted-foreground">掌握程度: {data.score}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 各知识点详细分析 */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span>知识点详细分析</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis fontSize={12} />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload[0]) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border">
                              <p className="font-medium">{data.fullName}</p>
                              <p className="text-sm text-blue-600">正确率: {data.correctRate}%</p>
                              <p className="text-sm text-orange-600">平均用时: {data.avgTime}s</p>
                              <p className="text-sm text-gray-600">题目数: {data.questions}题</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="correctRate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 薄弱知识点 Top 5 */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span>薄弱知识点 Top 5</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.weakPoints.length > 0 ? (
              <div className="space-y-4">
                {results.weakPoints.map((point, index) => {
                  const data = results.knowledgePoints[point];
                  const correctRate = Math.round((data.correct / data.total) * 100);
                  return (
                    <div key={point} className="flex items-center space-x-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{point}</h4>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">正确率:</span>
                            <Badge variant="outline" className="text-orange-600">{correctRate}%</Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">题目数:</span>
                            <Badge variant="outline">{data.total}题</Badge>
                          </div>
                        </div>
                      </div>
                      <Progress value={correctRate} className="w-20" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <p className="text-lg">恭喜！您在所有知识点上都表现优秀</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 底部按钮 */}
        <div className="text-center">
          <Button 
            onClick={onClose}
            size="lg"
            className="px-12 py-6 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            开始个性化学习之旅
          </Button>
        </div>
      </div>
    </div>
  );
}