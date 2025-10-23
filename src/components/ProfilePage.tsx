// CodeQuest T1.9.5 - 学习诊断页面优化版本
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  Brain,
  BookOpen,
  Clock,
  CheckCircle,
  Bot,
  Lightbulb
} from 'lucide-react';

export default function ProfilePage() {
  // 知识图谱数据 - 三级结构：主知识点 + 子知识点
  const categoryStats = [
    { 
      category: '动态规划', 
      solved: 45, 
      total: 60, 
      accuracy: 85,
      subCategories: [
        { name: '背包问题', accuracy: 88 },
        { name: '状态压缩', accuracy: 82 },
        { name: '区间DP', accuracy: 84 },
      ]
    },
    { 
      category: '图论', 
      solved: 23, 
      total: 40, 
      accuracy: 58,
      subCategories: [
        { name: '最短路径', accuracy: 62 },
        { name: '拓扑排序', accuracy: 55 },
        { name: '最小生成树', accuracy: 57 },
      ]
    },
    { 
      category: '贪心算法', 
      solved: 67, 
      total: 80, 
      accuracy: 78,
      subCategories: [
        { name: '区间贪心', accuracy: 81 },
        { name: '排序贪心', accuracy: 76 },
      ]
    },
    { 
      category: '树与图', 
      solved: 89, 
      total: 95, 
      accuracy: 92,
      subCategories: [
        { name: '二叉树', accuracy: 95 },
        { name: '并查集', accuracy: 90 },
        { name: '树形DP', accuracy: 91 },
      ]
    },
    { 
      category: '排序算法', 
      solved: 34, 
      total: 40, 
      accuracy: 88,
      subCategories: [
        { name: '快速排序', accuracy: 92 },
        { name: '归并排序', accuracy: 85 },
      ]
    },
    { 
      category: '字符串', 
      solved: 52, 
      total: 70, 
      accuracy: 74 
    },
    { 
      category: '搜索回溯', 
      solved: 28, 
      total: 50, 
      accuracy: 56,
      subCategories: [
        { name: 'DFS搜索', accuracy: 61 },
        { name: 'BFS搜索', accuracy: 58 },
        { name: '剪枝优化', accuracy: 49 },
      ]
    },
    { 
      category: '数学计算', 
      solved: 41, 
      total: 50, 
      accuracy: 82 
    },
    { 
      category: '位运算', 
      solved: 19, 
      total: 30, 
      accuracy: 63 
    },
    { 
      category: '栈与队列', 
      solved: 36, 
      total: 40, 
      accuracy: 90,
      subCategories: [
        { name: '单调栈', accuracy: 93 },
        { name: '优先队列', accuracy: 88 },
      ]
    },
  ];
  
  // 计算综合掌握力
  const overallMastery = Math.round(
    categoryStats.reduce((sum, cat) => sum + cat.accuracy, 0) / categoryStats.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/30 dark:from-slate-900 dark:via-green-900/20 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-8 py-4">
        {/* Header - 顶部卡片 - 预测通过率居中 - 高度优化 */}
        <div className="mb-3">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 p-3">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                {/* 左侧：标题和描述 */}
                <div className="flex-1">
                  <h1 className="text-xl font-bold flex items-center space-x-2 mb-1">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <span>学习诊断</span>
                  </h1>
                  <p className="text-sm text-muted-foreground">AI智能诊断学习状况，生成个性化学习报告</p>
                </div>
                
                {/* 中间：预测通过率 - 垂直居中 */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center bg-gradient-to-br from-green-100/70 to-emerald-100/70 dark:from-green-900/40 dark:to-emerald-900/40 rounded-xl px-6 py-3 border border-green-200/50 dark:border-green-700/40 min-w-[180px]">
                    <div className="text-3xl font-bold text-green-600 mb-1">85%</div>
                    <div className="text-sm text-muted-foreground mb-1">预测通过率</div>
                    <div className="flex items-center justify-center text-xs text-green-600">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      较上月提升12%
                    </div>
                  </div>
                </div>
                
                {/* 右侧：占位保持对称 */}
                <div className="flex-1"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 第一行：学习报告 - 全宽 - 字号增大 */}
        <div className="mb-3">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-purple-500" />
                <span>学习报告</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-sm">学习情况分析</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    基于你最近的练习表现，AI发现你在<strong>动态规划</strong>领域有显著进步，状态转移方程的理解更加深入。但在<strong>图论算法</strong>方面还需加强，特别是最短路径算法的应用。
                  </p>
                </div>
                
                <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-sm">薄弱知识点</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">图论算法</span>
                      <Badge className="bg-red-500 text-white text-xs h-5 px-2">需关注</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">分治算法</span>
                      <Badge className="bg-yellow-500 text-white text-xs h-5 px-2">中等</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">贪心策略</span>
                      <Badge className="bg-green-500 text-white text-xs h-5 px-2">良好</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-sm">学习建议</span>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 每日练习1-2道图论题目</li>
                    <li>• 重点复习Dijkstra和Floyd算法</li>
                    <li>• 加强算法模板的记忆和应用</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 第二行：左侧知识图谱(更宽) + 右侧学习统计(更窄) */}
        <div className="grid grid-cols-7 gap-3">
          {/* 左侧：分类表现 - 知识图谱 (占4列) */}
          <div className="col-span-4">
            <Card className="border-0 shadow-xl">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  <span>分类表现 - 知识图谱</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                {/* 知识图谱 - 三级放射状知识掌握度可视化 - 浅灰色背景 */}
                <div className="relative h-[400px] bg-gradient-to-br from-slate-100 via-gray-100 to-slate-50 dark:from-slate-800 dark:via-gray-800 dark:to-slate-700 rounded-xl p-6 overflow-hidden border border-gray-200 dark:border-gray-600">
                  {/* 背景装饰 - 轻微渐变光晕 */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/15 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-400/15 rounded-full blur-3xl"></div>
                  </div>
                  
                  {/* 中心核心节点 - 综合掌握力 */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    {/* 外层发光圆环 */}
                    <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-xl animate-pulse"></div>
                    
                    {/* 主节点 */}
                    <div className="relative w-24 h-24 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 border-2 border-white/30">
                      {/* 内部发光 */}
                      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                      
                      {/* 内容 */}
                      <div className="relative text-white text-center z-10">
                        <Brain className="w-8 h-8 mx-auto mb-1" />
                        <div className="text-xl font-bold">{overallMastery}%</div>
                      </div>
                    </div>
                    
                    {/* 标签 */}
                    <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
                      <div className="font-bold text-sm text-white">综合掌握力</div>
                      <div className="text-xs text-blue-300">Overall Mastery</div>
                    </div>
                  </div>

                  {/* 周围的知识点节点 */}
                  {categoryStats.map((category, index) => {
                    // 不对称布局，增加视觉动态感
                    const baseAngle = (index * 360 / categoryStats.length) - 90;
                    const angleOffset = (index % 2 === 0) ? 5 : -5; // 轻微偏移
                    const angle = baseAngle + angleOffset;
                    
                    // 不同层级的半径，制造深度感
                    const baseRadius = 110;
                    const radiusVariation = (index % 3) * 5;
                    const radius = baseRadius + radiusVariation;
                    
                    const x = Math.cos(angle * Math.PI / 180) * radius;
                    const y = Math.sin(angle * Math.PI / 180) * radius;
                    
                    // 根据掌握度确定颜色和大小
                    let nodeColor, nodeSize, shadowColor, glowIntensity;
                    if (category.accuracy >= 80) {
                      nodeColor = 'from-emerald-400 via-green-500 to-teal-600';
                      shadowColor = 'shadow-green-500/60';
                      nodeSize = 'w-16 h-16';
                      glowIntensity = 'blur-lg';
                    } else if (category.accuracy >= 60) {
                      nodeColor = 'from-amber-400 via-orange-500 to-yellow-600';
                      shadowColor = 'shadow-orange-500/50';
                      nodeSize = 'w-14 h-14';
                      glowIntensity = 'blur-md';
                    } else {
                      nodeColor = 'from-red-400 via-rose-500 to-pink-600';
                      shadowColor = 'shadow-red-500/40';
                      nodeSize = 'w-12 h-12';
                      glowIntensity = 'blur-sm';
                    }
                    
                    return (
                      <div key={index}>
                        {/* 连接线 - 中心到主节点 */}
                        <svg
                          className="absolute top-0 left-0 w-full h-full pointer-events-none"
                          style={{ zIndex: 1 }}
                        >
                          <defs>
                            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="rgba(147, 197, 253, 0.6)" />
                              <stop offset="100%" stopColor={category.accuracy >= 80 ? 'rgba(52, 211, 153, 0.6)' : category.accuracy >= 60 ? 'rgba(251, 146, 60, 0.6)' : 'rgba(251, 113, 133, 0.6)'} />
                            </linearGradient>
                          </defs>
                          <line
                            x1="50%"
                            y1="50%"
                            x2={`calc(50% + ${x}px)`}
                            y2={`calc(50% + ${y}px)`}
                            stroke={`url(#gradient-${index})`}
                            strokeWidth="2"
                            className="drop-shadow-lg"
                          />
                        </svg>
                        
                        {/* 主知识点节点 */}
                        <div 
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                          style={{
                            top: '50%',
                            left: '50%',
                            marginTop: `${y}px`,
                            marginLeft: `${x}px`
                          }}
                        >
                          {/* 外层发光 */}
                          <div className={`absolute inset-0 -m-2 rounded-full bg-gradient-to-r ${nodeColor} opacity-40 ${glowIntensity}`}></div>
                          
                          {/* 节点主体 */}
                          <div className={`relative ${nodeSize} bg-gradient-to-br ${nodeColor} rounded-full flex items-center justify-center shadow-xl ${shadowColor} border border-white/30 hover:scale-110 transition-all duration-300 cursor-pointer group`}>
                            {/* 内部高光 */}
                            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                            
                            {/* 百分比 */}
                            <div className="relative text-white text-center">
                              <div className="font-bold" style={{ fontSize: category.accuracy >= 80 ? '16px' : category.accuracy >= 60 ? '14px' : '12px' }}>
                                {category.accuracy}%
                              </div>
                            </div>
                            
                            {/* Hover效果 - 脉冲 */}
                            <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/20 transition-all duration-300"></div>
                          </div>
                          
                          {/* 知识点标签 */}
                          <div className="absolute top-full mt-1.5 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
                            <div className="font-medium text-xs text-gray-800 dark:text-white/90 drop-shadow-lg">{category.category}</div>
                            <div className="text-xs text-gray-600 dark:text-blue-200/70">
                              {category.solved}/{category.total}
                            </div>
                          </div>
                          
                          {/* 第三层：子知识点 */}
                          {category.subCategories && category.subCategories.map((subCat, subIndex) => {
                            // 子节点围绕父节点的角度
                            const subAngle = angle + (subIndex - (category.subCategories!.length - 1) / 2) * 35; // 扇形分布
                            const subRadius = 45; // 子节点距离父节点的距离
                            
                            const subX = Math.cos(subAngle * Math.PI / 180) * subRadius;
                            const subY = Math.sin(subAngle * Math.PI / 180) * subRadius;
                            
                            // 子节点颜色
                            let subNodeColor, subNodeSize, subShadowColor;
                            if (subCat.accuracy >= 80) {
                              subNodeColor = 'from-emerald-300 via-green-400 to-teal-500';
                              subShadowColor = 'shadow-green-400/50';
                              subNodeSize = 'w-10 h-10';
                            } else if (subCat.accuracy >= 60) {
                              subNodeColor = 'from-amber-300 via-orange-400 to-yellow-500';
                              subShadowColor = 'shadow-orange-400/40';
                              subNodeSize = 'w-9 h-9';
                            } else {
                              subNodeColor = 'from-red-300 via-rose-400 to-pink-500';
                              subShadowColor = 'shadow-red-400/30';
                              subNodeSize = 'w-8 h-8';
                            }
                            
                            return (
                              <div key={subIndex}>
                                {/* 连接线 - 主节点到子节点 */}
                                <svg
                                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                                  style={{ 
                                    zIndex: 2,
                                    left: '50%',
                                    top: '50%'
                                  }}
                                >
                                  <defs>
                                    <linearGradient id={`sub-gradient-${index}-${subIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="0%" stopColor={category.accuracy >= 80 ? 'rgba(52, 211, 153, 0.4)' : category.accuracy >= 60 ? 'rgba(251, 146, 60, 0.4)' : 'rgba(251, 113, 133, 0.4)'} />
                                      <stop offset="100%" stopColor={subCat.accuracy >= 80 ? 'rgba(52, 211, 153, 0.5)' : subCat.accuracy >= 60 ? 'rgba(251, 146, 60, 0.5)' : 'rgba(251, 113, 133, 0.5)'} />
                                    </linearGradient>
                                  </defs>
                                  <line
                                    x1="0"
                                    y1="0"
                                    x2={`${subX}px`}
                                    y2={`${subY}px`}
                                    stroke={`url(#sub-gradient-${index}-${subIndex})`}
                                    strokeWidth="1.5"
                                    strokeDasharray="3,2"
                                    className="opacity-70"
                                  />
                                </svg>
                                
                                {/* 子节点 */}
                                <div
                                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
                                  style={{
                                    left: `${subX}px`,
                                    top: `${subY}px`
                                  }}
                                >
                                  {/* 子节点外层微光 */}
                                  <div className={`absolute inset-0 -m-1 rounded-full bg-gradient-to-r ${subNodeColor} opacity-30 blur-sm`}></div>
                                  
                                  {/* 子节点主体 */}
                                  <div className={`relative ${subNodeSize} bg-gradient-to-br ${subNodeColor} rounded-full flex items-center justify-center shadow-lg ${subShadowColor} border border-white/40 hover:scale-125 transition-all duration-200 cursor-pointer`}>
                                    {/* 内部高光 */}
                                    <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-white/40 to-transparent"></div>
                                    
                                    {/* 百分比 */}
                                    <div className="relative text-white text-center">
                                      <div className="font-bold text-[10px]">
                                        {subCat.accuracy}%
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* 子知识点标签 */}
                                  <div className="absolute top-full mt-0.5 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
                                    <div className="text-[10px] text-gray-700 dark:text-white/80 drop-shadow">{subCat.name}</div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* 图例 - 优化样式 */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-4 text-xs z-30">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full shadow-lg shadow-green-500/50"></div>
                      <span className="text-gray-700 dark:text-white/90">优秀 ≥80%</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-3 h-3 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full shadow-lg shadow-orange-500/50"></div>
                      <span className="text-gray-700 dark:text-white/90">良好 60-79%</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-3 h-3 bg-gradient-to-br from-red-400 to-pink-600 rounded-full shadow-lg shadow-red-500/40"></div>
                      <span className="text-gray-700 dark:text-white/90">需改进 &lt;60%</span>
                    </div>
                  </div>
                  
                  {/* 右上角AI标识 */}
                  <div className="absolute top-3 right-3 flex items-center space-x-1 bg-blue-50/80 dark:bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full border border-blue-200 dark:border-white/20 z-30">
                    <div className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-blue-700 dark:text-cyan-300">AI Analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：学习统计 (占3列) - 纵向排布，排名在右侧 */}
          <div className="col-span-3">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/25 dark:to-teal-900/25 backdrop-blur-sm h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>学习统计</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-6 h-full flex flex-col justify-around">
                  {/* 刷题量及排名 */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-emerald-100/70 to-green-100/70 dark:from-emerald-800/40 dark:to-green-800/40 border border-emerald-200/50 dark:border-emerald-700/40">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-emerald-500/10 rounded-xl">
                        <BookOpen className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">刷题量</div>
                        <div className="text-2xl font-bold text-emerald-600">248题</div>
                      </div>
                    </div>
                    <div className="text-emerald-600 bg-emerald-50/80 dark:bg-emerald-900/30 px-3 py-2 rounded-lg">
                      <span className="text-base font-medium">全站排名127位</span>
                    </div>
                  </div>

                  {/* 正确率及排名 */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-blue-100/70 to-cyan-100/70 dark:from-blue-800/40 dark:to-cyan-800/40 border border-blue-200/50 dark:border-blue-700/40">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-xl">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">正确率</div>
                        <div className="text-2xl font-bold text-blue-600">78%</div>
                      </div>
                    </div>
                    <div className="text-blue-600 bg-blue-50/80 dark:bg-blue-900/30 px-3 py-2 rounded-lg">
                      <span className="text-base font-medium">全站排名156位</span>
                    </div>
                  </div>

                  {/* 学习时长及排名 */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-teal-100/70 to-cyan-100/70 dark:from-teal-800/40 dark:to-cyan-800/40 border border-teal-200/50 dark:border-teal-700/40">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-teal-500/10 rounded-xl">
                        <Clock className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">学习时长</div>
                        <div className="text-2xl font-bold text-teal-600">42小时</div>
                      </div>
                    </div>
                    <div className="text-teal-600 bg-teal-50/80 dark:bg-teal-900/30 px-3 py-2 rounded-lg">
                      <span className="text-base font-medium">全站排名89位</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
