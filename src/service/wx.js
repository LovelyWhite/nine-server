
import constants from '../constants.js'
import { get, post } from '../request.js'
import randomColor from '../../randomColor.js'

const WX_BASE_URL = 'https://api.weixin.qq.com/cgi-bin'

const { APPID, SECRET, TEMPLATEID } = constants

export const sendMessage = async (message, openId) => {
    if (!message) {
        message = '对方向你发送了一次爱心雨~'
    }
    const accessToken = await getAccessToken()
    const template = generateTemplate(message, openId)
    await post(`${WX_BASE_URL}/message/template/send?access_token=${accessToken}`, template)
}

const getAccessToken = async () => {
    const { access_token } = await get(`${WX_BASE_URL}/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`)
    return access_token
}

const generateTemplate = (message, openId) => {
    return {
        touser: openId,
        template_id: TEMPLATEID,
        data: {
            msg: {
                value: message,
                color: randomColor({
                    luminosity: 'random',
                    hue: 'random'
                }),
            },
        }
    }
}

