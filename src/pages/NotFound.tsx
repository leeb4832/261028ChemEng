import { EmptyState } from '../components/StatusView'
import { ButtonLink } from '../components/ui'

export default function NotFound() {
  return <EmptyState message="페이지를 찾을 수 없습니다." action={<ButtonLink to="/">홈으로</ButtonLink>} />
}
