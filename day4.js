async function main() {
    const bingoFetch = await fetch('https://adventofcode.com/2021/day/4/input');
    const input = await bingoFetch.text();
    const bingoNumbers = input.match(/((\d{1,2}),)+(\d{1,2})/)[0].split(",")
    // console.log(bingoNumbers[2])
    const bingoFieldNumbers = input.match(/(\d{1,2})/g).slice(bingoNumbers.length)
    bingo(bingoFieldNumbers, bingoNumbers)

}

main()

function bingo(data, numbers) {

    let bingoArray = [...new Array(5)].map(e => [...new Array(5)])
    let counter = 0;
    let allArrays = [];
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 5; j++) {
            for (let k = 0; k < 5; k++) {
                bingoArray[j][k] = data[counter]
                counter++;
            }
        }
        allArrays.push(bingoArray)
        bingoArray = [...new Array(5)].map(e => [...new Array(5)])
    }

    let EmptyArray=[...new Array(5)];
    let allRowsandColumns= []
    let secondCounter = 0;
    allArrays.map(field => {
        for(let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                console.log("row:" + field[i][j] + "column" + field[j][i]);
                EmptyArray[secondCounter] = field[i][j];
                allRowsandColumns.push(EmptyArray);
                EmptyArray=[...new Array(5)];
                secondCounter++;
                EmptyArray[secondCounter] = field[j][i];
                allRowsandColumns.push(EmptyArray);
                EmptyArray=[...new Array(5)];
                secondCounter++;
            }
        }
    })
    console.log(allRowsandColumns)

    function checkRowandColumn(Row, Column) {
        Row.map(e => {
            if (e === true)
                if (Row === [true, true, true, true, true]) {
                    return Row
                }
        })
        Column.map(e => {
            if (e === true)
                if (Column === [true, true, true, true, true]) {
                    return Column
                }
        })
    }
}