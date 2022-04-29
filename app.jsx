import {AppHeader} from "./cmps/app-header.jsx"
import {KeepApp} from "./apps/keep/pages/keep-app.jsx"
import {EmailApp} from "./apps/email/pages/email-app.jsx"
import {Home} from './pages/app-home.jsx'
import { CreateNote } from "./apps/keep/cmps/create-note.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <AppHeader />
        <section className="app">
            <Switch>
                {/* <Route path="/create-Note/:noteId?" component={CreateNote}/> */}
                <Route path="/email" component={EmailApp} />
                <Route path="/keep" component={KeepApp} />
                {/* <Route path="/missbooks" component={MissBooksApp} /> */}
                <Route path="/" component={Home} />
            </Switch>
        </section>
        <footer>liRights 2022</footer>
    </Router>
}
