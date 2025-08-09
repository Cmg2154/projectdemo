import React, { useState } from 'react'
import { ChevronDown, Zap } from 'lucide-react'

interface NetworkSelectorProps {
  selectedNetwork: string
  onNetworkChange: (network: string) => void
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({ selectedNetwork, onNetworkChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const networks = [
    { id: 'ethereum', name: 'Ethereum', color: 'bg-blue-500', icon: '⟠' },
    { id: 'polygon', name: 'Polygon', color: 'bg-purple-500', icon: '⬟' },
    { id: 'bsc', name: 'BSC', color: 'bg-yellow-500', icon: '◆' },
    { id: 'arbitrum', name: 'Arbitrum', color: 'bg-blue-600', icon: '◉' }
  ]

  const currentNetwork = networks.find(n => n.id === selectedNetwork) || networks[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-button px-4 py-2 rounded-xl flex items-center space-x-2 hover:shadow-md transition-all duration-300"
      >
        <div className={`w-3 h-3 rounded-full ${currentNetwork.color}`}></div>
        <span className="text-sm font-medium text-gray-900">{currentNetwork.name}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl shadow-xl z-50">
          <div className="p-2">
            {networks.map((network) => (
              <button
                key={network.id}
                onClick={() => {
                  onNetworkChange(network.id)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-white/10 rounded-lg transition-colors ${
                  selectedNetwork === network.id ? 'bg-white/10' : ''
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${network.color}`}></div>
                <span className="text-gray-700">{network.name}</span>
                {selectedNetwork === network.id && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NetworkSelector
