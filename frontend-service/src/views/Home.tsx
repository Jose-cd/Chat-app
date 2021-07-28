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
import { MsgList } from '../components/MsgList'
import { WithAuth, withAuth } from '../shared/hocs/withAuth'
import SendIcon from '@material-ui/icons/Send'
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
  
  const sendMsg = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

        <Box minHeight="400px"></Box>

        <Box>
          <form onSubmit={sendMsg}>
            <Box display="inline-flex" width="100%">
              <TextField type="text" fullWidth />
              <Button
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
