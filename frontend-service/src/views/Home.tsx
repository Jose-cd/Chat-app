import React from 'react'
import { AddMsg } from '../components/AddMsg'
import { MsgList } from '../components/MsgList'
interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{ width: '300px', height: '600px', overflow: 'auto' }}
        className="messages"
      >
        Messages
        <MsgList />
      </div>

      <div className="postMsg">
        <AddMsg />
      </div>
    </div>
  )
}
