import React from 'react'

const Rating = ({value, color}) => {
    console.log(value)
    return (
        <div className='rating'>
            <span>
                <i
                    style={color}
                    className={
                    // put a star rating on the product
                        value >= 1
                            ? 'fas fa-star'
                            : value >= 0.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                    //f8e825
                />
            </span>
            <span>
                <i
                    style={color}
                    className={
                        value >= 2
                            ? 'fas fa-star'
                            : value >= 1.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                />
            </span>
            <span>
                <i
                    style={color}
                    className={
                        value >= 3
                            ? 'fas fa-star'
                            : value >= 2.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                />
            </span>
            <span>
                <i
                    style={color}
                    className={
                        value >= 4
                            ? 'fas fa-star'
                            : value >= 3.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                />
            </span>
            <span>
                <i
                    style={color}
                    className={
                        value >= 5
                            ? 'fas fa-star'
                            : value >= 4.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                />
            </span>
        </div>
    )
}

export default Rating;