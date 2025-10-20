import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { 
  Users, 
  DollarSign, 
  Brain, 
  TrendingUp, 
  TrendingDown,
  Activity,
  CreditCard,
  UserPlus,
  Eye,
  Clock,
  Calendar as CalendarIcon,
  Share2,
  Target,
  BookOpen,
  Award
} from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('business');
  
  // 日期筛选状态（用于可筛选的指标）
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2025, 9, 1),
    to: new Date(2025, 9, 14)
  });

  // 选中的指标（用于展示趋势图）
  const [selectedBusinessMetric, setSelectedBusinessMetric] = useState('totalSales');
  const [selectedAIMetric, setSelectedAIMetric] = useState('totalCalls');
  const [selectedBehaviorMetric, setSelectedBehaviorMetric] = useState('pv');

  // 用户行为分析-刷题情况筛选
  const [problemFilterType, setProblemFilterType] = useState<'organizer' | 'subject' | ''>('');
  const [problemFilterOrganizer, setProblemFilterOrganizer] = useState('all');
  const [problemFilterSubject, setProblemFilterSubject] = useState('');

  // 用户行为分析-试卷热度筛选
  const [examFilterType, setExamFilterType] = useState<'organizer' | 'subject' | 'level' | ''>('');
  const [examFilterOrganizer, setExamFilterOrganizer] = useState('all');
  const [examFilterSubject, setExamFilterSubject] = useState('');
  const [examFilterLevel, setExamFilterLevel] = useState('');

  // 核心业务指标数据 - B1.4更新
  const businessMetrics = {
    totalSales: 245680,
    totalUsers: 15678,
    newOrders: 156,
    newRegistrations: 423,
    dau: 2850,
    activeRate: 22.9
  };

  // AI使用情况数据 - B1.4更新
  const aiMetrics = {
    totalCalls: 45672,
    activeUsageCount: 28945,
    activeUsers: 3256,
    adoptionRate: 68.5,
    tokenConsumption: 2.45
  };

  // 用户行为数据 - B1.4更新
  const userBehavior = {
    pv: 89456,
    uv: 12456,
    totalProblems: 25680
  };

  // 生成近30天趋势数据
  const generateTrendData = (baseValue: number, variance: number = 0.15) => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const randomFactor = 1 + (Math.random() - 0.5) * variance;
      data.push({
        date: format(date, 'MM-dd', { locale: zhCN }),
        value: Math.round(baseValue * randomFactor * 100) / 100
      });
    }
    return data;
  };

  // 各指标30天趋势数据 - B1.4更新
  const trendData = {
    // 业务指标
    totalSales: generateTrendData(8500, 0.25),
    totalUsers: generateTrendData(522, 0.15),
    newOrders: generateTrendData(5, 0.3),
    newRegistrations: generateTrendData(14, 0.35),
    dau: generateTrendData(95, 0.2),
    activeRate: generateTrendData(22.9, 0.1),
    
    // AI指标
    totalCalls: generateTrendData(1520, 0.2),
    activeUsageCount: generateTrendData(965, 0.22),
    activeUsers: generateTrendData(108, 0.25),
    adoptionRate: generateTrendData(68.5, 0.08),
    tokenConsumption: generateTrendData(0.082, 0.18),
    
    // 行为指标
    pv: generateTrendData(2982, 0.18),
    uv: generateTrendData(415, 0.22),
    totalProblems: generateTrendData(856, 0.25)
  };

  // AI问答热点问题TOP10
  const hotQuestions = [
    { question: '如何优化Python代码性能？', count: 256 },
    { question: 'C++指针与引用的区别', count: 189 },
    { question: '数据结构选择建议', count: 167 },
    { question: '算法时间复杂度计算', count: 145 },
    { question: '面向对象编程原理', count: 132 },
    { question: 'Java集合框架使用技巧', count: 118 },
    { question: '递归与迭代的选择', count: 105 },
    { question: '排序算法应用场景', count: 98 },
    { question: '动态规划解题思路', count: 87 },
    { question: '链表操作常见错误', count: 76 }
  ];

  // 网站功能使用情况数据 - B1.4更新为柱状图数据
  const featureUsageData = [
    { name: '小链同学', value: 8230 },
    { name: '赛考刷题', value: 12450 },
    { name: '通过率预测', value: 5670 },
    { name: '个人中心-学习记录', value: 4560 },
    { name: '个人中心-会员服务', value: 3890 },
    { name: '个人中心-账号信息管理', value: 2340 },
    { name: '学习诊断', value: 4320 },
    { name: '分享报告', value: 1850 }
  ];

  // 主办方数据
  const organizers = [
    { id: 'csp', name: 'CSP' },
    { id: 'noi', name: 'NOI' },
    { id: 'icpc', name: 'ICPC' }
  ];

  // 科目数据（根据主办方）
  const subjects = {
    csp: [
      { id: 'python', name: 'Python' },
      { id: 'cpp', name: 'C++' },
      { id: 'java', name: 'Java' }
    ],
    noi: [
      { id: 'algorithm', name: '算法' },
      { id: 'datastructure', name: '数据结构' }
    ],
    icpc: [
      { id: 'competitive', name: '竞赛编程' }
    ]
  };

  // 等级数据（根据科目）
  const levels = {
    python: [
      { id: 'basic', name: '基础' },
      { id: 'intermediate', name: '进阶' },
      { id: 'advanced', name: '高级' }
    ],
    cpp: [
      { id: 'basic', name: '基础' },
      { id: 'intermediate', name: '进阶' },
      { id: 'advanced', name: '高级' }
    ],
    java: [
      { id: 'basic', name: '基础' },
      { id: 'intermediate', name: '进阶' }
    ],
    algorithm: [
      { id: 'level1', name: '一级' },
      { id: 'level2', name: '二级' }
    ],
    datastructure: [
      { id: 'level1', name: '一级' },
      { id: 'level2', name: '二级' }
    ],
    competitive: [
      { id: 'regional', name: '区域赛' },
      { id: 'national', name: '全国赛' }
    ]
  };

  // 刷题情况数据
  const getProblemStatData = () => {
    if (!problemFilterType || problemFilterOrganizer === 'all') {
      // 默认：展示所有主办方的刷题量
      return [
        { name: 'CSP', value: 8560 },
        { name: 'NOI', value: 6780 },
        { name: 'ICPC', value: 4320 }
      ];
    } else if (problemFilterType === 'organizer' && problemFilterOrganizer && !problemFilterSubject) {
      // 选择了主办方：展示该主办方下所有科目的刷题量
      const subjectData = {
        csp: [
          { name: 'Python', value: 3450 },
          { name: 'C++', value: 2980 },
          { name: 'Java', value: 2130 }
        ],
        noi: [
          { name: '算法', value: 3890 },
          { name: '数据结构', value: 2890 }
        ],
        icpc: [
          { name: '竞赛编程', value: 4320 }
        ]
      };
      return subjectData[problemFilterOrganizer as keyof typeof subjectData] || [];
    } else if (problemFilterSubject) {
      // 选择了科目：展示该科目下所有等级的刷题量
      const levelData = {
        python: [
          { name: '基础', value: 1560 },
          { name: '进阶', value: 1120 },
          { name: '高级', value: 770 }
        ],
        cpp: [
          { name: '基础', value: 1340 },
          { name: '进阶', value: 980 },
          { name: '高级', value: 660 }
        ],
        java: [
          { name: '基础', value: 1230 },
          { name: '进阶', value: 900 }
        ],
        algorithm: [
          { name: '一级', value: 2120 },
          { name: '二级', value: 1770 }
        ],
        datastructure: [
          { name: '一级', value: 1560 },
          { name: '二级', value: 1330 }
        ],
        competitive: [
          { name: '区域赛', value: 2450 },
          { name: '全国赛', value: 1870 }
        ]
      };
      return levelData[problemFilterSubject as keyof typeof levelData] || [];
    }
    return [];
  };

  // 试卷热度数据（TOP10）
  const getExamHotData = () => {
    if (!examFilterType || examFilterOrganizer === 'all') {
      // 默认：所有主办方维度下的top10被刷试卷
      return [
        { name: 'CSP-J 2024初赛', value: 1256 },
        { name: 'NOI 2024模拟题', value: 1089 },
        { name: 'ICPC区域赛精选', value: 987 },
        { name: 'CSP-S 2023真题', value: 856 },
        { name: 'Python基础100题', value: 745 },
        { name: 'C++算法进阶', value: 678 },
        { name: 'NOI 2023初赛', value: 623 },
        { name: 'ICPC训练题集', value: 567 },
        { name: 'Java核心编程', value: 498 },
        { name: 'CSP模拟测试卷', value: 456 }
      ];
    } else if (examFilterType === 'organizer' && examFilterOrganizer && !examFilterSubject) {
      // 选择了主办方：展示该主办方维度下的top10
      const organizerData = {
        csp: [
          { name: 'CSP-J 2024初赛', value: 1256 },
          { name: 'CSP-S 2023真题', value: 856 },
          { name: 'CSP模拟测试卷', value: 456 },
          { name: 'CSP-J 2023初赛', value: 398 },
          { name: 'CSP真题集锦', value: 345 },
          { name: 'CSP-S 2024模拟', value: 298 },
          { name: 'CSP基础训练', value: 256 },
          { name: 'CSP进阶练习', value: 234 },
          { name: 'CSP高级挑战', value: 198 },
          { name: 'CSP综合测试', value: 176 }
        ],
        noi: [
          { name: 'NOI 2024模拟题', value: 1089 },
          { name: 'NOI 2023初赛', value: 623 },
          { name: 'NOI算法专题', value: 456 },
          { name: 'NOI数据结构', value: 398 },
          { name: 'NOI 2024初赛', value: 356 },
          { name: 'NOI模拟赛A卷', value: 298 },
          { name: 'NOI模拟赛B卷', value: 267 },
          { name: 'NOI真题精选', value: 234 },
          { name: 'NOI省选真题', value: 198 },
          { name: 'NOI冬令营题', value: 167 }
        ],
        icpc: [
          { name: 'ICPC区域赛精选', value: 987 },
          { name: 'ICPC训练题集', value: 567 },
          { name: 'ICPC亚洲赛真题', value: 445 },
          { name: 'ICPC世界赛题', value: 389 },
          { name: 'ICPC模拟赛', value: 334 },
          { name: 'ICPC算法专题', value: 298 },
          { name: 'ICPC数据结构', value: 256 },
          { name: 'ICPC图论专题', value: 223 },
          { name: 'ICPC动态规划', value: 198 },
          { name: 'ICPC字符串算法', value: 176 }
        ]
      };
      return organizerData[examFilterOrganizer as keyof typeof organizerData] || [];
    } else if (examFilterSubject && !examFilterLevel) {
      // 选择了科目：展示该科目维度下的top10
      const subjectData = {
        python: [
          { name: 'Python基础100题', value: 745 },
          { name: 'Python进阶50题', value: 534 },
          { name: 'Python算法实战', value: 423 },
          { name: 'Python数据结构', value: 378 },
          { name: 'Python高级编程', value: 334 },
          { name: 'Python项目实战', value: 289 },
          { name: 'Python算法精讲', value: 256 },
          { name: 'Python核心技术', value: 223 },
          { name: 'Python面试题', value: 198 },
          { name: 'Python综合测试', value: 167 }
        ],
        cpp: [
          { name: 'C++算法进阶', value: 678 },
          { name: 'C++基础训练', value: 545 },
          { name: 'C++数据结构', value: 467 },
          { name: 'C++STL应用', value: 398 },
          { name: 'C++竞赛编程', value: 356 },
          { name: 'C++高级特性', value: 312 },
          { name: 'C++算法实战', value: 278 },
          { name: 'C++核心技术', value: 245 },
          { name: 'C++面试精选', value: 212 },
          { name: 'C++综合提高', value: 189 }
        ],
        java: [
          { name: 'Java核心编程', value: 498 },
          { name: 'Java基础100题', value: 423 },
          { name: 'Java算法实战', value: 378 },
          { name: 'Java集合框架', value: 334 },
          { name: 'Java面向对象', value: 298 },
          { name: 'Java多线程', value: 267 },
          { name: 'Java网络编程', value: 234 },
          { name: 'Java高级特性', value: 198 },
          { name: 'Java设计模式', value: 176 },
          { name: 'Java综合应用', value: 156 }
        ],
        algorithm: [
          { name: '算法基础训练', value: 656 },
          { name: '排序算法专题', value: 534 },
          { name: '搜索算法精讲', value: 467 },
          { name: '动态规划入门', value: 398 },
          { name: '贪心算法应用', value: 345 },
          { name: '分治算法实战', value: 298 },
          { name: '图论基础', value: 267 },
          { name: '字符串算法', value: 234 },
          { name: '数学算法', value: 198 },
          { name: '综合算法题', value: 176 }
        ],
        datastructure: [
          { name: '线性表专题', value: 587 },
          { name: '树与二叉树', value: 498 },
          { name: '图的存储与遍历', value: 445 },
          { name: '栈和队列', value: 389 },
          { name: '哈希表应用', value: 334 },
          { name: '堆的实现', value: 298 },
          { name: '并查集专题', value: 267 },
          { name: '高级数据结构', value: 223 },
          { name: '平衡树专题', value: 198 },
          { name: '综合数据结构', value: 167 }
        ],
        competitive: [
          { name: '竞赛真题集', value: 876 },
          { name: '区域赛精选', value: 745 },
          { name: '全国赛题库', value: 656 },
          { name: '模拟赛A卷', value: 567 },
          { name: '模拟赛B卷', value: 498 },
          { name: '算法竞赛进阶', value: 434 },
          { name: '竞赛技巧训练', value: 378 },
          { name: '快速解题方法', value: 334 },
          { name: '竞赛模板题', value: 289 },
          { name: '综合竞赛题', value: 256 }
        ]
      };
      return subjectData[examFilterSubject as keyof typeof subjectData] || [];
    } else if (examFilterLevel) {
      // 选择了等级：展示该等级维度下的top10
      const levelData = {
        basic: [
          { name: '基础入门100题', value: 987 },
          { name: '基础语法练习', value: 845 },
          { name: '基础算法题', value: 756 },
          { name: '基础数据结构', value: 678 },
          { name: '基础编程思维', value: 598 },
          { name: '基础综合测试', value: 523 },
          { name: '基础真题集', value: 467 },
          { name: '基础模拟卷', value: 412 },
          { name: '基础提高题', value: 378 },
          { name: '基础冲刺卷', value: 334 }
        ],
        intermediate: [
          { name: '进阶算法专题', value: 876 },
          { name: '进阶数据结构', value: 756 },
          { name: '进阶编程技巧', value: 678 },
          { name: '进阶真题精选', value: 598 },
          { name: '进阶模拟测试', value: 534 },
          { name: '进阶综合训练', value: 478 },
          { name: '进阶提高卷', value: 423 },
          { name: '进阶实战题', value: 378 },
          { name: '进阶冲刺题', value: 334 },
          { name: '进阶综合卷', value: 298 }
        ],
        advanced: [
          { name: '���级算法挑战', value: 765 },
          { name: '高级竞赛题', value: 678 },
          { name: '高级优化技巧', value: 598 },
          { name: '高级真题库', value: 534 },
          { name: '高级综合测试', value: 478 },
          { name: '高级模拟赛', value: 423 },
          { name: '高级实战卷', value: 378 },
          { name: '高级提高题', value: 334 },
          { name: '高级冲刺卷', value: 298 },
          { name: '高级精选题', value: 267 }
        ],
        level1: [
          { name: '一级基础题库', value: 856 },
          { name: '一级真题精选', value: 745 },
          { name: '一级模拟测试', value: 656 },
          { name: '一级综合训练', value: 578 },
          { name: '一级提高卷', value: 512 },
          { name: '一级冲刺题', value: 456 },
          { name: '一级实战卷', value: 398 },
          { name: '一级精选题', value: 356 },
          { name: '一级强化卷', value: 312 },
          { name: '一级综合卷', value: 278 }
        ],
        level2: [
          { name: '二级进阶题库', value: 945 },
          { name: '二级真题集', value: 834 },
          { name: '二级模拟赛', value: 734 },
          { name: '二级综合测试', value: 656 },
          { name: '二级提高题', value: 589 },
          { name: '二级冲刺卷', value: 523 },
          { name: '二级实战题', value: 467 },
          { name: '二级精选卷', value: 412 },
          { name: '二级强化题', value: 367 },
          { name: '二级综合卷', value: 323 }
        ],
        regional: [
          { name: '区域赛真题2024', value: 1098 },
          { name: '区域赛真题2023', value: 945 },
          { name: '区域赛模拟A', value: 834 },
          { name: '区域赛模拟B', value: 745 },
          { name: '区域赛模拟C', value: 656 },
          { name: '区域赛精选题', value: 589 },
          { name: '区域赛提高卷', value: 523 },
          { name: '区域赛冲刺题', value: 467 },
          { name: '区域赛强化卷', value: 412 },
          { name: '区域赛综合题', value: 367 }
        ],
        national: [
          { name: '全国赛真题2024', value: 1234 },
          { name: '全国赛真题2023', value: 1087 },
          { name: '全国赛模拟A', value: 956 },
          { name: '全国赛模拟B', value: 845 },
          { name: '全国赛模拟C', value: 756 },
          { name: '全国赛精选题', value: 678 },
          { name: '全国赛提高卷', value: 598 },
          { name: '全国赛冲刺题', value: 534 },
          { name: '全国赛强化卷', value: 478 },
          { name: '全国赛综合题', value: 423 }
        ]
      };
      return levelData[examFilterLevel as keyof typeof levelData] || [];
    }
    return [];
  };

  // 获取指标配置 - B1.4更新
  const getMetricConfig = (metric: string, type: string) => {
    const configs: any = {
      business: {
        totalSales: { title: '总销售额', prefix: '¥', suffix: '', format: (v: number) => v.toLocaleString() },
        totalUsers: { title: '总用户', prefix: '', suffix: '人', format: (v: number) => v.toLocaleString() },
        newOrders: { title: '新增订单', prefix: '', suffix: '单', format: (v: number) => v.toString() },
        newRegistrations: { title: '新增注册', prefix: '', suffix: '人', format: (v: number) => v.toString() },
        dau: { title: '日活跃量', prefix: '', suffix: '人', format: (v: number) => v.toString() },
        activeRate: { title: '日活跃度', prefix: '', suffix: '%', format: (v: number) => v.toFixed(1) }
      },
      ai: {
        totalCalls: { title: 'AI总调用次数', prefix: '', suffix: '次', format: (v: number) => v.toLocaleString() },
        activeUsageCount: { title: '主动使用AI次数', prefix: '', suffix: '次', format: (v: number) => v.toLocaleString() },
        activeUsers: { title: '主动使用AI人数', prefix: '', suffix: '人', format: (v: number) => v.toLocaleString() },
        adoptionRate: { title: '推题采纳率', prefix: '', suffix: '%', format: (v: number) => v.toFixed(1) },
        tokenConsumption: { title: 'Token消耗量', prefix: '', suffix: 'M', format: (v: number) => v.toFixed(2) }
      },
      behavior: {
        pv: { title: '访问页面数', prefix: '', suffix: '', format: (v: number) => v.toLocaleString() },
        uv: { title: '访问人数', prefix: '', suffix: '', format: (v: number) => v.toLocaleString() },
        totalProblems: { title: '总刷题量', prefix: '', suffix: '题', format: (v: number) => v.toLocaleString() }
      }
    };
    return configs[type]?.[metric] || { title: '', prefix: '', suffix: '', format: (v: number) => v.toString() };
  };

  // 渲染趋势图表
  const renderTrendChart = (metric: string, type: string) => {
    const config = getMetricConfig(metric, type);
    const data = trendData[metric as keyof typeof trendData];

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{config.title} - 近30天趋势</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value: any) => [
                  `${config.prefix}${config.format(value)}${config.suffix}`,
                  config.title
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fill={`url(#gradient-${metric})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };

  // 日期选择器组件
  const DateRangePicker = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <CalendarIcon className="w-4 h-4" />
          <span className="text-sm">
            {dateRange.from && dateRange.to
              ? `${format(dateRange.from, 'yyyy-MM-dd')} - ${format(dateRange.to, 'yyyy-MM-dd')}`
              : '选择日期范围'}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="p-4 space-y-4">
          <div>
            <p className="text-sm mb-2">开始日期</p>
            <Calendar
              mode="single"
              selected={dateRange.from}
              onSelect={(date) => setDateRange({ ...dateRange, from: date })}
            />
          </div>
          <div>
            <p className="text-sm mb-2">结束日期</p>
            <Calendar
              mode="single"
              selected={dateRange.to}
              onSelect={(date) => setDateRange({ ...dateRange, to: date })}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">数据看板</h1>
          <p className="text-muted-foreground">核心业务指标和运营数据分析</p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Activity className="w-4 h-4" />
          <span>实时刷新</span>
        </Button>
      </div>

      {/* 主要内容区域 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-lg grid-cols-3">
          <TabsTrigger value="business">核心业务指标</TabsTrigger>
          <TabsTrigger value="ai">AI使用统计</TabsTrigger>
          <TabsTrigger value="behavior">用户行为分析</TabsTrigger>
        </TabsList>

        {/* 核心业务指标 - B1.4更新 */}
        <TabsContent value="business" className="space-y-6">
          {/* 日期筛选提示 */}
          <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-900 dark:text-blue-100">
                以下所有指标支持日期筛选，并可查看近30天趋势
              </span>
            </div>
            <DateRangePicker />
          </div>

          {/* 核心业务指标卡片 - 6个可筛选的指标 */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedBusinessMetric === 'totalSales' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedBusinessMetric('totalSales')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">总销售额</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">¥{businessMetrics.totalSales.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span>较昨日 +12.5%</span>
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedBusinessMetric === 'totalUsers' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedBusinessMetric('totalUsers')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">总用户</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{businessMetrics.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span>较昨日 +2.7%</span>
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedBusinessMetric === 'newOrders' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedBusinessMetric('newOrders')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">新增订单</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{businessMetrics.newOrders}</div>
                <p className="text-xs text-muted-foreground flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span>较昨日 +8.3%</span>
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedBusinessMetric === 'newRegistrations' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedBusinessMetric('newRegistrations')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">新增注册</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{businessMetrics.newRegistrations}</div>
                <p className="text-xs text-muted-foreground flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span>较昨日 +15.2%</span>
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedBusinessMetric === 'dau' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedBusinessMetric('dau')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">日活跃量</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{businessMetrics.dau.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span>较昨日 +6.5%</span>
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedBusinessMetric === 'activeRate' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedBusinessMetric('activeRate')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">日活跃度</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{businessMetrics.activeRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  DAU/MAU比率
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 趋势图表 */}
          {renderTrendChart(selectedBusinessMetric, 'business')}
        </TabsContent>

        {/* AI使用情况统计 - B1.4更新 */}
        <TabsContent value="ai" className="space-y-6">
          {/* 日期筛选 */}
          <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-900 dark:text-blue-100">
                自定义时间区间筛选AI使用数据
              </span>
            </div>
            <DateRangePicker />
          </div>

          {/* AI调用统计 - 调整顺序并新增推题采纳率 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedAIMetric === 'totalCalls' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedAIMetric('totalCalls')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">AI总调用次数</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{aiMetrics.totalCalls.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span>较昨日 +15.2%</span>
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedAIMetric === 'activeUsageCount' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedAIMetric('activeUsageCount')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">主动使用AI次数</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{aiMetrics.activeUsageCount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span>较昨日 +12.4%</span>
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedAIMetric === 'activeUsers' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedAIMetric('activeUsers')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">主动使用AI人数</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{aiMetrics.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span>较昨日 +8.7%</span>
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedAIMetric === 'adoptionRate' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedAIMetric('adoptionRate')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">推题采纳率</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{aiMetrics.adoptionRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  AI推荐被采纳
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedAIMetric === 'tokenConsumption' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedAIMetric('tokenConsumption')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Token消耗量</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{aiMetrics.tokenConsumption}M</div>
                <p className="text-xs text-muted-foreground mt-1">
                  百万Token
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 趋势图表 */}
          {renderTrendChart(selectedAIMetric, 'ai')}

          {/* AI问答热点问题TOP10 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI问答热点问题TOP10</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {hotQuestions.map((item, index) => (
                    <div key={index} className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={index < 3 ? 'default' : 'outline'} 
                            className="w-6 h-6 rounded-full flex items-center justify-center p-0 text-xs"
                          >
                            {index + 1}
                          </Badge>
                          <span className="text-sm">{item.question}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">{item.count}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div></div>
          </div>
        </TabsContent>

        {/* 用户行为分析 - B1.4更新 */}
        <TabsContent value="behavior" className="space-y-6">
          {/* 日期筛选 */}
          <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-900 dark:text-blue-100">
                自定义时间区间筛选用户行为数据
              </span>
            </div>
            <DateRangePicker />
          </div>

          {/* 网站访问数据 - 更新为3个卡片：访问页面数、访问人数、总刷题量 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedBehaviorMetric === 'pv' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedBehaviorMetric('pv')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">访问页面数</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{userBehavior.pv.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span>较昨日 +6.8%</span>
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedBehaviorMetric === 'uv' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedBehaviorMetric('uv')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">访问人数</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{userBehavior.uv.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span>较昨日 +5.2%</span>
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedBehaviorMetric === 'totalProblems' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedBehaviorMetric('totalProblems')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">总刷题量</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{userBehavior.totalProblems.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span>较昨日 +9.3%</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 趋势图表 */}
          {renderTrendChart(selectedBehaviorMetric, 'behavior')}

          {/* 网站功能使用情况 - 更新为柱状图 */}
          <Card>
            <CardHeader>
              <CardTitle>网站功能使用情况</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={featureUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-20}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                    formatter={(value: any) => [`${value.toLocaleString()}次`, '使用次数']}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 刷题情况统计 - 新增 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>刷题情况</CardTitle>
                <div className="flex items-center space-x-2">
                  {/* 主办方筛选 */}
                  <Select 
                    value={problemFilterOrganizer} 
                    onValueChange={(value) => {
                      setProblemFilterOrganizer(value);
                      setProblemFilterSubject('');
                      setProblemFilterType(value === 'all' ? '' : 'organizer');
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="选择主办方" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部主办方</SelectItem>
                      {organizers.map(org => (
                        <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* 科目筛选 - 仅当选择了主办方时显示 */}
                  {problemFilterOrganizer && problemFilterOrganizer !== 'all' && (
                    <Select 
                      value={problemFilterSubject} 
                      onValueChange={(value) => {
                        setProblemFilterSubject(value);
                      }}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="选择科目" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">全部科目</SelectItem>
                        {subjects[problemFilterOrganizer as keyof typeof subjects]?.map(subj => (
                          <SelectItem key={subj.id} value={subj.id}>{subj.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={getProblemStatData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                    formatter={(value: any) => [`${value.toLocaleString()}题`, '刷题量']}
                  />
                  <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 试卷热度统计 - 新增 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>试卷热度 TOP10</CardTitle>
                <div className="flex items-center space-x-2">
                  {/* 主办方筛选 */}
                  <Select 
                    value={examFilterOrganizer} 
                    onValueChange={(value) => {
                      setExamFilterOrganizer(value);
                      setExamFilterSubject('');
                      setExamFilterLevel('');
                      setExamFilterType(value === 'all' ? '' : 'organizer');
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="选择主办方" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部主办方</SelectItem>
                      {organizers.map(org => (
                        <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* 科目筛选 */}
                  {examFilterOrganizer && examFilterOrganizer !== 'all' && (
                    <Select 
                      value={examFilterSubject} 
                      onValueChange={(value) => {
                        setExamFilterSubject(value);
                        setExamFilterLevel('');
                        setExamFilterType(value ? 'subject' : 'organizer');
                      }}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="选择科目" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">全部科目</SelectItem>
                        {subjects[examFilterOrganizer as keyof typeof subjects]?.map(subj => (
                          <SelectItem key={subj.id} value={subj.id}>{subj.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {/* 等级筛选 */}
                  {examFilterSubject && (
                    <Select 
                      value={examFilterLevel} 
                      onValueChange={(value) => {
                        setExamFilterLevel(value);
                        setExamFilterType(value ? 'level' : 'subject');
                      }}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="选择等级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">全部等级</SelectItem>
                        {levels[examFilterSubject as keyof typeof levels]?.map(lvl => (
                          <SelectItem key={lvl.id} value={lvl.id}>{lvl.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={getExamHotData()} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fontSize: 11 }} 
                    width={150}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                    formatter={(value: any) => [`${value.toLocaleString()}次`, '被刷次数']}
                  />
                  <Bar dataKey="value" fill="#f59e0b" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
