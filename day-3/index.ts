import {
  getCommonBadge,
  getCommonItem,
  getPriority,
  readBackpacks,
} from './helpers.ts'

async function main() {
  const file = Bun.file('day-3/input.txt')
  const text = await file.text()
  const backpacks = readBackpacks(text)
  let totalPriority = 0
  for (const backpack of backpacks) {
    const commonItem = getCommonItem(backpack)
    const priority = getPriority(commonItem)
    totalPriority += priority
  }
  console.log(`the total priority for backpacks are: ${totalPriority}`)

  let totalBadgePriority = 0
  for (let i = 0; i < backpacks.length; i += 3) {
    const group = backpacks.slice(i, i + 3)
    const badge = getCommonBadge(group)
    const badgePriority = getPriority(badge)
    totalBadgePriority += badgePriority
  }
  console.log(`the total badge priority is ${totalBadgePriority}`)
}

main()
