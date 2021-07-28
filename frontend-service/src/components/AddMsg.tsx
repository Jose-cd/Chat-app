import { gql } from '@apollo/client'
import React from 'react'
import { usePostMsgMutation } from '../generated/graphql'

interface AddMsgProps {}

export const AddMsg: React.FC<AddMsgProps> = () => {
  const [mutate] = usePostMsgMutation({
    awaitRefetchQueries: true,
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
