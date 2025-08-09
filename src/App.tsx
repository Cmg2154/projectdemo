import React, { useState } from 'react'
import { Wallet, Send, Zap, CheckCircle } from 'lucide-react'

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleConnect = () => {
    setIsConnected(true)
  }

  const handleSend = () => {
    if (!amount || !recipient) return
    
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setShowSuccess(true)
      setAmount('')
      setRecipient('')
      setTimeout(() => setShowSuccess(false), 3000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-md mx-auto mt-20">
        <div className="glass-card rounded-3xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ChainPay Demo</h1>
          <p className="text-gray-600 mb-8">Simple on-chain payments</p>

          {!isConnected ? (
            <button
              onClick={handleConnect}
              className="glass-button bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 mx-auto hover:shadow-lg transition-all duration-300"
            >
              <Wallet className="w-5 h-5" />
              <span>Connect Wallet</span>
            </button>
          ) : (
            <div className="space-y-6">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x742d35Cc..."
                  className="glass-input w-full px-4 py-3 rounded-xl font-mono text-sm"
                />
              </div>

              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="glass-input w-full px-4 py-3 rounded-xl"
                />
              </div>

              <button
                onClick={handleSend}
                disabled={!amount || !recipient || isProcessing}
                className="w-full glass-button bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Payment</span>
                  </>
                )}
              </button>

              {showSuccess && (
                <div className="glass-card rounded-xl p-4 bg-green-50/50 flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-700 font-medium">Payment sent successfully!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
