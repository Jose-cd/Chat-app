import { Avatar, Box, Button, Grid, Paper, TextField } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Alert } from '@material-ui/lab'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { LoginInput, useRegisterMutation } from '../generated/graphql'
import { useLoginFormStyles } from './Login'

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
  const [registerData, setRegisterData] = useState<LoginInput>({
    password: '',
    username: '',
  })
  const history = useHistory()
  const classes = useLoginFormStyles()

  const [mutate, { data, loading, error }] = useRegisterMutation()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData((data) => ({ ...data, [e.target.id]: e.target.value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await mutate({
        variables: {
          data: registerData,
        },
      })

      history.push('/login')
    } catch {
      console.log(error?.message)
    }
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

          <h2 className={classes.textCenter}>Register</h2>
          {error && (
            <Box mb={2}>
              <Alert severity="error">{error?.message}</Alert>
            </Box>
          )}

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
                Register
              </Button>
            </Box>
          </form>
          <Box>
            Already have an account? <Link to="/login">click here!</Link>
          </Box>
        </Paper>
      </Grid>
    </Box>
  )
}
