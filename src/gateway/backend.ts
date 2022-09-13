import axios from "axios";
import moment, { Moment } from 'moment';
import { Shift, WeekShifts } from "../components/weekly-timetable/WeekShifts";

export type DayHalf = 'morning' | 'afternoon'

export class BackendGateway {
  baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async fetchShiftsFor(startOfWeek: Moment): Promise<WeekShifts> {
    try {
      const requestUrl = this.baseUrl + '/week/' + startOfWeek.format('yyyy-MM-DD')
      console.log(`Fetching shifts from ${requestUrl} ...`)
      const response = await axios.get(requestUrl)
      console.log('Shifts fetched!')
      return this.adaptToWeekShifts(response.data)
    } catch (error) {
      console.log('Error fetching shifts', error)
      throw error
    }
  }

  private adaptToWeekShifts(json: any): WeekShifts {
    return {
      date: moment(json.date),
      shifts: json.shifts.map((shift: any) => this.adaptToShift(shift))
    } as WeekShifts
  }


  private adaptToShift(json: any) {
    return {
      date: moment(json.date),
      morning: json.morning,
      afternoon: json.afternoon,
    } as Shift;
  }

  async togglePresence(date: Moment, dayHalf: DayHalf, username: String): Promise<void> {
    try {
      const requestUrl = this.baseUrl + '/togglePresence/' + date.format('yyyy-MM-DD')
      console.log(`Toggle shifts presence at ${requestUrl} ...`)
      const response = await axios.post(requestUrl, { dayHalf: dayHalf, username: username })
      if(response.status !== 201) {
        throw Error(`Unexpected status code ${response.status}`)
      }
    } catch (error) {
      console.log('Error on shift toggle', error)
      throw error
    }
  }

}

