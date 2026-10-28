import ManagedList from '../components/ManagedList'
import { PageTitle } from '../components/ui'
import type { FormField } from '../components/EntityForm'
import { dataService } from '../services'
import type { MemberPosition } from '../types'

const positions: MemberPosition[] = ['교수', '박사과정', '석사과정', '학부연구생']
const fields: FormField[] = [
  { name: 'name', label: '이름', kind: 'text', required: true },
  { name: 'position', label: '직위', kind: 'select', options: positions },
  { name: 'topic', label: '연구주제', kind: 'text' },
  { name: 'order', label: '표시 순서', kind: 'number', hint: '숫자가 작을수록 먼저 나옵니다' },
]

export default function Members() {
  return (
    <>
      <PageTitle title="구성원" desc="연구실 교수와 대학원생을 소개합니다." />
      <ManagedList
        addLabel="구성원 추가"
        emptyText="등록된 구성원이 없습니다."
        collection={dataService.members}
        listOptions={{ sortBy: 'order' }}
        fields={fields}
        emptyForm={{ name: '', position: '석사과정', topic: '', order: '99' }}
        toForm={(m) => ({ name: m.name, position: m.position, topic: m.topic, order: String(m.order) })}
        fromForm={(v) => ({
          name: v.name.trim(),
          position: positions.find((p) => p === v.position) ?? '석사과정',
          topic: v.topic.trim(),
          order: Number(v.order) || 99,
        })}
        grid
        renderItem={(m) => (
          <>
            <p className="text-xs font-medium text-navy-600">{m.position}</p>
            <h3 className="text-lg font-semibold text-navy-900">{m.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{m.topic}</p>
          </>
        )}
      />
    </>
  )
}
