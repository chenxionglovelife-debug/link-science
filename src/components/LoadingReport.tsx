import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bot, FileText, Brain, TrendingUp, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';

interface LoadingReportProps {
  isOpen: boolean;
  onComplete: () => void;
  onClose?: () => void;
}

export default function LoadingReport({ isOpen, onComplete, onClose }: LoadingReportProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: FileText, text: '分析试卷数据...', duration: 2000 },
    { icon: Brain, text: '识别薄弱知识点...', duration: 3000 },
    { icon: TrendingUp, text: '生成学习建议...', duration: 2500 },
    { icon: CheckCircle, text: '准备学习报告...', duration: 2500 }
  ];

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setCurrentStep(0);
      return;
    }

    // 进度条动画
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    // 步骤切换
    let totalTime = 0;
    steps.forEach((step, index) => {
      totalTime += step.duration;
      setTimeout(() => {
        setCurrentStep(index);
      }, totalTime - step.duration);
    });

    // 10秒后触发完成
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 10000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [isOpen, onComplete]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] border-0 shadow-2xl overflow-hidden p-0 gap-0">
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 p-8">
          {/* AI助手头像 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-50"
              />
              <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-12 h-12 text-white" />
              </div>
            </div>
          </motion.div>

          {/* 标题 */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              小链同学正在生成学习报告
            </h3>
            <p className="text-muted-foreground">请稍等，马上就好...</p>
          </div>

          {/* 进度条 */}
          <div className="mb-8">
            <div className="h-2 bg-white/50 dark:bg-gray-800/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-center mt-2 text-sm text-muted-foreground">
              {progress}%
            </div>
          </div>

          {/* 步骤指示 */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isActive || isCompleted ? 1 : 0.3,
                    x: 0
                  }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isActive ? 'bg-blue-500 text-white' :
                    'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`flex-1 transition-all ${
                    isActive ? 'font-medium text-foreground' :
                    isCompleted ? 'text-green-600 dark:text-green-400' :
                    'text-muted-foreground'
                  }`}>
                    {step.text}
                  </span>
                  {isActive && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
