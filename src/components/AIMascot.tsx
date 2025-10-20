import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, MessageSquare, Send, Mic, X, Sparkles, Clock, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface AIMascotProps {
  className?: string;
  inCard?: boolean; // 新增prop，控制是否在卡片内显示
}

const learningTips = [
  "今天要不要挑战一道新的算法题？",
  "复习一下之前的错题，巩固知识点吧！",
  "Python基础看起来不错，要不要试试数据结构？",
  "坚持每天练习，你的编程能力正在稳步提升！",
  "发现你在循环结构上还需要加强，推荐几道相关题目？"
];

export default function AIMascot({ className = "", inCard = false }: AIMascotProps) {
  const [showChat, setShowChat] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [currentChatId, setCurrentChatId] = useState(0);
  const [chatHistory, setChatHistory] = useState([
    { type: 'ai', message: '你好！我是CodeQuest的AI学习助手，有什么编程问题需要帮助吗？', timestamp: new Date() }
  ]);
  
  // 历史对话记录
  const [historicalChats, setHistoricalChats] = useState([
    {
      id: 0,
      title: '当前对话',
      lastMessage: '你好！我是CodeQuest的AI学习助手...',
      timestamp: new Date(),
      messages: [
        { type: 'ai', message: '你好！我是CodeQuest的AI学习助手，有什么编程问题需要帮助吗？', timestamp: new Date() }
      ]
    },
    {
      id: 1,
      title: 'Python基础语法问题',
      lastMessage: '关于Python列表的使用...',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1天前
      messages: [
        { type: 'user', message: 'Python中列表和元组有什么区别？', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        { type: 'ai', message: '列表是可变的数据类型，可以修改元素；而元组是不可变的，一旦创建就不能修改内容...', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      ]
    },
    {
      id: 2,
      title: '算法复杂度讨论',
      lastMessage: '时间复杂度O(n)和O(n²)的区别...',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3天前
      messages: [
        { type: 'user', message: '能解释一下时间复杂度吗？', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
        { type: 'ai', message: '时间复杂度是算法执行时间与输入规模的关系...', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }
      ]
    }
  ]);

  // 定时显示学习建议 - v2.2优化：改为5秒弹出一次
  useEffect(() => {
    const showRandomTip = () => {
      const randomTip = learningTips[Math.floor(Math.random() * learningTips.length)];
      setCurrentTip(randomTip);
      setShowTip(true);
      
      // 3秒后自动隐藏
      setTimeout(() => {
        setShowTip(false);
      }, 3000);
    };

    // 每5秒显示一次建议
    const interval = setInterval(() => {
      showRandomTip();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = { type: 'user', message: chatMessage, timestamp: new Date() };
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
      const aiReply = { 
        type: 'ai', 
        message: '这是一个很好的问题！根据您的学习进度，我建议您可以先从基础算法开始练习...',
        timestamp: new Date()
      };
      const finalHistory = [...updatedHistory, aiReply];
      setChatHistory(finalHistory);
      
      // 更新历史对话记录
      setHistoricalChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: finalHistory, lastMessage: aiReply.message, timestamp: new Date() }
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
    <div className={`${inCard ? 'relative' : 'fixed bottom-8 right-8'} z-50 ${className}`}>
      {/* 学习建议气泡 */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`absolute ${inCard ? 'top-3/4 left-full ml-3' : 'bottom-24 right-8'} ${inCard ? '' : 'mb-4'}`}
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-5 max-w-sm min-w-[280px] border border-purple-200 dark:border-purple-700">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200 font-medium">{currentTip}</p>
                </div>
                <button
                  onClick={() => setShowTip(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-3 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* 气泡箭头 */}
              <div className={`absolute w-4 h-4 bg-white dark:bg-slate-800 border-purple-200 dark:border-purple-700 transform ${
                inCard 
                  ? 'top-6 left-[-8px] border-l border-b rotate-45' 
                  : 'bottom-[-8px] right-4 border-r border-b rotate-45'
              }`}></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI吉祥物 - 大型拟人化设计 */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer"
        onClick={() => setShowChat(true)}
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
            className="relative w-28 h-28 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/20"
          >
            {/* 面部特征 */}
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {/* 眼睛 */}
              <div className="flex space-x-3 mb-2">
                <motion.div
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ 
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 4
                  }}
                  className="w-3 h-3 bg-white rounded-full"
                />
                <motion.div
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ 
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 4
                  }}
                  className="w-3 h-3 bg-white rounded-full"
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
                className="w-6 h-2 bg-white rounded-full opacity-80"
              />
              
              {/* AI标识 */}
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center">
                <Bot className="w-2.5 h-2.5 text-cyan-900" />
              </div>
            </div>
            
            {/* 耳朵装饰 */}
            <div className="absolute -left-2 top-6 w-4 h-6 bg-gradient-to-r from-purple-400 to-purple-600 rounded-l-full"></div>
            <div className="absolute -right-2 top-6 w-4 h-6 bg-gradient-to-l from-blue-400 to-blue-600 rounded-r-full"></div>
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
              className={`absolute w-2 h-2 bg-gradient-to-r ${
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
            className="absolute inset-[-8px] border-2 border-dashed border-gradient-to-r from-purple-400 to-blue-400 rounded-3xl opacity-40"
          />
        </div>
      </motion.div>

      {/* AI对话窗 - 增强科技感，增加宽度和历史记录 */}
      <Dialog open={showChat} onOpenChange={setShowChat}>
        <DialogContent className="max-w-none w-[80vw] h-[88vh] flex flex-col bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 border-0 p-0 [&>button]:text-white [&>button]:hover:text-purple-300 [&>button]:z-50 sm:max-w-none !max-w-none ml-[200px]">
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
                AI学习助手
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
                  {historicalChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => switchToChat(chat.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border ${ 
                        currentChatId === chat.id 
                          ? 'bg-purple-500/20 border-purple-400/30 text-white' 
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm truncate">{chat.title}</h4>
                        <ChevronRight className="w-3 h-3 opacity-50" />
                      </div>
                      <p className="text-xs opacity-70 truncate">{chat.lastMessage}</p>
                      <p className="text-xs opacity-50 mt-1">{formatTime(chat.timestamp)}</p>
                    </div>
                  ))}
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
    </div>
  );
}