
import CardSearch from "./fromSearch/cardSearch";

const ListTrips = ({ trips }) => {


  return (
    <>
      {trips.map((trip, index) => (
        trip.status === "completed"   ? null : (
          <CardSearch key={index} trip={trip} />
        )
      ))}

    </>
  );
};

export default ListTrips;
