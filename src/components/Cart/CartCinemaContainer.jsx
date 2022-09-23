import CartCinema from "./CartCinema"

const CartCinemaContainer = ({}) => {

    const cinemaSeatsParams1 = {
        leftInitial : 0,
        leftColumns : 4,

        middleInitial : 4,
        middleColumns : 12,

        rightInitial : 0,
        rightColumns : 4,

        totalRows : 20
    }

    const cinemaSeatsParams2 = {
        leftInitial : 6,
        leftColumns : 3,

        middleInitial : 0,
        middleColumns : 10,

        rightInitial : 6,
        rightColumns : 3,

        totalRows : 22
    }

    const cinemaSeatsParams3 = {
        leftInitial : 4,
        leftColumns : 2,

        middleInitial : 0,
        middleColumns : 8,

        rightInitial : 4,
        rightColumns : 2,

        totalRows : 20
    }

    return (
        <CartCinema {...cinemaSeatsParams3} maxSeats={5}/>
    )
}
export default CartCinemaContainer;