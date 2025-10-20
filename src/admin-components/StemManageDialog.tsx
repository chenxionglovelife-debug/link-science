import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { FileText, Plus, Search, Check, Edit, Trash2 } from 'lucide-react';

interface Stem {
  id: number;
  name: string;
  content: string;
  updateTime: string;
}

interface StemManageDialogProps {
  onSelectStem?: (stem: Stem) => void;
}

export default function StemManageDialog({ onSelectStem }: StemManageDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddStemOpen, setIsAddStemOpen] = useState(false);
  const [isEditStemOpen, setIsEditStemOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStemId, setSelectedStemId] = useState<number | null>(null);
  const [editingStem, setEditingStem] = useState<Stem | null>(null);
  const [newStem, setNewStem] = useState({
    name: '',
    content: ''
  });

  // 模拟题干数据 - 增加更多数据以测试滚动
  const [stems, setStems] = useState<Stem[]>([
    {
      id: 1,
      name: '图形化编程基础',
      content: '<p>小明在使用Scratch进行编程时...</p>',
      updateTime: '2024-10-10 10:30:25'
    },
    {
      id: 2,
      name: 'Python语法理解',
      content: '<p>以下是一段Python代码，请根据代码回答问题...</p>',
      updateTime: '2024-10-12 14:20:18'
    },
    {
      id: 3,
      name: 'C++程序分析',
      content: '<p>请阅读以下C++代码片段...</p>',
      updateTime: '2024-10-13 16:45:12'
    },
    {
      id: 4,
      name: 'Java面向对象编程',
      content: '<p>以下是关于Java面向对象编程的题干...</p>',
      updateTime: '2024-10-14 09:15:30'
    },
    {
      id: 5,
      name: '数据结构-链表',
      content: '<p>关于链表的操作和实现...</p>',
      updateTime: '2024-10-15 11:22:45'
    },
    {
      id: 6,
      name: '算法-排序',
      content: '<p>以下是关于排序算法的题干内容...</p>',
      updateTime: '2024-10-15 14:35:18'
    },
    {
      id: 7,
      name: 'Web前端开发',
      content: '<p>HTML、CSS、JavaScript基础...</p>',
      updateTime: '2024-10-16 08:45:22'
    },
    {
      id: 8,
      name: '数据库查询',
      content: '<p>SQL查询语句的编写...</p>',
      updateTime: '2024-10-16 10:18:55'
    }
  ]);

  const filteredStems = stems.filter(stem => 
    stem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stem.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStem = () => {
    if (newStem.name.trim() && newStem.content.trim()) {
      const newStemItem: Stem = {
        id: stems.length + 1,
        name: newStem.name,
        content: newStem.content,
        updateTime: new Date().toLocaleString('zh-CN')
      };
      setStems([...stems, newStemItem]);
      setNewStem({ name: '', content: '' });
      setIsAddStemOpen(false);
    }
  };

  const handleSelectStem = () => {
    if (selectedStemId !== null) {
      const stem = stems.find(s => s.id === selectedStemId);
      if (stem && onSelectStem) {
        onSelectStem(stem);
        setIsOpen(false);
      }
    }
  };

  const handleEditStem = (stem: Stem) => {
    setEditingStem(stem);
    setIsEditStemOpen(true);
  };

  const handleUpdateStem = () => {
    if (editingStem && editingStem.name.trim() && editingStem.content.trim()) {
      setStems(stems.map(s => s.id === editingStem.id ? {
        ...editingStem,
        updateTime: new Date().toLocaleString('zh-CN')
      } : s));
      setEditingStem(null);
      setIsEditStemOpen(false);
    }
  };

  const handleDeleteStem = (stemId: number) => {
    if (confirm('确定要删除这个题干吗？')) {
      setStems(stems.filter(s => s.id !== stemId));
      if (selectedStemId === stemId) {
        setSelectedStemId(null);
      }
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>题干列表</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>题干管理</span>
            </DialogTitle>
            <DialogDescription>
              选择已有题干或创建新题干
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* 操作栏 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="搜索题干名称或内容..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <Button 
                className="flex items-center space-x-2"
                onClick={() => setIsAddStemOpen(true)}
              >
                <Plus className="w-4 h-4" />
                <span>新增题干</span>
              </Button>
            </div>

            <Separator />

            {/* 题干列表 */}
            <div className="rounded-md border max-h-[50vh] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-12">选择</TableHead>
                    <TableHead className="w-12">序号</TableHead>
                    <TableHead>题干名称</TableHead>
                    <TableHead>内容预览</TableHead>
                    <TableHead>更新时间</TableHead>
                    <TableHead className="w-24">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStems.length > 0 ? (
                    filteredStems.map((stem, index) => (
                      <TableRow 
                        key={stem.id}
                        className={selectedStemId === stem.id ? 'bg-muted' : ''}
                      >
                        <TableCell onClick={() => setSelectedStemId(stem.id)} className="cursor-pointer">
                          <div className="flex items-center justify-center">
                            {selectedStemId === stem.id && (
                              <Check className="w-4 h-4 text-primary" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell onClick={() => setSelectedStemId(stem.id)} className="cursor-pointer">{index + 1}</TableCell>
                        <TableCell onClick={() => setSelectedStemId(stem.id)} className="cursor-pointer">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{stem.name}</span>
                          </div>
                        </TableCell>
                        <TableCell onClick={() => setSelectedStemId(stem.id)} className="cursor-pointer">
                          <div 
                            className="text-sm text-muted-foreground line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: stem.content }}
                          />
                        </TableCell>
                        <TableCell onClick={() => setSelectedStemId(stem.id)} className="cursor-pointer text-sm text-muted-foreground">
                          {stem.updateTime}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditStem(stem);
                              }}
                              title="编辑题干"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteStem(stem.id);
                              }}
                              title="删除题干"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        暂无题干数据
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* 底部操作按钮 */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {selectedStemId && (
                  <span>已选择题干ID: {selectedStemId}</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  取消
                </Button>
                <Button 
                  onClick={handleSelectStem}
                  disabled={selectedStemId === null}
                >
                  引用题干
                </Button>
              </div>
            </div>

            {/* 使用说明 */}
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-medium mb-2">使用说明</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 点击【新增题干】按钮可创建新的题干内容</li>
                <li>• 点击表格中的行可选择该题干</li>
                <li>• 选择题干后点击【引用题干】将内容填充到题目编辑页</li>
                <li>• 题干支持富文本格式，可包含图片、代码块等内容</li>
                <li>• 点击【编辑】按钮可修改题干内容，点击【删除】按钮可删除题干</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 新增题干对话框 - 独立Dialog */}
      <Dialog open={isAddStemOpen} onOpenChange={setIsAddStemOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>新增题干</DialogTitle>
            <DialogDescription>
              创建一个新的题干，可在题目中引用
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>题干名称</Label>
              <Input
                placeholder="输入题干名称（用于识别）"
                value={newStem.name}
                onChange={(e) => setNewStem({ ...newStem, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>题干内容（富文本）</Label>
              <Textarea
                placeholder="输入题干内容，支持富文本格式..."
                rows={8}
                value={newStem.content}
                onChange={(e) => setNewStem({ ...newStem, content: e.target.value })}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                支持HTML格式，如：<b>粗体</b>、<i>斜体</i>、<pre>代码块</pre>
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddStemOpen(false)}>
                取消
              </Button>
              <Button onClick={handleAddStem} disabled={!newStem.name.trim() || !newStem.content.trim()}>
                创建题干
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 编辑题干对话框 - 独立Dialog */}
      <Dialog open={isEditStemOpen} onOpenChange={setIsEditStemOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>编辑题干</DialogTitle>
            <DialogDescription>
              修改题干的名称和内容
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>题干名称</Label>
              <Input
                placeholder="输入题干名称（用于识别）"
                value={editingStem?.name || ''}
                onChange={(e) => setEditingStem(editingStem ? { ...editingStem, name: e.target.value } : null)}
              />
            </div>
            <div className="space-y-2">
              <Label>题干内容（富文本）</Label>
              <Textarea
                placeholder="输入题干内容，支持富文本格式..."
                rows={8}
                value={editingStem?.content || ''}
                onChange={(e) => setEditingStem(editingStem ? { ...editingStem, content: e.target.value } : null)}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                支持HTML格式，如：<b>粗体</b>、<i>斜体</i>、<pre>代码块</pre>
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditStemOpen(false)}>
                取消
              </Button>
              <Button onClick={handleUpdateStem} disabled={!editingStem?.name.trim() || !editingStem?.content.trim()}>
                保存修改
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
