import { ComponentType } from 'react'
import { useHistory } from 'react-router-dom'
import { useGetSessionQuery, UserSession } from '../../generated/graphql'

export type WithAuthProps = {
  user: UserSession
}

export type WithAuth<T> = WithAuthProps & T
/**
 * A HOC that ensures a user is authenticated in order to render the given
 * component.
 *
 * Usage:
 *
 *   type MyComponentProps = {
 *     myProp: ...
 *   }
 *
 *   function MyComponent({ user, myProp }: WithAuth<MyComponentProps>) {
 *     ...
 *   }
 *
 *   export default withAuth(MyComponent)
 *
 * snippet by https://github.com/brandonchinn178/worship-mate
 */
export const withAuth =
  <T,>(Component: ComponentType<WithAuth<T>>) =>
  (props: T) => {
    const history = useHistory()
    const sessionId = localStorage.getItem('sessionId')

    const { data, error, loading } = useGetSessionQuery({
      skip: !sessionId,
      variables: {
        id: sessionId!,
      },
    })

    if (error) {
      console.log(error)
    }

    if (loading) return null

    if (!data?.getSession.id) {
      history.push('/login')
      return <> </>
    }

    return <Component {...props} user={data!.getSession} />
  }
