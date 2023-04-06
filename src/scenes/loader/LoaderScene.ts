import { Assets } from "pixi.js"
import { GameSceneBase } from "../../core/scene/GameSceneBase"
import { SceneManager } from "../../core/scene/SceneManager"
import { GameScene } from "../maingame/GameScene"

export class LoaderScene extends GameSceneBase {
    constructor() {
        super()
        this.loadAssets()
    }

    async loadAssets() {
        await Assets.init({
            manifest: "./manifest.json"
        })

        await Assets.loadBundle('game-screen', this.loadProgress)

        //load main game scene
        SceneManager.changeScene(new GameScene())
    }

    loadProgress() {
        // visualisation for loader progress was skipped
    }

    update() { }

    resize() { }
}