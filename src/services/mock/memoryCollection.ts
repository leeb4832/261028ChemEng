// 메모리(새로고침하면 초기화)에 저장하는 간단한 컬렉션
import type { Collection, CreateInput, Entity, ListOptions } from '../types'

const wait = () => new Promise<void>((resolve) => setTimeout(resolve, 150))

export function createMemoryCollection<T extends Entity>(prefix: string, seed: T[]): Collection<T> {
  let items: T[] = seed.map((item) => ({ ...item }))
  let seq = seed.length + 1

  return {
    async list(options: ListOptions<T> = {}) {
      await wait()
      let result = items.filter((item) =>
        Object.entries(options.filter ?? {}).every(
          ([key, value]) => (item as unknown as Record<string, unknown>)[key] === value,
        ),
      )
      const { sortBy } = options
      if (sortBy) {
        const dir = options.desc ? -1 : 1
        result = [...result].sort((a, b) => {
          const x = a[sortBy] as unknown as string | number
          const y = b[sortBy] as unknown as string | number
          return x < y ? -dir : x > y ? dir : 0
        })
      }
      if (options.limit !== undefined) result = result.slice(0, options.limit)
      return result.map((item) => ({ ...item }))
    },

    async get(id) {
      await wait()
      const found = items.find((item) => item.id === id)
      return found ? { ...found } : null
    },

    async create(data: CreateInput<T>) {
      await wait()
      const created = { ...data, id: `${prefix}${seq++}` } as unknown as T
      items = [...items, created]
      return { ...created }
    },

    async update(id, patch) {
      await wait()
      const index = items.findIndex((item) => item.id === id)
      if (index < 0) throw new Error('항목을 찾을 수 없습니다.')
      const updated = { ...items[index], ...patch } as T
      items = items.map((item, i) => (i === index ? updated : item))
      return { ...updated }
    },

    async delete(id) {
      await wait()
      items = items.filter((item) => item.id !== id)
    },
  }
}
