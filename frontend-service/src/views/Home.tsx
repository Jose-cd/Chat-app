import React from 'react'
import graphqlRequestClient from '../clients/graphqlRequestClient'
import { useGetMessagesQuery } from '../generated/graphql'
interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const { data } = useGetMessagesQuery(graphqlRequestClient)

  console.log(data?.getMessages)
  return <div>Hello from home</div>
}
