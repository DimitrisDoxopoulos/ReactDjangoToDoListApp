import React, { Component } from 'react';
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state to trigger fallback UI
        console.log(error)
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by error boundary:', error, errorInfo);
        this.setState({ errorMessage: error.message });
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI
            return (
                <div className="w-64 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
                    <strong className="font-bold">Error: </strong><br />
                    <span className="block sm:inline">{this.state.errorMessage}</span>
                </div>
            )
        }
        // Render children if no error occurred
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
