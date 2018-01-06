import {Cell} from "./cell.js"

export class Game {
    
    constructor(width, height, cellSize=10) {
        let canvas = this._createCanvas(width, height);
        this.ctx = canvas.getContext("2d");
        this.cellSize = cellSize;
        this.curGen = this._createInitialGeneration(width, height, this.cellSize);
        this.nextGen = _.cloneDeep(this.curGen);
    }
    
    start(framerate=10) {
        if(framerate > 60) {
            console.warn("Framerate is limited to 60 fps.");
            framerate = 60;
        }
        setInterval(this._draw.bind(this), Math.floor(1000/framerate));
    }
    
    _createCanvas(width, height) {
        let body = document.querySelector("body");
        let canvas = document.createElement("canvas");
        canvas.setAttribute("id", "game_of_life");
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        body.appendChild(canvas);
        return canvas;
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
