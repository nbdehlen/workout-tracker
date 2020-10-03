import React, { FunctionComponent } from 'react'
import { Text } from 'react-native'
import * as S from './styled'

type OwnProps = {}

type Props = OwnProps

export const PLACEHOLDER: FunctionComponent<Props> = () => {
    return (
        <S.Container>
            <Text>PLACEHOLDER</Text>
        </S.Container>
    )
}

export default PLACEHOLDER
