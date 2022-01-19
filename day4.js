async function main() {
  const bingoFetch = await fetch("https://adventofcode.com/2021/day/4/input");
  const input = await bingoFetch.text();
  const bingoNumbers = input.match(/((\d{1,2}),)+(\d{1,2})/)[0].split(",");
  // console.log(bingoNumbers[2])
  const bingoFieldNumbers = input
    .match(/(\d{1,2})/g)
    .slice(bingoNumbers.length);
  bingo(bingoFieldNumbers, bingoNumbers);
}

main();

function bingo(data, numbers) {
  let bingoArray = [...new Array(5)].map((e) => [...new Array(5)]);
  let counter = 0;
  let allArrays = [];
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        bingoArray[j][k] = data[counter];
        counter++;
      }
    }
    allArrays.push(bingoArray);
    bingoArray = [...new Array(5)].map((e) => [...new Array(5)]);
  }

  let EmptyRow = [];
  let EmptyColumn = [];
  let allRowsandColumns = [];
  let saveArray = [];
  let secondCounter = 0;
  allArrays.map((field) => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        // console.log("row:" + field[i][j] + "column" + field[j][i]);
        EmptyRow[secondCounter] = field[i][j];
        EmptyColumn[secondCounter] = field[j][i];
        secondCounter++;
      }
      allRowsandColumns.push(EmptyRow);
      allRowsandColumns.push(EmptyColumn);
      //cloning
      saveArray.push(EmptyRow.map((x) => x));
      saveArray.push(EmptyColumn.map((x) => x));
      secondCounter = 0;
      EmptyRow = [];
      EmptyColumn = [];
    }
  });
  const everyElementIsTrue = (element) => element === true;
  function checkAvailability(arr, val) {
    return arr.some((arrVal) => val === arrVal);
  }

  let correctArrayandNumber = [];

  function findArray() {
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < allRowsandColumns.length; j++) {
        if (checkAvailability(allRowsandColumns[j], numbers[i])) {
          for (let k = 0; k < 5; k++) {
            if (allRowsandColumns[j][k] === numbers[i]) {
              allRowsandColumns[j][k] = true;
              if (allRowsandColumns[j].every(everyElementIsTrue)) {
                correctArrayandNumber.push(saveArray[j]);
                correctArrayandNumber.push(numbers[i]);
                return correctArrayandNumber;
              }
            }
          }
        }
      }
    }
  }
  const correctArray = findArray();
  const rightArray = correctArray[0];
  const correctNumber = correctArray[1];
  
  let correctRow = [];
    let correctColumn = [];
    let thirdCounter = 0;
    allArrays.map((field) => {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          // console.log("row:" + field[i][j] + "column" + field[j][i]);
          correctRow[thirdCounter] = field[i][j];
          correctColumn[thirdCounter] = field[j][i];
          thirdCounter++;  
        }
        if (JSON.stringify(correctRow) == JSON.stringify(rightArray) ||  (JSON.stringify(correctColumn) == JSON.stringify(rightArray))) {
            let rightArrayofNumbers = [];
            let ArrayofNumbers = [];
            let search2Array = []
            let booleanstrue = [];
            let solution = 0;
            search2Array.push(field)
            let searchArray = search2Array[0]
            console.log(searchArray);
            let column = searchArray.map(c => (c[0]))
            console.log(column)

            function controll () {
              for (let i = 0; i < numbers.length; i++) {
                for (let j = 0; j <  5; j++) {
                    for (let k = 0; k < 5; k++) {
                      if (searchArray[j][k] === numbers[i]) {
                        searchArray[j][k] = true;
                        booleanstrue.push( searchArray[j][k])
                      }
                      if (searchArray[k][j] === numbers[i]) {
                        searchArray[k][j] = true;
                        booleanstrue.push( searchArray[k][j])
                      }
                      let column = searchArray.map(c => (c[k]))
                      if(searchArray[j].every(everyElementIsTrue) || column.every(everyElementIsTrue)) {
                        return searchArray
                      }
                    }
                }
              }
            }

            const controll2 = controll()
            console.log("controll2: ",controll2)
            const differecne = controll2.map(array => array.filter(x => x !== true))
            const rightNumbers = differecne.flat();
            rightNumbers.map(e => {
              ArrayofNumbers.push(Number(e))
            })

            for(let i = 0; i < ArrayofNumbers.length; i++) {
                solution += ArrayofNumbers[i]
            }
            console.log(solution * correctNumber)
        } 
        correctRow = [];
        correctColumn = [];
        thirdCounter = 0;
      }
    });

}
