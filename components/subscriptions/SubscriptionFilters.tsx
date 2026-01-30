"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SubscriptionFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  departmentFilter: string;
  onDepartmentChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function SubscriptionFilters({
  searchQuery,
  onSearchChange,
  departmentFilter,
  onDepartmentChange,
  sortBy,
  onSortChange,
}: SubscriptionFiltersProps) {
  const departments = ["all", "Engineering", "Design", "Sales", "Operations"];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
      <Input
        placeholder="Search subscriptions..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full sm:max-w-xs bg-white"
      />

      <Select value={departmentFilter} onValueChange={onDepartmentChange}>
        <SelectTrigger className="w-full sm:w-[200px] bg-white">
          <SelectValue placeholder="All Departments" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {departments.slice(1).map((dept) => (
            <SelectItem key={dept} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-full sm:w-[200px] bg-white">
          <SelectValue placeholder="Default"/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}