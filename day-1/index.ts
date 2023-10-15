type Elf = {
  calories: number
}

async function main() {
  const file = Bun.file('day-1/input.txt')
  const text = await file.text()
  const elves = readElves(text)
  const sortedElves = elves.sort(elfSorter)
  const highestElf = sortedElves[0]
  console.log(`The highest carrying elf calorie is: ${highestElf.calories}`)
  const highestThree = sortedElves.slice(0, 3)
  const totalThree = highestThree.reduce((sum, elf) => {
    return sum + elf.calories
  }, 0)
  console.log(`The top 3 elves are carrying ${totalThree} in total`)
}

function elfSorter(a: Elf, b: Elf): number {
  return b.calories - a.calories
}

function readElves(input: string): Elf[] {
  const lines = input.split('\n')
  const elves: Elf[] = []

  let elf: Elf = { calories: 0 }

  for (const line of lines) {
    if (line === '') {
      elves.push(elf)
      elf = { calories: 0 }
      continue
    }
    const calories = parseInt(line, 10)
    elf.calories += calories
  }
  if (elf.calories > 0) {
    elves.push(elf)
  }
  return elves
}
main()
