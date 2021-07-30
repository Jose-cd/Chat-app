import { useApolloClient } from '@apollo/client'
import React from 'react'
import {
  GetMessagesDocument,
  GetMessagesQuery,
  Message,
  useMsgSubscriptionSubscription,
} from '../generated/graphql'
import isDuplicateDocument from '../shared/utils/isDuplicateDocument'
interface MsgListProps {
  unsortedMsgs: GetMessagesQuery | undefined
}

function MsgList({ unsortedMsgs }: MsgListProps) {
  const client = useApolloClient()

  useMsgSubscriptionSubscription({
    onSubscriptionData: ({ subscriptionData }) => {
      // get all current Msgs
      const data = client.readQuery({ query: GetMessagesDocument })
      if (
        isDuplicateDocument(
          subscriptionData.data?.newMessages!,
          data.getMessages
        )
      ) {
        return
      }
      client.writeQuery({
        query: GetMessagesDocument,
        data: {
          getMessages: [
            ...data.getMessages,
            subscriptionData.data?.newMessages,
          ],
        },
      })
    },
  })

  let sortedMsgs: Message[] = unsortedMsgs?.getMessages.length
    ? [...unsortedMsgs?.getMessages]
    : []

  if (sortedMsgs.length >= 2) {
    console.log()
    sortedMsgs.sort(
      (a, b) =>
        new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
    )
  }

  return (
    <ul>
      {sortedMsgs?.map(({ username, message, id }) => (
        <li key={id}>
          <h3>{username}</h3>
          <p>{message}</p>
        </li>
      ))}
    </ul>
  )
}

export default React.memo(MsgList)
