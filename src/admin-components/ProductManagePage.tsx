import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { 
  ShoppingCart, 
  Plus, 
  Edit, 
  Trash2,
  Crown,
  X
} from 'lucide-react';

export default function ProductManagePage() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // 会员类型选项
  const memberTypes = [
    '个人季度会员',
    '个人年度会员',
    '机构季度会员',
    '机构年度会员',
    '比赛会员'
  ];

  // 从字典获取的一级和二级权益（模拟数据）
  const level1Benefits = [
    { id: 1, name: '刷题闯关' },
    { id: 2, name: '学习诊断' },
    { id: 3, name: '错题集' }
  ];

  const level2Benefits = [
    { id: 1, parentId: 1, parentName: '刷题闯关', name: '无限制刷题' },
    { id: 2, parentId: 1, parentName: '刷题闯关', name: '题目解析' },
    { id: 3, parentId: 2, parentName: '学习诊断', name: 'AI学习报告' },
    { id: 4, parentId: 2, parentName: '学习诊断', name: '知识图谱' },
    { id: 5, parentId: 3, parentName: '错题集', name: '错题自动收录' }
  ];

  // 商品数据
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'VIP会员30天',
      price: 99.00,
      memberType: '个人季度会员',
      isListed: true,
      order: 1,
      memberDays: 30,
      benefits: [
        { level1: '刷题闯关', level2: '无限制刷题' },
        { level1: '刷题闯关', level2: '题目解析' }
      ]
    },
    {
      id: 2,
      name: 'VIP会员365天',
      price: 899.00,
      memberType: '个人年度会员',
      isListed: true,
      order: 2,
      memberDays: 365,
      benefits: [
        { level1: '刷题闯关', level2: '无限制刷题' },
        { level1: '刷题闯关', level2: '题目解析' },
        { level1: '学习诊断', level2: 'AI学习报告' },
        { level1: '学习诊断', level2: '知识图谱' }
      ]
    }
  ]);

  // 表单数据
  const [formData, setFormData] = useState({
    name: '',
    order: 1,
    price: 0,
    isListed: true,
    memberType: '',
    memberDays: 0,
    selectedBenefits: [] as { level1: string; level2: string }[]
  });

  // 添加权益到表单
  const addBenefit = (level1Name: string, level2Name: string) => {
    const exists = formData.selectedBenefits.some(
      b => b.level1 === level1Name && b.level2 === level2Name
    );
    if (!exists) {
      setFormData({
        ...formData,
        selectedBenefits: [...formData.selectedBenefits, { level1: level1Name, level2: level2Name }]
      });
    }
  };

  // 移除权益
  const removeBenefit = (level1: string, level2: string) => {
    setFormData({
      ...formData,
      selectedBenefits: formData.selectedBenefits.filter(
        b => !(b.level1 === level1 && b.level2 === level2)
      )
    });
  };

  // 重置表单
  const resetForm = () => {
    setFormData({
      name: '',
      order: 1,
      price: 0,
      isListed: true,
      memberType: '',
      memberDays: 0,
      selectedBenefits: []
    });
  };

  // 打开编辑对话框
  const openEditDialog = (product: any) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      order: product.order,
      price: product.price,
      isListed: product.isListed,
      memberType: product.memberType,
      memberDays: product.memberDays,
      selectedBenefits: product.benefits
    });
    setIsEditProductOpen(true);
  };

  // 切换商品上架状态
  const toggleProductListing = (id: number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, isListed: !product.isListed } : product
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">商品管理</h1>
          <p className="text-muted-foreground">管理会员套餐商品的配置和权益</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>商品列表</span>
              </CardTitle>
              <CardDescription>
                管理商品信息，绑定会员权益
              </CardDescription>
            </div>
            <Button 
              className="flex items-center space-x-2"
              onClick={() => {
                resetForm();
                setIsAddProductOpen(true);
              }}
            >
              <Plus className="w-4 h-4" />
              <span>新增商品</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>商品名称</TableHead>
                  <TableHead>价格</TableHead>
                  <TableHead>会员类型</TableHead>
                  <TableHead>上架状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>¥{product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.memberType}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={product.isListed}
                          onCheckedChange={() => toggleProductListing(product.id)}
                        />
                        <span className="text-sm text-muted-foreground">
                          {product.isListed ? '已上架' : '未上架'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditDialog(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsDeleteProductOpen(true);
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

      {/* 新增商品弹窗 */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>新增商品</DialogTitle>
            <DialogDescription>
              配置商品信息并绑定会员权益
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* 商品属性信息 */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">商品属性信息</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>商品名称 <span className="text-red-500">*</span></Label>
                  <Input 
                    placeholder="例如：VIP会员30天" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>商品排序 <span className="text-red-500">*</span></Label>
                  <Input 
                    type="number" 
                    placeholder="用于排序" 
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>价格（元） <span className="text-red-500">*</span></Label>
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="99.00" 
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>会员类型 <span className="text-red-500">*</span></Label>
                  <Select 
                    value={formData.memberType}
                    onValueChange={(value) => setFormData({ ...formData, memberType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择或新增会员类型" />
                    </SelectTrigger>
                    <SelectContent>
                      {memberTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>会员天数 <span className="text-red-500">*</span></Label>
                  <Input 
                    type="number" 
                    placeholder="30" 
                    value={formData.memberDays}
                    onChange={(e) => setFormData({ ...formData, memberDays: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2 flex items-end">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="is-listed" 
                      checked={formData.isListed}
                      onCheckedChange={(checked) => setFormData({ ...formData, isListed: checked })}
                    />
                    <Label htmlFor="is-listed">是否上架</Label>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* 会员权益信息 */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b">
                <Crown className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">会员权益信息</h3>
              </div>

              {/* 选择会员权益 - 级联多选 */}
              <div className="space-y-2">
                <Label>选择会员权益 <span className="text-red-500">*</span></Label>
                <div className="border rounded-lg p-4 space-y-3">
                  {level1Benefits.map((level1) => {
                    const relatedLevel2 = level2Benefits.filter(l2 => l2.parentId === level1.id);
                    return (
                      <div key={level1.id} className="space-y-2">
                        <div className="font-medium text-sm">{level1.name}</div>
                        <div className="pl-4 space-y-1">
                          {relatedLevel2.map((level2) => (
                            <div key={level2.id} className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addBenefit(level1.name, level2.name)}
                                disabled={formData.selectedBenefits.some(
                                  b => b.level1 === level1.name && b.level2 === level2.name
                                )}
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                {level2.name}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 已选权益展示 */}
              {formData.selectedBenefits.length > 0 && (
                <div className="space-y-2">
                  <Label>已选权益</Label>
                  <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/30">
                    {formData.selectedBenefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1 pr-1">
                        <span>{benefit.level1} - {benefit.level2}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeBenefit(benefit.level1, benefit.level2)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                取消
              </Button>
              <Button onClick={() => {
                setProducts([...products, {
                  id: products.length + 1,
                  ...formData
                }]);
                setIsAddProductOpen(false);
                resetForm();
              }}>
                创建商品
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 编辑商品弹窗 - 与新增弹窗内容相同 */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑商品</DialogTitle>
            <DialogDescription>
              修改商品信息和会员权益
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* 商品属性信息 */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">商品属性信息</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>商品名称 <span className="text-red-500">*</span></Label>
                  <Input 
                    placeholder="例如：VIP会员30天" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>商品排序 <span className="text-red-500">*</span></Label>
                  <Input 
                    type="number" 
                    placeholder="用于排序" 
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>价格（元） <span className="text-red-500">*</span></Label>
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="99.00" 
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>会员类型 <span className="text-red-500">*</span></Label>
                  <Select 
                    value={formData.memberType}
                    onValueChange={(value) => setFormData({ ...formData, memberType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择或新增会员类型" />
                    </SelectTrigger>
                    <SelectContent>
                      {memberTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>会员天数 <span className="text-red-500">*</span></Label>
                  <Input 
                    type="number" 
                    placeholder="30" 
                    value={formData.memberDays}
                    onChange={(e) => setFormData({ ...formData, memberDays: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2 flex items-end">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="is-listed-edit" 
                      checked={formData.isListed}
                      onCheckedChange={(checked) => setFormData({ ...formData, isListed: checked })}
                    />
                    <Label htmlFor="is-listed-edit">是否上架</Label>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* 会员权益信息 */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b">
                <Crown className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">会员权益信息</h3>
              </div>

              {/* 选择会员权益 - 级联多选 */}
              <div className="space-y-2">
                <Label>选择会员权益 <span className="text-red-500">*</span></Label>
                <div className="border rounded-lg p-4 space-y-3">
                  {level1Benefits.map((level1) => {
                    const relatedLevel2 = level2Benefits.filter(l2 => l2.parentId === level1.id);
                    return (
                      <div key={level1.id} className="space-y-2">
                        <div className="font-medium text-sm">{level1.name}</div>
                        <div className="pl-4 space-y-1">
                          {relatedLevel2.map((level2) => (
                            <div key={level2.id} className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addBenefit(level1.name, level2.name)}
                                disabled={formData.selectedBenefits.some(
                                  b => b.level1 === level1.name && b.level2 === level2.name
                                )}
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                {level2.name}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 已选权益展示 */}
              {formData.selectedBenefits.length > 0 && (
                <div className="space-y-2">
                  <Label>已选权益</Label>
                  <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/30">
                    {formData.selectedBenefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1 pr-1">
                        <span>{benefit.level1} - {benefit.level2}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeBenefit(benefit.level1, benefit.level2)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
                取消
              </Button>
              <Button onClick={() => {
                setProducts(products.map(p => 
                  p.id === selectedProduct?.id ? { ...p, ...formData } : p
                ));
                setIsEditProductOpen(false);
              }}>
                保存修改
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 删除确认弹窗 */}
      <Dialog open={isDeleteProductOpen} onOpenChange={setIsDeleteProductOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              确定要删除商品 "{selectedProduct?.name}" 吗？此操作不可撤销。
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteProductOpen(false)}>
              取消
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                setProducts(products.filter(p => p.id !== selectedProduct?.id));
                setIsDeleteProductOpen(false);
              }}
            >
              确认删除
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
