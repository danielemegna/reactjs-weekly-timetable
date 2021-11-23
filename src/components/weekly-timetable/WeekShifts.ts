import { Moment } from "moment"

export type WeekShifts  = {
  date: Moment
  shifts: Shift[]
}

export type Shift = {
  date: Moment
  morning: Person[]
  afternoon: Person[]
}

export type Person = {
  name: String
  color: String
}
