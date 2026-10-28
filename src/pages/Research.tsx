import { useState } from 'react'
import ManagedList from '../components/ManagedList'
import { ExternalLink, PageTitle, SearchBox } from '../components/ui'
import type { FormField } from '../components/EntityForm'
import { dataService } from '../services'
import type { PublicationKind } from '../types'

const areaFields: FormField[] = [
  { name: 'title', label: '연구 분야 이름', kind: 'text', required: true },
  { name: 'description', label: '설명', kind: 'textarea', required: true },
  { name: 'keywords', label: '키워드', kind: 'text', hint: '쉼표(,)로 구분해서 입력' },
]

const pubKinds: PublicationKind[] = ['논문', '학회발표']
const pubFields: FormField[] = [
  { name: 'title', label: '제목', kind: 'text', required: true },
  { name: 'authors', label: '저자', kind: 'text', required: true },
  { name: 'year', label: '연도', kind: 'number', required: true },
  { name: 'journal', label: '저널 / 학회', kind: 'text', required: true },
  { name: 'kind', label: '구분', kind: 'select', options: pubKinds },
  { name: 'url', label: 'DOI 또는 외부 링크', kind: 'url', hint: 'https:// 로 시작하는 주소' },
]

export default function Research() {
  const [query, setQuery] = useState('')

  return (
    <>
      <PageTitle title="연구" desc="연구 분야와 발표 성과를 소개합니다." />
      <SearchBox value={query} onChange={setQuery} />

      <ManagedList
        heading="연구 분야"
        addLabel="연구 분야 추가"
        emptyText="등록된 연구 분야가 없습니다."
        collection={dataService.research}
        fields={areaFields}
        emptyForm={{ title: '', description: '', keywords: '' }}
        toForm={(a) => ({ title: a.title, description: a.description, keywords: a.keywords.join(', ') })}
        fromForm={(v) => ({
          title: v.title.trim(),
          description: v.description.trim(),
          keywords: v.keywords.split(',').map((k) => k.trim()).filter(Boolean),
        })}
        query={query}
        matches={(a, q) => [a.title, a.description, ...a.keywords].join(' ').toLowerCase().includes(q)}
        grid
        renderItem={(a) => (
          <>
            <h3 className="font-semibold text-navy-800">{a.title}</h3>
            <p className="mt-1 text-slate-600">{a.description}</p>
            <p className="mt-3 flex flex-wrap gap-2">
              {a.keywords.map((k) => <span key={k} className="rounded bg-navy-50 px-2 py-0.5 text-xs text-navy-700">{k}</span>)}
            </p>
          </>
        )}
      />

      <ManagedList
        heading="논문 · 발표"
        addLabel="논문/발표 추가"
        emptyText="등록된 논문·발표가 없습니다."
        collection={dataService.publications}
        listOptions={{ sortBy: 'year', desc: true }}
        fields={pubFields}
        emptyForm={{ title: '', authors: '', year: String(new Date().getFullYear()), journal: '', kind: '논문', url: '' }}
        toForm={(x) => ({ title: x.title, authors: x.authors, year: String(x.year), journal: x.journal, kind: x.kind, url: x.url })}
        fromForm={(v) => ({
          title: v.title.trim(),
          authors: v.authors.trim(),
          year: Number(v.year),
          journal: v.journal.trim(),
          kind: (pubKinds.find((k) => k === v.kind) ?? '논문'),
          url: v.url.trim(),
        })}
        query={query}
        matches={(x, q) => [x.title, x.authors, x.journal, String(x.year)].join(' ').toLowerCase().includes(q)}
        renderItem={(x) => (
          <>
            <p className="text-xs text-slate-500">{x.year} · {x.kind}</p>
            <h3 className="font-semibold text-navy-900">{x.title}</h3>
            <p className="text-sm text-slate-600">{x.authors}</p>
            <p className="text-sm italic text-slate-600">{x.journal}</p>
            {x.url && <p className="mt-1 text-sm"><ExternalLink href={x.url}>DOI / 링크 열기</ExternalLink></p>}
          </>
        )}
      />
    </>
  )
}
