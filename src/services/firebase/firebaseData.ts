import type { Comment, Course, Material, Member, Post, Publication, ResearchArea, UserProfile } from '../../types'
import type { DataService } from '../types'
import { createFirestoreCollection } from './firestoreCollection'

export const firebaseDataService: DataService = {
  research: createFirestoreCollection<ResearchArea>('research'),
  publications: createFirestoreCollection<Publication>('publications'),
  courses: createFirestoreCollection<Course>('courses'),
  materials: createFirestoreCollection<Material>('materials'),
  posts: createFirestoreCollection<Post>('posts'),
  comments: createFirestoreCollection<Comment>('comments'),
  members: createFirestoreCollection<Member>('members'),
  users: createFirestoreCollection<UserProfile>('users'),
}
