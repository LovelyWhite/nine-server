import constants from '../constants.js'
import { get, post } from '../request.js'

const WX_BASE_URL = 'https://api.weixin.qq.com/cgi-bin'

const { APPID, SECRET, TEMPLATEID } = constants

export const sendMessage = async (message, openId, color, url) => {
  const accessToken = await getAccessToken()

  const template = generateTemplate(message || 'biu～', openId, color, url)
  await post(
    `${WX_BASE_URL}/message/template/send?access_token=${accessToken}`,
    template
  )
}

const getAccessToken = async () => {
  const { access_token } = await get(
    `${WX_BASE_URL}/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`
  )
  return access_token
}

const generateTemplate = (message, openId, color, url) => {
  return {
    touser: openId,
    topcolor: '#FF0000',
    url,
    template_id: TEMPLATEID,
    data: {
      msg: {
        value: message,
        color,
      },
    },
  }
}
