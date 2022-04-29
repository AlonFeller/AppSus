
export class NoteFilter extends React.Component {

    state = {
        filterBy: {
            search: ''
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
        const { search } = this.state.filterBy
        return <section className="note-filter">
            <form >
                <label htmlFor="by-search">Search Notes</label>
                <input type="text" id="by-search" placeholder="search" name="search"
                    value={search} onChange={this.handleChange} />
            </form>
        </section>
    }
}