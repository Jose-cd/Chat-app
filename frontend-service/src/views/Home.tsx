import { AddMsg } from '../components/AddMsg'
import { MsgList } from '../components/MsgList'
import { WithAuth, withAuth } from '../shared/hocs/withAuth'
interface HomeProps {}

const Home = ({ user }: WithAuth<HomeProps>) => {
  console.log(user)
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

export default withAuth(Home)
