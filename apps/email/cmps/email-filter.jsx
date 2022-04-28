export class EmailFilter extends React.Component {

    state = {
        search: '',
        isRead: false,
        unRead: false
    }

    inputRef = React.createRef()


    handleFilterChange= (ev) => {
        // this.setState({search: ev.target.value},
        //      this.props.filterEmails({...this.state}))
        const val = ev.target.value 
        this.setState({search: val}, () => {
            this.props.filterEmails({...this.state})
        })
        
    }
    // componentDidMount() {
    //     // console.log('Filter props', this.props);
    //     this.inputRef.current.focus()
    // }

    handleChange = ({ target }) => {
        const val = !(target.value === 'true')
        this.setState({[target.name]: val}, () => {
            this.props.filterEmails({...this.state})
        })
    }

    // onFilter = (ev) => {
    //     ev.preventDefault()
    //     this.props.onSetFilter(this.state.filterBy)
    // }


    render() {
        return <section className="email-filter">
            <form onSubmit={this.onFilter}>
                <label htmlFor="by-search">Search mail</label>
                <input type="text" id="by-search" placeholder="by search" name="search"
                    value={this.state.search} onChange={this.handleFilterChange} ref={this.inputRef} />

                <label htmlFor="by-read">read </label>
                <input type="checkbox" id="by-read" name="isRead" value={this.state.isRead}
                    onChange={this.handleChange} />

                <label htmlFor="by-read">Unread </label>
                <input type="checkbox" id="by-unread" name="unRead"
                    onChange={this.handleChange} />

                <button>FILTER!</button>
            </form>
        </section>
    }
}