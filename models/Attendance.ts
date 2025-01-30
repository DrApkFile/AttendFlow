import type { ObjectId } from "mongodb"

export interface Attendance {
  _id?: ObjectId
  linkId: string
  createdAt: Date
  expiresAt: Date
  submissions: {
    username: string
    submittedAt: Date
  }[]
}

