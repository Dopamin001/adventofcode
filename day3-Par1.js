async function main () {
    const response = await fetch('https://adventofcode.com/2021/day/3/input');
    const numbers = await response.text();
    const binary = numbers.match(/(\d{12})/g);
    calculate(binary)
}

async function calculate (data) {
    let gammaRate = [0,0,0,0,0,0,0,0,0,0,0,0]
    function adding (column, count) {
        for(let k = 0; k < 12; k++) {
            
            if(k === column) {
                // console.log("Zeile: ", row, "In For-Schleife: ", k, "Spalte: ", column, "Binäry: ", count)
                if(count === 1) {
                    gammaRate[k] += 1;
                } else {
                    gammaRate[k] -= 1;
                }

            }
            
        }
    }
 
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            let binary = Number(data[i][j])
            // console.log("Zeile", [i], "besteht aus Spalte",j, "Zahl", binary)
            adding(j, binary)
        }
    }
    
    for(let i = 0; i < gammaRate.length; i++) {
        if(gammaRate[i] > 0) {
            gammaRate[i] = 1
        } else if (gammaRate [i] < 0) {
            gammaRate[i] = 0
        } else {
            console.error(("Is Equal"))
        }
    }
    const epsilonRate = gammaRate.map(e => Number(!e))

    const gammaRateString = gammaRate.join('');
    const epsilonRateString= epsilonRate.join('')

    const gammaRateDec = parseInt(gammaRateString, 2);
    const epsilonRateDec = parseInt(epsilonRateString, 2);

    const result = gammaRateDec * epsilonRateDec;
    console.log(result)
}

main()
