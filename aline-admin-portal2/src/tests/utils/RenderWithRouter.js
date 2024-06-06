import {Router} from 'react-router-dom';
import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history'

const renderWithRouter = (
    ui,
    {
        route='/',
        history = createMemoryHistory({ initialEntries: [route]}),
    } = {}
) => {
    window.history.pushState({}, 'Test Page', route)
    
    return {
        ...render(<Router history={history}>{ui}</Router>),
        history,
    }
}

export default renderWithRouter;
