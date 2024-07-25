import { reactive } from 'vue'
import logo from '@/assets/logo.webp'
import { mdiAppleKeyboardCommand, mdiCogOutline } from '@mdi/js'

export const SiteConfig = {
  logo,
  sider: [
    [
      {
        path: '/dashboard',
        title: '工具箱',
        prependIcon: mdiAppleKeyboardCommand
      }
    ],
    [
      {
        path: '/setting',
        title: '设置',
        prependIcon: mdiCogOutline
      }
    ]
  ]
}

export const AppStoreConfig = reactive([
  {
    id: 1,
    title: '短视频去水印',
    description: '提供一键去除抖音、快手、西瓜视频、小红书、TikTok等短视频平台上的水印功能。',
    icon: new URL('@/assets/store/clear_watermark.webp', import.meta.url).href,
    src: '',
    devSrc: '',
    loading: false
  }
])
