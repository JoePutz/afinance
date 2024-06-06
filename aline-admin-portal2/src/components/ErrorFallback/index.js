import React from 'react'


/**
 * When a component fails to render & is 
 * wrapped by an `<ErrorBoundary>` tag 
 * (from the react-error-boundary library), this will render. 
 * 
 * @returns 
 */
const ErrorFallback = () => {
    return (
        <div className="fallback">
            <p>Something went wrong!</p>            
        </div>
    )
}


export default ErrorFallback
