"use client"
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import NavBarForDoctor from '@/components/NavbarForDoctor';

interface Transaction {
  _id: string;
  userId: {
    profile: {
      firstName: string;
      lastName: string;
      phone: string;
    };
    email: string;
  };
  appointmentId: {
    slot: {
      startTime: string;
      endTime: string;
    };
    date: string;
    status: string;
    isFirstConsultation: boolean;
  };
  type: string;
  amount: number;
  status: string;
  createdAt: string;
  metadata: {
    discountApplied: number;
    originalAmount: number;
  };
}

export default function TransactionsDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const doctorId = JSON.parse(localStorage.getItem('doctorData') || '{}').id;
        const response = await fetch(
          `http://localhost:8000/api/transactions/doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('doctorToken')}`,
            },
          }
        );

        if (!response.ok) throw new Error('Failed to fetch transactions');

        const result = await response.json();
        setTransactions(result.data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getTotalEarnings = () => {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  };

  const getFirstConsultations = () => {
    return transactions.filter(t => t.appointmentId.isFirstConsultation);
  };

  const getFollowUpConsultations = () => {
    return transactions.filter(t => !t.appointmentId.isFirstConsultation);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const TransactionTable = ({ transactions, title }: { transactions: Transaction[], title: string }) => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Appointment</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Transaction Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>
                  <div className="font-medium">
                    {format(new Date(transaction.createdAt), 'MMM dd, yyyy')}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(transaction.createdAt), 'hh:mm a')}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {transaction.userId.profile.firstName} {transaction.userId.profile.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.userId.profile.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {format(new Date(transaction.appointmentId.date), 'MMM dd, yyyy')}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.appointmentId.slot.startTime} - {transaction.appointmentId.slot.endTime}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">₹{transaction.amount}</div>
                  {transaction.metadata.discountApplied > 0 && (
                    <div className="text-sm text-gray-500">
                      Discount: ₹{transaction.metadata.discountApplied}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={
                      transaction.status === 'completed' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-yellow-50 text-yellow-700'
                    }
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50  mt-[-50px]">
      <NavBarForDoctor />
      <div className="max-w-7xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-3 bg-gradient-to-r from-blue-500 to-blue-600">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">
                ₹{getTotalEarnings().toLocaleString()}
              </div>
              <div className="text-blue-100 mt-2">
                Total Transactions: {transactions.length}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Transaction Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4">First Consultations</h3>
                  <div className="text-3xl font-bold text-blue-600">
                    {getFirstConsultations().length}
                  </div>
                  <div className="text-gray-500">
                    Total: ₹{getFirstConsultations().reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Follow-up Consultations</h3>
                  <div className="text-3xl font-bold text-green-600">
                    {getFollowUpConsultations().length}
                  </div>
                  <div className="text-gray-500">
                    Total: ₹{getFollowUpConsultations().reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <TransactionTable 
          transactions={getFirstConsultations()} 
          title="First Consultations" 
        />
        
        <TransactionTable 
          transactions={getFollowUpConsultations()} 
          title="Follow-up Consultations" 
        />
      </div>
    </div>
  );
}