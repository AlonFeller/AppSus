
export class NoteFilter extends React.Component {

    state = {
        filterBy: {
            type: '',
            minSpeed: '',
            maxSpeed: ''
        },
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }

    handleChange = ({ target }) => {
        const value = (target.type === 'number') ? +target.value : target.value
        const field = target.name
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        const { type, minSpeed, maxSpeed } = this.state.filterBy
        return <section className="note-filter">
            <form onSubmit={this.onFilter}>
                <label htmlFor="by-type">Type</label>
                <input type="text" id="by-type" placeholder="by Type" name="type"
                    value={type} onChange={this.handleChange} ref={this.inputRef} />

                {/* <label htmlFor="by-minSpeed">Min Speed</label>
                <input type="number" id="by-minSpeed" placeholder="by min speed" name="minSpeed"
                    value={minSpeed} onChange={this.handleChange} />

                <label htmlFor="by-maxSpeed">Max Speed</label>
                <input type="number" id="by-maxSpeed" placeholder="by max speed" name="maxSpeed"
                    value={maxSpeed} onChange={this.handleChange} /> */}

                <button>FILTER!</button>
            </form>
        </section>
    }
}