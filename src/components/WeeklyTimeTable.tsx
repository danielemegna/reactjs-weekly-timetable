import { Link } from "react-router-dom";
import style from './WeeklyTimeTable.module.scss'

export default function WeeklyTimeTable() {
  return (
    <>
      <table className={style.timetable + " " + style.green}>
        <thead><tr>
          <th>OTTOBRE</th>
          <th>Mattino</th>
          <th>Sera</th>
        </tr></thead>
        <tbody>
          <tr>
            <td>lun 25</td>
            <td>Eleonora</td>
            <td>Cristina &amp; girls</td>
          </tr>
          <tr>
            <td>mar 26</td>
            <td>Cristina</td>
            <td>Anna</td>
          </tr>
          <tr>
            <td>mer 27</td>
            <td>Anna</td>
            <td>Cristina &amp; girls</td>
          </tr>
          <tr>
            <td>gio 28</td>
            <td>Barbara, Laura, Elena, Cinzia</td>
            <td>Anna, Rossana</td>
          </tr>
          <tr>
            <td>ven 29</td>
            <td>Anna</td>
            <td>Sonia</td>
          </tr>
          <tr>
            <td>sab 30</td>
            <td>Eleonora, Cristina</td>
            <td>Anna</td>
          </tr>
          <tr>
            <td>dom 31</td>
            <td>Anna, Monica, Erika, Elisa</td>
            <td>Daniele, Stefania, Giona</td>
          </tr>
        </tbody>
      </table>

      <br />
      <Link to="/">Indietro</Link>
    </>
  )
}