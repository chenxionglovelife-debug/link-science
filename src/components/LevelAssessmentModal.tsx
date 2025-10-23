import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { BookOpen, Target, Zap, ChevronRight } from 'lucide-react';

interface LevelAssessmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartAssessment: (subject: string, level: string) => void;
}

const subjects = [
  { id: 'python', name: 'Python编程', icon: '🐍', description: '基础语法、数据结构、算法实现' },
  { id: 'cpp', name: 'C++编程', icon: '⚡', description: 'C++语法、STL、算法竞赛' },
  { id: 'scratch', name: 'Scratch图形化', icon: '🎨', description: '可视化编程、逻辑思维' },
  { id: 'algorithm', name: '算法思维', icon: '🧠', description: '数据结构、算法设计、问题求解' }
];

const levels = [
  { id: 'level1', name: '一级', color: 'bg-green-100 text-green-800', description: '基础入门水平' },
  { id: 'level2', name: '二级', color: 'bg-blue-100 text-blue-800', description: '初步掌握水平' },
  { id: 'level3', name: '三级', color: 'bg-purple-100 text-purple-800', description: '熟练运用水平' },
  { id: 'level4', name: '四级', color: 'bg-orange-100 text-orange-800', description: '精通高级水平' }
];

export default function LevelAssessmentModal({ open, onOpenChange, onStartAssessment }: LevelAssessmentModalProps) {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const handleStartAssessment = () => {
    if (selectedSubject && selectedLevel) {
      onStartAssessment(selectedSubject, selectedLevel);
    }
  };

  const handleSkip = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[85vh] overflow-y-auto gap-0">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            欢迎来到 CodeQuest！
          </DialogTitle>
          <div className="space-y-3">
            <p className="text-lg text-muted-foreground leading-relaxed">
              为了给您提供最个性化的学习体验，我们邀请您完成一个简短的水平测验
            </p>
            <p className="text-base text-muted-foreground">
              测验结果将帮助系统为您制定最适合的学习方案，提升学习效率
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* 科目选择 */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <span>选择测评科目</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {subjects.map((subject) => (
                <Card 
                  key={subject.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedSubject === subject.id 
                      ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedSubject(subject.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{subject.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-lg mb-1">{subject.name}</h4>
                        <p className="text-sm text-muted-foreground">{subject.description}</p>
                      </div>
                      {selectedSubject === subject.id && (
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 等级选择 */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-500" />
              <span>选择等级</span>
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {levels.map((level) => (
                <Card 
                  key={level.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedLevel === level.id 
                      ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedLevel(level.id)}
                >
                  <CardContent className="p-3">
                    <div className="text-center">
                      <h4 className="font-medium text-base mb-1">{level.name}</h4>
                      <Badge className={`${level.color} text-xs`}>{level.name}</Badge>
                    </div>
                    {selectedLevel === level.id && (
                      <div className="mt-2 flex justify-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 预期结果 */}
          {selectedSubject && selectedLevel && (
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="w-5 h-5 text-green-500" />
                  <h4 className="font-medium text-green-800 dark:text-green-200">个性化学习计划预览</h4>
                </div>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  基于您选择的 <span className="font-medium">{subjects.find(s => s.id === selectedSubject)?.name}</span> 和 
                  <span className="font-medium"> {levels.find(l => l.id === selectedLevel)?.name}</span> 水平，
                  我们将为您推荐适合的题目难度和学习路径，并提供针对性的练习建议。
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 底部按钮 */}
        <div className="flex justify-between pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={handleSkip}
            className="px-8"
          >
            跳过测评
          </Button>
          <Button 
            onClick={handleStartAssessment}
            disabled={!selectedSubject || !selectedLevel}
            className="px-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            开始测评
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}