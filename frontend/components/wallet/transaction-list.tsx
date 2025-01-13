'use client';

import { ArrowUpRight, ArrowDownRight, CreditCard, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

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
  createdAt: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return (
      <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-700 flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-indigo-600 py-8">No transactions available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl text-indigo-700 flex items-center gap-2">
          <CreditCard className="h-6 w-6" />
          Recent Transactions
          <Link 
            href={"/report"} 
            className="ml-auto px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-1 font-medium"
          >
            Reports 
          </Link>     
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 bg-white border border-indigo-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${tx.type === 'wallet_debit' ? 'bg-red-100' : 'bg-green-100'}`}>
                  {tx.type === 'wallet_debit' ? (
                    <ArrowUpRight className="h-6 w-6 text-red-500" aria-hidden="true" />
                  ) : (
                    <ArrowDownRight className="h-6 w-6 text-green-500" aria-hidden="true" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-indigo-900">
                    {tx.type === 'wallet_debit' ? 'Paid to' : 'Paid to'}{' '}
                    {tx.appointmentId?.doctorId?.name || 'Unknown Doctor'}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-indigo-500" />
                    <p className="text-sm text-indigo-600">
                      {new Date(tx.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  {tx.appointmentId?.doctorId?.specialization && (
                    <div className="flex items-center gap-2 mt-1">
                      <User className="h-4 w-4 text-indigo-500" />
                      <p className="text-sm text-indigo-600">{tx.appointmentId.doctorId.specialization}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-lg text-red-800`}>
                  - INR {tx.amount.toLocaleString('en-IN')}
                </p>
                {tx.metadata.discountApplied > 0 && (
                  <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">
                    {tx.metadata.discountApplied}% off
                  </Badge>
                )}
                <Badge 
                  variant="outline" 
                  className={`mt-1 ${
                    tx.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' :
                    tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                    tx.status === 'failed' ? 'bg-red-100 text-red-800 border-red-300' :
                    'bg-gray-100 text-gray-800 border-gray-300'
                  }`}
                >
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

