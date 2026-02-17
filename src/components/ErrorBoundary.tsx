import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 p-8 dark:border-amber-800 dark:bg-amber-900/20">
          <AlertTriangle className="mb-4 h-12 w-12 text-amber-600 dark:text-amber-400" />
          <h3 className="mb-2 text-lg font-semibold text-amber-800 dark:text-amber-200">
            Something went wrong
          </h3>
          <p className="mb-4 max-w-md text-center text-sm text-amber-700 dark:text-amber-300">
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
