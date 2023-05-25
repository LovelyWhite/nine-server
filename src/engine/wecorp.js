import {
  AGENT_ID,
  CORP_ID,
  CORP_SECRET,
  WX_CORP_BASE_URL,
} from '../constants.js'
import { get, post } from '../request.js'

export const sendMessage = async (content, weCorpUid, color, url) => {
  weCorpUid = weCorpUid ?? '@all'
  const getTokenUrl = `${WX_CORP_BASE_URL}/gettoken?corpid=${CORP_ID}&corpsecret=${CORP_SECRET}`
  const getTokenRes = await get(getTokenUrl)
  const accesstoken = getTokenRes.access_token
  if (!accesstoken) {
    throw new Error('get access token error')
  }
  const sendMsgUrl = `${WX_CORP_BASE_URL}/message/send?access_token=${accesstoken}`
  await post(sendMsgUrl, {
    touser: weCorpUid,
    msgtype: 'textcard',
    agentid: AGENT_ID,
    textcard: {
      title: '对方给你发送了一次爱心雨～',
      description: `<div class='gray'>${content}</div>`,
      url
    },
  })
}
