import { Assignment, DutyRange } from './types.ts'

export function readAssignments(input: string): Assignment[] {
  const lines = input.split('\n')
  const assignments: Assignment[] = []
  for (const line of lines) {
    if (line === '') {
      continue
    }
    const ranges = line.split(',')
    const assignment: Assignment = {
      firstElf: readRange(ranges[0]),
      secondElf: readRange(ranges[1]),
    }
    assignments.push(assignment)
  }
  return assignments
}

function readRange(text: string): DutyRange {
  const values = text.split('-')
  return { start: parseInt(values[0], 10), end: parseInt(values[1], 10) }
}

export function isOverlapped(a: DutyRange, b: DutyRange): boolean {
  for (let i = a.start; i <= a.end; i++) {
    if (i >= b.start && i <= b.end) {
      return true
    }
  }
  for (let i = b.start; i <= b.end; i++) {
    if (i >= a.start && i <= a.end) {
      return true
    }
  }

  return false
}

export function isFullyOverlapped(a: DutyRange, b: DutyRange): boolean {
  if (a.start >= b.start && a.end <= b.end) {
    return true
  }
  if (b.start >= a.start && b.end <= a.end) {
    return true
  }
  return false
}
