import { GameState } from "./GameStates"
import { SpawnerConfig } from "./SpawnerConfig"

export class Model {
    public static spawn: SpawnerConfig = new SpawnerConfig()

    public static maxRoundSize = 15 // max balls for one round
    public static ballCounter = 0 // total balls counter
    public static score: number = 0 // user score for each round
    public static selectedColor: number = -1 // active color for round 

    public static gameState: GameState = "start" // game active state
}