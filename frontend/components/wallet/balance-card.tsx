'use client';

import { useEffect, useState } from 'react';
import { Wallet, CreditCard, ArrowUpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';

interface BalanceCardProps {
  balance: number;
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [balanceInState, setBalanceInState] = useState<number>(0);

  useEffect(() => {
    setBalanceInState(balance);
  }, [balance]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/api/auth/updateUser',
        {
          amount: Number(amount),
          pin,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      if (!response) {
        throw new Error('Recharge failed');
      }
      
      const newBalance = balanceInState + Number(amount);
      
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      userData.wallet = {
        ...userData.wallet,
        balance: newBalance
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      setBalanceInState(newBalance);
      
      setAmount('');
      setPin('');
      setIsOpen(false);
    } catch (error) {
      console.error('Recharge error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-2xl text-indigo-700">
          <Wallet className="h-6 w-6" aria-hidden="true" />
          Wallet Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex items-baseline justify-between">
            <p className="text-4xl font-bold text-indigo-900">₹{balanceInState.toLocaleString('en-IN')}</p>
            <p className="text-sm text-indigo-600">Indian Rupees</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-300 hover:border-indigo-400 transition-colors duration-300">
                <ArrowUpCircle className="mr-2 h-4 w-4" />
                Recharge Wallet
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-indigo-900 flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  Recharge Wallet
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-indigo-700">Amount (INR)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    required
                    className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pin" className="text-indigo-700">PIN</Label>
                  <Input
                    id="pin"
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter PIN"
                    required
                    className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <ArrowUpCircle className="mr-2 h-5 w-5" />
                      Confirm Recharge
                    </>
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

