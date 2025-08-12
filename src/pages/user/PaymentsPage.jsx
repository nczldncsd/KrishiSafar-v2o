import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  Download,
  Eye,
  Search,
  Filter,
  Plus,
  Wallet,
  TrendingUp,
  Shield
} from 'lucide-react';
import AnimatedButton from '../../components/shared/AnimatedButton';
import { AnimatePresence } from 'framer-motion';

const PaymentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Mock data - replace with API call
  const payments = [
    {
      id: 1,
      experience: "Organic Farm Experience",
      amount: 4500,
      date: "2024-02-15",
      status: "completed",
      method: "Credit Card",
      cardLast4: "4242",
      transactionId: "TXN_001_2024",
      bookingId: "BK_001",
      host: "Rajesh Kumar",
      category: "Farming"
    },
    {
      id: 2,
      experience: "Dairy Farm Adventure",
      amount: 4000,
      date: "2024-02-18",
      status: "pending",
      method: "UPI",
      upiId: "user@okicici",
      transactionId: "TXN_002_2024",
      bookingId: "BK_002",
      host: "Priya Sharma",
      category: "Dairy"
    },
    {
      id: 3,
      experience: "Vineyard & Wine Tasting",
      amount: 14000,
      date: "2024-01-20",
      status: "completed",
      method: "Net Banking",
      bankName: "HDFC Bank",
      transactionId: "TXN_003_2024",
      bookingId: "BK_003",
      host: "Vikram Singh",
      category: "Vineyard"
    },
    {
      id: 4,
      experience: "Spice Garden Tour",
      amount: 2400,
      date: "2024-01-10",
      status: "refunded",
      method: "Credit Card",
      cardLast4: "4242",
      transactionId: "TXN_004_2024",
      bookingId: "BK_004",
      host: "Lakshmi Nair",
      category: "Spices"
    },
    {
      id: 5,
      experience: "Honey Farm & Beekeeping",
      amount: 3600,
      date: "2024-01-05",
      status: "completed",
      method: "Digital Wallet",
      walletName: "Paytm",
      transactionId: "TXN_005_2024",
      bookingId: "BK_005",
      host: "Arun Kumar",
      category: "Beekeeping"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Payments', count: payments.length },
    { id: 'completed', label: 'Completed', count: payments.filter(p => p.status === 'completed').length },
    { id: 'pending', label: 'Pending', count: payments.filter(p => p.status === 'pending').length },
    { id: 'refunded', label: 'Refunded', count: payments.filter(p => p.status === 'refunded').length }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'from-green-500 to-emerald-500';
      case 'pending': return 'from-yellow-500 to-orange-500';
      case 'refunded': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'refunded': return <CheckCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getMethodIcon = (method) => {
    switch (method.toLowerCase()) {
      case 'credit card': return <CreditCard className="w-5 h-5" />;
      case 'upi': return <Wallet className="w-5 h-5" />;
      case 'net banking': return <TrendingUp className="w-5 h-5" />;
      case 'digital wallet': return <Wallet className="w-5 h-5" />;
      default: return <CreditCard className="w-5 h-5" />;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesFilter = activeFilter === 'all' || payment.status === activeFilter;
    const matchesSearch = searchQuery === '' || 
      payment.experience.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalSpent = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const refundedAmount = payments.filter(p => p.status === 'refunded').reduce((sum, p) => sum + p.amount, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6">
              <CreditCard className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Payment History
            </h1>
            <p className="text-slate-600 mt-2">Track your transactions and manage payment methods</p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Spent', value: `₹${totalSpent.toLocaleString()}`, color: 'from-emerald-500 to-teal-500' },
              { label: 'Pending Amount', value: `₹${pendingAmount.toLocaleString()}`, color: 'from-yellow-500 to-orange-500' },
              { label: 'Refunded', value: `₹${refundedAmount.toLocaleString()}`, color: 'from-blue-500 to-cyan-500' },
              { label: 'Total Transactions', value: payments.length, color: 'from-purple-500 to-pink-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />
                <div className="relative p-6 text-center">
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</h3>
                  <p className="text-slate-600 text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Filters and Search */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search payments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeFilter === filter.id
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Payment Methods</h2>
              <AnimatedButton
                variant="outline"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                Add New Method
              </AnimatedButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { type: 'Credit Card', number: '**** **** **** 4242', expiry: '12/25', isDefault: true },
                { type: 'UPI', id: 'user@okicici', isDefault: false },
                { type: 'Net Banking', bank: 'HDFC Bank', isDefault: false }
              ].map((method, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl p-4 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(method.type)}
                      <span className="font-medium text-slate-800">{method.type}</span>
                    </div>
                    {method.isDefault && (
                      <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-600">
                    {method.number && <p>{method.number}</p>}
                    {method.expiry && <p>Expires {method.expiry}</p>}
                    {method.id && <p>{method.id}</p>}
                    {method.bank && <p>{method.bank}</p>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Payments List */}
          <motion.div variants={itemVariants} className="space-y-6">
            {filteredPayments.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-16 bg-white rounded-2xl shadow-lg"
              >
                <CreditCard className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No payments found</h3>
                <p className="text-slate-600 mb-6">
                  {searchQuery || activeFilter !== 'all' 
                    ? 'Try adjusting your search criteria or filters.'
                    : 'Start booking experiences to see your payment history!'
                  }
                </p>
                <AnimatedButton
                  variant="primary"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                >
                  {searchQuery || activeFilter !== 'all' ? 'Clear Filters' : 'Explore Experiences'}
                </AnimatedButton>
              </motion.div>
            ) : (
              <div className="grid gap-6">
                {filteredPayments.map((payment) => (
                  <motion.div
                    key={payment.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Payment Info */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                                {payment.experience}
                              </h3>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(payment.date).toLocaleDateString('en-IN')}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Shield className="w-4 h-4" />
                                  <span>{payment.host}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="px-2 py-1 bg-slate-100 rounded-full text-xs">
                                    {payment.category}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-bold text-slate-800 mb-2">
                                ₹{payment.amount.toLocaleString()}
                              </div>
                              <div className="flex items-center justify-end space-x-1 mb-2">
                                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(payment.status)} text-white`}>
                                  {getStatusIcon(payment.status)}
                                  <span>{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</span>
                                </div>
                              </div>
                              <div className="text-sm text-slate-500">
                                {payment.transactionId}
                              </div>
                            </div>
                          </div>

                          {/* Payment Method */}
                          <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                              {getMethodIcon(payment.method)}
                              <div>
                                <p className="font-medium text-slate-800">{payment.method}</p>
                                <p className="text-sm text-slate-600">
                                  {payment.cardLast4 && `**** ${payment.cardLast4}`}
                                  {payment.upiId && payment.upiId}
                                  {payment.bankName && payment.bankName}
                                  {payment.walletName && payment.walletName}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-slate-600">Booking ID</p>
                              <p className="font-medium text-slate-800">{payment.bookingId}</p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-3">
                            <AnimatedButton
                              variant="outline"
                              size="sm"
                              icon={<Eye className="w-4 h-4" />}
                              onClick={() => setSelectedPayment(payment)}
                            >
                              View Details
                            </AnimatedButton>
                            
                            <AnimatedButton
                              variant="outline"
                              size="sm"
                              icon={<Download className="w-4 h-4" />}
                              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                            >
                              Download Receipt
                            </AnimatedButton>
                            
                            {payment.status === 'pending' && (
                              <AnimatedButton
                                variant="primary"
                                size="sm"
                                icon={<CheckCircle className="w-4 h-4" />}
                              >
                                Complete Payment
                              </AnimatedButton>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Payment Detail Modal */}
      <AnimatePresence>
        {selectedPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPayment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Payment Details</h2>
                  <button
                    onClick={() => setSelectedPayment(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-slate-500" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-800">
                      {selectedPayment.experience}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Amount</p>
                        <p className="font-medium text-slate-800">₹{selectedPayment.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Date</p>
                        <p className="font-medium text-slate-800">
                          {new Date(selectedPayment.date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600">Status</p>
                        <p className="font-medium text-slate-800 capitalize">{selectedPayment.status}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Method</p>
                        <p className="font-medium text-slate-800">{selectedPayment.method}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Transaction ID</p>
                        <p className="font-medium text-slate-800">{selectedPayment.transactionId}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Booking ID</p>
                        <p className="font-medium text-slate-800">{selectedPayment.bookingId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentsPage;