import { Backpack } from './types'

const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function readBackpacks(input: string): Backpack[] {
  const lines = input.split('\n')
  const backpacks: Backpack[] = []
  for (const line of lines) {
    if (line === '') {
      continue
    }
    const firstCompartment = line.slice(0, line.length / 2)
    const secondCompartment = line.slice(line.length / 2)
    const backpack = { firstCompartment, secondCompartment }
    backpacks.push(backpack)
  }
  return backpacks
}

export function getCommonItem(backpack: Backpack): string {
  for (const item of backpack.firstCompartment) {
    if (backpack.secondCompartment.includes(item)) {
      return item
    }
  }
  return ''
}

export function getCommonBadge(backpacks: Backpack[]): string {
  const firstBackpack = backpacks[0]
  const otherBackpacks = backpacks.slice(1)
  const backpackItems = [
    ...firstBackpack.firstCompartment,
    ...firstBackpack.secondCompartment,
  ]
  for (const item of backpackItems) {
    const wasFound = otherBackpacks.every((other) => {
      return (
        other.firstCompartment.includes(item) ||
        other.secondCompartment.includes(item)
      )
    })
    if (wasFound) {
      return item
    }
  }

  return ''
}

export function getPriority(value: string): number {
  return LETTERS.indexOf(value) + 1
}
