import { Application, Point } from 'pixi.js'

export class AppScenes {
  app: Application
  /**
   *
   */
  constructor(app: Application) {
    this.app = app
    app.renderer.events.domElement.addEventListener('contextmenu', this._disableOnContextMenu)
    app.renderer.events.domElement.addEventListener('wheel', this._wheel.bind(this))
  }
  private _disableOnContextMenu = (e: MouseEvent) => e.preventDefault()

  private _wheel(event: WheelEvent) {
    event.preventDefault()
    if (event.ctrlKey || event.metaKey) {
      const globalPos = new Point(event.clientX, event.clientY)
      const delta = event.deltaY
      const oldZoom = this.app.stage.scale.x
      const newZoom = oldZoom * 0.999 ** delta
      this.applyZoom(oldZoom, newZoom, globalPos)
    } else if (event.shiftKey) {
      const delta = event.deltaY
      this.app.stage.x -= delta
    } else {
      const delta = event.deltaY
      this.app.stage.y -= delta
    }
  }

  applyZoom(oldZoom: number, newZoom: number, pointerGlobalPos: Point) {
    const oldStageMatrix = this.app.stage.localTransform.clone()
    const oldStagePos = oldStageMatrix.applyInverse(pointerGlobalPos)
    const dx = oldStagePos.x * oldZoom - oldStagePos.x * newZoom
    const dy = oldStagePos.y * oldZoom - oldStagePos.y * newZoom
    this.app.stage.updateTransform({
      x: this.app.stage.position.x + dx,
      y: this.app.stage.position.y + dy,
      scaleX: newZoom,
      scaleY: newZoom
    })
  }
}
