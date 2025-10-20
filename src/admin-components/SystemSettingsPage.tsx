import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Checkbox } from '../components/ui/checkbox';
import ProductManagePage from './ProductManagePage';
import { 
  Settings, 
  ShoppingCart,
  Image,
  Database,
  Brain,
  Plus,
  Edit,
  Trash2,
  Upload,
  Download,
  Save,
  Crown,
  Smartphone,
  Monitor,
  Building2,
  BookOpen,
  Award,
  Lightbulb,
  X,
  Search,
  Eye
} from 'lucide-react';

export default function SystemSettingsPage() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddBannerOpen, setIsAddBannerOpen] = useState(false);
  const [isAddMemberTypeOpen, setIsAddMemberTypeOpen] = useState(false);
  const [isEditMemberTypeOpen, setIsEditMemberTypeOpen] = useState(false);
  const [isDeleteMemberTypeOpen, setIsDeleteMemberTypeOpen] = useState(false);
  const [isAddOrganizerOpen, setIsAddOrganizerOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isAddLevelOpen, setIsAddLevelOpen] = useState(false);
  const [isViewLevelConfigOpen, setIsViewLevelConfigOpen] = useState(false);
  const [isImportKnowledgeOpen, setIsImportKnowledgeOpen] = useState(false);
  const [isAddKnowledgeOpen, setIsAddKnowledgeOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const [memberBlocks, setMemberBlocks] = useState([{ id: 1 }]);
  const [selectedMemberType, setSelectedMemberType] = useState('');
  const [selectedMemberTypeData, setSelectedMemberTypeData] = useState<any>(null);
  const [memberTypeName, setMemberTypeName] = useState('');
  
  // 字典管理的子标签
  const [dictTab, setDictTab] = useState('organizers');
  
  // 会员类型管理数据
  const [memberTypes, setMemberTypes] = useState([
    { id: 1, name: '个人季度会员', createTime: '2024-01-15 10:00:00' },
    { id: 2, name: '个人年度会员', createTime: '2024-01-15 10:01:00' },
    { id: 3, name: '机构季度会员', createTime: '2024-01-15 10:02:00' },
    { id: 4, name: '机构年度会员', createTime: '2024-01-15 10:03:00' },
    { id: 5, name: '比赛会员', createTime: '2024-01-15 10:04:00' }
  ]);

  // 模拟商品数据
  const [products, setProducts] = useState([
    {
      id: 1,
      order: 1,
      name: 'VIP会员30天',
      price: 99.00,
      maxDevices: 3,
      isListed: true,
      members: [
        { memberType: 'VIP基础', vipDays: 30, pagePermissions: ['home', 'practice'], dataPermissions: ['exam-level'] }
      ]
    },
    {
      id: 2,
      order: 2,
      name: 'VIP会员365天',
      price: 899.00,
      maxDevices: 5,
      isListed: true,
      members: [
        { memberType: 'VIP高级', vipDays: 365, pagePermissions: ['home', 'practice', 'contest'], dataPermissions: ['exam-level', 'contest'] }
      ]
    }
  ]);

  // 模拟Banner数据
  const [banners, setBanners] = useState([
    {
      id: 1,
      thumbnail: '/banner1.jpg',
      addTime: '2024-01-15 10:30:25',
      isVisible: true,
      position: 'PC端首页'
    },
    {
      id: 2,
      thumbnail: '/banner2.jpg',
      addTime: '2024-01-14 16:45:12',
      isVisible: true,
      position: '小程序首页'
    }
  ]);

  // 切换Banner展示状态
  const toggleBannerVisibility = (id: number) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, isVisible: !banner.isVisible } : banner
    ));
  };

  // 字典数据
  const [organizers, setOrganizers] = useState([
    { id: 1, name: 'CodeQuest', logo: '/logo1.png' },
    { id: 2, name: 'CCF', logo: '/logo2.png' },
    { id: 3, name: 'NOI', logo: '/logo3.png' }
  ]);

  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: '青少年编程等级考试', 
      organizer: 'CodeQuest'
    },
    { 
      id: 2, 
      name: 'CSP认证', 
      organizer: 'CCF'
    },
    {
      id: 3,
      name: '信息学奥赛',
      organizer: 'NOI'
    }
  ]);

  const [subjects, setSubjects] = useState([
    { 
      id: 1, 
      name: 'Python编程', 
      organizer: 'CodeQuest',
      project: '青少年编程等级考试',
      types: ['考级', '赛事']
    },
    { 
      id: 2, 
      name: 'C++编程', 
      organizer: 'CCF',
      project: 'CSP认证',
      types: ['考级']
    }
  ]);

  const [levels, setLevels] = useState([
    { 
      id: 1, 
      name: '一级', 
      organizer: 'CodeQuest',
      project: '青少年编程等级考试',
      subject: 'Python编程',
      examConfig: [
        { questionType: '单选题', score: 2 },
        { questionType: '多选题', score: 3 },
        { questionType: '判断题', score: 1 },
        { questionType: '编程题', score: 10 }
      ]
    },
    { 
      id: 2, 
      name: '二级', 
      organizer: 'CodeQuest',
      project: '青少年编程等级考试',
      subject: 'Python编程',
      examConfig: [
        { questionType: '单选题', score: 2 },
        { questionType: '编程题', score: 15 }
      ]
    }
  ]);

  const [knowledgePoints, setKnowledgePoints] = useState([
    { 
      id: 1, 
      name: '变量与数据类型', 
      organizer: 'CodeQuest',
      project: '青少年编程等级考试',
      subject: 'Python编程',
      level: '一级'
    },
    { 
      id: 2, 
      name: '控制结构', 
      organizer: 'CodeQuest',
      project: '青少年编程等级考试',
      subject: 'Python编程',
      level: '一级'
    }
  ]);

  // 会员权益数据
  const [level1Benefits, setLevel1Benefits] = useState([
    { id: 1, name: '刷题闯关', createTime: '2024-01-15 10:30:00' },
    { id: 2, name: '学习诊断', createTime: '2024-01-15 10:31:00' },
    { id: 3, name: '错题集', createTime: '2024-01-15 10:32:00' }
  ]);

  const [level2Benefits, setLevel2Benefits] = useState([
    { id: 1, parentBenefit: '刷题闯关', name: '无限制刷题', createTime: '2024-01-15 10:35:00' },
    { id: 2, parentBenefit: '刷题闯关', name: '题目解析', createTime: '2024-01-15 10:36:00' },
    { id: 3, parentBenefit: '学习诊断', name: 'AI学习报告', createTime: '2024-01-15 10:37:00' },
    { id: 4, parentBenefit: '学习诊断', name: '知识图谱', createTime: '2024-01-15 10:38:00' }
  ]);

  // 会员权益弹窗状态
  const [isAddLevel1BenefitOpen, setIsAddLevel1BenefitOpen] = useState(false);
  const [isEditLevel1BenefitOpen, setIsEditLevel1BenefitOpen] = useState(false);
  const [isDeleteLevel1BenefitOpen, setIsDeleteLevel1BenefitOpen] = useState(false);
  const [isAddLevel2BenefitOpen, setIsAddLevel2BenefitOpen] = useState(false);
  const [isEditLevel2BenefitOpen, setIsEditLevel2BenefitOpen] = useState(false);
  const [isDeleteLevel2BenefitOpen, setIsDeleteLevel2BenefitOpen] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<any>(null);
  const [benefitFormData, setBenefitFormData] = useState({ name: '', parentBenefit: '' });

  const addMemberBlock = () => {
    setMemberBlocks([...memberBlocks, { id: memberBlocks.length + 1 }]);
  };

  const removeMemberBlock = (id: number) => {
    if (memberBlocks.length > 1) {
      setMemberBlocks(memberBlocks.filter(block => block.id !== id));
    }
  };

  // 页面权限选项
  const pagePermissions = [
    { value: 'home', label: '首页' },
    { value: 'practice', label: '闯关刷题' },
    { value: 'mistakes', label: '攻克错题' },
    { value: 'diagnosis', label: '学习诊断' },
    { value: 'contest', label: '竞赛专区' },
    { value: 'profile', label: '个人中心' }
  ];

  // 数据权限选项
  const dataPermissions = [
    { value: 'exam-level', label: '考级题库' },
    { value: 'contest', label: '赛事题库' },
    { value: 'ai-assistant', label: 'AI学习助手' },
    { value: 'detailed-analysis', label: '详细解析' }
  ];

  // 题型选项
  const questionTypes = [
    { value: 'single', label: '单选题' },
    { value: 'multiple', label: '多选题' },
    { value: 'judge', label: '判断题' },
    { value: 'coding', label: '编程题' },
    { value: 'judge-reading', label: '判断题（阅读理解）' },
    { value: 'single-reading', label: '单选题（阅读理解）' },
    { value: 'single-complete', label: '单选题（完善程序）' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">系统设置</h1>
          <p className="text-muted-foreground">管理商品配置、内容资源和系统字典</p>
        </div>
      </div>

      {/* 主要内容区域 */}
      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full max-w-xl grid-cols-3">
          <TabsTrigger value="products">商品管理</TabsTrigger>
          <TabsTrigger value="content">内容管理</TabsTrigger>
          <TabsTrigger value="dictionary">字典管理</TabsTrigger>
        </TabsList>

        {/* 商品管理 */}
        <TabsContent value="products">
          <ProductManagePage />
        </TabsContent>

        {/* 商品管理(旧版已废弃) */}
        <TabsContent value="products-old">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>商品管理（会员套餐）</span>
                  </CardTitle>
                  <CardDescription>
                    管理会员套餐商品的配置和定价
                  </CardDescription>
                </div>
                <Button 
                  className="flex items-center space-x-2"
                  onClick={() => setIsAddProductOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>新增商品</span>
                </Button>
                <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                  <DialogContent className="max-w-[75vw] max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>新增商品</DialogTitle>
                      <DialogDescription>
                        创建新的会员套餐商品，一个商品可以包含多个会员组合
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      {/* 商品属性信息 */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 pb-2 border-b">
                          <ShoppingCart className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-lg">商品属性信息</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>商品名称 <span className="text-red-500">*</span></Label>
                            <Input placeholder="例如：VIP会员30天" />
                          </div>
                          <div className="space-y-2">
                            <Label>商品序号 <span className="text-red-500">*</span></Label>
                            <Input type="number" placeholder="用于排序" />
                          </div>
                          <div className="space-y-2">
                            <Label>价格（元） <span className="text-red-500">*</span></Label>
                            <Input type="number" step="0.01" placeholder="99.00" />
                          </div>
                          <div className="space-y-2">
                            <Label>同时最大在线设备数 <span className="text-red-500">*</span></Label>
                            <Input type="number" placeholder="3" />
                          </div>
                          <div className="space-y-2 flex items-end">
                            <div className="flex items-center space-x-2">
                              <Switch id="is-listed" defaultChecked />
                              <Label htmlFor="is-listed">是否上架</Label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* 会员信息 */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b">
                          <div className="flex items-center space-x-2">
                            <Crown className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold text-lg">会员信息</h3>
                            <span className="text-sm text-muted-foreground">（可添加多个会员类型组合）</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={addMemberBlock}
                            className="flex items-center space-x-1"
                          >
                            <Plus className="w-4 h-4" />
                            <span>添加会员</span>
                          </Button>
                        </div>

                        {memberBlocks.map((block, index) => (
                          <div key={block.id} className="p-4 border rounded-lg space-y-4 relative">
                            {memberBlocks.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => removeMemberBlock(block.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                            
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline">会员 #{index + 1}</Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>会员类型 <span className="text-red-500">*</span></Label>
                                <div className="flex space-x-2">
                                  <Select 
                                    value={selectedMemberType}
                                    onValueChange={(value) => {
                                      if (value === 'new') {
                                        setIsAddMemberTypeOpen(true);
                                      } else {
                                        setSelectedMemberType(value);
                                      }
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="选择或新增会员类型" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="vip-basic">VIP基础</SelectItem>
                                      <SelectItem value="vip-advanced">VIP高级</SelectItem>
                                      <SelectItem value="vip-pro">VIP专业版</SelectItem>
                                      <SelectItem value="exam">考级会员</SelectItem>
                                      <SelectItem value="contest">比赛会员</SelectItem>
                                      <Separator className="my-2" />
                                      <SelectItem value="new">
                                        <div className="flex items-center space-x-2">
                                          <Plus className="w-4 h-4" />
                                          <span>新增会员类型</span>
                                        </div>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>VIP天数 <span className="text-red-500">*</span></Label>
                                <Input type="number" placeholder="30" />
                              </div>
                            </div>

                            {/* 访问权限 */}
                            <div className="space-y-3">
                              <Label>访问权限 <span className="text-red-500">*</span></Label>
                              
                              {/* 页面权限 */}
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Label className="text-sm font-medium">页面权限</Label>
                                  <span className="text-xs text-muted-foreground">（控制该会员可访问的前台路由）</span>
                                </div>
                                <div className="grid grid-cols-3 gap-3 p-3 border rounded-lg bg-muted/30">
                                  {pagePermissions.map((permission) => (
                                    <div key={permission.value} className="flex items-center space-x-2">
                                      <Checkbox id={`page-${permission.value}-${block.id}`} />
                                      <Label 
                                        htmlFor={`page-${permission.value}-${block.id}`}
                                        className="text-sm font-normal cursor-pointer"
                                      >
                                        {permission.label}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* 数据权限 */}
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Label className="text-sm font-medium">数据权限</Label>
                                  <span className="text-xs text-muted-foreground">（控制该会员可访问的数据类型）</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 p-3 border rounded-lg bg-muted/30">
                                  {dataPermissions.map((permission) => (
                                    <div key={permission.value} className="flex items-center space-x-2">
                                      <Checkbox id={`data-${permission.value}-${block.id}`} />
                                      <Label 
                                        htmlFor={`data-${permission.value}-${block.id}`}
                                        className="text-sm font-normal cursor-pointer"
                                      >
                                        {permission.label}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end space-x-2 pt-4 border-t">
                        <Button variant="outline" onClick={() => {
                          setIsAddProductOpen(false);
                          setMemberBlocks([{ id: 1 }]);
                        }}>
                          取消
                        </Button>
                        <Button>创建商品</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 商品列表 */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>序号</TableHead>
                      <TableHead>商品名称</TableHead>
                      <TableHead>价格</TableHead>
                      <TableHead>最大设备数</TableHead>
                      <TableHead>是否上架</TableHead>
                      <TableHead>会员组合</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.order}</TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>¥{product.price}</TableCell>
                        <TableCell>{product.maxDevices}台</TableCell>
                        <TableCell>
                          <Badge variant={product.isListed ? 'default' : 'secondary'}>
                            {product.isListed ? '已上架' : '未上架'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {product.members.map((member, idx) => (
                              <Badge key={idx} variant="outline">
                                {member.memberType} ({member.vipDays}天)
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 内容管理 */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Image className="w-5 h-5" />
                    <span>内容管理（Banner管理）</span>
                  </CardTitle>
                  <CardDescription>
                    管理首页轮播图和营销横幅
                  </CardDescription>
                </div>
                <Button 
                  className="flex items-center space-x-2"
                  onClick={() => setIsAddBannerOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>新增Banner</span>
                </Button>
                <Dialog open={isAddBannerOpen} onOpenChange={setIsAddBannerOpen}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>新增Banner</DialogTitle>
                      <DialogDescription>
                        添加新的Banner图片和链接
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Banner图片</Label>
                        <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                          <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            <div className="mt-4">
                              <Label className="cursor-pointer text-primary hover:text-primary/80">
                                上传Banner图片
                                <input type="file" className="hidden" accept="image/*" />
                              </Label>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              建议尺寸: 1200x400px
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>关联链接</Label>
                        <Input placeholder="https://example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>排序权重</Label>
                        <Input type="number" placeholder="1" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="banner-visible" defaultChecked />
                        <Label htmlFor="banner-visible">是否展示</Label>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddBannerOpen(false)}>
                          取消
                        </Button>
                        <Button>创建Banner</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Banner列表 */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Banner缩略图</TableHead>
                      <TableHead>添加时间</TableHead>
                      <TableHead>是否展示</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {banners.map((banner) => (
                      <TableRow key={banner.id}>
                        <TableCell>
                          <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                            <Image className="w-6 h-6 text-muted-foreground" />
                          </div>
                        </TableCell>
                        <TableCell>{banner.addTime}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              checked={banner.isVisible}
                              onCheckedChange={() => toggleBannerVisibility(banner.id)}
                            />
                            <span className="text-sm text-muted-foreground">
                              {banner.isVisible ? '展示' : '隐藏'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 字典管理 - 使用左右分栏布局 */}
        <TabsContent value="dictionary">
          <div className="grid grid-cols-12 gap-6">
            {/* 左侧导航 */}
            <div className="col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">字典分类</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant={dictTab === 'organizers' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setDictTab('organizers')}
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    主办方管理
                  </Button>
                  <Button
                    variant={dictTab === 'projects' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setDictTab('projects')}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    项目管理
                  </Button>
                  <Button
                    variant={dictTab === 'subjects' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setDictTab('subjects')}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    科目管理
                  </Button>
                  <Button
                    variant={dictTab === 'levels' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setDictTab('levels')}
                  >
                    <Award className="w-4 h-4 mr-2" />
                    等级管理
                  </Button>
                  <Button
                    variant={dictTab === 'knowledge' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setDictTab('knowledge')}
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    知识点管理
                  </Button>
                  <Button
                    variant={dictTab === 'level1Benefits' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setDictTab('level1Benefits')}
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    一级会员权益
                  </Button>
                  <Button
                    variant={dictTab === 'level2Benefits' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setDictTab('level2Benefits')}
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    二级会员权益
                  </Button>
                  <Button
                    variant={dictTab === 'memberTypes' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setDictTab('memberTypes')}
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    会员类型管理
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* 右侧内容 */}
            <div className="col-span-9">
              {/* 主办方管理 */}
              {dictTab === 'organizers' && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Building2 className="w-5 h-5" />
                          <span>主办方管理</span>
                        </CardTitle>
                        <CardDescription>管理考试和竞赛的主办方信息</CardDescription>
                      </div>
                      <Button 
                        className="flex items-center space-x-2"
                        onClick={() => setIsAddOrganizerOpen(true)}
                      >
                        <Plus className="w-4 h-4" />
                        <span>新增主办方</span>
                      </Button>
                      <Dialog open={isAddOrganizerOpen} onOpenChange={setIsAddOrganizerOpen}>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>新增主办方</DialogTitle>
                            <DialogDescription>
                              添加新的考试或竞赛主办方
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>主办方名称 <span className="text-red-500">*</span></Label>
                              <Input placeholder="例如：CodeQuest" />
                            </div>
                            <div className="space-y-2">
                              <Label>Logo</Label>
                              <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                                <div className="text-center">
                                  <Upload className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                  <div className="mt-2">
                                    <Label className="cursor-pointer text-primary hover:text-primary/80 text-sm">
                                      上传Logo
                                      <input type="file" className="hidden" accept="image/*" />
                                    </Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setIsAddOrganizerOpen(false)}>取消</Button>
                              <Button onClick={() => setIsAddOrganizerOpen(false)}>确认添加</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>主办方名称</TableHead>
                            <TableHead>Logo</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {organizers.map((org) => (
                            <TableRow key={org.id}>
                              <TableCell className="font-medium">{org.name}</TableCell>
                              <TableCell>
                                <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                                  <Image className="w-5 h-5 text-muted-foreground" />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 项目管理 */}
              {dictTab === 'projects' && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Settings className="w-5 h-5" />
                          <span>项目管理</span>
                        </CardTitle>
                        <CardDescription>管理主办方旗下的项目信息</CardDescription>
                      </div>
                      <Button 
                        className="flex items-center space-x-2"
                        onClick={() => setIsAddProjectOpen(true)}
                      >
                        <Plus className="w-4 h-4" />
                        <span>新增项目</span>
                      </Button>
                      <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>新增项目</DialogTitle>
                            <DialogDescription>
                              添加新的考试或竞赛项目
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>所属主办方 <span className="text-red-500">*</span></Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="选择主办方" />
                                </SelectTrigger>
                                <SelectContent>
                                  {organizers.map((org) => (
                                    <SelectItem key={org.id} value={org.name}>
                                      {org.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>项目名称 <span className="text-red-500">*</span></Label>
                              <Input placeholder="例如：青少年编程等级考试" />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setIsAddProjectOpen(false)}>取消</Button>
                              <Button onClick={() => setIsAddProjectOpen(false)}>确认添加</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>项目名称</TableHead>
                            <TableHead>所属主办方</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {projects.map((project) => (
                            <TableRow key={project.id}>
                              <TableCell className="font-medium">{project.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{project.organizer}</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 科目管理 */}
              {dictTab === 'subjects' && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <BookOpen className="w-5 h-5" />
                          <span>科目管理</span>
                        </CardTitle>
                        <CardDescription>管理考试科目和竞赛科目信息</CardDescription>
                      </div>
                      <Button 
                        className="flex items-center space-x-2"
                        onClick={() => setIsAddSubjectOpen(true)}
                      >
                        <Plus className="w-4 h-4" />
                        <span>新增科目</span>
                      </Button>
                      <Dialog open={isAddSubjectOpen} onOpenChange={setIsAddSubjectOpen}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>新增科目</DialogTitle>
                            <DialogDescription>
                              添加新的考试或竞赛科目
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>科目名称 <span className="text-red-500">*</span></Label>
                              <Input placeholder="例如：Python编程" />
                            </div>
                            <div className="space-y-2">
                              <Label>所属主办方 <span className="text-red-500">*</span></Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="选择主办方" />
                                </SelectTrigger>
                                <SelectContent>
                                  {organizers.map((org) => (
                                    <SelectItem key={org.id} value={org.name}>
                                      {org.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>所属项目 <span className="text-red-500">*</span></Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="选择项目" />
                                </SelectTrigger>
                                <SelectContent>
                                  {projects.map((project) => (
                                    <SelectItem key={project.id} value={project.name}>
                                      {project.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>类型 <span className="text-red-500">*</span></Label>
                              <div className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="type-exam" />
                                  <Label htmlFor="type-exam" className="font-normal">考级</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="type-contest" />
                                  <Label htmlFor="type-contest" className="font-normal">赛事</Label>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setIsAddSubjectOpen(false)}>取消</Button>
                              <Button onClick={() => setIsAddSubjectOpen(false)}>确认添加</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>科目名称</TableHead>
                            <TableHead>所属主办方</TableHead>
                            <TableHead>所属项目</TableHead>
                            <TableHead>类型</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {subjects.map((subject) => (
                            <TableRow key={subject.id}>
                              <TableCell className="font-medium">{subject.name}</TableCell>
                              <TableCell>{subject.organizer}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{subject.project}</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  {subject.types.map((type, idx) => (
                                    <Badge key={idx} variant="outline">{type}</Badge>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 等级管理 */}
              {dictTab === 'levels' && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Award className="w-5 h-5" />
                          <span>等级管理</span>
                        </CardTitle>
                        <CardDescription>管理考试等级和组卷配���</CardDescription>
                      </div>
                      <Button 
                        className="flex items-center space-x-2"
                        onClick={() => setIsAddLevelOpen(true)}
                      >
                        <Plus className="w-4 h-4" />
                        <span>新增等级</span>
                      </Button>
                      <Dialog open={isAddLevelOpen} onOpenChange={setIsAddLevelOpen}>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>新增等级</DialogTitle>
                            <DialogDescription>
                              添加新的考试等级并配置组卷规则
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>等级名称 <span className="text-red-500">*</span></Label>
                                <Input placeholder="例如：一级" />
                              </div>
                              <div className="space-y-2">
                                <Label>所属主办方 <span className="text-red-500">*</span></Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="选择主办方" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {organizers.map((org) => (
                                      <SelectItem key={org.id} value={org.name}>
                                        {org.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2 col-span-2">
                                <Label>所属科目 <span className="text-red-500">*</span></Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="选择科目" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {subjects.map((subject) => (
                                      <SelectItem key={subject.id} value={subject.name}>
                                        {subject.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-3">
                              <Label>组卷配置（题型及对应赋分） <span className="text-red-500">*</span></Label>
                              <div className="space-y-2">
                                {questionTypes.map((qType) => (
                                  <div key={qType.value} className="flex items-center space-x-4 p-2 border rounded">
                                    <Checkbox id={`qtype-${qType.value}`} />
                                    <Label htmlFor={`qtype-${qType.value}`} className="flex-1 font-normal">
                                      {qType.label}
                                    </Label>
                                    <div className="flex items-center space-x-2">
                                      <Label className="text-sm text-muted-foreground">分值：</Label>
                                      <Input 
                                        type="number" 
                                        className="w-20" 
                                        placeholder="0"
                                        min="0"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setIsAddLevelOpen(false)}>取消</Button>
                              <Button onClick={() => setIsAddLevelOpen(false)}>确认添加</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>等级名称</TableHead>
                            <TableHead>所属主办方</TableHead>
                            <TableHead>所属科目</TableHead>
                            <TableHead>组卷配置</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {levels.map((level) => (
                            <TableRow key={level.id}>
                              <TableCell className="font-medium">{level.name}</TableCell>
                              <TableCell>{level.organizer}</TableCell>
                              <TableCell>{level.subject}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedLevel(level);
                                    setIsViewLevelConfigOpen(true);
                                  }}
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  查看配置
                                </Button>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 查看等级配置弹窗 */}
              <Dialog open={isViewLevelConfigOpen} onOpenChange={setIsViewLevelConfigOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>组卷配置详情</DialogTitle>
                    <DialogDescription>
                      {selectedLevel && `${selectedLevel.organizer} - ${selectedLevel.subject} - ${selectedLevel.name}`}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    {selectedLevel?.examConfig.map((config: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-2 border rounded">
                        <span>{config.questionType}</span>
                        <Badge>{config.score}分</Badge>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              {/* 知识点管理 */}
              {dictTab === 'knowledge' && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Lightbulb className="w-5 h-5" />
                          <span>知识点管理</span>
                        </CardTitle>
                        <CardDescription>管理各科目的知识点信息</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          className="flex items-center space-x-2"
                          onClick={() => setIsImportKnowledgeOpen(true)}
                        >
                          <Upload className="w-4 h-4" />
                          <span>Excel批量导入</span>
                        </Button>
                        <Dialog open={isImportKnowledgeOpen} onOpenChange={setIsImportKnowledgeOpen}>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>批量导入知识点</DialogTitle>
                              <DialogDescription>
                                使用Excel模板批量导入知识点数据
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>下载模板</Label>
                                <Button variant="outline" className="w-full">
                                  <Download className="w-4 h-4 mr-2" />
                                  下载Excel导入模板
                                </Button>
                              </div>
                              <Separator />
                              <div className="space-y-2">
                                <Label>上传Excel文件</Label>
                                <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                                  <div className="text-center">
                                    <Upload className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                    <div className="mt-2">
                                      <Label className="cursor-pointer text-primary hover:text-primary/80 text-sm">
                                        选择Excel文件
                                        <input type="file" className="hidden" accept=".xlsx,.xls" />
                                      </Label>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      支持.xlsx, .xls格式
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setIsImportKnowledgeOpen(false)}>取消</Button>
                                <Button onClick={() => setIsImportKnowledgeOpen(false)}>开始导入</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          className="flex items-center space-x-2"
                          onClick={() => setIsAddKnowledgeOpen(true)}
                        >
                          <Plus className="w-4 h-4" />
                          <span>新增知识点</span>
                        </Button>
                        <Dialog open={isAddKnowledgeOpen} onOpenChange={setIsAddKnowledgeOpen}>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>新增知识点</DialogTitle>
                              <DialogDescription>
                                添加新的知识点到题库
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>知识点名称 <span className="text-red-500">*</span></Label>
                                <Input placeholder="例如：变量与数据类型" />
                              </div>
                              <div className="space-y-2">
                                <Label>所属主办方 <span className="text-red-500">*</span></Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="选择主办方" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {organizers.map((org) => (
                                      <SelectItem key={org.id} value={org.name}>
                                        {org.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>所属科目 <span className="text-red-500">*</span></Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="选择科目" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {subjects.map((subject) => (
                                      <SelectItem key={subject.id} value={subject.name}>
                                        {subject.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>所属等级 <span className="text-red-500">*</span></Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="选择等级" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {levels.map((level) => (
                                      <SelectItem key={level.id} value={level.name}>
                                        {level.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">取消</Button>
                                <Button>确认添加</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* 搜索筛选 */}
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 flex items-center space-x-2">
                          <Search className="w-4 h-4 text-muted-foreground" />
                          <Input placeholder="搜索知识点名称..." className="max-w-sm" />
                        </div>
                        <Select>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="主办方" />
                          </SelectTrigger>
                          <SelectContent>
                            {organizers.map((org) => (
                              <SelectItem key={org.id} value={org.name}>
                                {org.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="科目" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject.id} value={subject.name}>
                                {subject.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>知识点名称</TableHead>
                              <TableHead>所属主办方</TableHead>
                              <TableHead>所属科目</TableHead>
                              <TableHead>所属等级</TableHead>
                              <TableHead>操作</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {knowledgePoints.map((point) => (
                              <TableRow key={point.id}>
                                <TableCell className="font-medium">{point.name}</TableCell>
                                <TableCell>{point.organizer}</TableCell>
                                <TableCell>{point.subject}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{point.level}</Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <Button variant="outline" size="sm">
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-destructive">
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 一级会员权益管理 */}
              {dictTab === 'level1Benefits' && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Crown className="w-5 h-5" />
                          <span>一级会员权益管理</span>
                        </CardTitle>
                        <CardDescription>管理一级会员权益名称</CardDescription>
                      </div>
                      <Button 
                        className="flex items-center space-x-2"
                        onClick={() => {
                          setBenefitFormData({ name: '', parentBenefit: '' });
                          setIsAddLevel1BenefitOpen(true);
                        }}
                      >
                        <Plus className="w-4 h-4" />
                        <span>新增</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>一级权益名称</TableHead>
                            <TableHead>创建时间</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {level1Benefits.map((benefit) => (
                            <TableRow key={benefit.id}>
                              <TableCell className="font-medium">{benefit.name}</TableCell>
                              <TableCell className="text-muted-foreground">{benefit.createTime}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      setSelectedBenefit(benefit);
                                      setBenefitFormData({ name: benefit.name, parentBenefit: '' });
                                      setIsEditLevel1BenefitOpen(true);
                                    }}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-destructive"
                                    onClick={() => {
                                      setSelectedBenefit(benefit);
                                      setIsDeleteLevel1BenefitOpen(true);
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 二级会员权益管理 */}
              {dictTab === 'level2Benefits' && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Crown className="w-5 h-5" />
                          <span>二级会员权益管理</span>
                        </CardTitle>
                        <CardDescription>管理二级会员权益名称</CardDescription>
                      </div>
                      <Button 
                        className="flex items-center space-x-2"
                        onClick={() => {
                          setBenefitFormData({ name: '', parentBenefit: '' });
                          setIsAddLevel2BenefitOpen(true);
                        }}
                      >
                        <Plus className="w-4 h-4" />
                        <span>新增</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>所属一级权益</TableHead>
                            <TableHead>二级权益名称</TableHead>
                            <TableHead>创建时间</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {level2Benefits.map((benefit) => (
                            <TableRow key={benefit.id}>
                              <TableCell>
                                <Badge variant="outline">{benefit.parentBenefit}</Badge>
                              </TableCell>
                              <TableCell className="font-medium">{benefit.name}</TableCell>
                              <TableCell className="text-muted-foreground">{benefit.createTime}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      setSelectedBenefit(benefit);
                                      setBenefitFormData({ name: benefit.name, parentBenefit: benefit.parentBenefit });
                                      setIsEditLevel2BenefitOpen(true);
                                    }}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-destructive"
                                    onClick={() => {
                                      setSelectedBenefit(benefit);
                                      setIsDeleteLevel2BenefitOpen(true);
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* 会员类型管理 */}
              {dictTab === 'memberTypes' && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Crown className="w-5 h-5" />
                          <span>会员类型管理</span>
                        </CardTitle>
                        <CardDescription>管理可用于商品配置的会员类型</CardDescription>
                      </div>
                      <Button 
                        className="flex items-center space-x-2"
                        onClick={() => {
                          setMemberTypeName('');
                          setIsAddMemberTypeOpen(true);
                        }}
                      >
                        <Plus className="w-4 h-4" />
                        <span>新增会员类型</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>会员类型名称</TableHead>
                            <TableHead>创建时间</TableHead>
                            <TableHead>操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {memberTypes.map((type) => (
                            <TableRow key={type.id}>
                              <TableCell className="font-medium">{type.name}</TableCell>
                              <TableCell>{type.createTime}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      setSelectedMemberTypeData(type);
                                      setMemberTypeName(type.name);
                                      setIsEditMemberTypeOpen(true);
                                    }}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-destructive"
                                    onClick={() => {
                                      setSelectedMemberTypeData(type);
                                      setIsDeleteMemberTypeOpen(true);
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* 会员类型管理弹窗 */}
          <Dialog open={isAddMemberTypeOpen} onOpenChange={setIsAddMemberTypeOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新增会员类型</DialogTitle>
                <DialogDescription>
                  创建新的会员类型用于商品配置
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>会员类型名称 <span className="text-red-500">*</span></Label>
                  <Input 
                    placeholder="例如：VIP旗舰版" 
                    value={memberTypeName}
                    onChange={(e) => setMemberTypeName(e.target.value)}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddMemberTypeOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={() => {
                    setMemberTypes([...memberTypes, {
                      id: memberTypes.length + 1,
                      name: memberTypeName,
                      createTime: new Date().toLocaleString('zh-CN')
                    }]);
                    setIsAddMemberTypeOpen(false);
                    setMemberTypeName('');
                  }}>
                    确认添加
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditMemberTypeOpen} onOpenChange={setIsEditMemberTypeOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>编辑会员类型</DialogTitle>
                <DialogDescription>
                  修改会员类型名称
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>会员类型名称 <span className="text-red-500">*</span></Label>
                  <Input 
                    placeholder="例如：VIP旗舰版" 
                    value={memberTypeName}
                    onChange={(e) => setMemberTypeName(e.target.value)}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditMemberTypeOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={() => {
                    setMemberTypes(memberTypes.map(t => 
                      t.id === selectedMemberTypeData?.id ? { ...t, name: memberTypeName } : t
                    ));
                    setIsEditMemberTypeOpen(false);
                  }}>
                    确认修改
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isDeleteMemberTypeOpen} onOpenChange={setIsDeleteMemberTypeOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>确认删除</DialogTitle>
                <DialogDescription>
                  确定要删除会员类型 "{selectedMemberTypeData?.name}" 吗？此操作不可撤销。
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDeleteMemberTypeOpen(false)}>
                  取消
                </Button>
                <Button variant="destructive" onClick={() => {
                  setMemberTypes(memberTypes.filter(t => t.id !== selectedMemberTypeData?.id));
                  setIsDeleteMemberTypeOpen(false);
                }}>
                  确认删除
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* 一级会员权益弹窗 */}
          <Dialog open={isAddLevel1BenefitOpen} onOpenChange={setIsAddLevel1BenefitOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新增一级会员权益</DialogTitle>
                <DialogDescription>
                  添加新的一级会员权益名称
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>一级会员权益名称 <span className="text-red-500">*</span></Label>
                  <Input 
                    placeholder="例如：刷题闯关" 
                    value={benefitFormData.name}
                    onChange={(e) => setBenefitFormData({ ...benefitFormData, name: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddLevel1BenefitOpen(false)}>取消</Button>
                  <Button onClick={() => {
                    setLevel1Benefits([...level1Benefits, {
                      id: level1Benefits.length + 1,
                      name: benefitFormData.name,
                      createTime: new Date().toLocaleString('zh-CN')
                    }]);
                    setIsAddLevel1BenefitOpen(false);
                    setBenefitFormData({ name: '', parentBenefit: '' });
                  }}>确认添加</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditLevel1BenefitOpen} onOpenChange={setIsEditLevel1BenefitOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>编辑一级会员权益</DialogTitle>
                <DialogDescription>
                  修改一级会员权益名称
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>一级会员权益名称 <span className="text-red-500">*</span></Label>
                  <Input 
                    placeholder="例如：刷题闯关" 
                    value={benefitFormData.name}
                    onChange={(e) => setBenefitFormData({ ...benefitFormData, name: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditLevel1BenefitOpen(false)}>取消</Button>
                  <Button onClick={() => {
                    setLevel1Benefits(level1Benefits.map(b => 
                      b.id === selectedBenefit?.id ? { ...b, name: benefitFormData.name } : b
                    ));
                    setIsEditLevel1BenefitOpen(false);
                  }}>确认修改</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isDeleteLevel1BenefitOpen} onOpenChange={setIsDeleteLevel1BenefitOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>确认删除</DialogTitle>
                <DialogDescription>
                  确定要删除一级会员权益 "{selectedBenefit?.name}" 吗？此操作不可撤销。
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDeleteLevel1BenefitOpen(false)}>取消</Button>
                <Button variant="destructive" onClick={() => {
                  setLevel1Benefits(level1Benefits.filter(b => b.id !== selectedBenefit?.id));
                  setIsDeleteLevel1BenefitOpen(false);
                }}>确认删除</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* 二级会员权益弹窗 */}
          <Dialog open={isAddLevel2BenefitOpen} onOpenChange={setIsAddLevel2BenefitOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新增二级会员权益</DialogTitle>
                <DialogDescription>
                  添加新的二级会员权益名称
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>所属一级权益 <span className="text-red-500">*</span></Label>
                  <Select 
                    value={benefitFormData.parentBenefit}
                    onValueChange={(value) => setBenefitFormData({ ...benefitFormData, parentBenefit: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择所属一级权益" />
                    </SelectTrigger>
                    <SelectContent>
                      {level1Benefits.map((benefit) => (
                        <SelectItem key={benefit.id} value={benefit.name}>
                          {benefit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>二级会员权益名称 <span className="text-red-500">*</span></Label>
                  <Input 
                    placeholder="例如：无限制刷题" 
                    value={benefitFormData.name}
                    onChange={(e) => setBenefitFormData({ ...benefitFormData, name: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddLevel2BenefitOpen(false)}>取消</Button>
                  <Button onClick={() => {
                    setLevel2Benefits([...level2Benefits, {
                      id: level2Benefits.length + 1,
                      parentBenefit: benefitFormData.parentBenefit,
                      name: benefitFormData.name,
                      createTime: new Date().toLocaleString('zh-CN')
                    }]);
                    setIsAddLevel2BenefitOpen(false);
                    setBenefitFormData({ name: '', parentBenefit: '' });
                  }}>确认添加</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditLevel2BenefitOpen} onOpenChange={setIsEditLevel2BenefitOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>编辑二级会员权益</DialogTitle>
                <DialogDescription>
                  修改二级会员权益信息
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>所属一级权益 <span className="text-red-500">*</span></Label>
                  <Select 
                    value={benefitFormData.parentBenefit}
                    onValueChange={(value) => setBenefitFormData({ ...benefitFormData, parentBenefit: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择所属一级权益" />
                    </SelectTrigger>
                    <SelectContent>
                      {level1Benefits.map((benefit) => (
                        <SelectItem key={benefit.id} value={benefit.name}>
                          {benefit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>二级会员权益名称 <span className="text-red-500">*</span></Label>
                  <Input 
                    placeholder="例如：无限制刷题" 
                    value={benefitFormData.name}
                    onChange={(e) => setBenefitFormData({ ...benefitFormData, name: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditLevel2BenefitOpen(false)}>取消</Button>
                  <Button onClick={() => {
                    setLevel2Benefits(level2Benefits.map(b => 
                      b.id === selectedBenefit?.id 
                        ? { ...b, name: benefitFormData.name, parentBenefit: benefitFormData.parentBenefit } 
                        : b
                    ));
                    setIsEditLevel2BenefitOpen(false);
                  }}>确认修改</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isDeleteLevel2BenefitOpen} onOpenChange={setIsDeleteLevel2BenefitOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>确认删除</DialogTitle>
                <DialogDescription>
                  确定要删除二级会员权益 "{selectedBenefit?.name}" 吗？此操作不可撤销。
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDeleteLevel2BenefitOpen(false)}>取消</Button>
                <Button variant="destructive" onClick={() => {
                  setLevel2Benefits(level2Benefits.filter(b => b.id !== selectedBenefit?.id));
                  setIsDeleteLevel2BenefitOpen(false);
                }}>确认删除</Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}
