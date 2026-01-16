import { DifficultyLevel } from '@/types'

interface DifficultyBadgeProps {
  difficulty?: DifficultyLevel
}

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  if (!difficulty) return null
  
  const colors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  }
  
  const colorClass = colors[difficulty.key] || 'bg-gray-100 text-gray-800'
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-pill text-sm font-medium ${colorClass}`}>
      {difficulty.value}
    </span>
  )
}