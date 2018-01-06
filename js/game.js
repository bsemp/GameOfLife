import {Cell} from "./cell.js"

export class Game {
    
    constructor(width, height, options={cellSize:10, canvas:undefined}) {
        let gameCanvas = this._initCanvas(width, height, options.canvas);
        this.ctx = gameCanvas.getContext("2d");
        this.cellSize = options.cellSize;
        this.curGen = this._createInitialGeneration(width, height, this.cellSize);
        this.nextGen = _.cloneDeep(this.curGen);
        this.runnerId = undefined; // Holds the interval ID to be able to stop the animation
    }
    
    start(framerate=10) {
        if(framerate > 60) {
            console.warn("Framerate is limited to 60 fps.");
            framerate = 60;
        }
        this.runnerId = setInterval(this._draw.bind(this), Math.floor(1000/framerate));
    }
    
    stop() {
        clearInterval(this.runnerId);
        this.runnerId = undefined;
    }
    
    isRunning() {
        return (this.runnerId !== undefined);
    }
    
    _initCanvas(width, height, canvas) {
        let body = document.querySelector("body");
        let gameCanvas = canvas;
        if (!gameCanvas) {
            document.createElement("canvas");
            canvas.setAttribute("id", "game_of_life");
            body.appendChild(canvas);
        }
        gameCanvas.setAttribute("width", width);
        gameCanvas.setAttribute("height", height);
        return gameCanvas;
    }
    
    _createInitialGeneration(width, height, cellSize) {
        let generation = [];
        for (let i=0; i < Math.floor(width/cellSize); i++) {
            generation.push([]);
            for (let j=0; j < Math.floor(height/cellSize); j++) {
                let status =  Math.round(Math.random()*0.6);
                generation[i].push(new Cell(i, j, status));
            }
        }
        return generation;
    }
    
    _draw() {
        for (let i=0; i<this.curGen.length; i++) {
            for (let j=0; j<this.curGen[i].length; j++) {
                // Display Current Generation
                (this.curGen[i][j].status) ? this.ctx.fillStyle = "black" : this.ctx.fillStyle = "white";
                this.ctx.fillRect(this.curGen[i][j].x+i*(this.cellSize-1), this.curGen[i][j].y+j*(this.cellSize-1), this.cellSize, this.cellSize);
                // Process Next Generation
                this.nextGen[i][j].status = this.curGen[i][j].isAlive(this.curGen);
            }
        }
        // swap generations
        [this.curGen, this.nextGen] = [this.nextGen, this.curGen];
    }
}
