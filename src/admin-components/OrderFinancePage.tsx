import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Separator } from '../components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { 
  Search, 
  Download, 
  Filter, 
  Calendar as CalendarIcon,
  ShoppingCart,
  FileText,
  Eye,
  TrendingUp,
  CreditCard,
  Users,
  Upload,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { format } from 'date-fns';
import DateRangeFilter from './DateRangeFilter';
import { usePagination } from '../components/ui/usePagination';
import { DataPagination } from '../components/ui/data-pagination';

interface OrderFinancePageProps {
  onTabChange?: (tab: string, searchPhone?: string) => void;
}

export default function OrderFinancePage({ onTabChange }: OrderFinancePageProps = {}) {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // 点击手机号跳转到用户管理页
  const handlePhoneClick = (phone: string) => {
    if (onTabChange) {
      onTabChange('users', phone);
    }
  };

  // 模拟订单数据
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-001',
      phone: '138****5678',
      productName: 'VIP会员30天',
      region: '北京',
      memberDays: 30,
      orderTime: '2024-01-15 14:30:25',
      paymentMethod: '微信支付',
      amount: 99.00,
      status: '已支付',
      isRefunded: false
    },
    {
      id: 'ORD-2024-002', 
      phone: '139****8765',
      productName: 'VIP会员365天',
      region: '上海',
      memberDays: 365,
      orderTime: '2024-01-15 16:45:12',
      paymentMethod: '支付宝',
      amount: 899.00,
      status: '已支付',
      isRefunded: false
    },
    {
      id: 'ORD-2024-003',
      phone: '135****4321',
      productName: 'VIP会员7天',
      region: '广州',
      memberDays: 7,
      orderTime: '2024-01-15 18:20:08',
      paymentMethod: '微信支付',
      amount: 29.90,
      status: '已退费',
      isRefunded: true
    }
  ]);

  // 模拟发票数据
  const [invoices, setInvoices] = useState([
    {
      orderNo: 'ORD-2024-001',
      phone: '138****5678',
      amount: 99.00,
      header: '张三',
      taxNo: '',
      email: 'zhangsan@example.com',
      applyTime: '2024-01-15 15:00:00',
      isCompleted: false,
      attachment: null
    },
    {
      orderNo: 'ORD-2024-002',
      phone: '139****8765', 
      amount: 899.00,
      header: '北京科技有限公司',
      taxNo: '91110000123456789X',
      email: 'invoice@bjtech.com',
      applyTime: '2024-01-15 17:30:00',
      isCompleted: true,
      attachment: 'invoice_20240115.pdf'
    }
  ]);

  const handleRefund = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: '已退费', isRefunded: true } : order
    ));
  };

  const handleInvoiceStatusChange = (orderNo: string, isCompleted: boolean) => {
    setInvoices(invoices.map(invoice => 
      invoice.orderNo === orderNo ? { ...invoice, isCompleted } : invoice
    ));
  };

  const handleUploadInvoice = (orderNo: string) => {
    // 模拟上传发票附件
    console.log('上传发票附件:', orderNo);
  };

  // 订单列表分页
  const orderPagination = usePagination(orders, 20);

  // 发票列表分页
  const invoicePagination = usePagination(invoices, 20);

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">订单财务管理</h1>
          <p className="text-muted-foreground">管理订单信息和发票申请</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>财务报表</span>
          </Button>
        </div>
      </div>

      {/* 时间筛选器 */}
      <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-blue-900 dark:text-blue-100">
            筛选订单财务统计数据的时间范围
          </span>
        </div>
        <DateRangeFilter 
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          label="筛选时间范围"
        />
      </div>

      {/* 核心指标卡片 - B1.5更新：4个统计指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 1. 新增订单数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">新增订单数</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">156</div>
            <p className="text-xs text-muted-foreground">
              较昨日 +12.5%
            </p>
          </CardContent>
        </Card>

        {/* 2. 销售额 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">销售额</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">¥12,450</div>
            <p className="text-xs text-muted-foreground">
              较昨日 +8.2%
            </p>
          </CardContent>
        </Card>

        {/* 3. 退费订单额 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">退费订单额</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">¥289</div>
            <p className="text-xs text-muted-foreground">
              较昨日 -15.3%
            </p>
          </CardContent>
        </Card>

        {/* 4. 开票人数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">开票人数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">45</div>
            <p className="text-xs text-muted-foreground">
              发票申请用户
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="orders">订单管理</TabsTrigger>
          <TabsTrigger value="invoices">发票管理</TabsTrigger>
        </TabsList>

        {/* 订单管理 */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>订单管理</span>
              </CardTitle>
              <CardDescription>
                管理用户订单信息，支持筛选和导出功能
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 筛选器 */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input placeholder="手机号" className="w-32" />
                </div>
                <Input placeholder="订单号" className="w-40" />
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="商品类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vip">VIP会员</SelectItem>
                    <SelectItem value="course">课程包</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="支付方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wechat">微信支付</SelectItem>
                    <SelectItem value="alipay">支付宝</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4" />
                      <span>下单时间</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>下载订单列表</span>
                </Button>
              </div>

              <Separator />

              {/* 订单列表 */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>订单号</TableHead>
                      <TableHead>手机号</TableHead>
                      <TableHead>商品名称</TableHead>
                      <TableHead>地区</TableHead>
                      <TableHead>会员天数</TableHead>
                      <TableHead>下单时间</TableHead>
                      <TableHead>支付方式</TableHead>
                      <TableHead>实付金额</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderPagination.currentData.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <Button 
                            variant="link" 
                            className="h-auto p-0 text-blue-600 hover:text-blue-800"
                            onClick={() => handlePhoneClick(order.phone)}
                          >
                            {order.phone}
                          </Button>
                        </TableCell>
                        <TableCell>{order.productName}</TableCell>
                        <TableCell>{order.region}</TableCell>
                        <TableCell>{order.memberDays}天</TableCell>
                        <TableCell>{order.orderTime}</TableCell>
                        <TableCell>
                          <Badge variant={order.paymentMethod === '微信支付' ? 'default' : 'secondary'}>
                            {order.paymentMethod}
                          </Badge>
                        </TableCell>
                        <TableCell>¥{order.amount}</TableCell>
                        <TableCell>
                          <Badge className={order.isRefunded ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {!order.isRefunded && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  退费
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>确认退费</DialogTitle>
                                  <DialogDescription>
                                    确定要将订单 {order.id} 状态更改为已退费吗？
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="p-4 bg-muted/50 rounded-lg">
                                    <p className="text-sm">订单信息：</p>
                                    <p className="text-sm text-muted-foreground">订单号：{order.id}</p>
                                    <p className="text-sm text-muted-foreground">金额：¥{order.amount}</p>
                                    <p className="text-sm text-muted-foreground">用户：{order.phone}</p>
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline">��消</Button>
                                    <Button 
                                      variant="destructive"
                                      onClick={() => handleRefund(order.id)}
                                    >
                                      确认退费
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* 订单列表分页 */}
                <DataPagination
                  currentPage={orderPagination.currentPage}
                  totalPages={orderPagination.totalPages}
                  pageSize={orderPagination.pageSize}
                  totalItems={orderPagination.totalItems}
                  onPageChange={orderPagination.handlePageChange}
                  onPageSizeChange={orderPagination.handlePageSizeChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 发票管理 */}
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>发票管理</span>
              </CardTitle>
              <CardDescription>
                管理用户发票申请，支持查看详情和状态更新
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 筛选器 */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input placeholder="手机号" className="w-32" />
                </div>
                <Input placeholder="订单号" className="w-40" />
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="开票状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">待开票</SelectItem>
                    <SelectItem value="completed">已开票</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>导出列表</span>
                </Button>
              </div>

              <Separator />

              {/* 发票列表 */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>订单编号</TableHead>
                      <TableHead>用户手机号</TableHead>
                      <TableHead>订单额</TableHead>
                      <TableHead>发票抬头</TableHead>
                      <TableHead>税号</TableHead>
                      <TableHead>邮箱</TableHead>
                      <TableHead>申请时间</TableHead>
                      <TableHead>开票状态</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoicePagination.currentData.map((invoice) => (
                      <TableRow key={invoice.orderNo}>
                        <TableCell className="font-medium">{invoice.orderNo}</TableCell>
                        <TableCell>
                          <Button 
                            variant="link" 
                            className="h-auto p-0 text-blue-600 hover:text-blue-800"
                            onClick={() => handlePhoneClick(invoice.phone)}
                          >
                            {invoice.phone}
                          </Button>
                        </TableCell>
                        <TableCell>¥{invoice.amount}</TableCell>
                        <TableCell>{invoice.header}</TableCell>
                        <TableCell>{invoice.taxNo || '-'}</TableCell>
                        <TableCell>{invoice.email}</TableCell>
                        <TableCell>{invoice.applyTime}</TableCell>
                        <TableCell>
                          <Switch
                            checked={invoice.isCompleted}
                            onCheckedChange={(checked) => handleInvoiceStatusChange(invoice.orderNo, checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Upload className="w-4 h-4 mr-1" />
                                上传附件
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                              <DialogHeader>
                                <DialogTitle>上传发票附件</DialogTitle>
                                <DialogDescription>
                                  订单编号: {invoice.orderNo}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>发票文件</Label>
                                  <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                                    <div className="text-center">
                                      <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                      <div className="mt-4">
                                        <Label className="cursor-pointer text-primary hover:text-primary/80">
                                          选择发票文件
                                          <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                                        </Label>
                                      </div>
                                      <p className="text-sm text-muted-foreground mt-2">
                                        支持PDF、JPG、PNG格式
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {invoice.attachment && (
                                  <div className="p-3 bg-muted/50 rounded-lg">
                                    <p className="text-sm">当前附件: {invoice.attachment}</p>
                                  </div>
                                )}
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline">取消</Button>
                                  <Button onClick={() => handleUploadInvoice(invoice.orderNo)}>
                                    确认上传
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* 发票列表分页 */}
                <DataPagination
                  currentPage={invoicePagination.currentPage}
                  totalPages={invoicePagination.totalPages}
                  pageSize={invoicePagination.pageSize}
                  totalItems={invoicePagination.totalItems}
                  onPageChange={invoicePagination.handlePageChange}
                  onPageSizeChange={invoicePagination.handlePageSizeChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
