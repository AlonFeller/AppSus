const { Link, NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {
    // console.log('Props from header', props);
    // Almost never use goBack -> it might send the user outside of the app.
    return <header className="app-header">
        <h3 onClick={() => props.history.goBack()}>AppSus</h3>

        <nav>
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/email" exact>eMail</NavLink>
            <NavLink to="/keep">Keep</NavLink>
            {/* <NavLink to="/car" activeClassName="my-active">Our Cars</NavLink> */}
        </nav>
    </header>
}

export const AppHeader = withRouter(_AppHeader)