"use client";

import { useMemo } from "react";
import { useSubscriptions } from "@/lib/hooks/useSubscriptions";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";


export default function DashboardPage() {
    const { data: subscriptions, isLoading } = useSubscriptions();

    const stats = useMemo(() => {
        if (!subscriptions) return null;

        const activeSubscriptions = subscriptions.filter(subs => subs.status === "active");

        const totalMonthlySpending = activeSubscriptions.reduce((sum, sub) => {
            return sum + sub.price;
        }, 0);

        const mostExpensive = activeSubscriptions.reduce((max, sub) => {
            return sub.price > max.price ? { name: sub.name, price: sub.price } : max;
        }, { name: "", price: 0 });

        const categoryData = activeSubscriptions.reduce((acc, sub) => {
            const existing = acc.find(item => item.name === sub.category);

            if (existing) {
                existing.value += sub.price;
            } else {
                acc.push({ name: sub.category, value: sub.price });
            }

            return acc;
        }, [] as { name: string; value: number }[]);

        return {
            totalMonthlySpending,
            mostExpensive,
            activeCount: activeSubscriptions.length,
            categoryData
        };
    }, [subscriptions]);


   if (isLoading) {
  return <DashboardSkeleton />;
}

    if (!stats) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-xl text-muted-foreground">No data available</div>
            </div>
        );
    }

        console.log("categoryData:", stats.categoryData);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Monthly Spending</h3>
                    <div className="mt-2 text-3xl font-bold">
                        ${stats.totalMonthlySpending.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Per month</p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <h3 className="text-sm font-medium text-muted-foreground">Most Expensive</h3>
                    <div className="mt-2 text-2xl font-bold">{stats.mostExpensive.name}</div>
                    <p className="text-sm text-muted-foreground">
                        ${stats.mostExpensive.price.toFixed(2)}/month
                    </p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <h3 className="text-sm font-medium text-muted-foreground">Active Subscriptions</h3>
                    <div className="mt-2 text-3xl font-bold">{stats.activeCount}</div>
                </div>
            </div>

            <CategoryChart data={stats.categoryData} />

        </div>
    );
}