'use client';

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Interfaces based on backend response
export interface Doctor {
  id: string;
  name: string;
  specialization: string;
}

export interface Appointment {
  id: string;
  doctorId: Doctor;
}

export interface Metadata {
  discountApplied: number;
  originalAmount?: number;
  paymentMethod?: string;
  refundReason?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  appointmentId: Appointment;
  type: 'appointment_payment' | 'wallet_credit' | 'wallet_debit';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  metadata: Metadata;
  createdAt: string; // Use `createdAt` instead of `timestamp`
}

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (!Array.isArray(transactions)) {
    return <p>No transactions available</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                {tx.type === 'wallet_debit' ? (
                  <ArrowUpRight className="text-red-500" aria-hidden="true" />
                ) : (
                  <ArrowDownRight className="text-green-500" aria-hidden="true" />
                )}
                <div>
                  <p className="font-medium">
                    {tx.type === 'wallet_debit' ? 'Paid to' : 'Received from'}{' '}
                    {tx.appointmentId?.doctorId?.name || 'Unknown Doctor'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${tx.amount}</p>
                {tx.metadata.discountApplied > 0 && (
                  <p className="text-sm text-green-600">
                    {tx.metadata.discountApplied}% off
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
