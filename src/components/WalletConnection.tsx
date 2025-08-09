import React, { useState } from 'react'
import { Wallet, ChevronDown, LogOut, Copy, ExternalLink } from 'lucide-react'

interface WalletConnectionProps {
  isConnected: boolean
  walletAddress: string
  onConnect: (address: string) => void
  onDisconnect: () => void
}

const WalletConnection: React.FC<WalletConnectionProps> = ({
  isConnected,
  walletAddress,
  onConnect,
  onDisconnect
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleConnect = () => {
    // Simulate wallet connection
    const mockAddress = '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4'
    onConnect(mockAddress)
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
  }

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        className="glass-button bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
      >
        <Wallet className="w-5 h-5" />
        <span>Connect Wallet</span>
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="glass-button px-4 py-3 rounded-xl flex items-center space-x-3 hover:shadow-md transition-all duration-300"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <Wallet className="w-4 h-4 text-white" />
        </div>
        <div className="text-left">
          <div className="text-sm font-semibold text-gray-900">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </div>
          <div className="text-xs text-gray-500">Connected</div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 glass-card rounded-xl shadow-xl z-50">
          <div className="p-4 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Wallet Connected</div>
                <div className="text-sm text-gray-600 font-mono">
                  {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-2">
            <button
              onClick={copyAddress}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-white/10 rounded-lg transition-colors"
            >
              <Copy className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">Copy Address</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-white/10 rounded-lg transition-colors">
              <ExternalLink className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">View on Explorer</span>
            </button>
            
            <hr className="my-2 border-white/20" />
            
            <button
              onClick={onDisconnect}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
            >
              <LogOut className="w-4 h-4" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WalletConnection
