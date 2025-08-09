import React, { useState } from 'react'
import { Send, DollarSign, User, Zap, AlertCircle, CheckCircle } from 'lucide-react'

interface PaymentFormProps {
  onPayment: (paymentData: any) => void
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onPayment }) => {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    currency: 'ETH',
    message: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<any>({})

  const currencies = [
    { symbol: 'ETH', name: 'Ethereum', icon: '⟠' },
    { symbol: 'USDC', name: 'USD Coin', icon: '💵' },
    { symbol: 'USDT', name: 'Tether', icon: '₮' },
    { symbol: 'DAI', name: 'Dai', icon: '◈' }
  ]

  const validateForm = () => {
    const newErrors: any = {}
    
    if (!formData.recipient) {
      newErrors.recipient = 'Recipient address is required'
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(formData.recipient)) {
      newErrors.recipient = 'Invalid Ethereum address'
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required'
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsProcessing(true)
    
    // Simulate processing delay
    setTimeout(() => {
      onPayment(formData)
      setFormData({ recipient: '', amount: '', currency: 'ETH', message: '' })
      setIsProcessing(false)
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="glass-card rounded-2xl p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
          <Send className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Send Payment</h2>
          <p className="text-gray-600">Transfer cryptocurrency securely on-chain</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipient Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Recipient Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={formData.recipient}
              onChange={(e) => handleInputChange('recipient', e.target.value)}
              placeholder="0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4"
              className={`glass-input w-full pl-10 pr-4 py-3 rounded-xl font-mono text-sm ${
                errors.recipient ? 'border-red-300 focus:border-red-500' : ''
              }`}
            />
          </div>
          {errors.recipient && (
            <div className="flex items-center space-x-1 mt-1 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{errors.recipient}</span>
            </div>
          )}
        </div>

        {/* Amount and Currency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                step="0.000001"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="0.00"
                className={`glass-input w-full pl-10 pr-4 py-3 rounded-xl ${
                  errors.amount ? 'border-red-300 focus:border-red-500' : ''
                }`}
              />
            </div>
            {errors.amount && (
              <div className="flex items-center space-x-1 mt-1 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{errors.amount}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={formData.currency}
              onChange={(e) => handleInputChange('currency', e.target.value)}
              className="glass-input w-full px-4 py-3 rounded-xl"
            >
              {currencies.map((currency) => (
                <option key={currency.symbol} value={currency.symbol}>
                  {currency.icon} {currency.symbol} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message (Optional) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Message (Optional)
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Add a note to this transaction..."
            rows={3}
            className="glass-input w-full px-4 py-3 rounded-xl resize-none"
          />
        </div>

        {/* Transaction Summary */}
        {formData.amount && formData.recipient && (
          <div className="glass-card rounded-xl p-4 bg-blue-50/50">
            <h3 className="font-semibold text-gray-900 mb-3">Transaction Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">{formData.amount} {formData.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Network Fee:</span>
                <span className="font-semibold">~0.002 ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-semibold">
                  {formData.currency === 'ETH' 
                    ? `${(Number(formData.amount) + 0.002).toFixed(6)} ETH`
                    : `${formData.amount} ${formData.currency} + 0.002 ETH`
                  }
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full glass-button bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
            isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Send Payment</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default PaymentForm
