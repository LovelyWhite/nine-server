import {
  AGENT_ID,
  CROP_ID,
  CROP_SECRET,
  WX_COM_BASE_URL,
} from '../constants.js'
import { get, post } from '../request.js'

export const sendMessageToWecom = async (content, wecomUid) => {
  wecomUid = wecomUid ?? '@all'
  const getTokenUrl = `${WX_COM_BASE_URL}/gettoken?corpid=${CROP_ID}&corpsecret=${CROP_SECRET}`
  const getTokenRes = await get(getTokenUrl)
  const accesstoken = getTokenRes.access_token
  if (!accesstoken) {
    throw new Error('get access token error')
  }
  const sendMsgUrl = `${WX_COM_BASE_URL}/message/send?access_token=${accesstoken}`
  const sendMsgRes = await post(sendMsgUrl, {
    touser: wecomUid,
    agentid: AGENT_ID,
    msgtype: 'text',
    text: { content },
    duplicate_check_interval: 600,
  })
  return sendMsgRes.body
}
