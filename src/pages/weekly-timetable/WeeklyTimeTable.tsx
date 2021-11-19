import moment from "moment";
import 'moment/locale/it'
import { useState } from 'react';
import AuthenticationModal from "../../components/authentication-modal/AuthenticationModal";
import { ChangeWeekButton, Direction as ChangeWeekButtonDirection } from "../../components/change-week-button/ChangeWeekButton";
import { default as WeeklyTimeTableComponent } from '../../components/weekly-timetable/WeeklyTimeTable';

export default function WeeklyTimeTable() {
  const now = moment().clone().startOf('week')
  const [startOfWeek, setStartOfWeek] = useState(now)

  return (
    <div style={{ display: "inline-block", padding: "0.5em" }} >
      <AuthenticationModal />
      <WeeklyTimeTableComponent startOfWeek={startOfWeek} />
      <ChangeWeekButton
        direction={ChangeWeekButtonDirection.PREVIOUS}
        onClick={() => setStartOfWeek(startOfWeek.clone().subtract(1, 'week'))} />
      <ChangeWeekButton
        direction={ChangeWeekButtonDirection.NEXT}
        onClick={() => setStartOfWeek(startOfWeek.clone().add(1, 'week'))}
      />
    </div>
  )
}