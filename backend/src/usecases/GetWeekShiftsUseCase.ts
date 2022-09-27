import { Moment } from "moment"
import ShiftsRepository from "../repositories/ShiftsRepository"
import { WeekShifts } from "../WeekShifts"

export default (date: Moment) : WeekShifts => {
    const repository = new ShiftsRepository()
    return repository.getFor(date)
}
