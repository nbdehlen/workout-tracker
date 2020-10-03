import 'react-native-gesture-handler'
import App from './src'
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
  'Expected style',
  'Remote debugger is in a background tab',
])

export default App
