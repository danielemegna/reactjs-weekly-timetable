import { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { BackendGateway, DayHalf } from '../../gateway/backend';
import { AuthenticatedUser } from '../../pages/weekly-timetable/WeeklyTimeTable';
import style from './WeeklyTimeTable.module.scss';
import { WeekShifts } from './WeekShifts';

const backendGateway = new BackendGateway(process.env.REACT_APP_BACKEND_URL ?? "undefined-REACT_APP_BACKEND_URL")

interface Props {
  startOfWeek: Moment,
  authenticatedUser: AuthenticatedUser
}

function colorFromWeekNumber(n: number): string {
  const CLASSES = [
    style.blue, style.green, style.purple,
    style.orange, style.yellow, style.pink, style.red
  ]
  return CLASSES[n % CLASSES.length]
}

function onShiftChosen(date: Moment, dayHalf: DayHalf, authenticatedUser: AuthenticatedUser): void {
  if (!authenticatedUser) return
  alert(`Shift chosen! ${date} ${dayHalf}`)
  backendGateway.togglePresence(date, dayHalf, authenticatedUser)
}

export default function WeeklyTimeTable({ startOfWeek, authenticatedUser }: Props) {
  const [weekShifts, setWeekShifts] = useState<WeekShifts | null>(null)
  const weekColor = colorFromWeekNumber(startOfWeek.week())

  useEffect(() => {
    backendGateway.fetchShiftsFor(startOfWeek).then((it) => {
      console.log(it)
      return setWeekShifts(it);
    })
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
              <td>{shift.date.format("ddd D")}</td>
              <td onClick={() => onShiftChosen(shift.date, 'morning', authenticatedUser)}>
                {shift.morning.map((p) => p.name).join(', ')}
              </td>
              <td onClick={() => onShiftChosen(shift.date, 'afternoon', authenticatedUser)}>
                {shift.afternoon.map((p) => p.name).join(', ')}
              </td>
            </tr>
          })
        }
      </tbody>
    </table>
  )
}