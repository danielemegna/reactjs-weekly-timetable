import moment from "moment";
import 'moment/locale/it'
import style from './WeeklyTimeTable.module.scss'

function shiftsFromDate(date: moment.Moment): string[][] {
  return [
    ["Cristina","Anna"],
    ["Anna","Cristina & girls"],
    ["Eleonora, Cristina","Anna"],
    ["Anna","Sonia"],
    ["Eleonora","Cristina & girls"],
    ["Anna, Monica, Erika, Elisa","Daniele, Stefania, Giona"],
    ["Barbara, Laura, Elena, Cinzia","Anna, Rossana"],
  ].sort( () => .5 - Math.random() );
}

function colorFromWeekNumber(n: number): string {
  const CLASSES = [
    style.blue, style.green, style.purple,
    style.orange, style.yellow, style.pink, style.red
  ]
  return CLASSES[n % CLASSES.length]
}

export default function WeeklyTimeTable() {
  const weekDay = moment()
  const startOfWeek = weekDay.clone().startOf('week')
  const shifts = shiftsFromDate(weekDay)
  const weekColor = colorFromWeekNumber(weekDay.week())

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
          shifts.map((shift => {
            const row = <tr key={startOfWeek.format()}>
              <td>{startOfWeek.format("ddd D")}</td>
              <td>{shift[0]}</td>
              <td>{shift[1]}</td>
            </tr>
            startOfWeek.add(1, 'days')
            return row
          }))
        }
      </tbody>
    </table>
  )
}