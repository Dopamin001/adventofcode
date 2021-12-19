

async function main () {
    const response = await fetch("https://adventofcode.com/2021/day/2/input")
    const data = await response.text()
    const array = data.match(/(\w+)\s(\d)/g)
    console.log(calculate(array))
    
}

function calculate (data) {
    let horizontal = 0;
    let depth = 0;

    data.forEach(element => {
        const [direction, value] = element.split(" ")
          const number = Number(value)
          console.log(number)
          if(direction === "forward") {
              horizontal += number
          } else if (direction === "down"){
              depth += number
          } else {
              depth -= number
          }
    });
    const result = horizontal * depth
    return result
}

