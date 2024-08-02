const fsg = require('fast-glob')
const fs = require('fs')
const path = require('path')

// 获取所有svg文件
const svgFiles = fsg.sync(fsg.convertPathToPattern(path.join(__dirname, './static/**/*.svg')))

function capitalizeFirstLetter(string) {
  return string.toLowerCase().replace(/\b[a-z]/g, function (match) {
    return match.toUpperCase()
  })
}

let content = ''

// 生成icon.ts文件
svgFiles.forEach((file) => {
  // 获取文件名
  const fileName = capitalizeFirstLetter(path.basename(file, '.svg'))
  // 获取./static/文件夹路径
  const filePath = path.join(__dirname, './static')
  // 获取相对路径
  const relativePath = path.relative(filePath, file).replace(/\\/g, '/')
  // 写入icon.ts文件
  content += `export { default as ${fileName} } from './static/${relativePath}?component'\n`
})

fs.writeFileSync(path.join(__dirname, './index.ts'), content)
