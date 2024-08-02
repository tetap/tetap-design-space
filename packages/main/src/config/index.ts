import { reactive, h } from 'vue'
import logo from '@/assets/logo.webp'
import { Store, Setting } from '@/icons'
export const SiteConfig = {
  logo,
  sider: [
    {
      key: '/dashboard',
      label: '工具箱',
      title: '工具箱',
      icon: () => h(Store)
    },
    {
      key: '/setting',
      label: '设置',
      title: '设置',
      icon: () => h(Setting)
    }
  ]
}

export const AppStoreConfig = reactive([
  {
    id: 1,
    title: '番茄小说下载',
    icon: new URL('@/assets/store/fanqie.webp', import.meta.url).href,
    src: '',
    loading: false
  }
])
