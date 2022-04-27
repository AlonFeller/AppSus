export class EmailFilter extends React.Component {

    state = {
        filterBy: {
            search: '',
            isRead: false,
        },
    }

    inputRef = React.createRef()

    componentDidMount() {
        // console.log('Filter props', this.props);
        this.inputRef.current.focus()
    }

    handleChange = ({ target }) => {
        const value = (target.type === 'number') ? +target.value : target.value
        const field = target.name
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            // this.props.onSetFilter(this.state.filterBy)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }


    render() {
        const { search, isRead } = this.state.filterBy
        return <section className="email-filter">
            <form onSubmit={this.onFilter}>
                <label htmlFor="by-search">Search mail</label>
                <input type="text" id="by-search" placeholder="by search" name="search"
                    value={search} onChange={this.handleChange} ref={this.inputRef} />

                <label htmlFor="by-read">read </label>
                <input type="checkbox" id="by-read" name="isRead"
                     onChange={this.handleChange} />

                <button>FILTER!</button>
            </form>
        </section>
    }
}