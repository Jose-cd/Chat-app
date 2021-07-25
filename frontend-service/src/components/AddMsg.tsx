import React from 'react'
import { useQueryClient } from 'react-query'
import graphqlRequestClient from '../clients/graphqlRequestClient'
import { usePostMsgMutation } from '../generated/graphql'

interface AddMsgProps {}

export const AddMsg: React.FC<AddMsgProps> = () => {
  const queryClient = useQueryClient()

  const { mutate } = usePostMsgMutation(graphqlRequestClient, {
    onSuccess: () => queryClient.invalidateQueries('getMessages'),
  })
  return (
    <button onClick={() => mutate({ msg: { msg: 'heheh', user: ' hehehe' } })}>
      post msg
    </button>
  )
}
