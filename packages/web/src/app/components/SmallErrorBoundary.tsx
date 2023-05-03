import { Component, PropsWithChildren } from 'react'

export class SmallErrorBoundary extends Component<
  PropsWithChildren<{ message?: string }>,
  { error: null | Error }
> {
  constructor(props: PropsWithChildren) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state

    if (error) {
      return (
        <div className="p-4 flex-1 opacity-30">
          <h4>
            {this.props.message || 'An error occurred while loading this data'}
          </h4>
        </div>
      )
    }

    return this.props.children
  }
}
