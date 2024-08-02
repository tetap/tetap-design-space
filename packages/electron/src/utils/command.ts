import { app, powerSaveBlocker } from 'electron'
import '../logger/main'

// 默认情况下，如果 GPU 进程过于频繁地崩溃，Chromium 会禁用 3D API（例如 WebGL），直到在每个域的基础上重新启动。此功能禁用该行为。
app.disableDomainBlockingFor3DAPIs()
app.disableHardwareAcceleration()
powerSaveBlocker.start('prevent-app-suspension')
app.commandLine.appendSwitch('enable-web-bluetooth-new-permissions-backend')
app.commandLine.appendSwitch('enable-experimental-web-platform-features')
app.commandLine.appendSwitch('enable-web-bluetooth')
app.commandLine.appendSwitch('disable-hid-blocklist')
app.commandLine.appendSwitch('ignore-certificate-errors')
app.commandLine.appendSwitch('experimental-wasm-extended-const')
app.commandLine.appendSwitch('enable-webassembly-garbage-collection')
app.commandLine.appendSwitch('enable-experimental-webassembly-features')
app.commandLine.appendSwitch('prevent-app-suspension')
app.commandLine.appendSwitch('force_high_performance_gpu')
app.commandLine.appendSwitch('enable-webassembly-baseline')
app.commandLine.appendSwitch('enable-webassembly-tiering')
app.commandLine.appendSwitch('enable-experimental-webassembly-stack-switching')
app.commandLine.appendSwitch('enable-webassembly-lazy-compilation')
app.commandLine.appendSwitch('enable-webassembly-relaxed-simd')
app.commandLine.appendSwitch('canvas-oop-rasterization')
app.commandLine.appendSwitch('canvas-2d-layers')
app.commandLine.appendSwitch('allow-file-access-from-files')
// 禁用代理
app.commandLine.appendSwitch('--ignore-gpu-blocklist')
app.commandLine.appendSwitch('--enable-gpu-rasterization')
app.commandLine.appendSwitch('--enable-zero-copy')
