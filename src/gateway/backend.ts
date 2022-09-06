import axios from "axios";
import { Moment } from "moment"
import { WeekShifts } from "../components/weekly-timetable/WeekShifts";


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
      return response.data as WeekShifts
    } catch (error) {
      console.log('Error fetching shifts', error)
      throw error
    }
  }

}
