import { Assets, Container, Sprite } from "pixi.js"
import { SceneManager } from "../../../core/scene/SceneManager"

export class GameBG extends Container {
    private gameBG: Sprite
    private textureHeight: number = 0

    constructor() {
        super()
        this.gameBG = Sprite.from(Assets.get("gradient.png"))
        this.textureHeight = this.gameBG.height
        this.gameBG.anchor.set(0.5)
        this.addChild(this.gameBG)
    }

    resize() {
        this.x = SceneManager.fullRect.width / 2
        this.y = SceneManager.fullRect.height / 2
        this.scale.x = SceneManager.fullRect.width
        this.scale.y = SceneManager.fullRect.height / this.textureHeight
    }
}