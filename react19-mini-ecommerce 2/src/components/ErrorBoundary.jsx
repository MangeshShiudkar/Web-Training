import { Component } from "react";

// React only catches rendering errors (like a rejected use() Promise)
// with an Error Boundary, and Error Boundaries must be class components.
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          <p className="font-semibold">Something went wrong</p>
          <p>{this.state.error.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
