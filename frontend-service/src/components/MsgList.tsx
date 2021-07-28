import { gql, useApolloClient, useQuery, useSubscription } from '@apollo/client'
import React, { useEffect } from 'react'
import { useMemo } from 'react'
import {
  GetMessagesDocument,
  Message,
  MsgSubscriptionDocument,
  useGetMessagesQuery,
  useMsgSubscriptionSubscription,
} from '../generated/graphql'

interface MsgListProps {}

// export const MsgList: React.FC<MsgListProps> = () => {
//   const { data } = useGetMessagesQuery()
//   const { data: subscriptionData } = useMsgSubscriptionSubscription()

//   console.log(subscriptionData)
//   return (
//     <ul>
//       {data?.getMessages.map(({ username, message, id }) => (
//         <li key={id}>
//           <h3>{username}</h3>
//           <p>{message}</p>
//         </li>
//       ))}
//     </ul>
//   )
// }

function MsgList(props: MsgListProps) {
  // super simplified dupe doc checker
  function isDuplicateDocument(
    newDocument: Message,
    existingDocuments: Message[]
  ) {
    return (
      newDocument.id !== null &&
      existingDocuments.some((doc) => newDocument.id === doc.id)
    )
  }
  const client = useApolloClient()
  const { data } = useGetMessagesQuery({
    fetchPolicy: 'network-only',
  })
  // console.log('data', data)
  const { data: subData } = useMsgSubscriptionSubscription({
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

  const sortedData = useMemo(
    () => data?.getMessages.sort((a, b) => b.createdAt! - a.createdAt!),
    [data]
  )

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

export default React.memo(MsgList)
