'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Transaction } from '@/app/types';

interface OverviewStatsProps {
  transactions: Transaction[];
}

export function OverviewStats({ transactions }: OverviewStatsProps) {
  const totalSavings = transactions.reduce(
    (sum, tx) => sum + (tx.discountApplied / 100) * tx.amount,
    0
  );

  const averageDiscount = transactions.length
    ? transactions.reduce((sum, tx) => sum + tx.discountApplied, 0) / transactions.length
    : 0;

  const firstTimeVisits = new Set(
    transactions.filter((tx) => tx.discountApplied > 0).map((tx) => tx.doctorId)
  ).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Total Savings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">${totalSavings.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Discount</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{averageDiscount.toFixed(1)}%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>First-time Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{firstTimeVisits}</p>
        </CardContent>
      </Card>
    </div>
  );
}