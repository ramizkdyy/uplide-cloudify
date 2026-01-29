"use client";

import { useState, useMemo } from "react";
import { useSubscriptions } from "@/lib/hooks/useSubscriptions";
import { SubscriptionFilters } from "@/components/subscriptions/SubscriptionFilters";
import { SubscriptionsTable } from "@/components/subscriptions/SubscriptionsTable";

export default function SubscriptionsPage() {
  const { data: subscriptions, isLoading } = useSubscriptions();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filteredSubscriptions = useMemo(() => {
    if (!subscriptions) return [];

    let result = [...subscriptions];

    if (searchQuery) {
      result = result.filter(sub => 
        sub.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (departmentFilter !== "all") {
      result = result.filter(sub => sub.department === departmentFilter);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [subscriptions, searchQuery, departmentFilter, sortBy]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Subscriptions</h1>
      </div>

      <SubscriptionFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        departmentFilter={departmentFilter}
        onDepartmentChange={setDepartmentFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <SubscriptionsTable subscriptions={filteredSubscriptions} />
    </div>
  );
}