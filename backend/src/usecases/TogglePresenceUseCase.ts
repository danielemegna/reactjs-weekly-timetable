import { Moment } from "moment"
import ShiftsRepository from "../repositories/ShiftsRepository"

export type DayHalf = 'morning' | 'afternoon'

export type TogglePresenceRequest = {
  date: Moment,
  dayHalf: DayHalf,
  username: string
}

export default (request: TogglePresenceRequest): void => {
    const repository = new ShiftsRepository()
    console.log("TogglePresenceRequest", request)
}
