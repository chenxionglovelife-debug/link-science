import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Search, X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
  color?: string;
}

interface FilterGroup {
  key: string;
  label: string;
  options: FilterOption[];
  allowMultiple?: boolean;
}

interface FriendlyFiltersProps {
  filterGroups: FilterGroup[];
  selectedFilters: Record<string, string | string[]>;
  onFilterChange: (key: string, value: string | string[]) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
}

export default function FriendlyFilters({
  filterGroups,
  selectedFilters,
  onFilterChange,
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = '搜索...'
}: FriendlyFiltersProps) {
  const handleOptionClick = (groupKey: string, optionValue: string, allowMultiple?: boolean) => {
    if (allowMultiple) {
      const currentValues = selectedFilters[groupKey] as string[] || [];
      if (currentValues.includes(optionValue)) {
        // Remove if already selected
        onFilterChange(groupKey, currentValues.filter(v => v !== optionValue));
      } else {
        // Add to selection
        onFilterChange(groupKey, [...currentValues, optionValue]);
      }
    } else {
      // Single selection
      onFilterChange(groupKey, optionValue === selectedFilters[groupKey] ? 'all' : optionValue);
    }
  };

  const isOptionSelected = (groupKey: string, optionValue: string, allowMultiple?: boolean) => {
    if (allowMultiple) {
      const currentValues = selectedFilters[groupKey] as string[] || [];
      return currentValues.includes(optionValue);
    } else {
      return selectedFilters[groupKey] === optionValue;
    }
  };

  const getActiveFiltersCount = () => {
    return Object.entries(selectedFilters).reduce((count, [key, value]) => {
      if (Array.isArray(value)) {
        return count + value.length;
      } else if (value && value !== 'all') {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const clearAllFilters = () => {
    const clearedFilters: Record<string, string | string[]> = {};
    filterGroups.forEach(group => {
      clearedFilters[group.key] = group.allowMultiple ? [] : 'all';
    });
    Object.entries(clearedFilters).forEach(([key, value]) => {
      onFilterChange(key, value);
    });
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      {onSearchChange && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
      )}

      {/* Active Filters Summary */}
      {getActiveFiltersCount() > 0 && (
        <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">已选择 {getActiveFiltersCount()} 个筛选条件</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-purple-600 hover:text-purple-700"
              >
                <X className="w-4 h-4 mr-1" />
                清除全部
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Groups */}
      {filterGroups.map((group) => (
        <Card key={group.key} className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span>{group.label}</span>
              {group.allowMultiple && (
                <Badge variant="outline" className="text-xs">
                  多选
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {/* All option for single select */}
              {!group.allowMultiple && (
                <Button
                  variant={selectedFilters[group.key] === 'all' || !selectedFilters[group.key] ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onFilterChange(group.key, 'all')}
                  className={`h-9 transition-all duration-200 ${
                    selectedFilters[group.key] === 'all' || !selectedFilters[group.key]
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-md'
                      : 'hover:bg-accent/50'
                  }`}
                >
                  全部
                </Button>
              )}
              
              {/* Individual options */}
              {group.options.map((option) => {
                const isSelected = isOptionSelected(group.key, option.value, group.allowMultiple);
                return (
                  <Button
                    key={option.value}
                    variant={isSelected ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleOptionClick(group.key, option.value, group.allowMultiple)}
                    className={`h-9 transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-md transform scale-105'
                        : 'hover:bg-accent/50 hover:scale-105'
                    }`}
                  >
                    <span>{option.label}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}