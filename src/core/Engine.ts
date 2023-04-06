import { Application } from "pixi.js"
import { SceneManager } from "./scene/SceneManager"

// core application logic
export class Engine {
    public static app: Application

    public static async initialize() {
        Engine.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            resizeTo: window,
            autoDensity: true,
            backgroundColor: 0x000000,
        })

        SceneManager.initialize()
    }
}

export class GameUtils {
    static async wait(delay: number) {
        return new Promise(resolve => setTimeout(resolve, delay))
    }
}
