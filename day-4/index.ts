import { isFullyOverlapped, isOverlapped, readAssignments } from './helpers.ts'

async function main() {
  const file = Bun.file('day-4/input.txt')
  const text = await file.text()
  const assignments = readAssignments(text)

  let fullOverlaps = 0
  let overlaps = 0

  for (const assignment of assignments) {
    if (isFullyOverlapped(assignment.firstElf, assignment.secondElf)) {
      fullOverlaps++
    }
    if (isOverlapped(assignment.firstElf, assignment.secondElf)) {
      overlaps++
    }
  }
  console.log(`There are ${fullOverlaps} duties fully overlapped`)
  console.log(`There are ${overlaps} duties partially overlapped`)
}

main()
