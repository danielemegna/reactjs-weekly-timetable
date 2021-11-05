import { error } from 'console'
import { useState } from 'react'
import style from './AuthenticationModal.module.scss'

export default function AuthenticationModal() {

  const [toBeShown, setToBeShown] = useState<boolean>(true)
  const [invalidUsername, setInvalidUsername] = useState<boolean>(false)

  if (!toBeShown)
    return <></>

  return (
    <div className={style.overlay}>
      <form>
        <h3>🐱 Dimmi chi sei!</h3>
        <input type="text" />
        <br />
        {invalidUsername && (<label className={style.errormessage}>Username non valido!</label>)}
        <br />
        <button
          type="button"
          custom-color="blue"
          onClick={() => setInvalidUsername(true)}
        >
          Entra
        </button>
        <button
          type="button"
          custom-color="yellow"
          onClick={() => setToBeShown(false)}
        >
          Fammi solo guardare
        </button>
      </form>
    </div>
  )
}