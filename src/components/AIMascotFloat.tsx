import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, MessageSquare, X, Sparkles, Send, Mic, Clock, ChevronRight, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import reportImage from 'figma:asset/7205bf0b902a846961aa1939de695b938af8aa0a.png';

interface LearningReport {
  score: number;
  accuracy: number;
  improvement?: number;
  weakPoints?: string[];
}

interface Message {
  type: 'user' | 'ai' | 'report';
  message: string;
  timestamp: Date;
  reportData?: LearningReport;
}

interface ChatHistory {
  id: number;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}

export default function AIMascotFloat() {
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [currentChatId, setCurrentChatId] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const floatRef = useRef<HTMLDivElement>(null);
  
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { type: 'ai', message: '你好！我是小链同学，你的AI学习助手。有什么编程问题需要帮助吗？', timestamp: new Date() }
  ]);

  // 历史对话记录
  const [historicalChats, setHistoricalChats] = useState<ChatHistory[]>([
    {
      id: 0,
      title: '当前对话',
      lastMessage: '你好！我是小链同学...',
      timestamp: new Date(),
      messages: [
        { type: 'ai', message: '你好！我是小链同学，你的AI学习助手。有什么编程问题需要帮助吗？', timestamp: new Date() }
      ]
    },
    {
      id: 1,
      title: '📊 学习报告 14:30',
      lastMessage: '查看本次答题的详细分析和建议',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      messages: [
        { type: 'ai', message: '你好！我是小链同学，我已经为你生成了本次答题的学习报告。', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { 
          type: 'report', 
          message: '🎉 恭喜！这次答题表现非常出色！', 
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          reportData: { 
            score: 85, 
            accuracy: 85, 
            improvement: 12, 
            weakPoints: ['动态规划', '贪心算法'] 
          }
        }
      ]
    },
    {
      id: 2,
      title: '📊 学习报告 10:15',
      lastMessage: '查看本次答题的详细分析和建议',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      messages: [
        { type: 'ai', message: '你好！我是小链同学，我已经为你生成了本次答题的学习报告。', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) },
        { 
          type: 'report', 
          message: '👍 不错的成绩！继续保持！', 
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          reportData: { 
            score: 72, 
            accuracy: 72, 
            improvement: 5, 
            weakPoints: ['图论基础', '最短路径算法', 'DFS/BFS'] 
          }
        }
      ]
    }
  ]);

  const learningTips = [
    "今天要不要挑战一道新题？",
    "发现你在数据结构上进步很快！",
    "要不要复习一下之前的错题？",
    "坚持练习，你会越来越强的！",
    "有不懂的地方随时问我哦~"
  ];

  // 初始化位置（右下角）
  useEffect(() => {
    setPosition({
      x: window.innerWidth - 120,
      y: window.innerHeight - 120
    });
  }, []);

  // 监听学习报告事件
  useEffect(() => {
    const handlePushReport = (event: CustomEvent) => {
      const { score, accuracy, improvement, weakPoints } = event.detail;
      
      // 生成问候语
      let greeting = '';
      if (score >= 85) {
        greeting = '🎉 恭喜！这次答题表现非常出色！';
      } else if (score >= 60) {
        greeting = '👍 不错的成绩！继续保持！';
      } else {
        greeting = '💪 别灰心，每次练习都是进步的机会！';
      }

      // 创建学习报告消息
      const reportMessage: Message = {
        type: 'report',
        message: greeting,
        timestamp: new Date(),
        reportData: { score, accuracy, improvement, weakPoints }
      };

      // 生成唯一的聊天ID
      const newChatId = Date.now();
      
      // 格式化时间标题
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const newChat: ChatHistory = {
        id: newChatId,
        title: `📊 学习报告 ${timeStr}`,
        lastMessage: '查看本次答题的详细分析和建议',
        timestamp: new Date(),
        messages: [
          { type: 'ai', message: '你好！我是小链同学，我已经为你生成了本次答题的学习报告。', timestamp: new Date() },
          reportMessage
        ]
      };

      // 添加到历史对话列表（放在最前面）
      setHistoricalChats(prev => [newChat, ...prev]);
      
      // 切换到新创建的学习报告对话
      setCurrentChatId(newChatId);
      setChatHistory(newChat.messages);

      // 自动打开对话框
      setShowChat(true);
    };

    window.addEventListener('pushLearningReport', handlePushReport as EventListener);
    return () => {
      window.removeEventListener('pushLearningReport', handlePushReport as EventListener);
    };
  }, []);

  // 定时显示学习提示
  useEffect(() => {
    const showRandomTip = () => {
      const randomTip = learningTips[Math.floor(Math.random() * learningTips.length)];
      setCurrentTip(randomTip);
      setShowTip(true);
      
      setTimeout(() => {
        setShowTip(false);
      }, 4000);
    };

    const interval = setInterval(() => {
      if (!showChat && !isDragging) {
        showRandomTip();
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [showChat, isDragging]);

  // 拖动相关处理
  const handleMouseDown = (e: React.MouseEvent) => {
    if (showChat) return; // 对话框打开时不允许拖动
    e.preventDefault();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // 限制在窗口范围内
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;
      
      setPosition({
        x: Math.max(20, Math.min(newX, maxX)),
        y: Math.max(20, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage: Message = { type: 'user', message: chatMessage, timestamp: new Date() };
    const updatedHistory = [...chatHistory, newMessage];
    setChatHistory(updatedHistory);
    setChatMessage('');
    
    // 更新历史对话记录
    setHistoricalChats(prev => prev.map(chat => 
      chat.id === currentChatId 
        ? { ...chat, messages: updatedHistory, lastMessage: chatMessage, timestamp: new Date() }
        : chat
    ));

    // 模拟AI回复
    setTimeout(() => {
      const aiResponses = [
        "这是一个很好的问题！让我来帮你分析一下...",
        "根据你的学习情况，我建议你可以从基础概念开始复习。",
        "这个知识点确实有点难，我们可以通过几个例题来理解。",
        "你已经掌握了核心概念，现在可以尝试一些进阶题目了！",
        "让我为你推荐几道相关的练习题，帮助你巩固这个知识点。"
      ];
      const aiResponse: Message = {
        type: 'ai',
        message: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date()
      };
      const finalHistory = [...updatedHistory, aiResponse];
      setChatHistory(finalHistory);
      
      // 更新历史对话记录
      setHistoricalChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: finalHistory, lastMessage: aiResponse.message, timestamp: new Date() }
          : chat
      ));
    }, 1000);
  };

  const switchToChat = (chatId: number) => {
    const targetChat = historicalChats.find(chat => chat.id === chatId);
    if (targetChat) {
      setCurrentChatId(chatId);
      setChatHistory(targetChat.messages);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return '今天';
    if (days === 1) return '昨天';
    if (days <= 7) return `${days}天前`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* 浮动按钮 - 可拖动 */}
      <AnimatePresence>
        {!showChat && (
          <motion.div
            ref={floatRef}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed z-50"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onMouseDown={handleMouseDown}
          >
            {/* 学习提示气泡 */}
            <AnimatePresence>
              {showTip && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-32 right-0 max-w-[200px]"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-5 border border-purple-200 dark:border-purple-700">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200 font-medium">{currentTip}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowTip(false);
                        }}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-3 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-[-8px] right-4 w-4 h-4 bg-white dark:bg-slate-800 border-r border-b border-purple-200 dark:border-purple-700 transform rotate-45"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI吉祥物 - 与首页一致的大型拟人化设计 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowChat(true);
              }}
            >
              <div className="relative">
                {/* 背景光环 */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur-2xl opacity-20 animate-pulse scale-110"></div>
                
                {/* 主体头像 */}
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    rotateY: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative w-14 h-14 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/20"
                >
                  {/* 面部特征 */}
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    {/* 眼睛 */}
                    <div className="flex space-x-1.5 mb-1">
                      <motion.div
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ 
                          duration: 0.2,
                          repeat: Infinity,
                          repeatDelay: 4
                        }}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                      />
                      <motion.div
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ 
                          duration: 0.2,
                          repeat: Infinity,
                          repeatDelay: 4
                        }}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                      />
                    </div>
                    
                    {/* 嘴巴 */}
                    <motion.div
                      animate={{ 
                        scaleX: [1, 1.2, 1],
                        scaleY: [1, 0.8, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-3 h-1 bg-white rounded-full opacity-80"
                    />
                    
                    {/* AI标识 */}
                    <div className="absolute bottom-0.5 right-0.5 w-2 h-2 bg-cyan-400 rounded-full flex items-center justify-center">
                      <Bot className="w-1.5 h-1.5 text-cyan-900" />
                    </div>
                  </div>
                  
                  {/* 耳朵装饰 */}
                  <div className="absolute -left-1 top-3 w-2 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-l-full"></div>
                  <div className="absolute -right-1 top-3 w-2 h-3 bg-gradient-to-l from-blue-400 to-blue-600 rounded-r-full"></div>
                </motion.div>
                
                {/* 装饰粒子 */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                    className={`absolute w-1 h-1 bg-gradient-to-r ${
                      i % 2 === 0 ? 'from-purple-400 to-pink-400' : 'from-blue-400 to-cyan-400'
                    } rounded-full`}
                    style={{
                      top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
                      left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 50}%`,
                    }}
                  />
                ))}
                
                {/* 智能光环 */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-[-4px] border border-dashed border-gradient-to-r from-purple-400 to-blue-400 rounded-2xl opacity-40"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI对话窗 - 使用与首页相同的样式 */}
      <Dialog open={showChat} onOpenChange={setShowChat}>
        <DialogContent className="max-w-none w-[80vw] h-[88vh] flex flex-col bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 border-0 p-0 [&>button]:text-white [&>button]:hover:text-purple-300 [&>button]:z-50 sm:max-w-none !max-w-none gap-0">
          {/* 科技感背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full translate-y-24 -translate-x-24 blur-2xl"></div>
          
          <DialogHeader className="relative z-10 p-6 border-b border-white/10">
            <DialogTitle className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
              </div>
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                小链同学
              </span>
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              与AI助手对话，获取个性化的学习建议和编程指导
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 flex relative z-10">
            {/* 左侧：对话历史记录 */}
            <div className="w-80 border-r border-white/10 bg-black/10 backdrop-blur-sm flex-shrink-0">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-white font-medium mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-purple-400" />
                  对话历史
                </h3>
              </div>
              <ScrollArea className="h-full">
                <div className="p-4 space-y-2">
                  {historicalChats.map((chat) => {
                    const isReportChat = chat.title.includes('📊 学习报告');
                    return (
                      <div
                        key={chat.id}
                        onClick={() => switchToChat(chat.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                          currentChatId === chat.id 
                            ? isReportChat
                              ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-400/30 text-white shadow-lg'
                              : 'bg-purple-500/20 border-purple-400/30 text-white'
                            : isReportChat
                              ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-400/20 text-gray-200 hover:from-green-500/15 hover:to-blue-500/15 hover:border-green-400/30'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`font-medium text-sm truncate ${isReportChat ? 'font-bold' : ''}`}>
                            {chat.title}
                          </h4>
                          <ChevronRight className="w-3 h-3 opacity-50" />
                        </div>
                        <p className="text-xs opacity-70 truncate">{chat.lastMessage}</p>
                        <p className="text-xs opacity-50 mt-1">{formatTime(chat.timestamp)}</p>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            {/* 右侧：当前对话区域 */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* 对话内容 */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6 max-w-2xl mx-auto">
                  {chatHistory.map((chat, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {chat.type === 'report' && chat.reportData ? (
                        // 学习报告卡片
                        <div className="max-w-[85%] bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
                          {/* 报告头部 */}
                          <div className="bg-gradient-to-r from-purple-500/30 to-blue-500/30 p-5 border-b border-white/10">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="text-white font-semibold">小链同学</h4>
                                <p className="text-xs text-white/70">AI学习报告</p>
                              </div>
                            </div>
                            <p className="text-white leading-relaxed">{chat.message}</p>
                          </div>

                          {/* 成绩概览 */}
                          <div className="p-5 space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                  {chat.reportData.score}
                                </div>
                                <p className="text-xs text-gray-300 mt-1">总分</p>
                              </div>
                              <div className="text-center">
                                <div className="text-3xl font-bold text-green-400">
                                  {chat.reportData.accuracy}%
                                </div>
                                <p className="text-xs text-gray-300 mt-1">正确率</p>
                              </div>
                              {chat.reportData.improvement !== undefined && (
                                <div className="text-center">
                                  <div className="text-3xl font-bold text-yellow-400 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 mr-1" />
                                    {chat.reportData.improvement}%
                                  </div>
                                  <p className="text-xs text-gray-300 mt-1">提升幅度</p>
                                </div>
                              )}
                            </div>

                            {/* 薄弱知识点 */}
                            {chat.reportData.weakPoints && chat.reportData.weakPoints.length > 0 && (
                              <div className="pt-4 border-t border-white/10">
                                <div className="flex items-center space-x-2 mb-3">
                                  <Target className="w-4 h-4 text-orange-400" />
                                  <h5 className="text-sm font-semibold text-white">需要加强的知识点</h5>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {chat.reportData.weakPoints.map((point, idx) => (
                                    <span 
                                      key={idx}
                                      className="px-3 py-1.5 bg-orange-500/20 border border-orange-400/30 rounded-full text-xs text-orange-300"
                                    >
                                      {point}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* 学习报告预览图 */}
                            <div className="pt-4 border-t border-white/10">
                              <div className="flex items-center space-x-2 mb-3">
                                <BarChart3 className="w-4 h-4 text-purple-400" />
                                <h5 className="text-sm font-semibold text-white">详细学习报告</h5>
                              </div>
                              <div className="relative overflow-hidden rounded-xl bg-black/20">
                                <img 
                                  src={reportImage} 
                                  alt="学习报告" 
                                  className="w-full h-auto object-cover"
                                />
                              </div>
                            </div>

                            {/* 下一步学习建议 */}
                            <div className="pt-4 border-t border-white/10">
                              <div className="flex items-center space-x-2 mb-3">
                                <Sparkles className="w-4 h-4 text-blue-400" />
                                <h5 className="text-sm font-semibold text-white">下一步学习建议</h5>
                              </div>
                              <div className="space-y-2 text-sm text-gray-300">
                                <p className="flex items-start">
                                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 mr-2 flex-shrink-0"></span>
                                  <span>建议重点复习<strong className="text-orange-300">{chat.reportData.weakPoints?.[0] || '数据结构'}</strong>相关知识，强化薄弱环节</span>
                                </p>
                                <p className="flex items-start">
                                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 mr-2 flex-shrink-0"></span>
                                  <span>尝试更多同类型题目，通过针对性练习巩固知识点</span>
                                </p>
                                <p className="flex items-start">
                                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 mr-2 flex-shrink-0"></span>
                                  <span>保持学习节奏，建议每天完成至少2-3道编程题</span>
                                </p>
                              </div>
                              <div className="mt-4">
                                <Button 
                                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                  onClick={() => {
                                    // 关闭对话框，跳转到闯关刷题页面
                                    window.location.hash = '#practice';
                                  }}
                                >
                                  <Sparkles className="w-4 h-4 mr-2" />
                                  挑战新试卷
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* 时间戳 */}
                          {chat.timestamp && (
                            <div className="px-5 pb-4">
                              <p className="text-xs text-gray-400 text-center">
                                {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        // 普通消息
                        <div className={`max-w-[70%] p-4 rounded-2xl backdrop-blur-sm ${
                          chat.type === 'user' 
                            ? 'bg-gradient-to-r from-purple-500/80 to-blue-500/80 text-white ml-4 border border-purple-400/30' 
                            : 'bg-white/10 border border-white/20 mr-4 text-gray-100'
                        }`}>
                          <p className="leading-relaxed text-base">{chat.message}</p>
                          {chat.timestamp && (
                            <p className="text-xs opacity-60 mt-3">
                              {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              {/* 输入区域 */}
              <div className="p-6 border-t border-white/10 bg-black/10 backdrop-blur-sm flex-shrink-0">
                <div className="max-w-2xl mx-auto">
                  <div className="flex space-x-3">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="输入你的问题..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400/50 focus:ring-purple-400/25 h-12 text-base px-4"
                      />
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500/10 to-blue-500/10 pointer-events-none"></div>
                    </div>
                    <Button 
                      onClick={sendMessage} 
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border-0 shadow-lg shadow-purple-500/25 h-12 px-6"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 h-12 px-4"
                    >
                      <Mic className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
