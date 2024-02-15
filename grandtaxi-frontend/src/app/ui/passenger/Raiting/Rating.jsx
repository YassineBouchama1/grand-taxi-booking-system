'use client'
// import "./Raiting.css"; // Path to your CSS file
const Rating = ({ setRating, reviewDriver,id }) => {
  return <div className="flex bg-white w-[300px] h-[50px] justify-center items-center rounded-sm">
          {[...Array(5)].map((item, index) => {
              const givenRating = index + 1;
              return (
                  <div className="flex flex-col  gap-x-3" key={givenRating}>
                      <input
                          onClick={() => setRating(givenRating)}
                          value={givenRating}
                          name="rating"
                          id={`star${givenRating}`}
                          type="radio"
                      />
                      {givenRating}
                      <label htmlFor={`star${givenRating}`} />
                  </div>
              );
          })}
      <button onClick={() => reviewDriver(id)} type="button"
          className="text-white bg-yellow-700 hover:bg-yellow-800 font-medium rounded-full text-sm px-5 py-1 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Review
      </button>
            </div>

};
export default Rating;
