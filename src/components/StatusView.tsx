import type { ReactNode } from 'react'

export function EmptyState({ message, action }: { message: string; action?: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 px-6 py-10 text-center text-slate-500">
      <p>{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export function LoadingView() {
  return (
    <div className="py-10 text-center text-slate-500" role="status">
      <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-navy-200 border-t-navy-700 align-middle" />
      <span className="ml-2 align-middle">불러오는 중입니다…</span>
    </div>
  )
}

export function ErrorView({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-6 text-center text-red-700" role="alert">
      <p>문제가 생겼습니다: {message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-3 rounded border border-red-300 px-3 py-1 text-sm hover:bg-red-100">
          다시 시도
        </button>
      )}
    </div>
  )
}

/** 로딩 → 에러 → 내용 순서로 알맞은 화면을 보여줌 */
export function StatusView(props: {
  loading: boolean
  error: string | null
  onRetry?: () => void
  children: ReactNode
}) {
  if (props.loading) return <LoadingView />
  if (props.error) return <ErrorView message={props.error} onRetry={props.onRetry} />
  return <>{props.children}</>
}
