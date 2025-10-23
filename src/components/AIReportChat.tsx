import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button } from './ui/button';
import { X, Sparkles, TrendingUp, Target, BarChart3 } from 'lucide-react';
import reportImage from 'figma:asset/c54c1702c3d31a208830eb5da755b7f2aef7fb0c.png';

interface AIReportChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  score: number; // 0-100的分数
  accuracy: number; // 正确率 0-100
  improvement?: number; // 提升幅度，可选
  weakPoints?: string[]; // 弱项知识点
  onContinuePractice?: () => void;
  onNewChallenge?: () => void;
  onViewReport?: () => void;
}

interface ChatMessage {
  id: number;
  text: string;
  delay: number; // 延迟显示时间（毫秒）
  type?: 'text' | 'report' | 'stats';
}

export default function AIReportChat({
  open,
  onOpenChange,
  score,
  accuracy,
  improvement = 0,
  weakPoints = [],
  onContinuePractice,
  onNewChallenge,
  onViewReport
}: AIReportChatProps) {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showActions, setShowActions] = useState(false);

  // 根据成绩判断类型
  const getPerformanceType = () => {
    if (score >= 85) return 'excellent';
    if (score >= 60) return 'normal';
    return 'poor';
  };

  // 生成对话消息
  const generateMessages = (): ChatMessage[] => {
    const performanceType = getPerformanceType();
    const messages: ChatMessage[] = [];

    // 1️⃣ 问候语
    if (performanceType === 'excellent') {
      messages.push({
        id: 1,
        text: `太棒啦！🎉 你这次表现超级优秀，正确率达到了 ${accuracy}%！`,
        delay: 500,
        type: 'text'
      });
    } else if (performanceType === 'normal') {
      messages.push({
        id: 1,
        text: `不错哦！👏 你完成了这轮练习，正确率 ${accuracy}%，继续保持！`,
        delay: 500,
        type: 'text'
      });
    } else {
      messages.push({
        id: 1,
        text: `加油！💪 这次练习正确率是 ${accuracy}%，没关系，每一次尝试都是进步！`,
        delay: 500,
        type: 'text'
      });
    }

    // 2️⃣ 成绩数据卡片
    messages.push({
      id: 2,
      text: 'stats_card',
      delay: 1200,
      type: 'stats'
    });

    // 3️⃣ 成绩反馈
    if (improvement > 0) {
      messages.push({
        id: 3,
        text: `相比上次，你提升了 ${improvement}%！📈 这说明你的努力很有效果。${weakPoints.length > 0 ? `不过我发现你在「${weakPoints[0]}」方面还有提升空间。` : ''}`,
        delay: 2000,
        type: 'text'
      });
    } else {
      if (weakPoints.length > 0) {
        messages.push({
          id: 3,
          text: `我分析了你的答题情况，发现你在「${weakPoints.join('、')}」这些知识点上还需要加强练习。`,
          delay: 2000,
          type: 'text'
        });
      }
    }

    // 4️⃣ 学习报告提示（带图片）
    messages.push({
      id: 4,
      text: 'report_image',
      delay: 2800,
      type: 'report'
    });

    // 5️⃣ 下一步学习建议
    if (performanceType === 'excellent') {
      messages.push({
        id: 5,
        text: `你已经掌握得很好了！建议挑战更高难度的题目，或者尝试新的专题来拓展知识面。🚀`,
        delay: 3600,
        type: 'text'
      });
    } else if (performanceType === 'normal') {
      messages.push({
        id: 5,
        text: `建议针对薄弱点多做几组针对性练习，巩固基础后再挑战新题型。记住，熟能生巧！💡`,
        delay: 3600,
        type: 'text'
      });
    } else {
      messages.push({
        id: 5,
        text: `别灰心！我建议你从基础知识点开始复习，然后做一些简单的专项练习。我会一直陪着你的！🤗`,
        delay: 3600,
        type: 'text'
      });
    }

    return messages;
  };

  const messages = generateMessages();

  // 逐条显示消息
  useEffect(() => {
    if (!open) {
      setVisibleMessages([]);
      setShowActions(false);
      return;
    }

    const timers: NodeJS.Timeout[] = [];

    messages.forEach((msg, index) => {
      const timer = setTimeout(() => {
        setVisibleMessages(prev => [...prev, msg.id]);
        
        // 最后一条消息显示后，延迟显示操作按钮
        if (index === messages.length - 1) {
          setTimeout(() => {
            setShowActions(true);
          }, 800);
        }
      }, msg.delay);
      
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [open]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* 遮罩层 - 增强版 */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        {/* 对话框内容 - 优化版 */}
        <DialogPrimitive.Content className="fixed top-[50%] left-[50%] z-[10001] translate-x-[-50%] translate-y-[-50%] max-w-2xl w-full max-w-[calc(100%-2rem)] p-0 gap-0 overflow-hidden border-0 shadow-2xl rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-300">
          {/* 装饰背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl -translate-y-32 translate-x-32 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl translate-y-24 -translate-x-24 pointer-events-none"></div>
          
          {/* 头部 - 优化版 */}
          <div className="relative z-10 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 px-6 py-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* AI头像 - 增强版 */}
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30">
                  <Sparkles className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white drop-shadow-md">小链同学</h3>
                <p className="text-xs text-white/90 font-medium">你的AI学习助理</p>
              </div>
            </div>
            <DialogPrimitive.Close className="text-white/90 hover:text-white transition-all hover:scale-110 hover:rotate-90 duration-300">
              <X className="w-5 h-5 drop-shadow-md" />
            </DialogPrimitive.Close>
          </div>

        {/* 对话区域 - 优化版 */}
        <div className="relative z-10 px-6 py-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
          <div className="space-y-5">
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => {
                if (!visibleMessages.includes(msg.id)) return null;

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    className="flex items-start space-x-3"
                  >
                    {/* 小链同学头像 */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>

                    {/* 消息气泡 */}
                    <div className="flex-1 max-w-[85%]">
                      {msg.text === 'stats_card' ? (
                        // 成绩数据卡片
                        <motion.div 
                          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-purple-200/50 dark:border-purple-700/50"
                          initial={{ rotateY: -15 }}
                          animate={{ rotateY: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className="grid grid-cols-3 gap-4">
                            {/* 总分 */}
                            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
                              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                                {score}
                              </div>
                              <p className="text-xs text-muted-foreground font-medium">总分</p>
                            </div>
                            
                            {/* 正确率 */}
                            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30">
                              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                                {accuracy}%
                              </div>
                              <p className="text-xs text-muted-foreground font-medium">正确率</p>
                            </div>
                            
                            {/* 提升幅度 */}
                            {improvement > 0 && (
                              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/30 dark:to-orange-800/30">
                                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center mb-1">
                                  <TrendingUp className="w-6 h-6 mr-1" />
                                  {improvement}%
                                </div>
                                <p className="text-xs text-muted-foreground font-medium">提升</p>
                              </div>
                            )}
                          </div>

                          {/* 薄弱知识点 */}
                          {weakPoints && weakPoints.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-purple-200/50 dark:border-purple-700/50">
                              <div className="flex items-center space-x-2 mb-3">
                                <Target className="w-4 h-4 text-orange-500" />
                                <h5 className="text-sm font-semibold">需要加强的知识点</h5>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {weakPoints.map((point, idx) => (
                                  <span 
                                    key={idx}
                                    className="px-3 py-1.5 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/40 dark:to-red-900/40 border border-orange-300/50 dark:border-orange-600/50 rounded-full text-xs font-medium text-orange-700 dark:text-orange-300"
                                  >
                                    {point}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ) : msg.text === 'report_image' ? (
                        // 学习报告缩略图 - 优化版
                        <div 
                          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group border border-purple-200/50 dark:border-purple-700/50"
                          onClick={onViewReport}
                        >
                          <div className="flex items-center space-x-2 mb-3">
                            <BarChart3 className="w-4 h-4 text-purple-500" />
                            <p className="text-sm font-semibold text-foreground">📊 详细学习报告已生成</p>
                          </div>
                          <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                            <img 
                              src={reportImage} 
                              alt="学习报告" 
                              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                              <div className="bg-white/95 dark:bg-slate-800/95 px-4 py-2 rounded-lg shadow-lg">
                                <p className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                  点击查看完整报告
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // 普通文本消息 - 优化版
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl rounded-tl-sm px-5 py-4 shadow-lg border border-purple-200/30 dark:border-purple-700/30">
                          <p className="leading-relaxed text-foreground">{msg.text}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* 操作按钮 - 优化版 */}
              {showActions && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start space-x-3 pt-2"
                >
                  <div className="flex-shrink-0 w-10 h-10" />
                  <div className="flex-1 flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={onContinuePractice}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 rounded-xl transition-all duration-300 hover:scale-[1.02] font-semibold"
                    >
                      继续练习
                    </Button>
                    <Button
                      onClick={onNewChallenge}
                      variant="outline"
                      className="flex-1 rounded-xl border-2 border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all duration-300 hover:scale-[1.02] font-semibold"
                    >
                      挑战新试卷
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
