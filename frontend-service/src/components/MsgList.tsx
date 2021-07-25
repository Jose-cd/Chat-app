import React from 'react'
import graphqlRequestClient from '../clients/graphqlRequestClient'
import { useGetMessagesQuery } from '../generated/graphql'

interface MsgListProps {}

export const MsgList: React.FC<MsgListProps> = () => {
  const { data } = useGetMessagesQuery(graphqlRequestClient)
  return (
    <ul>
      {data?.getMessages.map(({ username, message, id }) => (
        <li key={id}>
          <h3>{username}</h3>
          <p>{message}</p>
        </li>
      ))}
    </ul>
  )
}
