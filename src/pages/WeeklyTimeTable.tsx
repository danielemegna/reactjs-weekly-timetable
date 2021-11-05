import moment from "moment";
import 'moment/locale/it'
import { useState } from 'react';
import AuthenticationModal from '../components/AuthenticationModal';
import { ChangeWeekButton, Direction } from '../components/ChangeWeekButton';
import {default as WeeklyTimeTableComponent} from '../components/WeeklyTimeTable';

export default function WeeklyTimeTable() {
  const now = moment().clone().startOf('week')
  const [startOfWeek, setStartOfWeek] = useState(now)

  return (
    <div style={{ display: "inline-block", padding: "0.5em" }} >
      <AuthenticationModal />
      <WeeklyTimeTableComponent startOfWeek={startOfWeek} />
      <ChangeWeekButton
        direction={Direction.PREVIOUS}
        onClick={() => setStartOfWeek(startOfWeek.clone().subtract(2, 'week'))} />
      <ChangeWeekButton
        direction={Direction.NEXT}
        onClick={() => setStartOfWeek(startOfWeek.clone().add(1, 'week'))}
        />
    </div>
  )
}