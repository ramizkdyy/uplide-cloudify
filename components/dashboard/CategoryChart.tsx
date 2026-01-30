"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryChartProps {
  data: { name: string; value: number }[];
}

type ChartType = "bar" | "pie" | "line";

const COLORS = ["#3a5a40", "#588157", "#a3b18a", "#dad7cd", "#344e41"];

export function CategoryChart({ data }: CategoryChartProps) {
  const [chartType, setChartType] = useState<ChartType>("bar");

  const chartButtons = [
    { type: "bar" as ChartType, icon: BarChart3, label: "Bar" },
    { type: "pie" as ChartType, icon: PieChartIcon, label: "Pie" },
    { type: "line" as ChartType, icon: LineChartIcon, label: "Line" },
  ];

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip formatter={(value) => `$${value}`} />
            <Bar dataKey="value" fill="#5c7a61" radius={[8, 8, 0, 0]} />
          </BarChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value}`} />
          </PieChart>
        );
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip formatter={(value) => `$${value}`} />
            <Line type="monotone" dataKey="value" stroke="#5c7a61" strokeWidth={2} />
          </LineChart>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex items-center gap-4 space-between">
        <CardTitle>Spending by Category</CardTitle>
        <div className="flex gap-1 border rounded-lg p-1">
          {chartButtons.map(({ type, icon: Icon, label }) => (
            <Button
              key={type}
              variant={chartType === type ? "default" : "ghost"}
              size="icon-sm"
              onClick={() => setChartType(type)}
              className={chartType === type ? "bg-hunter-green hover:bg-hunter-green/90" : ""}
              title={label}
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
                </div>

      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AnimatePresence mode="wait">
            <motion.div
              key={chartType}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: "100%", height: "100%" }}
            >
              {renderChart()}
            </motion.div>
          </AnimatePresence>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}