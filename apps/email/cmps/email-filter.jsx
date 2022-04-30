export class EmailFilter extends React.Component {

    state = {
        filterBy: {
            search: '',
            isRead: false,
            sortBy: 'to'
        }
    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState((prevState) => ({
            filterBy: { ...prevState.filterBy, search: value },
        }), () => this.props.onSetFilter(this.state.filterBy)
        )
    }

    render() {
        const { search, isRead } = this.state.filterBy
        return <section className="email-filter">
            <form>
                <label htmlFor="by-search">Search mail</label>
                <input type="text" id="by-search" placeholder="by search" name="search"
                    value={search} onChange={this.handleChange} />

                <select className="by-isRead">
                    <option>All </option>
                    <option>Read</option>
                    <option>Unread</option>
                </select>

                <select className="sort-by">
                    <option>Subject</option>
                    <option>Date</option>
                </select>

            </form>
        </section>
    }
}