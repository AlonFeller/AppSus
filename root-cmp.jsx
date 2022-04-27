import {AppHeader} from "./cmps/app-header.jsx"
import {KeepApp} from "./apps/keep/pages/note-index.jsx"
import {EmailApp} from "./apps/email/pages/email-index.jsx"
import {Home} from './pages/app-home.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <AppHeader />
        <section className="app">
            <Switch>
                <Route path="/email" component={EmailApp} />
                <Route path="/keep" component={KeepApp} />
                {/* <Route path="/missbooks" component={MissBooksApp} /> */}
                <Route path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}
