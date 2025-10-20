import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Checkbox } from '../components/ui/checkbox';
import { 
  Search, 
  Plus, 
  Ticket,
  Users,
  Building2,
  Calendar as CalendarIcon,
  Download,
  Copy,
  Check,
  AlertCircle,
  FileText,
  Upload,
  TrendingUp
} from 'lucide-react';
import { format } from 'date-fns';
import DateRangeFilter from './DateRangeFilter';
import { usePagination } from '../components/ui/usePagination';
import { DataPagination } from '../components/ui/data-pagination';

export default function CouponManagePage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAddOrgDialogOpen, setIsAddOrgDialogOpen] = useState(false);
  const [isImportStudentsDialogOpen, setIsImportStudentsDialogOpen] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  const [selectedOrgs, setSelectedOrgs] = useState<number[]>([]);
  const [newCoupon, setNewCoupon] = useState({
    productId: '',
    validDays: 30,
    quantity: 100
  });
  const [newOrg, setNewOrg] = useState({
    name: '',
    code: ''
  });

  // 模拟券码数据
  const coupons = [
    {
      code: 'VIP30-ABC123',
      productName: 'VIP会员30天',
      status: '待核销',
      validUntil: '2024-06-30',
      usedBy: '',
      usedTime: '',
      createTime: '2024-01-15 10:30:25'
    },
    {
      code: 'VIP30-DEF456',
      productName: 'VIP会员30天',
      status: '已核销',
      validUntil: '2024-06-30',
      usedBy: '138****5678',
      usedTime: '2024-01-20 14:25:12',
      createTime: '2024-01-15 10:30:26'
    },
    {
      code: 'VIP365-GHI789',
      productName: 'VIP会员365天',
      status: '已过期',
      validUntil: '2024-01-10',
      usedBy: '',
      usedTime: '',
      createTime: '2023-12-10 09:15:30'
    },
    {
      code: 'VIP7-JKL012',
      productName: 'VIP会员7天',
      status: '待核销',
      validUntil: '2024-06-30',
      usedBy: '',
      usedTime: '',
      createTime: '2024-01-15 10:30:27'
    }
  ];

  // 模拟合作机构数据
  const organizations = [
    {
      id: 1,
      code: 'ORG20240001',
      name: '北京实验中学',
      studentCount: 156,
      activatedCount: 142,
      createTime: '2024-01-10 09:00:00'
    },
    {
      id: 2,
      code: 'ORG20240002',
      name: '上海外国语学校',
      studentCount: 203,
      activatedCount: 198,
      createTime: '2024-01-12 14:30:00'
    },
    {
      id: 3,
      code: 'ORG20240003',
      name: '广州编程培训中心',
      studentCount: 89,
      activatedCount: 45,
      createTime: '2024-01-15 10:20:00'
    },
    {
      id: 4,
      code: 'ORG20240004',
      name: '深圳科技中学',
      studentCount: 124,
      activatedCount: 124,
      createTime: '2024-01-18 16:45:00'
    }
  ];

  // 模拟商品数据
  const products = [
    { id: 'vip7', name: 'VIP会员7天', price: 29.90 },
    { id: 'vip30', name: 'VIP会员30天', price: 99.00 },
    { id: 'vip365', name: 'VIP会员365天', price: 899.00 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '待核销':
        return <Badge className="bg-blue-500 hover:bg-blue-600">待核销</Badge>;
      case '已核销':
        return <Badge className="bg-green-500 hover:bg-green-600">已核销</Badge>;
      case '已过期':
        return <Badge variant="destructive">已过期</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCoupon(text);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  const handleAddCoupon = () => {
    console.log('创建券码:', newCoupon);
    setIsAddDialogOpen(false);
    setNewCoupon({
      productId: '',
      validDays: 30,
      quantity: 100
    });
  };

  const handleAddOrg = () => {
    // 自动生成机构编码
    const autoCode = `ORG${new Date().getFullYear()}${String(organizations.length + 1).padStart(4, '0')}`;
    console.log('创建机构:', { ...newOrg, code: autoCode });
    setIsAddOrgDialogOpen(false);
    setNewOrg({
      name: '',
      code: ''
    });
  };

  const handleBatchExport = () => {
    if (selectedOrgs.length === 0) {
      alert('请选择要导出的机构');
      return;
    }
    console.log('批量导出学习报告:', selectedOrgs);
  };

  const generateCoupons = () => {
    const selectedProduct = products.find(p => p.id === newCoupon.productId);
    if (!selectedProduct) return [];
    
    return Array.from({ length: Math.min(newCoupon.quantity, 5) }, (_, i) => ({
      code: `${selectedProduct.name.replace(/[^A-Z0-9]/g, '')}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      productName: selectedProduct.name,
      validUntil: format(new Date(Date.now() + newCoupon.validDays * 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
    }));
  };

  // 计算统计数据
  const totalActivated = organizations.reduce((sum, org) => sum + org.activatedCount, 0);
  const totalStudents = organizations.reduce((sum, org) => sum + org.studentCount, 0);
  const activationRate = totalStudents > 0 ? ((totalActivated / totalStudents) * 100).toFixed(1) : '0';

  // 券码列表分页
  const couponPagination = usePagination(coupons, 20);

  // 机构列表分页
  const orgPagination = usePagination(organizations, 20);

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">券码管理</h1>
          <p className="text-muted-foreground">管理会员券码和合作机构券码</p>
        </div>
      </div>

      {/* 时间筛选器 */}
      <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-blue-900 dark:text-blue-100">
            筛选券码统计数据的时间范围
          </span>
        </div>
        <DateRangeFilter 
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          label="筛选时间范围"
        />
      </div>

      {/* 券码统计 - B1.5更新：4个统计指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 1. 券码总数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">券码总数</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">3,456</div>
            <p className="text-xs text-muted-foreground">
              已生成券码
            </p>
          </CardContent>
        </Card>

        {/* 2. 激活人数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">激活人数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalActivated.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              实际激活人数
            </p>
          </CardContent>
        </Card>

        {/* 3. 机构数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">机构数</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{organizations.length}</div>
            <p className="text-xs text-muted-foreground">
              合作机构总数
            </p>
          </CardContent>
        </Card>

        {/* 4. 机构下属人数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">机构下属人数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              机构学员总数
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 添加券码弹窗（隐藏状态，在下方卡片中触发） */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>添加券码</DialogTitle>
              <DialogDescription>
                创建新的会员券码，支持批量生成
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>关联商品</Label>
                <Select 
                  value={newCoupon.productId} 
                  onValueChange={(value) => setNewCoupon(prev => ({ ...prev, productId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择商品" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - ¥{product.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>有效期 (天)</Label>
                <Input
                  type="number"
                  value={newCoupon.validDays}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, validDays: parseInt(e.target.value) }))}
                  min="1"
                  max="365"
                />
              </div>

              <div className="space-y-2">
                <Label>生成数量</Label>
                <Input
                  type="number"
                  value={newCoupon.quantity}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                  min="1"
                  max="1000"
                />
              </div>

              {newCoupon.productId && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="mb-2">预览券码格式</h4>
                  <div className="space-y-1">
                    {generateCoupons().map((coupon, index) => (
                      <div key={index} className="text-sm font-mono text-muted-foreground">
                        {coupon.code}
                      </div>
                    ))}
                    {newCoupon.quantity > 5 && (
                      <div className="text-sm text-muted-foreground">
                        ...还有 {newCoupon.quantity - 5} 个券码
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleAddCoupon} disabled={!newCoupon.productId}>
                  创建券码
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

      {/* 主要内容区域 - 标签页 */}
      <Tabs defaultValue="coupons" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="coupons">券码管理</TabsTrigger>
          <TabsTrigger value="organizations">合作机构券码</TabsTrigger>
        </TabsList>

        {/* 券码管理标签页 */}
        <TabsContent value="coupons">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Ticket className="w-5 h-5" />
                    <span>券码信息管理</span>
                  </CardTitle>
                  <CardDescription>
                    查看和管理所有券码的使用情况
                  </CardDescription>
                </div>
                <Button 
                  className="flex items-center space-x-2"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>添加券码</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 筛选器 */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input placeholder="券码" className="w-40" />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="关联商品" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部商品</SelectItem>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="核销状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="pending">待核销</SelectItem>
                    <SelectItem value="used">已核销</SelectItem>
                    <SelectItem value="expired">已过期</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>导出券码</span>
                </Button>
              </div>

              <Separator />

              {/* 券码表格 */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>券码</TableHead>
                      <TableHead>关联商品名称</TableHead>
                      <TableHead>核销状态</TableHead>
                      <TableHead>有效期</TableHead>
                      <TableHead>核销账号</TableHead>
                      <TableHead>核销时间</TableHead>
                      <TableHead>创建时间</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {couponPagination.currentData.map((coupon) => (
                      <TableRow key={coupon.code}>
                        <TableCell className="font-mono">
                          {coupon.code}
                        </TableCell>
                        <TableCell>{coupon.productName}</TableCell>
                        <TableCell>
                          {getStatusBadge(coupon.status)}
                        </TableCell>
                        <TableCell>{coupon.validUntil}</TableCell>
                        <TableCell>{coupon.usedBy || '-'}</TableCell>
                        <TableCell>{coupon.usedTime || '-'}</TableCell>
                        <TableCell>{coupon.createTime}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(coupon.code)}
                            className="flex items-center space-x-1"
                          >
                            {copiedCoupon === coupon.code ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>已复制</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span>复制</span>
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* 券码列表分页 */}
                <DataPagination
                  currentPage={couponPagination.currentPage}
                  totalPages={couponPagination.totalPages}
                  pageSize={couponPagination.pageSize}
                  totalItems={couponPagination.totalItems}
                  onPageChange={couponPagination.handlePageChange}
                  onPageSizeChange={couponPagination.handlePageSizeChange}
                />
              </div>

              {/* 批量操作说明 */}
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="mb-2">使用说明</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 券码生成后会自动设置有效期，过期后无法使用</li>
                  <li>• 用户在前台输入券码后会自动核销并开通对应会员</li>
                  <li>• 可以批量生成券码，建议单次生成数量不超过1000个</li>
                  <li>• 已使用的券码会显示核销账号和时间</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 合作机构券码标签页 */}
        <TabsContent value="organizations">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5" />
                    <span>合作机构券码管理</span>
                  </CardTitle>
                  <CardDescription>
                    管理合作机构的考级报名和激活情况
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedOrgs.length > 0 && (
                    <Button variant="outline" onClick={handleBatchExport} className="flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>批量导出 ({selectedOrgs.length})</span>
                    </Button>
                  )}
                  <Dialog open={isAddOrgDialogOpen} onOpenChange={setIsAddOrgDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>新增机构</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>新增合作机构</DialogTitle>
                        <DialogDescription>
                          添加新的合作机构信息
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>机构名称</Label>
                          <Input 
                            placeholder="请输入机构名称" 
                            value={newOrg.name}
                            onChange={(e) => setNewOrg(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>机构编码</Label>
                          <Input 
                            placeholder="自动生成" 
                            value={`ORG${new Date().getFullYear()}${String(organizations.length + 1).padStart(4, '0')}`}
                            disabled
                          />
                          <p className="text-xs text-muted-foreground">机构编码将自动生成</p>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsAddOrgDialogOpen(false)}>
                            取消
                          </Button>
                          <Button onClick={handleAddOrg} disabled={!newOrg.name}>
                            创建机构
                          </Button>
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
                  <Input placeholder="机构名称" className="w-40" />
                </div>
                <Dialog open={isImportStudentsDialogOpen} onOpenChange={setIsImportStudentsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>导入报名学员</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>批量导入机构报名学员信息</DialogTitle>
                      <DialogDescription>
                        通过Excel表格批量导入机构学员报名信息
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
                        <h4 className="mb-2">模板说明</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• 必填字段：机构编码、学员姓名、学员手机号</li>
                          <li>• 可选字段：年级、班级、备注</li>
                          <li>• 系统会自动统计每个机构的考级人数</li>
                          <li>• 单次最多导入5000条记录</li>
                        </ul>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsImportStudentsDialogOpen(false)}>
                          取消
                        </Button>
                        <Button>开始导入</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Separator />

              {/* 机构列表 */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox 
                          checked={selectedOrgs.length === organizations.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedOrgs(organizations.map(org => org.id));
                            } else {
                              setSelectedOrgs([]);
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>机构代码</TableHead>
                      <TableHead>机构名称</TableHead>
                      <TableHead>考级人数</TableHead>
                      <TableHead>激活数</TableHead>
                      <TableHead>激活率</TableHead>
                      <TableHead>创建时间</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orgPagination.currentData.map((org) => (
                      <TableRow key={org.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedOrgs.includes(org.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedOrgs([...selectedOrgs, org.id]);
                              } else {
                                setSelectedOrgs(selectedOrgs.filter(id => id !== org.id));
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-mono">{org.code}</TableCell>
                        <TableCell>{org.name}</TableCell>
                        <TableCell>{org.studentCount}</TableCell>
                        <TableCell>{org.activatedCount}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{((org.activatedCount / org.studentCount) * 100).toFixed(1)}%</span>
                            {org.activatedCount === org.studentCount ? (
                              <Badge className="bg-green-500">已完成</Badge>
                            ) : (
                              <Badge variant="secondary">进行中</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{org.createTime}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-1"
                          >
                            <FileText className="w-4 h-4" />
                            <span>生成报告</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* 机构列表分页 */}
                <DataPagination
                  currentPage={orgPagination.currentPage}
                  totalPages={orgPagination.totalPages}
                  pageSize={orgPagination.pageSize}
                  totalItems={orgPagination.totalItems}
                  onPageChange={orgPagination.handlePageChange}
                  onPageSizeChange={orgPagination.handlePageSizeChange}
                />
              </div>

              {/* 功能说明 */}
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="mb-2">功能说明</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 新增机构：添加合作机构信息，机构编码自动生成</li>
                  <li>• 导入报名学员：批量导入机构学员的报名信息，系统自动统计考级人数</li>
                  <li>• 生成报告：为单个机构生成学习使用报告</li>
                  <li>• 批量导出：选择多个机构，批量导出学习报告</li>
                  <li>• 激活率 = 实际激活人数 / 考级人数</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
