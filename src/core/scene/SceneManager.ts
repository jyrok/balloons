import { Rectangle } from "pixi.js"
import { Engine } from "../Engine"
import { GameArea } from "./GameArea"
import { GameSceneBase } from "./GameSceneBase"

export class SceneManager {
    public static currentScene: GameSceneBase
    public static fullRect:Rectangle
    public static gameArea:GameArea

    public static get width(): number {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    }
    public static get height(): number {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    }

    public static get orientation(): OrientationType {
        return SceneManager.gameArea.orient
    }

    public static isLand():boolean {
        if(SceneManager.gameArea.orient === "landscape-primary" || SceneManager.gameArea.orient ==="landscape-secondary"){
            return true
        }
        return false
    }

    public static initialize(): void {
        SceneManager.gameArea = new GameArea()
        Engine.app.ticker.add(SceneManager.update)
        SceneManager.fullRect = new Rectangle(0,0,0,0)
        window.addEventListener("resize", SceneManager.resize)
        SceneManager.resize()
    }

    public static changeScene(newScene: GameSceneBase):void {
        if (SceneManager.currentScene) {
            Engine.app.stage.removeChild(SceneManager.currentScene)
            SceneManager.currentScene.destroy()
        }

        SceneManager.currentScene = newScene
        Engine.app.stage.addChild(SceneManager.currentScene)
        SceneManager.resize()
    }

    private static update(): void {
        if (SceneManager.currentScene) {
            SceneManager.currentScene.update()
        }
    }

    public static resize(): void {
        SceneManager.gameArea.resize(SceneManager.width, SceneManager.height)
        SceneManager.fullRect = new Rectangle(0,0,Math.floor(SceneManager.width/SceneManager.gameArea.scale), Math.floor(SceneManager.height/SceneManager.gameArea.scale))
        if (SceneManager.currentScene) {
            SceneManager.currentScene.resize()
            SceneManager.currentScene.scale = {x:SceneManager.gameArea.scale, y:SceneManager.gameArea.scale}
        }
    }
}