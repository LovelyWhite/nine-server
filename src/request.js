import axios from 'axios'

export const get = async (url) => {
    const result = await axios.get(url)
    if (result.status !== 200) {
        throw new Error(result.message)
    }
    return result.data
}

export const post = async (url, data) => {
    const result = await axios.post(url, data)
    if (result.status !== 200) {
        throw new Error(result.message)
    }
    return result.data
}
