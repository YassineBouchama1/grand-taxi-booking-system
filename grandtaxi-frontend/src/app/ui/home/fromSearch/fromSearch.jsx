const FromSearch = () => {
  return (
    <>
          <form class="bg-white rounded-lg shadow-lg p-6 w-full">
              <div class="grid grid-cols-2 gap-6">
                  <div class="col-span-2 sm:col-span-1 ">
                      <select id="departure" class="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500 ">
                          <option class="text-gray-400" value="" disabled selected>Pick departure</option>

                      </select>
                  </div>
                  <div class="col-span-2 sm:col-span-1 ">
                      <select id="destination" class="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500">
                          <option class="text-gray-400 " value="" disabled selected>Pick destination</option>

                      </select>
                  </div>
                  <div class="col-span-2 sm:col-span-1 ">
                      <input type="date" name="date" id="date" class="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500" />
                  </div>
                  
              </div>

              <div class="mt-4">
                  <button type="button" id="findTripBtn" class="w-full bg-green-700 hover:bg-green-600 text-white font-medium py-1 rounded-lg focus:outline-none">Find Tickets</button>
              </div>
          </form>
    </>
  );
};
export default FromSearch;