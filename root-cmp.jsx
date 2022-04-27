// import {AppHeader} from "apps/mail/"
import {Home} from 'pages/app-home.jsx'


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        {/* <AppHeader /> */}
        <section className="app">
            <Switch>
                {/* <Route path="/mail" component={MailApp} /> */}
                {/* <Route path="/keep" component={KeepApp} /> */}
                {/* <Route path="/missbooks" component={MissBooksApp} /> */}
                <Route path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}
