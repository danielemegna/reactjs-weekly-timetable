export type WeekShifts  = {
  date: String
  shifts: Shift[]
}

export type Shift = {
  date: String
  morning: Person[]
  afternoon: Person[]
}

export type Person = {
  name: String
  color: String
}
