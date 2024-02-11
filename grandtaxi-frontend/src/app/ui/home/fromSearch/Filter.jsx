import { CiStar } from "react-icons/ci";

const Filter = () => {
    return <div class="bg-white basis-1/4	rounded-md w-full h-screen p-8 mx-auto">
        <div class=" flex justify-between  ">
            <p class='font-bold'>Filter</p><button id="restBtn" class="border-none ourline-none bg-transparent">Reset All</button>

        </div>

        <hr></hr>
        {/* <!-- filer sorting  --> */}
        <div class=" py-6">
            <p class='font-bold py-4'>vehicle type</p>

            <div id="companySelector" class="flex flex-col gap-4">
                <label for="allcompany" class="flex items-center gap-x-4 text-gray-400">
                    <input id="allcompany" type="radio" name="company" value="all" class="accent-green-600 border-2 w-4 h-4 text-green-600 bg-gray-100 border-green-300 rounded focus:ring-green-600" checked></input>
                    <span class="bg-[#f6f6f7] rounded-md w-2/2 px-2 flex gap-x-3 items-center">ALL</span>
                </label>

            </div>

        </div>

        <div class=" py-6">
            <p class='font-bold py-4'>driver ratings</p>

            <div>
                <select id="orderBy" class="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500">
                    <option class="text-gray-400" value="" disabled selected>sorting By</option>
                    <option value="DESC">Rating: High to Low</option>
                    <option value="ASC">Rating: Low to High</option>

                </select>

            </div>

        </div>
        

  

    </div>;
};
export default Filter;