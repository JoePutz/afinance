import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound';
import UserForm from './pages/UserForm'
import ApplicantForm from './pages/ApplicantForm';
import Users from './pages/Users'
import Transactions from './pages/Transactions'
import TransactionForm from './pages/TransactionForm'
import MemberAccounts from './pages/MemberAccounts'
import Members from './pages/Members'
import Chat from './pages/Chat'
import UserSessionProvider from './utils/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {
    faChevronUp,
    faEllipsisV,
    faHome,
    faPlus,
    faUserPlus,
    faUsers,
    faUsersCog,
    faPen,
    faSpinner,
    faEye,
    faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import {Helmet} from 'react-helmet';

function App() {
    library.add(fab, faPlus, faChevronUp, faHome, faUserPlus,
        faUsers, faUsersCog, faEllipsisV, faPen, faSpinner,
        faEye,faEyeSlash)
    return (
        <div>
            <UserSessionProvider>
                <Router>

                    <Helmet>
                        <title>Admin | Aline Financial</title>
                        <meta
                            name='description'
                            content='Administrative Dashboard for Aline Financial'
                        />
                    </Helmet>
                    <Switch>
                        <Route exact path='/login' component={Login}/>
                        <ProtectedRoute exact path='/' component={Home}/>
                        <ProtectedRoute path='/user/create' component={UserForm}/>
                        <ProtectedRoute path='/user' component={Users}/>
                        <ProtectedRoute path='/member/accounts' component={MemberAccounts}/>
                        <ProtectedRoute path='/member/create' component={ApplicantForm}/>
                        <ProtectedRoute path='/member' component={Members}/>
                        <ProtectedRoute path='/transaction/create' component={TransactionForm}/>
                        <ProtectedRoute path='/transaction' component={Transactions}/>
                        <ProtectedRoute path='/chat' component={Chat}/>
                        <Route path='*' component={NotFound}/>
                    </Switch>

                </Router>

            </UserSessionProvider>

        </div>
    );
}

export default App;
