import { Dispatch, SetStateAction, useRef, useState } from 'react'
import style from './AuthenticationModal.module.scss'

interface Props {
  setAuthenticatedUser: Dispatch<SetStateAction<String | null>>
}

export default function AuthenticationModal({ setAuthenticatedUser }: Props) {
  const [toBeShown, setToBeShown] = useState<boolean>(true)
  const [invalidUsername, setInvalidUsername] = useState<boolean>(false)
  const authenticationInputBox = useRef<HTMLInputElement>(null);

  const closeModal = () => setToBeShown(false)

  const onLoginSubmit = () => {
    const insertedUsername = authenticationInputBox.current?.value ?? "INVALID"
    console.log(`Login attempt with ${insertedUsername} ..`)
    const isUsernameValid = [
      'daniele',
      'claudia',
      'cinzia'
    ].includes(insertedUsername.toLowerCase())

    setInvalidUsername(!isUsernameValid)

    if (!isUsernameValid) return
    setAuthenticatedUser(insertedUsername)
    closeModal()
    console.log(`Successfully authenticated as ${insertedUsername} !`)
  }

  if (!toBeShown) return <></>

  return (
    <div className={style.overlay}>
      <form>
        <h3>🐱 Dimmi chi sei!</h3>
        <input type="text" ref={authenticationInputBox} />
        <br />
        {invalidUsername && (<label className={style.errormessage}>Username non valido!</label>)}
        <br />
        <button type="button" custom-color="blue" onClick={onLoginSubmit} >
          Entra
        </button>
        <button type="button" custom-color="yellow" onClick={closeModal} >
          Fammi solo guardare
        </button>
      </form>
    </div>
  )
}