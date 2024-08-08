<template>
  <div class="max-w-[800px] h-full m-auto font-mono p-4">
    <form @submit.prevent.stop="handleSubmitSearch" class="flex gap-2">
      <input
        v-model.trim="state.uri"
        type="text"
        class="block flex-1 rounded-md border-0 py-1.5 px-3 outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
        placeholder="请输入分享连接或书籍id"
      />

      <button
        type="submit"
        :disabled="state.loading || state.downLoading"
        class="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-6 text-white"
        :class="[
          state.loading || state.downLoading
            ? 'cursor-not-allowed bg-primary-300'
            : ' bg-primary-600 hover:bg-primary-500 active:bg-primary-400'
        ]"
      >
        查询
      </button>
    </form>
    <div class="mt-2" v-if="state.page">
      <div class="rounded-lg shadow-md border border-gray-100 border-solid w-full p-2">
        <div class="flex">
          <img :src="state.page.thumbUri" class="w-1/4 max-w-32 aspect-[12/16]" />
          <div class="flex-1 min-w-0 ml-2">
            <div class="font-bold text-sm mb-2">{{ state.page.bookName }}</div>
            <div class="text-xs text-gray-800 mb-2">作者：{{ state.page.author }}</div>
            <div class="text-xs text-gray-500">最近更新：{{ state.page.lastChapterTitle }}</div>
          </div>
        </div>
        <button
          class="justify-center rounded-full w-full text-sm font-semibold py-2 px-6 text-white mt-2"
          :class="[
            state.loading || state.downLoading
              ? 'cursor-not-allowed bg-primary-300 animate-pulse'
              : ' bg-primary-600 hover:bg-primary-500 active:bg-primary-400'
          ]"
          :disabled="state.downLoading"
          @click="handleDownload(state.page)"
        >
          {{ state.job ? '更新' : '开始下载' }}
        </button>
      </div>
    </div>
    <div class="mt-2" v-else-if="state.loading">
      <div class="rounded-lg shadow-md border border-gray-100 border-solid w-full p-2">
        <div class="flex animate-pulse">
          <div class="w-1/4 max-w-32 aspect-[12/16] bg-slate-200 rounded-md"></div>
          <div class="flex-1 min-w-0 ml-2">
            <div class="mb-2 w-full h-6 bg-slate-200 rounded-md"></div>
            <div class="mb-2 w-2/4 h-4 bg-slate-200 rounded-md"></div>
            <div class="mb-2 w-3/4 h-4 bg-slate-200 rounded-md"></div>
            <div class="mb-2 w-3/4 h-4 bg-slate-200 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-xl font-bold mb-2 mt-2">免责声明</div>
    <div class="text-base">
      <p>
        此程序旨在用于与网络爬虫和网页处理技术相关的教育和研究目的。不应将其用于任何非法活动或侵犯他人权利的行为。用户对使用此程序引发的任何法律责任和风险负有责任，作者和项目贡献者不对因使用程序而导致的任何损失或损害承担责任。
      </p>
      <p>
        在使用此程序之前，请确保遵守相关法律法规以及网站的使用政策，并在有任何疑问或担忧时咨询法律顾问。
      </p>
    </div>
  </div>
  <Modal v-if="state.error" :message="state.error" @confirm="state.error = ''" />
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import Modal from './components/Modal.vue'
import type { PageType } from './types/page.d'

const state = reactive({
  uri: '',
  loading: false,
  downLoading: false,
  error: '',
  job: false,
  page: null as null | PageType
})
const reg = /^(http|https|ftp):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/

const tetapConfig = JSON.parse(new URLSearchParams(location.search).get('config') || '{}')

const config = {
  namespace: window.namespace,
  fanqieUri: 'https://fanqienovel.com/',
  serviceUri: tetapConfig.serviceUri
}

function handleSubmitSearch() {
  if (!state.uri) {
    state.error = '请输入分享连接'
    return
  }
  // 判断是否url链接或者数字id
  const isUri = reg.test(state.uri)
  // 正则判断是否纯数字
  const isFinite = /^\d+$/.test(state.uri)

  if (!isUri && !isFinite) {
    state.error = '请输入正确的分享连接或书籍id'
    return
  }
  let bookId = state.uri || undefined
  if (isUri) {
    // 获取书籍id
    const url = new URL(state.uri)
    bookId = url.searchParams.get('book_id') || url.pathname.split('/').pop()
    if (!/^\d+$/.test(bookId ?? '')) {
      state.error = '请输入正确的分享连接或书籍id'
      return
    }
  }
  if (!bookId) {
    state.error = '请输入正确的分享连接或书籍id'
    return
  }
  fetchBook(bookId)
}

async function fetchBook(bookId: string) {
  if (state.loading) return
  state.page = null
  state.loading = true
  const request = await fetch(`${config.fanqieUri}page/${bookId}`).catch((error) => {
    console.error('fetch book', error)
    state.error = '获取书籍信息失败，请检查书籍id是否正确'
  })
  const html = await request?.text().catch((error) => {
    console.log('fetch book text', error)
    state.error = '获取书籍信息失败，请检查书籍id是否正确'
  })
  if (!html) {
    state.error = '获取书籍信息失败，请检查书籍id是否正确'
    state.loading = false
    return
  }
  // 从html中取出window.__INITIAL_STATE__ 变量值
  const initialState = html.match(/window\.__INITIAL_STATE__\s*=\s*(\{.*?\});/)?.[1] || null
  if (!initialState) {
    state.error = '解析失败，请联系作者'
    state.loading = false
    return
  }
  try {
    const page = JSON.parse(initialState).page as PageType
    if (!page?.bookId) {
      throw new Error('解析失败，请联系作者')
    }
    const job = await fetch(
      `${config.serviceUri}/task/bycode/${page.bookId}?groupCode=${config.namespace}`
    )
      .then((res) => res.json())
      .catch((err) => {
        console.error('fetch task bycode', err)
        return null
      })
    state.job = !!job?.data
    state.page = page
    console.log(page)
  } catch (error) {
    state.error = '解析失败，请联系作者'
    state.loading = false
    return
  }
  state.loading = false
}

async function handleDownload(page: PageType) {
  console.log(new URL('./script.ts', import.meta.url))
  state.downLoading = true
  state.downLoading = false
  // await fetch(`${config.serviceUri}/task/push`, {
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     name: '下载' + page.bookName + '',
  //     code: page.bookId,
  //     groupCode: config.namespace,
  //     params: JSON.stringify(page),
  //     script: new URL('./script.ts', import.meta.url)
  //   })
  // })
}

onMounted(() => {
  fetch(`${config.serviceUri}/task-group/register`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code: config.namespace,
      name: '番茄小说下载',
      concurrency: 1,
      retryCount: 0,
      retryInterval: 3000,
      pollInterval: 3000
    })
  })
})
</script>
