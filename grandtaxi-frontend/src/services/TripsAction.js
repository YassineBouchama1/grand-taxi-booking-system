'use server'



 export default async function getTripsAction() {


    // let url = `trips?t=null&rating=${rating}`;

    // if (date) {
    //   url += `&date=${date}`;

    //   if (start) {
    //     url += `&start=${start}`;
    //   }
    //   if (end) {
    //     url += `&end=${end}`;
    //   }
    //   if (car) {
    //     url += `&typeCar=${car}`;
    //   }
    //   // if (rating) {
    //   //   url += `&rating=${rating}`;
    //   // }
    // }


    const trips =  await fetch('http://127.0.0.1:80/api/trips')


    return trips;
}