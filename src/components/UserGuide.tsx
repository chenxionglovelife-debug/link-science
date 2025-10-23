import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { X, Sparkles, PartyPopper } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UserGuideProps {
  onComplete?: () => void;
}

interface GuideStep {
  id: number;
  title: string;
  description: string;
  emoji: string;
  targetSelector?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  highlightMultiple?: string[];
}

const GUIDE_STEPS: GuideStep[] = [
  {
    id: 1,
    title: '欢迎来到 AI 链科学！',
    description: '我是你的学习助理「小链同学」，接下来带你快速了解高效学习方法吧！',
    emoji: '👋',
    position: 'center'
  },
  {
    id: 2,
    title: '实战舞台',
    description: '🎯 这是你的实战舞台！通过赛事争锋与考级真题练级，检验与提升编程实力。',
    emoji: '',
    highlightMultiple: ['[data-guide="contest"]', '[data-guide="exam-practice"]'],
    position: 'bottom'
  },
  {
    id: 3,
    title: '小链同学——你的AI学习助理',
    description: '🤖 这是小链同学——你的AI学习助理。任何学习问题都可以来找我！',
    emoji: '',
    targetSelector: '[data-guide="ai-mascot"]',
    position: 'left'
  },
  {
    id: 4,
    title: '智能练习模块',
    description: '💡 这是基于你薄弱知识点生成的定制练习区，并可预测你的通过率。',
    emoji: '',
    highlightMultiple: ['[data-guide="deep-practice"]', '[data-guide="predict-rate"]'],
    position: 'left'
  },
  {
    id: 5,
    title: '攻克错题',
    description: '🔁 每次练习的错题会自动收录在这里，方便强化训练。',
    emoji: '',
    targetSelector: '[data-guide="mistakes"]',
    position: 'right'
  },
  {
    id: 6,
    title: '学习报告',
    description: '📊 系统会诊断你的学习情况并提供针对性建议。',
    emoji: '',
    targetSelector: '[data-guide="profile"]',
    position: 'right'
  }
];

export default function UserGuide({ onComplete }: UserGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const [multipleRects, setMultipleRects] = useState<DOMRect[]>([]);

  useEffect(() => {
    // 检查用户是否已经完成引导
    const hasCompletedGuide = localStorage.getItem('userGuideCompleted');
    if (!hasCompletedGuide) {
      // 延迟显示引导，让页面先渲染
      setTimeout(() => {
        setIsVisible(true);
      }, 800);
    }
  }, []);

  // 开发模式：添加键盘快捷键重置引导（按Shift+G）
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'G') {
        localStorage.removeItem('userGuideCompleted');
        setCurrentStep(0);
        setIsVisible(true);
        toast.info('引导已重置', { description: '按ESC可以跳过引导' });
      }
      if (e.key === 'Escape' && isVisible) {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || currentStep >= GUIDE_STEPS.length) return;

    const step = GUIDE_STEPS[currentStep];
    
    // 重置高亮区域
    setHighlightRect(null);
    setMultipleRects([]);

    // 如果是欢迎页，不需要高亮
    if (step.position === 'center') return;

    // 延迟获取元素位置，确保页面已渲染
    const timer = setTimeout(() => {
      if (step.highlightMultiple) {
        // 高亮多个元素
        const rects: DOMRect[] = [];
        step.highlightMultiple.forEach(selector => {
          const element = document.querySelector(selector);
          if (element) {
            rects.push(element.getBoundingClientRect());
          } else {
            console.warn(`[UserGuide] Element not found for selector: ${selector}`);
          }
        });
        if (rects.length > 0) {
          setMultipleRects(rects);
        }
      } else if (step.targetSelector) {
        // 高亮单个元素
        const element = document.querySelector(step.targetSelector);
        if (element) {
          setHighlightRect(element.getBoundingClientRect());
        } else {
          console.warn(`[UserGuide] Element not found for selector: ${step.targetSelector}`);
        }
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [currentStep, isVisible]);

  const handleNext = () => {
    if (currentStep < GUIDE_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('userGuideCompleted', 'true');
    setIsVisible(false);
    
    // 显示完成提示
    toast.success('🎉 引导完成！', {
      description: '开始你的编程学习之旅吧！',
      duration: 3000,
    });
    
    if (onComplete) {
      onComplete();
    }
  };

  if (!isVisible) return null;

  const step = GUIDE_STEPS[currentStep];
  const isWelcomeStep = step.position === 'center';

  // 计算提示框位置
  const getTooltipPosition = () => {
    if (isWelcomeStep) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      };
    }

    if (!highlightRect && multipleRects.length === 0) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      };
    }

    // 使用第一个高亮区域作为基准，如果有多个则使用合并后的区域
    const rect = multipleRects.length > 0 ? getMergedHighlightRect() : highlightRect;
    if (!rect) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      };
    }

    const padding = 32;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    switch (step.position) {
      case 'top':
        return {
          top: `${Math.max(padding, rect.top - padding)}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translate(-50%, -100%)'
        };
      case 'bottom':
        return {
          top: `${Math.min(viewportHeight - padding, rect.bottom + padding)}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translate(-50%, 0)'
        };
      case 'left':
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${Math.max(padding, rect.left - padding)}px`,
          transform: 'translate(-100%, -50%)'
        };
      case 'right':
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${Math.min(viewportWidth - padding, rect.right + padding)}px`,
          transform: 'translate(0, -50%)'
        };
      default:
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
    }
  };

  // 计算合并的高亮区域（用于多个元素）
  const getMergedHighlightRect = () => {
    if (multipleRects.length === 0) return null;

    const minX = Math.min(...multipleRects.map(r => r.left));
    const minY = Math.min(...multipleRects.map(r => r.top));
    const maxX = Math.max(...multipleRects.map(r => r.right));
    const maxY = Math.max(...multipleRects.map(r => r.bottom));

    return {
      left: minX,
      top: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  };

  const displayRect = multipleRects.length > 0 ? getMergedHighlightRect() : highlightRect;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999]"
      >
        {/* 遮罩层 */}
        <div className="absolute inset-0 bg-black/60" />

        {/* 高亮区域 */}
        {!isWelcomeStep && displayRect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute"
            style={{
              left: `${displayRect.left - 12}px`,
              top: `${displayRect.top - 12}px`,
              width: `${displayRect.width + 24}px`,
              height: `${displayRect.height + 24}px`,
              boxShadow: '0 0 0 4px rgba(22, 119, 255, 0.5), 0 0 20px rgba(22, 119, 255, 0.3), 0 0 0 9999px rgba(0, 0, 0, 0.6)',
              borderRadius: '16px',
              pointerEvents: 'none',
              zIndex: 10000
            }}
          >
            {/* 发光动效 */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.01, 1]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-blue-400/30 rounded-2xl"
            />
          </motion.div>
        )}

        {/* 提示框 */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.92 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="absolute z-[10001]"
          style={getTooltipPosition()}
        >
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-lg shadow-2xl border border-blue-200/50 dark:border-blue-500/30 overflow-hidden max-w-md">
            {isWelcomeStep && (
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-8 text-white text-center">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2
                  }}
                  className="text-6xl mb-4"
                >
                  {step.emoji}
                </motion.div>
                <h2 className="text-2xl font-semibold mb-2">{step.title}</h2>
              </div>
            )}
            
            <div className="p-6">
              {!isWelcomeStep && step.emoji && (
                <div className="text-3xl mb-3">{step.emoji}</div>
              )}
              {!isWelcomeStep && (
                <h3 className="font-semibold text-lg mb-3 text-foreground">{step.title}</h3>
              )}
              <p className="text-foreground/80 leading-relaxed mb-6">
                {step.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {GUIDE_STEPS.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentStep
                          ? 'w-6 bg-[#1677FF]'
                          : index < currentStep
                          ? 'w-1.5 bg-[#1677FF]/50'
                          : 'w-1.5 bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSkip}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-transparent hover:bg-transparent"
                  >
                    跳过
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleNext}
                    className="bg-[#1677FF] hover:bg-[#1677FF]/90 text-white px-6 shadow-lg shadow-blue-500/30"
                  >
                    {currentStep === GUIDE_STEPS.length - 1 ? '完成' : '下一步'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
