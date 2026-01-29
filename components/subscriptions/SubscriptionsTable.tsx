"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Subscription } from "@/lib/types";

interface SubscriptionsTableProps {
    subscriptions: Subscription[];
}

export function SubscriptionsTable({ subscriptions }: SubscriptionsTableProps) {
    return (
        <div className="rounded-lg border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Billing</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Next Billing</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subscriptions.map((sub) => (
                        <TableRow key={sub.id}>
                            <TableCell>
                                <div className="w-8 h-8 rounded-xl bg-pine-teal text-white flex items-center justify-center text-sm font-semibold">
                                    {sub.name.charAt(0)}
                                </div>
                            </TableCell>
                            <TableCell className="font-medium">{sub.name}</TableCell>
                            <TableCell>{sub.category}</TableCell>
                            <TableCell>{sub.department}</TableCell>
                            <TableCell>${sub.price}</TableCell>
                            <TableCell className="capitalize">{sub.billingCycle}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${sub.status === "active" ? "bg-hunter-green" : "bg-gray-400"
                                        }`} />
                                    <span className="text-sm capitalize">{sub.status}</span>
                                </div>
                            </TableCell>
                            <TableCell>{sub.nextBillingDate}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon-sm">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon-sm">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}