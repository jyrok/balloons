import { Container, Graphics } from "pixi.js"
import { SceneManager } from "../../../core/scene/SceneManager"

export class GameLayer extends Container {
    private maskRect

    constructor() {
        super()
        this.maskRect = new Graphics()
        this.addChild(this.maskRect)
        this.resize()
    }

    resize() {
        this.maskRect.clear()
        this.maskRect.lineStyle(0)
        this.maskRect.beginFill(0xFFFFFF, 1.0)
        this.maskRect.drawRect(0, 100, SceneManager.fullRect.width, SceneManager.fullRect.height)
        this.mask = this.maskRect
    }
}