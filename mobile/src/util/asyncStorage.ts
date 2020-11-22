import AsyncStorage from '@react-native-community/async-storage'

export const saveData = async (STORAGE_KEY: string, data) => {
  try {
    console.log(data)

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    console.log('Data successfully saved')
  } catch (e) {
    console.log(e)
  }
}

export const readData = async (STORAGE_KEY: string) => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY)

    if (!data) {
      console.log('No data')
    }
    console.log(JSON.parse(data))
    return JSON.parse(data)
  } catch (e) {
    console.log(e)
  }
}

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear()
    console.log('Storage successfully cleared!')
  } catch (e) {
    console.log(e)
  }
}
