export const WX_BASE_URL = 'https://api.weixin.qq.com/cgi-bin'
export const WX_COM_BASE_URL = 'https://qyapi.weixin.qq.com/cgi-bin'
export const DATABASE = 'mongodb://localhost:27017/nine'
export const REDIS_URL = 'redis://127.0.0.1:6379'

// sensitive start
export const APPID = process.env.NINE_SERVER_APPID
export const SECRET = process.env.NINE_SERVER_SECRET
export const TEMPLATEID = process.env.NINE_SERVER_TEMPLATEID
export const SERVER_BASE_URL = process.env.NINE_SERVER_SERVER_BASE_URL

export const WX_CROP_TOKEN = process.env.NINE_SERVER_WX_CROP_TOKEN
export const CROP_ID = process.env.NINE_SERVER_CROP_ID
export const AGENT_ID = process.env.NINE_SERVER_AGENT_ID
export const CROP_SECRET = process.env.NINE_SERVER_CROP_SECRET
//sensitive end

export const MOODS = {
  happy: {
    translate: '开心',
    emoji: '😃',
  },
  takeoff: {
    translate: '起飞',
    emoji: '🛫',
  },
  neutral: {
    translate: '一般',
    emoji: '😐',
  },
  emo: {
    translate: 'emo',
    emoji: '🖤',
  },
  complain: {
    translate: '抱怨',
    emoji: '😒',
  },
  unlucky: {
    translate: '倒霉',
    emoji: '😩',
  },
  comment: {
    translate: '吐槽',
    emoji: '🙊',
  },
  angry: {
    translate: '生气',
    emoji: '😠',
  },
  jealous: {
    translate: '吃醋',
    emoji: '😠',
  },
  sheep: {
    translate: '哒咩',
    emoji: '🙅‍♀️',
  },
  miss: {
    translate: '想念',
    emoji: '💭',
  },
  excited: {
    translate: '兴奋',
    emoji: '😆',
  },
  depressed: {
    translate: '郁闷',
    emoji: '😔',
  },
  lost: {
    translate: '失落',
    emoji: '😢',
  },
  wronged: {
    translate: '委屈',
    emoji: '😞',
  },
  sorrowful: {
    translate: '忧伤',
    emoji: '😔',
  },
  irritable: {
    translate: '烦躁',
    emoji: '😫',
  },
  down: {
    translate: '沮丧',
    emoji: '😞',
  },
  sad: {
    translate: '伤感',
    emoji: '😭',
  },
  afraid: {
    translate: '害怕',
    emoji: '😨',
  },
  worried: {
    translate: '担心',
    emoji: '😟',
  },
  energetic: {
    translate: '元气',
    emoji: '💪',
  },
  vitality: {
    translate: '活力',
    emoji: '💥',
  },
  helpless: {
    translate: '无奈',
    emoji: '😕',
  },
  angry2: {
    translate: '愤怒',
    emoji: '😡',
  },
  curlyhair: {
    translate: '卷王',
    emoji: '🤴',
  },
}
