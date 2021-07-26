import { gql } from '@apollo/client'
import React from 'react'
import { usePostMsgMutation } from '../generated/graphql'

interface AddMsgProps {}

export const AddMsg: React.FC<AddMsgProps> = () => {
  const [mutate] = usePostMsgMutation({
    update: (cache, { data: msg }) => {
      cache.modify({
        fields: {
          getMessages(existingMsgs) {
            const newMsgList = cache.writeFragment({
              data: msg?.postMessage,
              fragment: gql`
                fragment NewMsg on Message {
                  id
                  username
                  message
                  createdAt
                }
              `,
            })

            return [...existingMsgs, newMsgList]
          },
        },
      })
    },
  })
  return (
    <button
      onClick={() =>
        mutate({ variables: { msg: { msg: 'eqeqe', user: 'qeqeq' } } })
      }
    >
      post msg
    </button>
  )
}
