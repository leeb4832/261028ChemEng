import type { DataService } from '../types'
import { createMemoryCollection } from './memoryCollection'
import {
  seedComments, seedCourses, seedMaterials, seedMembers, seedPosts, seedPublications, seedResearch,
} from './seed'

export const mockDataService: DataService = {
  research: createMemoryCollection('r', seedResearch),
  publications: createMemoryCollection('p', seedPublications),
  courses: createMemoryCollection('c', seedCourses),
  materials: createMemoryCollection('m', seedMaterials),
  posts: createMemoryCollection('post', seedPosts),
  comments: createMemoryCollection('cm', seedComments),
  members: createMemoryCollection('mem', seedMembers),
}
