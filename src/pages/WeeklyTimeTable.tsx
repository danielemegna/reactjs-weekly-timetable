import AuthenticationModal from '../components/AuthenticationModal';
import {default as WeeklyTimeTableComponent} from '../components/WeeklyTimeTable';

export default function WeeklyTimeTable() {
	return (
		<>
			<AuthenticationModal />
			<WeeklyTimeTableComponent />
		</>
	)
}