import { Engine } from "./core/Engine"
import { SceneManager } from "./core/scene/SceneManager"
import { LoaderScene } from "./scenes/loader/LoaderScene"

initGame()

async function initGame() {
    //init pixi application
    await Engine.initialize()
    //run loader scene
    SceneManager.changeScene(new LoaderScene())
}