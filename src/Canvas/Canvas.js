import React from 'react';


function filledNode(props) {
    const { ctx, indexCol, indexRow, color } = props;
    ctx.fillStyle = color;
    // X Y 相反？
    ctx.fillRect(indexCol * rectWidth, indexRow * rectWidth, rectWidth, rectWidth);
}


const rows = 150;
const columns = 200;

const rectWidth = 5;

const width = columns * rectWidth;
const height = rows * rectWidth;
// const width = 800;
// const height = 800;
var generation = 0;

const timestep = 100;

var nodes = [];

var canvasElementOffsetLeft;
var canvasElementOffsetTop;


// TODO:
// 1. 手动放置初始节点
// 2. 
// 3. 
// 4. 



function createNode(row, col, isLife, ctx) {
    var object = new Object();
    object.row = row;
    object.col = col;

    object.ctx = ctx;

    object.isLife = isLife;
    object.willLife = false;

    object.check = function () {
        // Any live cell with two or three neighbors survives.
        // Any dead cell with three live neighbors becomes a live cell.
        // All other live cells die in the next generation. Similarly, all other dead cells stay dead.

        let result = false;

        if (this.isLife) {
            let lifeCount = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const neighbourIndex = (this.row + i) * columns + this.col + j;
                    if (neighbourIndex >= 0 && neighbourIndex < rows * columns && this.row + i >= 0 && this.row + i < rows && this.col + j >= 0 && this.col + j < columns) {
                        if (i === 0 && j === 0) { }
                        else {
                            if (nodes[neighbourIndex].isLife)
                                lifeCount++;
                        }
                    }
                }
            }
            if (lifeCount === 2 || lifeCount === 3)
                result = true;
        }
        else {
            let lifeCount = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const neighbourIndex = (this.row + i) * columns + this.col + j;
                    if (neighbourIndex >= 0 && neighbourIndex < rows * columns && this.row + i >= 0 && this.row + i < rows && this.col + j >= 0 && this.col + j < columns) {
                        if (i === 0 && j === 0) { }
                        else {
                            if (nodes[neighbourIndex].isLife)
                                lifeCount++;
                        }
                    }
                }
            }
            if (lifeCount === 3)
                result = true;
        }


        // set willLife if this node will be a life in next generation
        this.willLife = result;
    }

    object.show = function () {
        filledNode({ ctx: this.ctx, indexCol: this.col, indexRow: this.row, color: this.isLife ? "#111111" : "#FFFFFB" });
    }

    object.nextGen = function () {
        this.isLife = this.willLife;
        this.willLife = false;
    }

    return object;
}

function draw() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    // drawCoordinateLine();

    // show finished particles


    nodes.forEach(node => {
        // chech the next state
        node.check();
        // show current on screen
        node.show();
    });

    nodes.forEach(node => {
        // update state to the next state
        node.nextGen();
    });

    generation++;
    console.log(generation);

    setTimeout(function () { window.requestAnimationFrame(draw); }, timestep);
    // var raf = window.requestAnimationFrame(draw);
}


class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.updateCanvas();

        var canvasElement = document.getElementById("canvas");
        canvasElementOffsetLeft = canvasElement.offsetLeft;
        canvasElementOffsetTop = canvasElement.offsetTop;

        this.gameStart();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');

        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = "#2C2C2C";
        ctx.fillRect(0, 0, width, height);

    }

    gameStart() {
        const ctx = this.refs.canvas.getContext('2d');
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if ((i * j) % 3 === 0) {
                    var node1 = createNode(i, j, true, ctx);
                    nodes.push(node1);
                }
                else {
                    var node2 = createNode(i, j, false, ctx);
                    nodes.push(node2);
                }
            }
        }

        draw();
    }

    render() {
        return (
            <canvas id='canvas' ref="canvas" width={width} height={height} />
        );
    }
}

export default Canvas;