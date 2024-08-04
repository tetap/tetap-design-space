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
    name: 'fanqie-download',
    title: '番茄小说下载',
    icon: 'https://img.z4a.net/images/2024/08/03/1143417865_1958658946_1086986363.webp',
    dev: 'http://localhost:28080',
    version: '1.0.0',
    windowOptions: {
      width: 375,
      height: 667,
      resize: false,
      resizable: false,
      maximizable: false
    },
    loading: false
  }
])
