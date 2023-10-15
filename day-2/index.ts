enum Shape {
  UNKNOWN = 0,
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3,
}

enum Outcome {
  LOSS = 0,
  DRAW = 3,
  WIN = 6,
  UNKNOWN = -1,
}

type Round = {
  theirShape: Shape
  yourShape: Shape
  score: number
  desiredOutcome: Outcome
}

async function main() {
  const file = Bun.file('day-2/input.txt')
  const text = await file.text()
  const rounds = readRounds(text)
  const totalScore = rounds.reduce((sum, round) => {
    return sum + round.score
  }, 0)
  console.log(`The total score for the round was  ${totalScore}`)
}

function readRounds(input: string): Round[] {
  const lines = input.split('\n')
  const rounds: Round[] = []
  for (const line of lines) {
    if (line === '') {
      continue
    }
    const values = line.split(' ')
    const theirShape = readShape(values[0])
    const desiredOutcome = readOutcome(values[1])
    const yourShape = determineYourShape(theirShape, desiredOutcome)
    const score = calculateScore(theirShape, yourShape)
    const round = { theirShape, yourShape, score, desiredOutcome }
    rounds.push(round)
  }
  return rounds
}

function determineYourShape(theirShape: Shape, outcome: Outcome): Shape {
  if (outcome === Outcome.DRAW) {
    return theirShape
  }
  if (outcome === Outcome.LOSS) {
    if (theirShape === Shape.ROCK) {
      return Shape.SCISSORS
    } else if (theirShape === Shape.PAPER) {
      return Shape.ROCK
    } else {
      return Shape.PAPER
    }
  } else {
    if (theirShape === Shape.ROCK) {
      return Shape.PAPER
    } else if (theirShape === Shape.PAPER) {
      return Shape.SCISSORS
    } else {
      return Shape.ROCK
    }
  }
}

function readShape(input: string): Shape {
  if (input === 'A') {
    return Shape.ROCK
  }
  if (input === 'B') {
    return Shape.PAPER
  }
  if (input === 'C') {
    return Shape.SCISSORS
  }
  return Shape.UNKNOWN
}

function readOutcome(input: string): Outcome {
  if (input === 'X') {
    return Outcome.LOSS
  }
  if (input === 'Y') {
    return Outcome.DRAW
  }
  if (input === 'Z') {
    return Outcome.WIN
  }
  return Outcome.UNKNOWN
}

function calculateScore(theirShape: Shape, yourShape: Shape): number {
  let winningScore = 0
  if (doesBeat(yourShape, theirShape)) {
    winningScore = 6
  } else if (yourShape === theirShape) {
    winningScore = 3
  }

  return winningScore + yourShape
}

function doesBeat(a: Shape, b: Shape): boolean {
  return (
    (a === Shape.ROCK && b === Shape.SCISSORS) ||
    (a === Shape.PAPER && b === Shape.ROCK) ||
    (a === Shape.SCISSORS && b === Shape.PAPER)
  )
}

main()
