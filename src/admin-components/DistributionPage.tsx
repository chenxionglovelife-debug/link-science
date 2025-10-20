import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { 
  Search, 
  Download, 
  Share2, 
  DollarSign,
  Users,
  TrendingUp,
  Settings,
  Clock,
  UserPlus,
  Calendar as CalendarIcon
} from 'lucide-react';
import DateRangeFilter from './DateRangeFilter';
import { usePagination } from '../components/ui/usePagination';
import { DataPagination } from '../components/ui/data-pagination';

export default function DistributionPage() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [distributionSettings, setDistributionSettings] = useState({
    minInviteCount: 5,
    dailyWithdrawLimit: 3,
    minWithdrawAmount: 50,
    level1Commission: 10,
    level2Commission: 5
  });

  // 模拟提现记录数据
  const [withdrawRecords, setWithdrawRecords] = useState([
    {
      id: 1,
      userId: 'U001',
      phone: '138****5678',
      realName: '张三',
      withdrawAccount: '6222****1234',
      withdrawTime: '2024-01-15 14:30:25',
      amount: 150.00,
      isPaid: false
    },
    {
      id: 2,
      userId: 'U002', 
      phone: '139****8765',
      realName: '李四',
      withdrawAccount: '6228****5678',
      withdrawTime: '2024-01-14 16:45:12',
      amount: 280.50,
      isPaid: true
    },
    {
      id: 3,
      userId: 'U003',
      phone: '135****4321',
      realName: '王五',
      withdrawAccount: '6225****9876',
      withdrawTime: '2024-01-13 10:20:08',
      amount: 95.00,
      isPaid: true
    }
  ]);

  // 模拟分销明细数据
  const distributionDetails = [
    {
      id: 1,
      nickname: '张三',
      phone: '138****5678',
      remark: '活跃分销商',
      withdrawnAmount: 850.00,
      level1Count: 12,
      level2Count: 8,
      totalAmount: 1250.00
    },
    {
      id: 2,
      nickname: '李四',
      phone: '139****8765',
      remark: '优质渠道',
      withdrawnAmount: 1200.50,
      level1Count: 20,
      level2Count: 15,
      totalAmount: 2340.00
    },
    {
      id: 3,
      nickname: '王五',
      phone: '135****4321',
      remark: '',
      withdrawnAmount: 560.00,
      level1Count: 8,
      level2Count: 12,
      totalAmount: 890.00
    }
  ];

  const handleSettingChange = (key: string, value: number) => {
    setDistributionSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const togglePaymentStatus = (recordId: number) => {
    setWithdrawRecords(withdrawRecords.map(record =>
      record.id === recordId ? { ...record, isPaid: !record.isPaid } : record
    ));
  };

  // 提现记录分页
  const withdrawPagination = usePagination(withdrawRecords, 20);

  // 分销明细分页
  const detailsPagination = usePagination(distributionDetails, 20);

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">分销管理</h1>
          <p className="text-muted-foreground">管理分销体系和提现申请</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>分销报表</span>
          </Button>
        </div>
      </div>

      {/* 时间筛选器 */}
      <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-blue-900 dark:text-blue-100">
            筛选分销统计数据的时间范围
          </span>
        </div>
        <DateRangeFilter 
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          label="筛选时间范围"
        />
      </div>

      {/* 分销数据概览 - B1.5更新：2个统计指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. 分销人数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">分销人数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">1,245</div>
            <p className="text-xs text-muted-foreground">
              较上月 +18.2%
            </p>
          </CardContent>
        </Card>

        {/* 2. 分销金额 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">分销金额</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">¥45,680</div>
            <p className="text-xs text-muted-foreground">
              较上月 +25.4%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <Tabs defaultValue="withdraw" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="withdraw">提现记录</TabsTrigger>
          <TabsTrigger value="details">分销明细</TabsTrigger>
          <TabsTrigger value="settings">分销设置</TabsTrigger>
        </TabsList>

        {/* 提现记录 */}
        <TabsContent value="withdraw">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>提现记录</span>
              </CardTitle>
              <CardDescription>
                管理用户提现申请，支持筛选和状态更新
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 筛选器 */}
              <div className="flex flex-wrap items-center gap-4">
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="打款状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="paid">已打款</SelectItem>
                    <SelectItem value="pending">待打款</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>导出列表</span>
                </Button>
              </div>

              <Separator />

              {/* 提现列表 */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>序号</TableHead>
                      <TableHead>用户ID</TableHead>
                      <TableHead>手机号</TableHead>
                      <TableHead>真实姓名</TableHead>
                      <TableHead>提现账号</TableHead>
                      <TableHead>提现时间</TableHead>
                      <TableHead>提现金额</TableHead>
                      <TableHead>打款状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {withdrawPagination.currentData.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.id}</TableCell>
                        <TableCell className="font-medium">{record.userId}</TableCell>
                        <TableCell>{record.phone}</TableCell>
                        <TableCell>{record.realName}</TableCell>
                        <TableCell>{record.withdrawAccount}</TableCell>
                        <TableCell>{record.withdrawTime}</TableCell>
                        <TableCell className="font-medium">¥{record.amount}</TableCell>
                        <TableCell>
                          <Badge className={record.isPaid ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'}>
                            {record.isPaid ? '已打款' : '待打款'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* 提现记录分页 */}
                <DataPagination
                  currentPage={withdrawPagination.currentPage}
                  totalPages={withdrawPagination.totalPages}
                  pageSize={withdrawPagination.pageSize}
                  totalItems={withdrawPagination.totalItems}
                  onPageChange={withdrawPagination.handlePageChange}
                  onPageSizeChange={withdrawPagination.handlePageSizeChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 分销明细 */}
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Share2 className="w-5 h-5" />
                <span>分销明细</span>
              </CardTitle>
              <CardDescription>
                查看所有有分销的账号详细信息
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 筛选器 */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input placeholder="手机号" className="w-40" />
                </div>
                <Input placeholder="备注" className="w-40" />
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>导出列表</span>
                </Button>
              </div>

              <Separator />

              {/* 分销明细列表 */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>用户昵称</TableHead>
                      <TableHead>手机号</TableHead>
                      <TableHead>备注</TableHead>
                      <TableHead>已提现金额</TableHead>
                      <TableHead>一级分销数</TableHead>
                      <TableHead>二级分销数</TableHead>
                      <TableHead>总分销额</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detailsPagination.currentData.map((detail) => (
                      <TableRow key={detail.id}>
                        <TableCell className="font-medium">{detail.nickname}</TableCell>
                        <TableCell>{detail.phone}</TableCell>
                        <TableCell>{detail.remark || '-'}</TableCell>
                        <TableCell className="font-medium">¥{detail.withdrawnAmount.toFixed(2)}</TableCell>
                        <TableCell>{detail.level1Count}</TableCell>
                        <TableCell>{detail.level2Count}</TableCell>
                        <TableCell className="font-medium">¥{detail.totalAmount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* 分销明细分页 */}
                <DataPagination
                  currentPage={detailsPagination.currentPage}
                  totalPages={detailsPagination.totalPages}
                  pageSize={detailsPagination.pageSize}
                  totalItems={detailsPagination.totalItems}
                  onPageChange={detailsPagination.handlePageChange}
                  onPageSizeChange={detailsPagination.handlePageSizeChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 分销设置 */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 提现规则 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>提现规则</span>
                </CardTitle>
                <CardDescription>
                  设置用户提现的门槛和限制条件
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>邀请直接用户数量门槛</Label>
                    <Input
                      type="number"
                      value={distributionSettings.minInviteCount}
                      onChange={(e) => handleSettingChange('minInviteCount', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground">
                      用户需要邀请至少这么多直接用户才能申请提现
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>每日提现次数上限</Label>
                    <Input
                      type="number"
                      value={distributionSettings.dailyWithdrawLimit}
                      onChange={(e) => handleSettingChange('dailyWithdrawLimit', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground">
                      每个用户每天最多可以申请的提现次数
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>单次提现最低金额 (元)</Label>
                    <Input
                      type="number"
                      value={distributionSettings.minWithdrawAmount}
                      onChange={(e) => handleSettingChange('minWithdrawAmount', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground">
                      单次提现申请的最低金额限制
                    </p>
                  </div>
                </div>

                <Button className="w-full">
                  保存提现规则
                </Button>
              </CardContent>
            </Card>

            {/* 分销提成 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Share2 className="w-5 h-5" />
                  <span>分销提成</span>
                </CardTitle>
                <CardDescription>
                  设置一级和二级分销的提成比例
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>一级提成金额 (元)</Label>
                    <Input
                      type="number"
                      value={distributionSettings.level1Commission}
                      onChange={(e) => handleSettingChange('level1Commission', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground">
                      直接邀请用户购买会员时的提成金额
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>二级提成金额 (元)</Label>
                    <Input
                      type="number"
                      value={distributionSettings.level2Commission}
                      onChange={(e) => handleSettingChange('level2Commission', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground">
                      二级用户购买会员时的提成金额
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">提成规则说明</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 一级分销：直接邀请的用户购买会员</li>
                      <li>• 二级分销：一级用户邀请的用户购买会员</li>
                      <li>• 提成将在用户成功购买后24小时内到账</li>
                    </ul>
                  </div>
                </div>

                <Button className="w-full">
                  保存提成设置
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
