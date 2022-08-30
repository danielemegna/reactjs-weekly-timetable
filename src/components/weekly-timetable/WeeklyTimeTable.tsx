import axios from 'axios';
import moment, { Moment } from 'moment'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import style from './WeeklyTimeTable.module.scss'
import { WeekShifts } from './WeekShifts'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

interface Props {
  startOfWeek: Moment
}

function colorFromWeekNumber(n: number): string {
  const CLASSES = [
    style.blue, style.green, style.purple,
    style.orange, style.yellow, style.pink, style.red
  ]
  return CLASSES[n % CLASSES.length]
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

export default function WeeklyTimeTable({ startOfWeek }: Props) {
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
            return <tr key={index}>
              <td>{moment(shift.date).format("ddd D")}</td>
              <td>{shift.morning.map((p) => p.name).join(', ')}</td>
              <td>{shift.afternoon.map((p) => p.name).join(', ')}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  )
}