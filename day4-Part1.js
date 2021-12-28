async function main () {
    const bingoFetch = await fetch('https://adventofcode.com/2021/day/4/input');
    const input = await bingoFetch.text();
    const bingoNumbers = input.match(/((\d{1,2}),)+(\d{1,2})/)[0].split(",")
    // console.log(bingoNumbers[2])
    const bingoFieldNumbers = input.match(/(\d{1,2})/g).slice(bingoNumbers.length)
    bingo(bingoFieldNumbers, bingoNumbers)

}

main()

function bingo (data, numbers) {
    
    let bingoArray = [...new Array(5)].map(e => [...new Array(5)])
    let counter = 0;
    let allArrays = [];   
    for(let i = 0; i < 100; i++) {
        for(let m = 0; m < 5; m++) {
            for(let n = 0; n < 5; n++) {
                bingoArray[m][n] = data[counter]
                counter++;
            }
        }
        allArrays.push(bingoArray)
        bingoArray = [...new Array(5)].map(e => [...new Array(5)])
    }
    let newArray = []
    const newArray = allArrays.map(field => field.map(bingoarray => bingoarray.map(element => {
        for(let l = 0; l < numbers.length; l++) {
            if(element === numbers[l]) {
                element = true
            }
                     
        }
    })

    ))
    console.log(newArray)
}