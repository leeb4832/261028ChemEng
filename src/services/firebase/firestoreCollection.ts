// Firestore 컬렉션 구현. 실시간 구독 없이 1회 조회만 합니다(무료 한도 절약).
import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, updateDoc, where,
  type DocumentData, type QueryConstraint,
} from 'firebase/firestore'
import type { Collection, CreateInput, Entity, ListOptions } from '../types'
import { getDb } from './firebaseApp'

export function createFirestoreCollection<T extends Entity>(name: string): Collection<T> {
  const col = () => collection(getDb(), name)
  const toEntity = (id: string, data: DocumentData) => ({ ...data, id }) as unknown as T

  return {
    async list(options: ListOptions<T> = {}) {
      const filters = Object.entries(options.filter ?? {})
      const constraints: QueryConstraint[] = filters.map(([k, v]) => where(k, '==', v))
      const { sortBy } = options
      // 조건(filter)과 정렬을 함께 쓰면 Firestore 색인이 필요하므로, 그때는 화면 쪽에서 정렬합니다.
      const serverSort = Boolean(sortBy) && filters.length === 0
      if (sortBy && serverSort) constraints.push(orderBy(sortBy, options.desc ? 'desc' : 'asc'))
      if (options.limit !== undefined && (serverSort || !sortBy)) constraints.push(limit(options.limit))

      const snap = await getDocs(query(col(), ...constraints))
      let result = snap.docs.map((d) => toEntity(d.id, d.data()))
      if (sortBy && !serverSort) {
        const dir = options.desc ? -1 : 1
        result = result.sort((a, b) => {
          const x = a[sortBy] as unknown as string | number
          const y = b[sortBy] as unknown as string | number
          return x < y ? -dir : x > y ? dir : 0
        })
        if (options.limit !== undefined) result = result.slice(0, options.limit)
      }
      return result
    },

    async get(id) {
      const snap = await getDoc(doc(getDb(), name, id))
      return snap.exists() ? toEntity(snap.id, snap.data()) : null
    },

    async create(data: CreateInput<T>) {
      const ref = await addDoc(col(), data as unknown as DocumentData)
      return toEntity(ref.id, data as unknown as DocumentData)
    },

    async update(id, patch) {
      const ref = doc(getDb(), name, id)
      await updateDoc(ref, patch as unknown as DocumentData)
      const snap = await getDoc(ref)
      if (!snap.exists()) throw new Error('항목을 찾을 수 없습니다.')
      return toEntity(snap.id, snap.data())
    },

    async delete(id) {
      await deleteDoc(doc(getDb(), name, id))
    },
  }
}
