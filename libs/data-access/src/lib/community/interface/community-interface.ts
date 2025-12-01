export interface Community {
  id: number
  admin: {
    id: number
    username: string
    avatarUrl: string
    subscribersAmount: number
    firstName: string
    lastName: string
    isActive: boolean
    stack: []
    city: string
    description: string
  }
  name: string
  themes: []
  tags: []
  bannerUrl: string
  avatarUrl: string
  description: string
  subscribersAmount: number
  createdAt: string
  isJoined: boolean
}
