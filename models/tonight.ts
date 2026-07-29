export interface Activity {
  id: number
  name: string
  isArchived: boolean
  createdAt: string
  imageUrl: string | null
}

export interface Pick {
  id: number
  activityId: number
  activityName: string
  pickedAt: string
}

export type StatsPeriod = "week" | "month" | "year"

export interface StatsBucket {
  activityId: number
  activityName: string
  count: number
}

export interface StatsResponse {
  period: StatsPeriod
  rangeStart: string
  rangeEnd: string
  total: number
  breakdown: StatsBucket[]
}
