import axios from 'axios';
import moment, { Moment } from 'moment'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AuthenticatedUser } from '../../pages/weekly-timetable/WeeklyTimeTable';
import style from './WeeklyTimeTable.module.scss'
import { WeekShifts } from './WeekShifts'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

interface Props {
  startOfWeek: Moment,
  authenticatedUser: AuthenticatedUser
}

type WeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6
type DayHalf = 'morning' | 'afternoon'

function colorFromWeekNumber(n: number): string {
  const CLASSES = [
    style.blue, style.green, style.purple,
    style.orange, style.yellow, style.pink, style.red
  ]
  return CLASSES[n % CLASSES.length]
}

function onShiftChosen(weekDayIndex: WeekDayIndex, dayHalf: DayHalf, authenticatedUser: AuthenticatedUser): void {
  if(!authenticatedUser) return

  alert(`Shift chosen! ${weekDayIndex} ${dayHalf}`)
}

async function fetchShifts(startOfWeek: Moment, setWeekShifts: Dispatch<SetStateAction<WeekShifts | null>>) {
  try {
    console.log(`Fetching shifts from ${BACKEND_URL} ...`)
    const response = await axios.get(BACKEND_URL + '/week/' + startOfWeek.format('yyyy-MM-DD'))
    console.log('Shifts fetched!')
    setWeekShifts(response.data)
  } catch (error) {
    console.log('Error fetching shifts', error)
    setWeekShifts(null)
  }
}

export default function WeeklyTimeTable({ startOfWeek, authenticatedUser }: Props) {
  const [weekShifts, setWeekShifts] = useState<WeekShifts | null>(null)
  const weekColor = colorFromWeekNumber(startOfWeek.week())

  useEffect(() => {
    fetchShifts(startOfWeek, setWeekShifts)
  }, [startOfWeek])

  return (
    <table className={style.timetable + " " + weekColor}>
      <thead>
        <tr>
          <th>{startOfWeek.format("MMMM").toUpperCase()}</th>
          <th>Mattino</th>
          <th>Sera</th>
        </tr>
      </thead>
      <tbody>
        {
          weekShifts && weekShifts.shifts.map((shift, index) => {
            const weekDayIndex = index as WeekDayIndex
            return <tr key={weekDayIndex}>
              <td>{moment(shift.date).format("ddd D")}</td>
              <td onClick={() => onShiftChosen(weekDayIndex, 'morning', authenticatedUser)}>
                {shift.morning.map((p) => p.name).join(', ')}
              </td>
              <td onClick={() => onShiftChosen(weekDayIndex, 'afternoon', authenticatedUser)}>
                {shift.afternoon.map((p) => p.name).join(', ')}
              </td>
            </tr>
          })
        }
      </tbody>
    </table>
  )
}