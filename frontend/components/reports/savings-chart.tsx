'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { Transaction } from '@/app/types';

interface SavingsChartProps {
  transactions: Transaction[];
}

export function SavingsChart({ transactions }: SavingsChartProps) {
  const chartData = transactions
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .map((tx) => ({
      date: new Date(tx.timestamp).toLocaleDateString(),
      savings: (tx.discountApplied / 100) * tx.amount,
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="savings"
              stroke="hsl(var(--primary))"
              name="Savings ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}