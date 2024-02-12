import Link from "next/link";

const ThankYouPopup = () => {
  return (
    
          <div class="mx-auto max-w-md overflow-hidden rounded-3xl text-gray-700 shadow-md">
            
              <div class="flex flex-col items-center bg-white px-4 py-10">
                  <h2 class="mb-2 text-3xl font-bold text-green-500 sm:text-4xl">Thank you!</h2>
                  <p class="mb-8 font-medium text-gray-500">when Driver Be Ready We will not you</p>
                  <div class=" flex cursor-pointer items-center rounded-xl bg-green-500 p-4">
                      <div class="h-12 w-12 rounded-full border-4 border-white object-cover" ></div>
                      <div class="ml-4 w-56">
                          <p class="text-xs font-medium text-gray-100">Go</p>
                          <Link href='/passenger' class="font-medium text-white">check Your Reservations</Link>
                      </div>
                  </div>
              </div>
          </div>
      

  );
};
export default ThankYouPopup;