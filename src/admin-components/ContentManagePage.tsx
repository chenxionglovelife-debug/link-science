import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { 
  FileImage, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Upload,
  Download,
  Image,
  Video,
  FileText,
  Globe,
  Calendar,
  User,
  Tag,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface ContentItem {
  id: number;
  title: string;
  type: 'image' | 'video' | 'document' | 'announcement';
  category: string;
  url: string;
  size: number; // 字节
  format: string;
  description: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'draft' | 'archived';
  views: number;
  downloads: number;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  type: 'system' | 'maintenance' | 'feature' | 'event';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetUsers: 'all' | 'members' | 'free';
  publishDate: Date;
  expiryDate?: Date;
  author: string;
  status: 'published' | 'scheduled' | 'draft';
  views: number;
}

export default function ContentManagePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [showContentDetail, setShowContentDetail] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  // 内容资源数据
  const contentItems: ContentItem[] = [
    {
      id: 1,
      title: 'Python基础语法示意图',
      type: 'image',
      category: '教学素材',
      url: '/assets/python-syntax.png',
      size: 245760, // 240KB
      format: 'PNG',
      description: 'Python基础语法知识点总结图，包含变量、函数、循环等核心概念',
      author: '张老师',
      createdAt: new Date('2024-11-15'),
      updatedAt: new Date('2024-12-10'),
      status: 'active',
      views: 1520,
      downloads: 340
    },
    {
      id: 2,
      title: '算法复杂度分析视频教程',
      type: 'video',
      category: '视频教程',
      url: '/assets/algorithm-complexity.mp4',
      size: 52428800, // 50MB
      format: 'MP4',
      description: '详细讲解时间复杂度和空间复杂度的概念和计算方法',
      author: '李老师',
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-15'),
      status: 'active',
      views: 890,
      downloads: 156
    },
    {
      id: 3,
      title: 'CSP-J竞赛大纲文档',
      type: 'document',
      category: '竞赛资料',
      url: '/assets/csp-j-syllabus.pdf',
      size: 1048576, // 1MB
      format: 'PDF',
      description: 'CSP-J青少年计算机程序设计竞赛官方大纲和考试要求',
      author: '王老师',
      createdAt: new Date('2024-10-20'),
      updatedAt: new Date('2024-11-30'),
      status: 'active',
      views: 2340,
      downloads: 567
    },
    {
      id: 4,
      title: '平台功能更新公告',
      type: 'announcement',
      category: '系统公告',
      url: '',
      size: 0,
      format: 'HTML',
      description: '链科学平台T1.8版本新功能介绍和使用说明',
      author: '系统管理员',
      createdAt: new Date('2024-12-20'),
      updatedAt: new Date('2024-12-22'),
      status: 'active',
      views: 567,
      downloads: 0
    }
  ];

  // 公告数据
  const announcements: Announcement[] = [
    {
      id: 1,
      title: '链科学平台T1.8版本重大更新',
      content: '亲爱的用户，链科学平台T1.8版本已正式上线！本次更新包含AI助手优化、新增赛事功能、界面美化等多项改进...',
      type: 'feature',
      priority: 'high',
      targetUsers: 'all',
      publishDate: new Date('2024-12-22'),
      author: '产品团队',
      status: 'published',
      views: 3456
    },
    {
      id: 2,
      title: '系统维护通知',
      content: '为了提供更好的服务，平台将于12月25日凌晨2:00-4:00进行系统维护，期间可能影响正常使用，敬请谅解。',
      type: 'maintenance',
      priority: 'medium',
      targetUsers: 'all',
      publishDate: new Date('2024-12-23'),
      expiryDate: new Date('2024-12-26'),
      author: '技术团队',
      status: 'published',
      views: 1234
    },
    {
      id: 3,
      title: '新年编程挑战赛开始报名',
      content: '2025年新年编程挑战赛现已开放报名！丰富奖品等你来拿，快来展示你的编程技能吧！',
      type: 'event',
      priority: 'high',
      targetUsers: 'members',
      publishDate: new Date('2024-12-25'),
      expiryDate: new Date('2025-01-15'),
      author: '运营团队',
      status: 'scheduled',
      views: 0
    }
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'image':
        return <Badge className="bg-blue-500"><Image className="w-3 h-3 mr-1" />图片</Badge>;
      case 'video':
        return <Badge className="bg-purple-500"><Video className="w-3 h-3 mr-1" />视频</Badge>;
      case 'document':
        return <Badge className="bg-green-500"><FileText className="w-3 h-3 mr-1" />文档</Badge>;
      case 'announcement':
        return <Badge className="bg-amber-500"><Globe className="w-3 h-3 mr-1" />公告</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'published':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />已发布</Badge>;
      case 'draft':
        return <Badge className="bg-gray-500"><Edit className="w-3 h-3 mr-1" />草稿</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500"><Clock className="w-3 h-3 mr-1" />定时发布</Badge>;
      case 'archived':
        return <Badge variant="outline"><AlertTriangle className="w-3 h-3 mr-1" />已归档</Badge>;
      default:
        return <Badge variant="secondary">未知</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-500">紧急</Badge>;
      case 'high':
        return <Badge className="bg-orange-500">高</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">中</Badge>;
      case 'low':
        return <Badge className="bg-green-500">低</Badge>;
      default:
        return <Badge variant="secondary">普通</Badge>;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const handleViewContent = (content: ContentItem) => {
    setSelectedContent(content);
    setShowContentDetail(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-purple-50/30 dark:from-slate-900 dark:via-pink-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <FileImage className="w-6 h-6 text-white" />
                    </div>
                    <span>内容管理</span>
                  </h1>
                  <p className="text-muted-foreground mt-2">管理平台素材资源、公告通知和教学内容</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="px-3 py-1">
                    总资源: {contentItems.length}
                  </Badge>
                  <Button 
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                    onClick={() => setShowUploadDialog(true)}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    上传资源
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">图片资源</p>
                  <p className="text-2xl font-bold">{contentItems.filter(i => i.type === 'image').length}</p>
                </div>
                <Image className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">视频教程</p>
                  <p className="text-2xl font-bold">{contentItems.filter(i => i.type === 'video').length}</p>
                </div>
                <Video className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-green-600/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">文档资料</p>
                  <p className="text-2xl font-bold">{contentItems.filter(i => i.type === 'document').length}</p>
                </div>
                <FileText className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500/10 to-amber-600/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">系统公告</p>
                  <p className="text-2xl font-bold">{announcements.length}</p>
                </div>
                <Globe className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 主要内容区域 */}
        <Tabs defaultValue="resources" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="resources">资源管理</TabsTrigger>
            <TabsTrigger value="announcements">公告管理</TabsTrigger>
            <TabsTrigger value="settings">内容设置</TabsTrigger>
          </TabsList>

          {/* 资源管理 */}
          <TabsContent value="resources" className="space-y-6">
            {/* 筛选和搜索 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="搜索资源标题或描述..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="类型筛选" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部类型</SelectItem>
                      <SelectItem value="image">图片</SelectItem>
                      <SelectItem value="video">视频</SelectItem>
                      <SelectItem value="document">文档</SelectItem>
                      <SelectItem value="announcement">公告</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="分类筛选" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部分类</SelectItem>
                      <SelectItem value="教学素材">教学素材</SelectItem>
                      <SelectItem value="视频教程">视频教程</SelectItem>
                      <SelectItem value="竞赛资料">竞赛资料</SelectItem>
                      <SelectItem value="系统公告">系统公告</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* 资源列表 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-pink-500" />
                  <span>资源列表</span>
                  <Badge variant="outline">{filteredContent.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>资源信息</TableHead>
                      <TableHead>类型/格式</TableHead>
                      <TableHead>分类</TableHead>
                      <TableHead>文件大小</TableHead>
                      <TableHead>统计信息</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContent.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-xs">
                              {item.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              作者: {item.author}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {getTypeBadge(item.type)}
                            <p className="text-sm text-muted-foreground">{item.format}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{formatFileSize(item.size)}</span>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>查看: {item.views.toLocaleString()}</p>
                            <p>下载: {item.downloads.toLocaleString()}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(item.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewContent(item)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 公告管理 */}
          <TabsContent value="announcements" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-amber-500" />
                    <span>系统公告</span>
                  </CardTitle>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    发布公告
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="p-4 border rounded-lg bg-gradient-to-r from-background to-muted/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium">{announcement.title}</h4>
                          <Badge variant="outline">{announcement.type}</Badge>
                          {getPriorityBadge(announcement.priority)}
                          {getStatusBadge(announcement.status)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {announcement.content}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{announcement.author}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{announcement.publishDate.toLocaleDateString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{announcement.views.toLocaleString()} 次查看</span>
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {announcement.targetUsers === 'all' ? '全部用户' : 
                           announcement.targetUsers === 'members' ? '会员用户' : '免费用户'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 内容设置 */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>内容管理设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">文件上传设置</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="maxFileSize">最大文件大小(MB)</Label>
                        <Input id="maxFileSize" type="number" defaultValue="100" className="mt-1" />
                      </div>
                      
                      <div>
                        <Label htmlFor="allowedFormats">允许的文件格式</Label>
                        <Input 
                          id="allowedFormats" 
                          defaultValue="jpg,png,gif,mp4,pdf,doc,docx" 
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="uploadPath">上传路径</Label>
                        <Input id="uploadPath" defaultValue="/uploads/" className="mt-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">公告设置</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="maxAnnouncements">首页显示公告数量</Label>
                        <Input id="maxAnnouncements" type="number" defaultValue="3" className="mt-1" />
                      </div>
                      
                      <div>
                        <Label htmlFor="autoExpiry">公告自动过期(天)</Label>
                        <Input id="autoExpiry" type="number" defaultValue="30" className="mt-1" />
                      </div>
                      
                      <div>
                        <Label htmlFor="notificationEmail">通知邮箱</Label>
                        <Input 
                          id="notificationEmail" 
                          type="email"
                          defaultValue="admin@chainscience.com" 
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline">
                    重置设置
                  </Button>
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    保存设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 资源详情弹窗 */}
        <Dialog open={showContentDetail} onOpenChange={setShowContentDetail}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <FileImage className="w-6 h-6" />
                <span>资源详情</span>
              </DialogTitle>
            </DialogHeader>
            
            {selectedContent && (
              <div className="space-y-4">
                {/* 基本信息 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>资源标题</Label>
                    <p className="font-medium">{selectedContent.title}</p>
                  </div>
                  <div>
                    <Label>资源类型</Label>
                    <div>{getTypeBadge(selectedContent.type)}</div>
                  </div>
                  <div>
                    <Label>文件格式</Label>
                    <p>{selectedContent.format}</p>
                  </div>
                  <div>
                    <Label>文件大小</Label>
                    <p>{formatFileSize(selectedContent.size)}</p>
                  </div>
                  <div>
                    <Label>创建者</Label>
                    <p>{selectedContent.author}</p>
                  </div>
                  <div>
                    <Label>创建时间</Label>
                    <p>{selectedContent.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div>
                  <Label>资源描述</Label>
                  <p className="text-sm text-muted-foreground p-2 bg-muted/30 rounded">
                    {selectedContent.description}
                  </p>
                </div>
                
                <div>
                  <Label>访问地址</Label>
                  <p className="text-sm font-mono p-2 bg-muted/30 rounded">
                    {selectedContent.url || '暂无链接'}
                  </p>
                </div>
                
                {/* 统计信息 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-center">
                    <p className="text-2xl font-bold text-blue-600">{selectedContent.views.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">总查看次数</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded text-center">
                    <p className="text-2xl font-bold text-green-600">{selectedContent.downloads.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">总下载次数</p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    下载资源
                  </Button>
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    编辑信息
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* 上传资源弹窗 */}
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>上传新资源</DialogTitle>
              <DialogDescription>添加新的教学素材、文档或媒体资源</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="resourceTitle">资源标题</Label>
                  <Input id="resourceTitle" placeholder="输入资源标题" />
                </div>
                <div>
                  <Label htmlFor="resourceType">资源类型</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">图片</SelectItem>
                      <SelectItem value="video">视频</SelectItem>
                      <SelectItem value="document">文档</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="resourceCategory">分类</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="教学素材">教学素材</SelectItem>
                    <SelectItem value="视频教程">视频教程</SelectItem>
                    <SelectItem value="竞赛资料">竞赛资料</SelectItem>
                    <SelectItem value="参考文档">参考文档</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="resourceDescription">资源描述</Label>
                <Textarea 
                  id="resourceDescription" 
                  placeholder="详细描述资源内容和用途"
                  rows={3}
                />
              </div>
              
              <div>
                <Label>上传文件</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    拖拽文件到此处或点击选择文件
                  </p>
                  <Button variant="outline" size="sm">
                    选择文件
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    支持格式: JPG, PNG, GIF, MP4, PDF, DOC, DOCX (最大100MB)
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                  取消
                </Button>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                  <Upload className="w-4 h-4 mr-2" />
                  上传资源
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}