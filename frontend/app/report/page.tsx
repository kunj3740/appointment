'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
}

interface Metadata {
  discountApplied: number;
  originalAmount?: number;
  paymentMethod?: string;
  refundReason?: string;
}

interface Transaction {
  id: string;
  userId: string;
  doctorId: string;
  appointmentId: string;
  type: 'appointment_payment' | 'wallet_credit' | 'wallet_debit';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  metadata: Metadata;
  createdAt: string;
}

interface DoctorSummary {
  id: string;
  totalAmount: number;
  discountedAmount: number;
  visits: number;
  transactions: Transaction[];
}

interface SpendingSummary {
  totalSpent: number;
  discountedSpent: number;
  totalSaved: number;
  doctorWiseSpending: DoctorSummary[];
}

const TransactionReport = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          setIsLoading(false);
          return;
        }
    
        const response = await fetch('http://localhost:8000/api/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle different response structures
        let transactionsData: Transaction[] = [];
        if (data?.data) {
          transactionsData = data.data;
        } else if (Array.isArray(data)) {
          transactionsData = data;
        } else if (data?.transactions) {
          transactionsData = data.transactions;
        }

        if (Array.isArray(transactionsData)) {
          setTransactions(transactionsData);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const calculateSpendingSummary = (transactionList: Transaction[]): SpendingSummary => {
    const doctorMap = new Map<string, DoctorSummary>();
    
    let totalSpent = 0;
    let discountedSpent = 0;
    let totalSaved = 0;

    transactionList.forEach(transaction => {
      if (
        transaction?.type === 'appointment_payment' && 
        transaction?.status === 'completed' && 
        transaction?.doctorId
      ) {
        const doctorId = transaction.doctorId;
        const originalAmount = transaction.metadata?.originalAmount || transaction.amount;
        const discountAmount = transaction.metadata?.discountApplied || 0;
        const actualAmount = transaction.amount;

        // Update overall totals
        totalSpent += originalAmount;
        discountedSpent += actualAmount;
        totalSaved += discountAmount;

        // Get or create doctor record
        const doctorRecord = doctorMap.get(doctorId) || {
          id: doctorId,
          totalAmount: 0,
          discountedAmount: 0,
          visits: 0,
          transactions: []
        };

        // Update doctor record
        doctorRecord.totalAmount += originalAmount;
        doctorRecord.discountedAmount += actualAmount;
        doctorRecord.visits += 1;
        doctorRecord.transactions.push(transaction);

        // Store updated record
        doctorMap.set(doctorId, doctorRecord);
      }
    });

    return {
      totalSpent,
      discountedSpent,
      totalSaved,
      doctorWiseSpending: Array.from(doctorMap.values())
    };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  const summary = calculateSpendingSummary(transactions);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Transaction Report</h1>
      
      <div className="mb-4 text-sm text-gray-500">
        Total transactions loaded: {transactions.length}
      </div>

      {/* Overall Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Spending Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Original Spend</p>
              <p className="text-2xl font-bold">₹{summary.totalSpent.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Total After Discounts</p>
              <p className="text-2xl font-bold">₹{summary.discountedSpent.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Saved</p>
              <p className="text-2xl font-bold text-green-600">₹{summary.totalSaved.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionReport;