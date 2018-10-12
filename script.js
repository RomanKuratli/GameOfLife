let SIZE = 100;
let MIDDLE = SIZE / 2;
let FIELD = getEmptyField();

function getEmptyField() {
    let field = [];
// initialize field
    for (let y = 0; y < SIZE; y++) {
        field[y] = [];
        for (let x = 0; x < SIZE; x++) {
            field[y][x] = false;
        }
    }
    return field;
}

let startPatterns = {
    cross: [
        {x: MIDDLE, y:MIDDLE},
        {x: MIDDLE-1, y:MIDDLE},
        {x: MIDDLE+1, y:MIDDLE},
        {x: MIDDLE, y:MIDDLE-1},
        {x: MIDDLE, y:MIDDLE+1}]
};

function clearField() {
    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            FIELD[y][x] = false;
        }
    }
}

function drawField() {
    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            let cell = document.getElementById("x" + x + "y" + y);
            if (FIELD[y][x]) { // field is alive
                cell.className = "alive"
            } else {
                cell.className = "";
            }
        }
    }
}



function init() {
    clearField();

    let table = document.getElementById("table");
    for (let y = 0; y < SIZE; y++) {
        let row = table.insertRow(-1);
        row.id = "y" + y;
        for (let x = 0; x < SIZE; x++) {
            let cell = row.insertCell(-1);
            cell.id = "x" + x + "y" + y;
        }
    }

    // fill startPatterns
    let sel = document.getElementById("startPatterns");
    for (let patternName in startPatterns) {
        let opt = document.createElement("option");
        opt.text = patternName;
        sel.add(opt);
    }
    console.log(startPatterns["cross"]);
}

function applyStartPattern() {
    clearField();
    let sel = document.getElementById("startPatterns");
    let aliveFields = startPatterns[sel.value];
    aliveFields.forEach(function (value, index) {
        FIELD[value.y][value.x] = true;
    });
    drawField();
}

function resetField() {
    clearField();
    drawField();
}

function evaluateAlive(x, y, field) {

}

function simulateStep() {
    let newField = getEmptyField();
    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            newField[y][x] = evaluateAlive(x, y, FIELD);
        }
    }
    FIELD = newField;
    drawField();
}