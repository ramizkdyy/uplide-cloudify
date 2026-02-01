"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Subscription } from "@/lib/types";

interface SubscriptionsTableProps {
    subscriptions: Subscription[];
    onEdit: (subscription: Subscription) => void;
    onDelete: (id: string) => void;
    resetPage?: boolean;
}

const ITEMS_PER_PAGE = 10;

export function SubscriptionsTable({ subscriptions, onEdit, onDelete, resetPage }: SubscriptionsTableProps) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [subscriptions.length, resetPage]);

    const totalPages = Math.ceil(subscriptions.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentSubscriptions = subscriptions.slice(startIndex, endIndex);

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="space-y-4">
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
                        {currentSubscriptions.map((sub) => (
                            <TableRow key={sub.id}>
                                <TableCell>
                                    <div className="w-8 h-8 rounded-xl bg-pine-teal text-white flex items-center justify-center text-sm font-semibold">
                                        {sub.name.charAt(0)}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{sub.name}</TableCell>
                                <TableCell>{sub.category}</TableCell>
                                <TableCell>{sub.department}</TableCell>
                                <TableCell>
                                    ${sub.billingCycle === "yearly"
                                        ? (sub.price / 12).toFixed(2)
                                        : sub.price.toFixed(2)
                                    }/mo
                                </TableCell>
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
                                        <Button variant="ghost" size="icon-sm" onClick={() => onEdit(sub)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon-sm" onClick={() => onDelete(sub.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(endIndex, subscriptions.length)} of {subscriptions.length} subscriptions
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className="bg-white"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="bg-white"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}