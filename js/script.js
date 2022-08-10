let tableOneInit = [[1, 2], [2, 4], [4, 6], [7, 7]];
for (let i = 0; i < tableOneInit.length; i++) {
    addRow('tableOne', tableOneInit[i]);
}

let tableTwoInit = [[2, -1], [4, -1], [6, 1], [9, 2], [11, 4]];
for (let i = 0; i < tableTwoInit.length; i++) {
    addRow('tableTwo', tableTwoInit[i]);
}

function tableThreeSize() { 
    return Math.min(tableOneValues.length, tableTwoValues.length) 
};

function delRow(currElement, table) {
    const parentRowIndex = currElement.parentNode.parentNode.rowIndex;
    document.getElementById(table).deleteRow(parentRowIndex);
}

function addRow(tableChosen, values) {
    const [a, b] = values;
    const table = document.getElementById(tableChosen);
    const row = table.insertRow(-1);
    const cellOne = row.insertCell(-1);
    const newInpOne = document.createElement("input");
    newInpOne.type="text";
    newInpOne.value=a;
    cellOne.append(newInpOne);
    const cellTwo = row.insertCell(1);
    const newInpTwo = document.createElement("input");
    newInpTwo.type="text";
    newInpTwo.value=b;
    cellTwo.append(newInpTwo);
    const cellThree = row.insertCell(2);
    const newInpThree = document.createElement("input");
    newInpThree.type = "button";
    newInpThree.value = "Delete";
    newInpThree.onclick = () => delRow(newInpThree, tableChosen);
    cellThree.append(newInpThree);
}

function addCalcRow(tableChosen, values) {
    const [a, b] = values;
    const table = document.getElementById(tableChosen);
    const row = table.insertRow(-1);
    const cellOne = row.insertCell(-1);
    const newInpOne = document.createElement("input");
    newInpOne.type="text";
    newInpOne.value=a;
    cellOne.append(newInpOne);
    const cellTwo = row.insertCell(1);
    const newInpTwo = document.createElement("input");
    newInpTwo.type="text";
    newInpTwo.value=b;
    cellTwo.append(newInpTwo);
}

function calculate() {
    tableOneValues = [];
    tableTwoValues = [];
    const tableOne = document.getElementById("tableOne");
    for (let i = 1; i < tableOne.rows.length; i++) {
        let row = tableOne.rows[i]
        tableOneValues.push([Number(row.cells[0].firstChild.value), Number(row.cells[1].firstChild.value)])
    }
        
    const tableTwo = document.getElementById("tableTwo");
    for (let i = 1; i < tableTwo.rows.length; i++) {
        let row = tableTwo.rows[i]
        tableTwoValues.push([Number(row.cells[0].firstChild.value), Number(row.cells[1].firstChild.value)])
    }
    
    const tableThree =  document.getElementById("tableThree");    
    const rowCount = tableThree.rows.length;
    
    for (let i = rowCount - 1; i > 0; i--) {
        tableThree.deleteRow(i);
    }

    const calcArray = [];
    for (let i = 0; i < tableThreeSize(); i++) {
        calcArray.push([(tableOneValues[i][0] + tableTwoValues[i][0]) / 2, (tableOneValues[i][1] + tableTwoValues[i][1]) / 2]);
        addCalcRow('tableThree', calcArray[i]);
    }
    buildGraph('canvas1', tableOneValues);
    buildGraph('canvas2', tableTwoValues);
    buildGraph('canvas3', calcArray);
}
calculate();

function drawAxes (canvasId) {
let canvas = document.getElementById(canvasId);
let ctx = canvas.getContext('2d');
    
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 1.0;
ctx.beginPath();
ctx.moveTo(250, 0);
ctx.lineTo(250, 500);
ctx.stroke();

ctx.moveTo(0, 250);
ctx.lineTo(500, 250);
ctx.stroke();
ctx.font = '8px serif';
ctx.textAlign = 'center';

const fillY = (i) => {
    ctx.fillText( `${i}`, 242, 252 - i * 10); 
    ctx.beginPath(); 
    ctx.moveTo(248, 250 - i * 10); 
    ctx.lineTo(252, 250 - i * 10); 
    ctx.stroke(); 
};
for(let i = -24; i <= 24; i++) { 
   if (i !== 0) fillY(i);
}
const fillX = (i) => {
    ctx.fillText( `${i}`, 250 + i * 10, 259); 
    ctx.beginPath(); 
    ctx.moveTo(250 + i * 10, 248); 
    ctx.lineTo(250 + i * 10, 252); 
    ctx.stroke(); 
};
for(let i = -24; i <= 24; i++) { 
    if (i !== 0) fillX(i);
 }
}

function buildGraph (canvasId, arr) {
    const array = arr.sort((a, b) => a[0] - b[0]);
    let canvas = document.getElementById(canvasId); 
    let ctx = canvas.getContext('2d');    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes(canvasId);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1.0; 
    ctx.beginPath();
    ctx.moveTo(250 + array[0][0] * 10, 250 - array[0][1] * 10);
    for (let i = 1; i < array.length; i++) { 
        ctx.lineTo(250 + array[i][0] * 10, 250 - array[i][1] * 10); 
     }
    ctx.stroke();
}