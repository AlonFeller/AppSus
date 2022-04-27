const { Link } = ReactRouterDOM


export function CarPreview({ car }) {
    return <Link to={`/car/${car.id}`}>
        <article className="car-preview" >
            <h3>Vendor : {car.vendor}</h3>
            <h3>Speed : {car.speed}</h3>
            <div className="img-container">
                <img src={`assets/img/${car.vendor}.jpg`} />
            </div>
        </article>
    </Link>
}