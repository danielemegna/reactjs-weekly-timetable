import style from './AuthenticationModal.module.scss'

export default function AuthenticationModal() {
	return (
		<div className={style.overlay}>
			<form>
				<h3>🐱 Dimmi chi sei!</h3>
				<input type="text" />
				<br/><br/>
				<button type="button" custom-color="blue">Entra</button>
				<button type="button" custom-color="yellow">Fammi solo guardare</button>
			</form>
		</div>
	)
}