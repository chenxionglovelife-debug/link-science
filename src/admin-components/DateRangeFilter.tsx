import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface DateRangeFilterProps {
  dateRange: { from: Date | undefined; to: Date | undefined };
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  label?: string;
}

export default function DateRangeFilter({ dateRange, onDateRangeChange, label = '筛选时间范围' }: DateRangeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 快捷选择
  const quickSelections = [
    {
      label: '近7天',
      getValue: () => {
        const to = new Date();
        const from = new Date();
        from.setDate(from.getDate() - 6);
        return { from, to };
      }
    },
    {
      label: '近30天',
      getValue: () => {
        const to = new Date();
        const from = new Date();
        from.setDate(from.getDate() - 29);
        return { from, to };
      }
    },
    {
      label: '近90天',
      getValue: () => {
        const to = new Date();
        const from = new Date();
        from.setDate(from.getDate() - 89);
        return { from, to };
      }
    },
    {
      label: '本月',
      getValue: () => {
        const now = new Date();
        const from = new Date(now.getFullYear(), now.getMonth(), 1);
        const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { from, to };
      }
    },
    {
      label: '上月',
      getValue: () => {
        const now = new Date();
        const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const to = new Date(now.getFullYear(), now.getMonth(), 0);
        return { from, to };
      }
    }
  ];

  const handleQuickSelect = (getValue: () => { from: Date; to: Date }) => {
    const range = getValue();
    onDateRangeChange(range);
  };

  const handleReset = () => {
    onDateRangeChange({ from: undefined, to: undefined });
  };

  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, 'yyyy-MM-dd')} - ${format(dateRange.to, 'yyyy-MM-dd')}`;
    }
    return label;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center space-x-2"
        >
          <CalendarIcon className="w-4 h-4" />
          <span className="text-sm">{formatDateRange()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="p-4 space-y-4">
          {/* 快捷选择按钮 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">快捷选择</p>
            <div className="grid grid-cols-3 gap-2">
              {quickSelections.map((selection, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    handleQuickSelect(selection.getValue);
                    setIsOpen(false);
                  }}
                >
                  {selection.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 自定义日期选择 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">自定义范围</p>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">开始日期</p>
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) => onDateRangeChange({ ...dateRange, from: date })}
                  locale={zhCN}
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">结束日期</p>
                <Calendar
                  mode="single"
                  selected={dateRange.to}
                  onSelect={(date) => onDateRangeChange({ ...dateRange, to: date })}
                  locale={zhCN}
                  disabled={(date) => {
                    if (!dateRange.from) return false;
                    return date < dateRange.from;
                  }}
                />
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center justify-between pt-2 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                handleReset();
                setIsOpen(false);
              }}
            >
              重置
            </Button>
            <Button 
              size="sm" 
              onClick={() => setIsOpen(false)}
              disabled={!dateRange.from || !dateRange.to}
            >
              确定
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
