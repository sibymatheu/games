import { Component } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <main className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
          <div className="text-5xl">⚠️</div>
          <h1 className="text-2xl font-bold text-text-base">Something went wrong</h1>
          <p className="text-text-muted text-sm max-w-sm">
            {this.state.error?.message ?? "An unexpected error occurred."}
          </p>
          <button
            onClick={this.reset}
            className="mt-2 px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
