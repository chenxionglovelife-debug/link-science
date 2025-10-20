import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Switch } from '../components/ui/switch';
import { 
  Users, 
  Search, 
  Plus, 
  Crown,
  Eye,
  DollarSign,
  Share2,
  Brain,
  Upload,
  Download,
  Calendar as CalendarIcon,
  TrendingUp,
  UserPlus,
  Activity,
  Lock,
  ShoppingBag,
  X,
  Edit2,
  Building2,
  Award,
  LogIn
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { format } from 'date-fns';
import DateRangeFilter from './DateRangeFilter';
import { usePagination } from '../components/ui/usePagination';
import { DataPagination } from '../components/ui/data-pagination';

interface UserManagePageProps {
  searchPhone?: string;
}

export default function UserManagePage({ searchPhone }: UserManagePageProps = {}) {
  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [isBatchMemberOpen, setIsBatchMemberOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editingTag, setEditingTag] = useState<{ userId: number; tagIndex: number } | null>(null);
  const [newTagValue, setNewTagValue] = useState('');
  const [phoneFilter, setPhoneFilter] = useState(searchPhone || '');

  // 监听searchPhone变化
  useEffect(() => {
    if (searchPhone) {
      setPhoneFilter(searchPhone);
    }
  }, [searchPhone]);

  // 模拟用户数据
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'coder2024',
      phone: '138****5678',
      registerTime: '2024-01-15',
      lastLogin: '2024-01-20 14:30:25',
      memberType: '个人年度会员',
      memberStartDate: '2024/01/15',
      memberEndDate: '2025/01/15',
      region: '北京',
      organization: '北京实验中学',
      tags: ['活跃用户', 'VIP'],
      isEnabled: true,
      // 行为数据
      purchaseCount: 3,
      totalAICalls: 245
    },
    {
      id: 2,
      username: 'student123',
      phone: '139****8765',
      registerTime: '2024-01-10',
      lastLogin: '2024-01-19 16:45:12',
      memberType: '比赛会员',
      memberStartDate: '2024/06/15',
      memberEndDate: '2025/06/15',
      region: '上海',
      organization: '上海外国语学校',
      tags: [],
      isEnabled: true,
      purchaseCount: 0,
      totalAICalls: 89
    },
    {
      id: 3,
      username: 'programmer_pro',
      phone: '135****4321',
      registerTime: '2023-12-20',
      lastLogin: '2024-01-18 09:20:08',
      memberType: '个人季度会员',
      memberStartDate: '2024/01/01',
      memberEndDate: '2024/04/01',
      region: '广州',
      organization: '深圳编程培训中心',
      tags: ['高级用户', '讲师'],
      isEnabled: false,
      purchaseCount: 8,
      totalAICalls: 1024
    }
  ]);

  const getMemberTypeBadge = (type: string, startDate: string, endDate: string) => {
    let bgColor = 'bg-yellow-500 hover:bg-yellow-600';
    
    if (type === '考级会员') {
      bgColor = 'bg-blue-500 hover:bg-blue-600';
    } else if (type === '比赛会员') {
      bgColor = 'bg-purple-500 hover:bg-purple-600';
    } else if (type === '机构会员') {
      bgColor = 'bg-green-500 hover:bg-green-600';
    } else if (type.includes('个人季度会员')) {
      bgColor = 'bg-orange-500 hover:bg-orange-600';
    } else if (type.includes('个人年度会员')) {
      bgColor = 'bg-indigo-500 hover:bg-indigo-600';
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge className={`${bgColor} cursor-help`}>
              {type}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">会员有效期</p>
            <p className="font-medium">{startDate} - {endDate}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isEnabled: !user.isEnabled } : user
    ));
  };

  const handleAddTag = (userId: number) => {
    const newTag = prompt('输入新标签：');
    if (newTag && newTag.trim()) {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, tags: [...user.tags, newTag.trim()] } : user
      ));
    }
  };

  const handleEditTag = (userId: number, tagIndex: number, currentValue: string) => {
    setEditingTag({ userId, tagIndex });
    setNewTagValue(currentValue);
  };

  const handleSaveTag = () => {
    if (editingTag && newTagValue.trim()) {
      setUsers(users.map(user => {
        if (user.id === editingTag.userId) {
          const newTags = [...user.tags];
          newTags[editingTag.tagIndex] = newTagValue.trim();
          return { ...user, tags: newTags };
        }
        return user;
      }));
      setEditingTag(null);
      setNewTagValue('');
    }
  };

  const handleDeleteTag = (userId: number, tagIndex: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, tags: user.tags.filter((_, i) => i !== tagIndex) } : user
    ));
  };

  // 用户列表分页
  const {
    currentPage,
    pageSize,
    totalPages,
    currentData: paginatedUsers,
    totalItems,
    handlePageChange,
    handlePageSizeChange
  } = usePagination(users, 10);

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">用户管理</h1>
          <p className="text-muted-foreground">管理用户信息、会员状态和行为数据</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>导出列表</span>
          </Button>
          <Dialog open={isBatchMemberOpen} onOpenChange={setIsBatchMemberOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>批量赠会员</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>表格导入批量赠会员</DialogTitle>
                <DialogDescription>
                  通过Excel表格批量为用户开通会员
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
                          选择Excel文���
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
                  <h4 className="mb-2">注意事项</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 请确保手机号格式正确</li>
                    <li>• 会员类型支持：考级会员、比赛会员、机构会员</li>
                    <li>• 会员天数必须为正整数</li>
                    <li>• 单次最多导入1000条记录</li>
                  </ul>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsBatchMemberOpen(false)}>
                    取消
                  </Button>
                  <Button>开始导入</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 时间筛选器 */}
      <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-blue-900 dark:text-blue-100">
            筛选统计数据的时间范围，支持快捷选择和自定义范围
          </span>
        </div>
        <DateRangeFilter 
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          label="筛选时间范围"
        />
      </div>

      {/* 用户统计概览 - B1.5更新：9个统计指标 */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 gap-4">
        {/* 1. 总用户数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">总用户数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">12,456</div>
            <p className="text-xs text-muted-foreground">
              较上期 +15.2%
            </p>
          </CardContent>
        </Card>

        {/* 2. 访问人数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">访问人数</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">8,932</div>
            <p className="text-xs text-muted-foreground">
              网站访客
            </p>
          </CardContent>
        </Card>

        {/* 3. 登录人数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">登录人数</CardTitle>
            <LogIn className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">6,234</div>
            <p className="text-xs text-muted-foreground">
              已登录用户
            </p>
          </CardContent>
        </Card>

        {/* 4. 日活跃量 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">日活跃量</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">5,678</div>
            <p className="text-xs text-muted-foreground">
              7日内活跃
            </p>
          </CardContent>
        </Card>

        {/* 5. 新增注册 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">新增注册</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">245</div>
            <p className="text-xs text-muted-foreground">
              新用户
            </p>
          </CardContent>
        </Card>

        {/* 6. 新增季度会员 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">新增季度会员</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">89</div>
            <p className="text-xs text-muted-foreground">
              3个月会员
            </p>
          </CardContent>
        </Card>

        {/* 7. 新增年度会员 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">新增年度会员</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">156</div>
            <p className="text-xs text-muted-foreground">
              12个月会员
            </p>
          </CardContent>
        </Card>

        {/* 8. 新增比赛会员 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">新增比赛会员</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">67</div>
            <p className="text-xs text-muted-foreground">
              竞赛会员
            </p>
          </CardContent>
        </Card>

        {/* 9. 新增机构会员 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">新增机构会员</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">34</div>
            <p className="text-xs text-muted-foreground">
              机构账号
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 用户信息管理 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>用户信息管理</span>
          </CardTitle>
          <CardDescription>
            管理用户基本信息、会员状态和行为数据
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 筛选器 */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="手机号" 
                className="w-32"
                value={phoneFilter}
                onChange={(e) => setPhoneFilter(e.target.value)}
              />
            </div>
            <Input placeholder="用户名" className="w-32" />
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="会员类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="exam">考级会员</SelectItem>
                <SelectItem value="contest">比赛会员</SelectItem>
                <SelectItem value="org">机构会员</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>注册时间</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedStartDate}
                  onSelect={setSelectedStartDate}
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>最近登录</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedEndDate}
                  onSelect={setSelectedEndDate}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Separator />

          {/* 用户列表 */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>用户名</TableHead>
                  <TableHead>手机号</TableHead>
                  <TableHead>注册时间</TableHead>
                  <TableHead>会员类型</TableHead>
                  <TableHead>所属机构</TableHead>
                  <TableHead>所属地区</TableHead>
                  <TableHead>行为数据</TableHead>
                  <TableHead>备注</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span>{user.username}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.registerTime}</TableCell>
                    <TableCell>
                      {getMemberTypeBadge(user.memberType, user.memberStartDate, user.memberEndDate)}
                    </TableCell>
                    <TableCell>{user.organization}</TableCell>
                    <TableCell>{user.region}</TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div>采购: {user.purchaseCount}次</div>
                        <div>AI调用: {user.totalAICalls}次</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {user.tags.map((tag, index) => (
                          <div key={index}>
                            {editingTag?.userId === user.id && editingTag?.tagIndex === index ? (
                              <div className="flex items-center space-x-1">
                                <Input 
                                  value={newTagValue}
                                  onChange={(e) => setNewTagValue(e.target.value)}
                                  className="h-6 w-20 text-xs"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveTag();
                                    if (e.key === 'Escape') setEditingTag(null);
                                  }}
                                  autoFocus
                                />
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 w-6 p-0"
                                  onClick={handleSaveTag}
                                >
                                  ✓
                                </Button>
                              </div>
                            ) : (
                              <Badge 
                                variant="secondary" 
                                className="cursor-pointer group relative"
                                onClick={() => handleEditTag(user.id, index, tag)}
                              >
                                <span>{tag}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-4 w-4 p-0 ml-1 opacity-0 group-hover:opacity-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteTag(user.id, index);
                                  }}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </Badge>
                            )}
                          </div>
                        ))}
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-6 px-2"
                          onClick={() => handleAddTag(user.id)}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          添加
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={user.isEnabled}
                        onCheckedChange={() => toggleUserStatus(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" title="修改会员有效期">
                              <Crown className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>修改会员有效期</DialogTitle>
                              <DialogDescription>
                                为用户 {user.username} 调整会员有效期
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>会员类型</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="选择会员类型" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="exam">考级会员</SelectItem>
                                    <SelectItem value="contest">比赛会员</SelectItem>
                                    <SelectItem value="org">机构会员</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>开始日期</Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button variant="outline" className="w-full justify-start">
                                        <CalendarIcon className="w-4 h-4 mr-2" />
                                        {selectedStartDate ? format(selectedStartDate, 'yyyy-MM-dd') : '选择开始日期'}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={selectedStartDate}
                                        onSelect={setSelectedStartDate}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                                <div className="space-y-2">
                                  <Label>结束日期</Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button variant="outline" className="w-full justify-start">
                                        <CalendarIcon className="w-4 h-4 mr-2" />
                                        {selectedEndDate ? format(selectedEndDate, 'yyyy-MM-dd') : '选择结束日期'}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={selectedEndDate}
                                        onSelect={setSelectedEndDate}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">取消</Button>
                                <Button>确认修改</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" title="重置密码">
                              <Lock className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>重置密码</DialogTitle>
                              <DialogDescription>
                                为用户 {user.username} 重置登录密码
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>新密码</Label>
                                <Input type="password" placeholder="输入新密码" />
                              </div>
                              <div className="space-y-2">
                                <Label>确认密码</Label>
                                <Input type="password" placeholder="再次输入新密码" />
                              </div>
                              <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">
                                  • 密码长度至少8个字符<br/>
                                  • 建议包含字母、数字和特殊字符<br/>
                                  • 重置后将通知用户
                                </p>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">取消</Button>
                                <Button>确认重置</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" title="关联历史订单">
                              <ShoppingBag className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>关联历史订单</DialogTitle>
                              <DialogDescription>
                                用户 {user.username} 的历史订单记录
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="rounded-md border">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>订单号</TableHead>
                                      <TableHead>商品名称</TableHead>
                                      <TableHead>订单金额</TableHead>
                                      <TableHead>下单时间</TableHead>
                                      <TableHead>订单状态</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>ORD20240115001</TableCell>
                                      <TableCell>考级会员30天</TableCell>
                                      <TableCell>¥99.00</TableCell>
                                      <TableCell>2024-01-15 10:30:25</TableCell>
                                      <TableCell><Badge className="bg-green-500">已支付</Badge></TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>ORD20231220002</TableCell>
                                      <TableCell>比赛会员180天</TableCell>
                                      <TableCell>¥599.00</TableCell>
                                      <TableCell>2023-12-20 14:20:10</TableCell>
                                      <TableCell><Badge className="bg-green-500">已支付</Badge></TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>ORD20231110003</TableCell>
                                      <TableCell>机构会员365天</TableCell>
                                      <TableCell>¥899.00</TableCell>
                                      <TableCell>2023-11-10 09:15:33</TableCell>
                                      <TableCell><Badge variant="secondary">已退款</Badge></TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </div>
                              <div className="flex justify-end">
                                <Button variant="outline">关闭</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* 分页组件 */}
            <DataPagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>

          {/* 批量操作说明 */}
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="mb-2">功能说明</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 重置密码：为用户重置登录密码</li>
              <li>• 改会员有效期：调整用户的会员起止时间</li>
              <li>• 关联历史订单：查看用户的历史订单记录</li>
              <li>• 支持批量导入Excel为用户开通会员服务</li>
              <li>• 点击备注标签可直接编辑，点击添加按钮可新增标签</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
