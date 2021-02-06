import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/auth/actions'
import { MainState } from '../redux/store'
import { readData } from '../util/asyncStorage'
import LoginNavigation from './loginNavigation'
import { TabNavigation } from './TabNavigation'

type OwnProps = {}

type Props = OwnProps

export const Navigation: FunctionComponent<Props> = ({}) => {
  const [navState, setNavState] = useState(false)
  const { isLoggedIn } = useSelector((state: MainState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const initialState = async () => {
      try {
        const userPersisted = await readData('user')
        console.log('userPersisted', userPersisted)

        if (userPersisted) {
          dispatch(login(userPersisted))
        }
        console.log('isLoggedIn', isLoggedIn)

        setNavState(true)
      } catch (e) {
        console.log(e)
      }
    }
    initialState()
  }, [])

  if (!navState) {
    return null
  }

  if (!isLoggedIn) {
    return <LoginNavigation />
  }

  return <TabNavigation />
}
