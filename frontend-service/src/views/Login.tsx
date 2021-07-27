import React, { useState } from 'react'
import { LoginInput, useLoginMutation } from '../generated/graphql'
import {
  Grid,
  Paper,
  Avatar,
  makeStyles,
  Theme,
  createStyles,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
interface LoginProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    textCenter: {
      textAlign: 'center',
    },
    paperStyle: {
      padding: 30,
      height: 'auto',
      width: '280px',
      // margin: '20px auto',
    },
    mb5: {
      marginBottom: 15,
    },

    fullvh: {
      height: '100vh',
    },
  })
)
export const Login: React.FC<LoginProps> = () => {
  const classes = useStyles()
  const [login, { data, loading, error }] = useLoginMutation()
  const [loginData, setLoginData] = useState<LoginInput>({
    password: '',
    username: '',
  })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await login({
        variables: {
          data: loginData,
        },
      })
    } catch {
      console.log(error?.message)
    }

    if (!error && data) {
      localStorage.setItem('sessionId', data.login.id as string)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((data) => ({ ...data, [e.target.id]: e.target.value }))
  }

  return (
    <Box
      className={classes.fullvh}
      flex="1"
      display="flex"
      alignContent="center"
      justifyContent="center"
    >
      <Grid container justifyContent="center" alignItems="center">
        <Paper elevation={10} className={classes.paperStyle}>
          <Grid container direction="column" alignContent="center">
            <Avatar alt="user">
              <AccountCircleIcon />
            </Avatar>
          </Grid>

          <h2 className={classes.textCenter}>Sign In</h2>
          {/* <Alert severity="error">{error?.message}</Alert> */}
          <form onSubmit={onSubmit}>
            <TextField
              onChange={onChange}
              className={classes.mb5}
              type="text"
              label="Username"
              id="username"
              fullWidth
              required
            />
            <TextField
              onChange={onChange}
              className={classes.mb5}
              type="password"
              label="Password"
              id="password"
              fullWidth
              required
            />
            <Box my={3}>
              <Button
                disabled={loading}
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                {loading && (
                  <Box mr={1}>
                    <CircularProgress style={{ maxWidth: '12px'}} />
                  </Box>
                )}
                Log in
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Box>
  )
}
