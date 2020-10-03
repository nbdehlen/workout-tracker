import React, { FunctionComponent } from 'react'
import { Text } from 'react-native'
import * as S from './styled'

type OwnProps = {}

type Props = OwnProps

export const Login: FunctionComponent<Props> = () => {
    return (
        <S.Container>
            <Text>Login</Text>
        </S.Container>
    )
}

export default Login
