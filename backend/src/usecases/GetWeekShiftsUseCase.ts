import { Moment } from "moment"
import ShiftsRepository from "../repositories/ShiftsRepository"
import { WeekShifts } from "../WeekShifts"

const GetWeekShiftsUseCase = (date: Moment) : WeekShifts => {
    const repository = new ShiftsRepository()
    return repository.getFor(date)
}

export default GetWeekShiftsUseCase