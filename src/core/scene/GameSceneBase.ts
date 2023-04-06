import { Container } from "pixi.js"

export abstract class GameSceneBase extends Container {
    public abstract update(): void
    public abstract resize(): void
}