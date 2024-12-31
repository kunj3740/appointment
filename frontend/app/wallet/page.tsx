'use client';

import { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for API requests
import { BalanceCard } from '@/components/wallet/balance-card';
import { TransactionList } from '@/components/wallet/transaction-list';
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
export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Fetch user details from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    if (!user || !token) {
      console.error('User or token not found in localStorage');
      return;
    }

    // Set initial wallet balance
    const walletBalance = user.wallet?.balance || 0;
    setBalance(walletBalance);

    // Fetch transactions
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data)
        // Assuming response.data contains the transaction list
        setTransactions(response.data.transactions);
      } catch (error: any) {
        console.error('Error fetching transactions:', error.response?.data?.message || error.message);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <BalanceCard balance={balance} />
        </div>
        <div className="md:col-span-2">
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
