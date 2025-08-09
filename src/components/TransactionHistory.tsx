import React from 'react'
import { Clock, CheckCircle, AlertCircle, ExternalLink, Copy } from 'lucide-react'

interface Transaction {
  id: string
  amount: string
  currency: string
  recipient: string
  status: 'pending' | 'completed' | 'failed'
  timestamp: Date
  hash?: string
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      case 'failed':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash)
  }

  return (
    <div className="glass-card rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
          <p className="text-gray-600">Track your recent payments and transfers</p>
        </div>
        <div className="text-sm text-gray-500">
          {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions yet</h3>
            <p className="text-gray-600">Your transaction history will appear here</p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="glass-card rounded-xl p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(transaction.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="text-lg font-semibold text-gray-900">
                        -{transaction.amount} {transaction.currency}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      To: <span className="font-mono">{transaction.recipient.slice(0, 8)}...{transaction.recipient.slice(-6)}</span>
                    </div>
                    
                    {transaction.hash && (
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="font-mono">{transaction.hash.slice(0, 10)}...{transaction.hash.slice(-8)}</span>
                        <button
                          onClick={() => copyHash(transaction.hash!)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">
                    {formatTime(transaction.timestamp)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {transaction.timestamp.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TransactionHistory
