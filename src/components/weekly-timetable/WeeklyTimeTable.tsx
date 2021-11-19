import moment from 'moment'
import style from './WeeklyTimeTable.module.scss'

interface Props {
  startOfWeek: moment.Moment
}

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

export default function WeeklyTimeTable({startOfWeek}: Props) {
  const shifts = shiftsFromDate(startOfWeek)
  const weekColor = colorFromWeekNumber(startOfWeek.week())

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
          shifts.map((shift, index) => {
            return <tr key={index}>
              <td>{startOfWeek.clone().add(index, 'days').format("ddd D")}</td>
              <td>{shift[0]}</td>
              <td>{shift[1]}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  )
}