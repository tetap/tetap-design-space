type ChapterListWithVolume$1Type = {
  itemId: string
  needPay: number
  title: string
  isChapterLock: boolean
  isPaidPublication: boolean
  isPaidStory: boolean
  volume_name: string
  firstPassTime: string
}

export type PageType = {
  author: string
  authorId: string
  bookId: string
  mediaId: string
  bookName: string
  status: number
  category: string
  thumbUri: string
  creationStatus: number
  wordNumber: number
  readCount: number
  description: string
  avatarUri: string
  creatorId: string
  lastPublishTime: string
  lastChapterItemId: string
  lastChapterTitle: string
  volumeNameList: Array<string>
  chapterListWithVolume: Array<Array<ChapterListWithVolume$1Type>>
  chapterTotal: number
  followStatus: number
  itemIds: Array<string>
  downloadCount: number
}
