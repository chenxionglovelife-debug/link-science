import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { 
  Smartphone, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Download,
  Image,
  ArrowUp,
  ArrowDown,
  Trophy,
  Award,
  Search,
  QrCode
} from 'lucide-react';

export default function MiniProgramManagePage() {
  const [isAddBannerOpen, setIsAddBannerOpen] = useState(false);
  const [isUploadCompetitionOpen, setIsUploadCompetitionOpen] = useState(false);
  const [isUploadExamOpen, setIsUploadExamOpen] = useState(false);
  const [isGenerateCodeOpen, setIsGenerateCodeOpen] = useState(false);

  // 模拟Banner数据
  const [banners, setBanners] = useState([
    {
      id: 1,
      image: '/banner1.jpg',
      link: 'https://example.com',
      sort: 1,
      addTime: '2024-01-15 10:30:25',
      isVisible: true,
      bannerType: '主banner'
    },
    {
      id: 2,
      image: '/banner2.jpg',
      link: 'https://example.com',
      sort: 2,
      addTime: '2024-01-14 16:45:12',
      isVisible: true,
      bannerType: '信息查询banner'
    },
    {
      id: 3,
      image: '/banner3.jpg',
      link: 'https://example.com',
      sort: 3,
      addTime: '2024-01-13 09:20:08',
      isVisible: false,
      bannerType: '主banner'
    }
  ]);

  // 切换Banner展示状态
  const toggleBannerVisibility = (id: number) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, isVisible: !banner.isVisible } : banner
    ));
  };

  // 模拟比赛信息数据
  const competitions = [
    {
      id: 1,
      userName: '张三',
      phone: '138****5678',
      session: '2024年春季赛',
      event: 'Python编程',
      idLast4: '1234',
      group: '初中组',
      format: '线上',
      checkInTime: '2024-03-15 08:00',
      reportTime: '2024-03-15 08:30',
      reportLocation: '线上',
      competitionTime: '2024-03-15 09:00',
      competitionLocation: '腾讯会议',
      seatNumber: 'A-01',
      groupName: '初中组第1组',
      meetingId: '123-456-789',
      meetingPassword: 'abc123',
      discussionGroup: '分组1',
      dingTalkQR: 'qr_code_url',
      offlineCheckInCode: 'CHK001',
      isAttending: true,
      checkInStatus: '已检录',
      score: 95,
      advancement: '晋级'
    },
    {
      id: 2,
      userName: '李四',
      phone: '139****8765',
      session: '2024年春季赛',
      event: 'C++算法',
      idLast4: '5678',
      group: '高中组',
      format: '线下',
      checkInTime: '2024-03-15 08:00',
      reportTime: '2024-03-15 08:30',
      reportLocation: '北京市海淀区xxx',
      competitionTime: '2024-03-15 09:00',
      competitionLocation: '北京市海淀区xxx',
      seatNumber: 'B-15',
      groupName: '高中组第2组',
      meetingId: '',
      meetingPassword: '',
      discussionGroup: '',
      dingTalkQR: 'qr_code_url',
      offlineCheckInCode: 'CHK002',
      isAttending: false,
      checkInStatus: '未检录',
      score: 0,
      advancement: '待定'
    }
  ];

  // 模拟考级信息数据
  const examinations = [
    {
      id: 1,
      userName: '王五',
      phone: '135****4321',
      examLocation: '北京考场',
      idLast4: '9012',
      session: '2024年第一期',
      major: 'Python编程',
      level: '三级',
      theoryScore: '良好',
      practiceScore: '优秀',
      age: 14,
      institution: '海淀区实验中学'
    },
    {
      id: 2,
      userName: '赵六',
      phone: '136****1234',
      examLocation: '上海考场',
      idLast4: '3456',
      session: '2024年第一期',
      major: 'Scratch编程',
      level: '一级',
      theoryScore: '优秀',
      practiceScore: '良好',
      age: 10,
      institution: '浦东新区第一小学'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">小程序管理</h1>
          <p className="text-muted-foreground">管理小程序Banner、比赛信息和考级信息</p>
        </div>
      </div>

      {/* 主要内容区域 */}
      <Tabs defaultValue="banner" className="space-y-6">
        <TabsList className="grid w-full max-w-xl grid-cols-3">
          <TabsTrigger value="banner">Banner管理</TabsTrigger>
          <TabsTrigger value="competition">比赛信息发布</TabsTrigger>
          <TabsTrigger value="examination">考级信息发布</TabsTrigger>
        </TabsList>

        {/* Banner管理 */}
        <TabsContent value="banner">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="w-5 h-5" />
                    <span>Banner管理</span>
                  </CardTitle>
                  <CardDescription>
                    管理小程序首页Banner轮播图
                  </CardDescription>
                </div>
                <Dialog open={isAddBannerOpen} onOpenChange={setIsAddBannerOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>新增Banner</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>新增Banner</DialogTitle>
                      <DialogDescription>
                        添加新的Banner图片
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
                              建议尺寸: 750x300px
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Banner类型 <span className="text-red-500">*</span></Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="选择Banner类型" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="main">主banner</SelectItem>
                            <SelectItem value="info">信息查询banner</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>跳转链接（可选）</Label>
                        <Input placeholder="https://example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>排序权重</Label>
                        <Input type="number" placeholder="1" />
                        <p className="text-sm text-muted-foreground">数字越小，排序越靠前</p>
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
                      <TableHead>Banner类型</TableHead>
                      <TableHead>跳转链接</TableHead>
                      <TableHead>排序</TableHead>
                      <TableHead>添加时间</TableHead>
                      <TableHead>是否展示</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {banners.map((banner) => (
                      <TableRow key={banner.id}>
                        <TableCell>
                          <div className="w-20 h-10 bg-muted rounded flex items-center justify-center">
                            <Image className="w-6 h-6 text-muted-foreground" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {banner.bannerType}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{banner.link}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <span>{banner.sort}</span>
                            <div className="flex flex-col">
                              <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                <ArrowUp className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                <ArrowDown className="w-3 h-3" />
                              </Button>
                            </div>
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

        {/* 比赛信息发布 */}
        <TabsContent value="competition">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span>比赛信息发布</span>
                  </CardTitle>
                  <CardDescription>
                    管理参赛用户的比赛信息
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Dialog open={isGenerateCodeOpen} onOpenChange={setIsGenerateCodeOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center space-x-2">
                        <QrCode className="w-4 h-4" />
                        <span>生成检录码</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>生成检录码</DialogTitle>
                        <DialogDescription>
                          为选中的参赛者批量生成检录码
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            选择需要生成检录码的参赛者，系统将自动为每位参赛者生成唯一的检录二维码。
                          </p>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsGenerateCodeOpen(false)}>
                            取消
                          </Button>
                          <Button>批量生成</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={isUploadCompetitionOpen} onOpenChange={setIsUploadCompetitionOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center space-x-2">
                        <Upload className="w-4 h-4" />
                        <span>Excel导入</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Excel导入比赛信息</DialogTitle>
                        <DialogDescription>
                          批量导入参赛用户的比赛信息
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>下载模板</Label>
                          <Button variant="outline" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            下载Excel模板文件
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label>上传填写好的Excel文件</Label>
                          <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                            <div className="text-center">
                              <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                              <div className="mt-4">
                                <Label className="cursor-pointer text-primary hover:text-primary/80">
                                  选择Excel文件
                                  <input type="file" className="hidden" accept=".xlsx,.xls" />
                                </Label>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2">
                                支持.xlsx和.xls格式
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <h4 className="font-medium mb-2">注意事项</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• 请确保手机号格式正确</li>
                            <li>• 所有必填字段不能为空</li>
                            <li>• 时间格式：YYYY-MM-DD HH:mm</li>
                            <li>• 单次最多导入1000条记录</li>
                          </ul>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsUploadCompetitionOpen(false)}>
                            取消
                          </Button>
                          <Button>开始导入</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 筛选器 */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input placeholder="用户名" className="w-32" />
                </div>
                <Input placeholder="手机号" className="w-32" />
                <Input placeholder="赛期" className="w-32" />
                <Input placeholder="赛项" className="w-32" />
                <Input placeholder="身份证后四位" className="w-32" />
              </div>

              <Separator />

              {/* 比赛信息列表 */}
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>用户姓名</TableHead>
                      <TableHead>手机号码</TableHead>
                      <TableHead>赛期</TableHead>
                      <TableHead>身份证后四位</TableHead>
                      <TableHead>赛项</TableHead>
                      <TableHead>组别</TableHead>
                      <TableHead>比赛形式</TableHead>
                      <TableHead>检录时间</TableHead>
                      <TableHead>报到时间</TableHead>
                      <TableHead>报到地点</TableHead>
                      <TableHead>比赛时间</TableHead>
                      <TableHead>比赛地点</TableHead>
                      <TableHead>座位号</TableHead>
                      <TableHead>考场群名称</TableHead>
                      <TableHead>腾讯会议号</TableHead>
                      <TableHead>入会密码</TableHead>
                      <TableHead>分组讨论号</TableHead>
                      <TableHead>钉钉群二维码</TableHead>
                      <TableHead>线下检录码</TableHead>
                      <TableHead>是否参加</TableHead>
                      <TableHead>检录状态</TableHead>
                      <TableHead>成绩</TableHead>
                      <TableHead>晋级情况</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {competitions.map((comp) => (
                      <TableRow key={comp.id}>
                        <TableCell className="font-medium">{comp.userName}</TableCell>
                        <TableCell>{comp.phone}</TableCell>
                        <TableCell>{comp.session}</TableCell>
                        <TableCell>{comp.idLast4}</TableCell>
                        <TableCell>{comp.event}</TableCell>
                        <TableCell>{comp.group}</TableCell>
                        <TableCell>
                          <Badge variant={comp.format === '线上' ? 'default' : 'secondary'}>
                            {comp.format}
                          </Badge>
                        </TableCell>
                        <TableCell>{comp.checkInTime}</TableCell>
                        <TableCell>{comp.reportTime}</TableCell>
                        <TableCell>{comp.reportLocation}</TableCell>
                        <TableCell>{comp.competitionTime}</TableCell>
                        <TableCell>{comp.competitionLocation}</TableCell>
                        <TableCell>{comp.seatNumber}</TableCell>
                        <TableCell>{comp.groupName}</TableCell>
                        <TableCell>{comp.meetingId || '-'}</TableCell>
                        <TableCell>{comp.meetingPassword || '-'}</TableCell>
                        <TableCell>{comp.discussionGroup || '-'}</TableCell>
                        <TableCell>
                          {comp.dingTalkQR ? (
                            <Button variant="outline" size="sm">
                              <QrCode className="w-4 h-4" />
                            </Button>
                          ) : '-'}
                        </TableCell>
                        <TableCell>{comp.offlineCheckInCode}</TableCell>
                        <TableCell>
                          <Badge variant={comp.isAttending ? 'default' : 'secondary'}>
                            {comp.isAttending ? '是' : '否'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={comp.checkInStatus === '已检录' ? 'default' : 'secondary'}>
                            {comp.checkInStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{comp.score || '-'}</TableCell>
                        <TableCell>
                          {comp.advancement === '晋级' ? (
                            <Badge className="bg-green-500">晋级</Badge>
                          ) : (
                            <Badge variant="secondary">{comp.advancement}</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" variant="destructive">
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

        {/* 考级信息发布 */}
        <TabsContent value="examination">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>考级信息发布</span>
                  </CardTitle>
                  <CardDescription>
                    管理考级用户的考试信息
                  </CardDescription>
                </div>
                <Dialog open={isUploadExamOpen} onOpenChange={setIsUploadExamOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Excel导入</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Excel导入考级信息</DialogTitle>
                      <DialogDescription>
                        批量导入考级用户的考试信息
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>下载模板</Label>
                        <Button variant="outline" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          下载Excel模板文件
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label>上传填写好的Excel文件</Label>
                        <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                          <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            <div className="mt-4">
                              <Label className="cursor-pointer text-primary hover:text-primary/80">
                                选择Excel文件
                                <input type="file" className="hidden" accept=".xlsx,.xls" />
                              </Label>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              支持.xlsx和.xls格式
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">注意事项</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• 请确保手机号格式正确</li>
                          <li>• 所有必填字段不能为空</li>
                          <li>• 评价等级：优秀/良好/合格/不合格</li>
                          <li>• 单次最多导入1000条记录</li>
                        </ul>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsUploadExamOpen(false)}>
                          取消
                        </Button>
                        <Button>开始导入</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 筛选器 */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input placeholder="用户名" className="w-32" />
                </div>
                <Input placeholder="手机号" className="w-32" />
                <Input placeholder="考场名称" className="w-32" />
                <Input placeholder="身份证后四位" className="w-32" />
              </div>

              <Separator />

              {/* 考级信息列表 */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>用户姓名</TableHead>
                      <TableHead>手机号码</TableHead>
                      <TableHead>身份证后四位</TableHead>
                      <TableHead>考期</TableHead>
                      <TableHead>考试专业</TableHead>
                      <TableHead>考试级别</TableHead>
                      <TableHead>考场名称</TableHead>
                      <TableHead>理论评价</TableHead>
                      <TableHead>实操评价</TableHead>
                      <TableHead>年龄</TableHead>
                      <TableHead>所属机构</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examinations.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">{exam.userName}</TableCell>
                        <TableCell>{exam.phone}</TableCell>
                        <TableCell>{exam.idLast4}</TableCell>
                        <TableCell>{exam.session}</TableCell>
                        <TableCell>{exam.major}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{exam.level}</Badge>
                        </TableCell>
                        <TableCell>{exam.examLocation}</TableCell>
                        <TableCell>
                          <Badge className={
                            exam.theoryScore === '优秀' ? 'bg-green-500' :
                            exam.theoryScore === '良好' ? 'bg-blue-500' :
                            'bg-gray-500'
                          }>
                            {exam.theoryScore}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            exam.practiceScore === '优秀' ? 'bg-green-500' :
                            exam.practiceScore === '良好' ? 'bg-blue-500' :
                            'bg-gray-500'
                          }>
                            {exam.practiceScore}
                          </Badge>
                        </TableCell>
                        <TableCell>{exam.age}岁</TableCell>
                        <TableCell>{exam.institution}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" variant="destructive">
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
      </Tabs>
    </div>
  );
}