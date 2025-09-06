import * as React from "react";

class ErrorBoundary extends React.Component<
    React.PropsWithChildren<{
        fallback: React.ReactNode;
    }>,
    { hasError: boolean }
> {
    constructor(
        props: React.PropsWithChildren<{
            fallback: React.ReactNode;
        }>,
    ) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render(): React.ReactNode {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

export default ErrorBoundary;
