"use client";

import { useState, useMemo } from "react";
import { useSubscriptions } from "@/lib/hooks/useSubscriptions";
import { useSubscriptionMutations } from "@/lib/hooks/useSubscriptionMutations";
import { SubscriptionFilters } from "@/components/subscriptions/SubscriptionFilters";
import { SubscriptionsTable } from "@/components/subscriptions/SubscriptionsTable";
import { SubscriptionsSkeleton } from "@/components/subscriptions/SubscriptionsSkeleton";
import { SubscriptionFormDialog } from "@/components/subscriptions/SubscriptionFormDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Subscription } from "@/lib/types";

export default function SubscriptionsPage() {
  const { data: subscriptions, isLoading } = useSubscriptions();
  const { createSubscription, updateSubscription, deleteSubscription } = useSubscriptionMutations();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | undefined>();

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

  const handleAddNew = () => {
    setSelectedSubscription(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this subscription?")) {
      deleteSubscription(id);
    }
  };

  const handleFormSubmit = (data: any) => {
    if (selectedSubscription) {
      updateSubscription({
        id: selectedSubscription.id,
        data: {
          ...data,
          price: parseFloat(data.price),
        },
      });
    } else {
      createSubscription({
        ...data,
        price: parseFloat(data.price),
      });
    }
  };

  if (isLoading) return <SubscriptionsSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <Button onClick={handleAddNew} className="bg-hunter-green hover:bg-hunter-green/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Subscription
        </Button>
      </div>

      <SubscriptionFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        departmentFilter={departmentFilter}
        onDepartmentChange={setDepartmentFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <SubscriptionsTable 
        subscriptions={filteredSubscriptions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SubscriptionFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        subscription={selectedSubscription}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}