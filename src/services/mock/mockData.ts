import type { DataService } from '../types'
import { createMemoryCollection } from './memoryCollection'
import {
  seedComments, seedCourses, seedMaterials, seedMembers, seedPosts, seedPublications, seedResearch, seedUsers,
} from './seed'

export const mockDataService: DataService = {
  research: createMemoryCollection('r', seedResearch),
  publications: createMemoryCollection('p', seedPublications),
  courses: createMemoryCollection('c', seedCourses),
  materials: createMemoryCollection('m', seedMaterials),
  posts: createMemoryCollection('post', seedPosts),
  comments: createMemoryCollection('cm', seedComments),
  members: createMemoryCollection('mem', seedMembers),
  users: createMemoryCollection('u', seedUsers),
}
