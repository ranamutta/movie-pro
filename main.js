const container = document.querySelector(".container")
const infoText = document.querySelector(".infoText")
const movieList = document.querySelector("#movie")
const seatCount = document.getElementById("count")
const totalAmount = document.getElementById("amount")
const seats = document.querySelectorAll(".seat:not(.reserved)")

const saveToDataBase = (index) => {

       localStorage.setItem("seatsIndex", JSON.stringify(index))
       localStorage.setItem("movieIndex", JSON.stringify(movieList.selectedIndex))

}
const getFromDatabase = () => {
       const dbSelectedSeats = JSON.parse(localStorage.getItem("seatsIndex"));
       if (dbSelectedSeats !== null) {
              seats.forEach((seat, index) => {
                     if (dbSelectedSeats.includes(index)) {
                            seat.classList.add("selected");
                     }
              });
       }

       const dbSelectedMovie = JSON.parse(localStorage.getItem('movieIndex'))
       movieList.selectedIndex = dbSelectedMovie

};


getFromDatabase()
const createIndex = () => {
       let allSeatsArray = []
       seats.forEach((seat) => {
              allSeatsArray.push(seat)
       })
       const allSelectedSeatsArray = [];

       const allSelectedSeats = container.querySelectorAll(".seat.selected");

       allSelectedSeats.forEach((selectedSeat) => {
              allSelectedSeatsArray.push(selectedSeat);
       });

       const selectedSeatIndex = allSelectedSeatsArray.map((selectedSeat) => {
              return allSeatsArray.indexOf(selectedSeat)
       })
       saveToDataBase(selectedSeatIndex)
}




const calculateTotal = () => {

       createIndex()
       let selectedSeatsCount = container.querySelectorAll(".seat.selected").length

       count.innerText = selectedSeatsCount
       totalAmount.innerText = selectedSeatsCount * movieList.value
       console.log(count)

       if (selectedSeatsCount > 0) {
              infoText.classList.add("open")
       }
       else {
              console.log(selectedSeatsCount)
              infoText.classList.remove("open")
       }

}
container.addEventListener("click", (pointerEvent) => {
       const clickedSeat = pointerEvent.target.offsetParent
       if (clickedSeat.classList.contains("seat") && !clickedSeat.classList.contains("reserved")) {
              clickedSeat.classList.toggle("selected")
       }
       calculateTotal()
})

movieList.addEventListener("change", () => {
       calculateTotal()
})