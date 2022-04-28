export class EmailFilter extends React.Component {

    state = {
        filterBy: {
            search: '',
            isRead: false,
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
        const { search, isRead,} = this.state.filterBy
        return <section className="email-filter">
            <form>
                <label htmlFor="by-search">Search mail</label>
                <input type="text" id="by-search" placeholder="by search" name="search"
                    value={search} onChange={this.handleChange} />

                <label htmlFor="by-read">read </label>
                <input type="checkbox" id="by-read" name="isRead"
                    value={isRead} onChange={this.handleChange} />

                {/* <label htmlFor="by-unread">Unread </label>
                <input type="checkbox" id="by-unread" name="unRead"
                    value={unRead} onChange={this.handleChange} /> */}

            </form>
        </section>
    }
}