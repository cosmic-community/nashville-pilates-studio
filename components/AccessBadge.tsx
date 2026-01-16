import { AccessType } from '@/types'

interface AccessBadgeProps {
  accessType?: AccessType
}

export default function AccessBadge({ accessType }: AccessBadgeProps) {
  if (!accessType) return null
  
  if (accessType.key === 'free') {
    return <span className="badge-free">Free</span>
  }
  
  return <span className="badge-premium">Premium</span>
}