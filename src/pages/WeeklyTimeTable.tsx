import AuthenticationModal from '../components/AuthenticationModal';
import { ChangeWeekButton, Direction } from '../components/ChangeWeekButton';
import {default as WeeklyTimeTableComponent} from '../components/WeeklyTimeTable';

export default function WeeklyTimeTable() {
  return (
    <div style={{ display: "inline-block", padding: "0.5em" }}>
      <AuthenticationModal />
      <WeeklyTimeTableComponent />
      <ChangeWeekButton direction={Direction.NEXT} />
      <ChangeWeekButton direction={Direction.PREVIOUS} />
    </div>
  )
}