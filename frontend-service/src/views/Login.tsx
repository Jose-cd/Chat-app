import React, { useState } from 'react'
import { LoginInput, useLoginMutation } from '../generated/graphql'

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const [login, { data, loading, error }] = useLoginMutation()
  const [loginData, setLoginData] = useState<LoginInput>({
    password: '',
    username: '',
  })

  console.log(data, loading, error)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login({
      variables: {
        data: loginData,
      },
    })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((data) => ({ ...data, [e.target.id]: e.target.value }))
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" onChange={onChange} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={onChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
