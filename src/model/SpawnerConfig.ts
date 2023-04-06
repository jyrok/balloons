export class SpawnerConfig {
    public spawnBottonY = 1000 // balloon start point Y 
    public killTopY = 0 // balloon destroy point Y 
    public spawnTime = 750 // const part for spawn new balloons

    public tintColors: Array<number> = [0xFFFFFF, 0x00FF00, 0x0000FF, 0xFF00FF]

    public balloonCounter: number = 0 // total balloon counter for round
    private colorCounter = 0 // counter for generate balloons with next color from tintColors

    // get random color from list (start new game)
    public get rndColor(): number {
        return Math.round(Math.random() * (this.tintColors.length - 1))
    }

    //get next color for balloon spawner
    public get nColor(): number {
        this.colorCounter++
        if (this.colorCounter === this.tintColors.length) {
            this.colorCounter = 0
        }
        return this.colorCounter
    }

    //get tint by color id
    public getTintColor(colorID: number) {
        return this.tintColors[colorID]
    }
}