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
  console.log("t :", findArray())
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
            let searchArray = [];
            let rightArrayofNumbers = [];
            let ArrayofNumbers = [];
            let solution = 0;
            searchArray.push(field)
            // console.log(searchArray)
            searchArray.map(array => {
                array.map(elements => {
                    elements.map(e => {
                        ArrayofNumbers.push(Number(e))
                    })
                })
            })

            rightArray.map(e => {
                // console.log(e)
                rightArrayofNumbers.push(Number(e))
            })
            console.log(ArrayofNumbers)
            console.log(rightArrayofNumbers)

            const difference = ArrayofNumbers.filter( x => !rightArrayofNumbers.includes(x));
            console.log(difference)
            for(let i = 0; i < difference.length; i++) {
                solution += difference[i]
            }
            console.log(solution * correctNumber)
        } 
        correctRow = [];
        correctColumn = [];
        thirdCounter = 0;
      }
    });

}
