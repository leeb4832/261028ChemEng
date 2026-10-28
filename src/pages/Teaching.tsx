import { useState } from 'react'
import ManagedList from '../components/ManagedList'
import { ExternalLink, PageTitle, SearchBox } from '../components/ui'
import type { FormField } from '../components/EntityForm'
import { dataService } from '../services'
import type { MaterialType } from '../types'

const courseFields: FormField[] = [
  { name: 'name', label: '과목명', kind: 'text', required: true },
  { name: 'semester', label: '학기', kind: 'text', required: true, hint: '예: 2026년 1학기' },
  { name: 'description', label: '설명', kind: 'textarea' },
]

const materialTypes: MaterialType[] = ['강의노트', '과제', '참고문헌']
const materialFields: FormField[] = [
  { name: 'title', label: '자료 제목', kind: 'text', required: true },
  { name: 'type', label: '유형', kind: 'select', options: materialTypes },
  { name: 'url', label: '외부 링크 주소', kind: 'url', required: true, hint: 'Google Drive 등의 공유 링크 (https:// 로 시작)' },
]

export default function Teaching() {
  const [query, setQuery] = useState('')
  const [courseId, setCourseId] = useState<string | null>(null)
  const [courseName, setCourseName] = useState('')

  return (
    <>
      <PageTitle title="수업" desc="과목을 선택하면 강의노트·과제·참고문헌 링크를 볼 수 있습니다." />
      <SearchBox value={query} onChange={setQuery} />

      <ManagedList
        heading="과목 목록"
        addLabel="과목 추가"
        emptyText="등록된 과목이 없습니다."
        collection={dataService.courses}
        fields={courseFields}
        emptyForm={{ name: '', semester: '', description: '' }}
        toForm={(c) => ({ name: c.name, semester: c.semester, description: c.description })}
        fromForm={(v) => ({ name: v.name.trim(), semester: v.semester.trim(), description: v.description.trim() })}
        query={query}
        matches={(c, q) => [c.name, c.semester, c.description].join(' ').toLowerCase().includes(q)}
        grid
        renderItem={(c) => (
          <button
            className="block w-full text-left"
            onClick={() => { setCourseId(c.id); setCourseName(c.name) }}
          >
            <p className="text-xs text-slate-500">{c.semester}</p>
            <h3 className={`font-semibold ${courseId === c.id ? 'text-navy-600 underline' : 'text-navy-800'}`}>{c.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{c.description}</p>
            <p className="mt-2 text-sm text-navy-600">자료 보기 →</p>
          </button>
        )}
      />

      {courseId && (
        <ManagedList
          key={courseId}
          heading={`${courseName} 자료`}
          addLabel="자료 추가"
          emptyText="아직 등록된 자료가 없습니다."
          collection={dataService.materials}
          listOptions={{ filter: { courseId } }}
          fields={materialFields}
          emptyForm={{ title: '', type: '강의노트', url: '' }}
          toForm={(m) => ({ title: m.title, type: m.type, url: m.url })}
          fromForm={(v) => ({
            courseId,
            title: v.title.trim(),
            type: materialTypes.find((t) => t === v.type) ?? '강의노트',
            url: v.url.trim(),
          })}
          query={query}
          matches={(m, q) => [m.title, m.type].join(' ').toLowerCase().includes(q)}
          renderItem={(m) => (
            <>
              <span className="mr-2 rounded bg-navy-50 px-2 py-0.5 text-xs text-navy-700">{m.type}</span>
              <ExternalLink href={m.url}>{m.title}</ExternalLink>
            </>
          )}
        />
      )}
    </>
  )
}
