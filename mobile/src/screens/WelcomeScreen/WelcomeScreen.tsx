import React, { Component } from 'react'
import { CenteredFillView, Text, CircleView } from 'styled-native-kit'


type OwnProps = {}

type Props = OwnProps

class WelcomeScreen extends Component<Props> {
    render() {
        return (
            <CenteredFillView>
                <CircleView size={240} color="purple">
                    <Text centered uppercase fontSize={26} color="white">
                        Welcome screen!
                    </Text>
                </CircleView>
            </CenteredFillView>
        )
    }
}

export default WelcomeScreen