import { Assets, Container, Sprite } from "pixi.js"
import { SceneManager } from "../../../core/scene/SceneManager"

export class Clouds extends Container {
    private cloud_a: Sprite
    private cloud_b: Sprite

    constructor() {
        super()
        this.cloud_a = Sprite.from(Assets.get("cloud_a.png"))
        this.cloud_a.anchor.set(0.5)

        this.cloud_a.y = 90
        this.addChild(this.cloud_a)

        this.cloud_b = Sprite.from(Assets.get("cloud_b.png"))
        this.cloud_b.anchor.set(0.5)

        this.cloud_b.y = 90
        this.addChild(this.cloud_b)
    }

    resize() {
        this.x = SceneManager.gameArea.x
        this.y = SceneManager.gameArea.y

        this.cloud_a.x = 185 - SceneManager.gameArea.x
        this.cloud_b.x = 192 + SceneManager.gameArea.x
    }
}