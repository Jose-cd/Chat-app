import {
  Box,
  Button,
  createStyles,
  Icon,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core'
import { AddMsg } from '../components/AddMsg'
import MsgList from '../components/MsgList'
import { WithAuth, withAuth } from '../shared/hocs/withAuth'
import SendIcon from '@material-ui/icons/Send'
import { usePostMsgMutation } from '../generated/graphql'
import { gql } from '@apollo/client'
import { useState } from 'react'
interface HomeProps {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
)
const Home = ({ user }: WithAuth<HomeProps>) => {
  const classes = useStyles()
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
  const [input, setInput] = useState('')

  const sendMsg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate({
      variables: {
        msg: {
          user: user.user?.username as string,
          msg: input,
        },
      },
    })
  }

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="70vh" height="70vh">
        <Box textAlign="center">
          <h2>Chat</h2>
        </Box>

        <Box minHeight="300px" maxHeight="300px" overflow="auto">
          <MsgList />
        </Box>

        <Box>
          <form onSubmit={sendMsg}>
            <Box display="inline-flex" width="100%">
              <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default withAuth(Home)
