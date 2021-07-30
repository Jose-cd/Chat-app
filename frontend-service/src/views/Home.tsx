import { gql, useApolloClient } from '@apollo/client'
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { useRef } from 'react'
import { useState } from 'react'
import MsgList from '../components/MsgList'
import {
  GetMessagesDocument,
  useGetMessagesQuery,
  usePostMsgMutation,
} from '../generated/graphql'
import { WithAuth, withAuth } from '../shared/hocs/withAuth'
import useScrollToBottom from '../shared/hooks/useScrollToBottom'
import isDuplicateDocument from '../shared/utils/isDuplicateDocument'
interface HomeProps {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
)
const Home = ({ user }: WithAuth<HomeProps>) => {
  const client = useApolloClient()
  const classes = useStyles()
  const msgBoxRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')
  const [mutate] = usePostMsgMutation({
    update: (cache, { data: msg }) => {
      const data = client.readQuery({ query: GetMessagesDocument })
      if (isDuplicateDocument(msg!.postMessage, data.getMessages)) return
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

  const { data: unsortedMsgs } = useGetMessagesQuery()
  useScrollToBottom(msgBoxRef, unsortedMsgs) // hook to always focus to bottom

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <div></div>
      <Box width="70vh" height="70vh">
        <Box textAlign="center">
          <h2>Chat</h2>
        </Box>

        <Box minHeight="300px" maxHeight="300px" overflow="auto">
          <MsgList unsortedMsgs={unsortedMsgs} />
          <div ref={msgBoxRef} />
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
