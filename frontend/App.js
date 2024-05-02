function App() {
  return (
    <div className="flex flex-wrap text-blue-900">
      {/* Images Row */}
      <div className="w-full flex justify-between order-1">
        <div className="w-1/3 h-60">
          <img src="img1.png" alt="Image 1" className="w-full h-full object-cover" />
        </div>
        <div className="w-1/3 h-60">
          <img src="img2.png" alt="Image 2" className="w-full h-full object-cover" />
        </div>
        <div className="w-1/3 h-60">
          <img src="img3.png" alt="Image 3" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Box overlapping images and column */}
      <div className="absolute shadow-lg shadow-blue-100 top-48 left-1/2 transform -translate-x-1/2 w-full lg:w-1/3 bg-white p-2 rounded-xl flex flex-col items-center justify-center">
  <img src="logo.png" alt="Logo" className="w-14 h-14 mb-2" />
  <h1 className="text-blue-900 aerotow-font ">FINANCEFUEL</h1>
</div>

      {/* Content Columns */}
      <div className="w-full lg:w-1/3 px-4 order-3 lg:order-2">
        <div className="bg-white p-4 lg:mt-16">
          <div className="flex flex-col space-y-4 left-font">
            <h1 className="text-3xl font-bold mx-auto aerotow-font2 mb-6">WHAT & WHY?</h1>
            <div className="bg-gray-100 border border-blue-100 rounded-lg shadow-lg shadow-blue-100 flex items-center p-4">
              <img src="bulb.png" alt="Icon 1" className="w-8 h-8 mr-2" /> {/* Add your image here */}
              <p className="text-blue-900 ">
                {/* Content 1 */}
                Enable customers & advisors to schedule appointments.
              </p>
            </div>
            <div className="bg-gray-100 border border-blue-100 rounded-lg shadow-lg shadow-blue-100 flex items-center p-4">
              <img src="question.png" alt="Icon 2" className="w-8 h-8 mr-2" /> {/* Add your image here */}
              <p className="text-blue-900">
                {/* Content 2 */}
                User needs to manage their appointments & advisors can manage customers.
              </p>
            </div>
            <div className="bg-gray-100 border border-blue-100 rounded-lg shadow-lg shadow-blue-100 flex items-center p-4">
              <img src="shop.png" alt="Icon 3" className="w-8 h-8 mr-2" /> {/* Add your image here */}
              <p className="text-blue-900">
                {/* Content 3 */}
                Users can easily find & book appointments with finance experts for personalized assistance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3  order-2 lg:order-3 mt-12">
        <div className="bg-white   pt-24">
          <ul className="list-disc centre-font pl-8">
            <li className="mb-2">Users can easily find & book appointments with finance experts for personalized assistance.</li>
            <li className="mb-2">They can search for available time slots, browse providers by specialty or name, and view calendars  to select the most convenient appointment.</li>
            <li className="mb-2">Once booked, user receive a confirmation message, and both parties are notified.</li>
            <li className="mb-2">The app also allow users to sign up, book services, and manage appointments.</li>
            <li className="mb-2">These functionalities, our app ensures seamless & efficient financial assistance for users.</li>
          </ul>
        </div>
      </div>

      <div className="w-full lg:w-1/3 px-4 order-last">
        <div className="bg-white p-4 lg:mt-10">
          <div className="flex flex-col space-y-4 ">
            <h1 className="text-3xl font-bold mx-auto aerotow-font2 mb-3">WHY FINANCEFUEL?</h1>
            <div className="bg-gray-100 border border-blue-100 rounded-lg shadow-lg shadow-blue-100 p-4">
              <h2 className="text-lg font-semibold  left-font">Convenience:</h2> {/* Add your heading here */}
              <p className="text-sm text-blue-900 right-font">
                {/* Content 1 */}
                Access personalized financial advice anytime, anywhere.
              </p>
            </div>
            <div className="bg-gray-100 border border-blue-100 rounded-lg shadow-lg shadow-blue-100 p-4">
              <h2 className="text-lg font-semibold  left-font">Affordability:</h2> {/* Add your heading here */}
              <p className="text-sm text-blue-900 right-font">
                {/* Content 1 */}
                Pay for advice only when you need it, by the hour.
              </p>
            </div>
            <div className="bg-gray-100 border border-blue-100 rounded-lg shadow-lg shadow-blue-100 p-4">
              <h2 className="text-lg font-semibold  left-font">Expertise:</h2> {/* Add your heading here */}
              <p className="text-sm text-blue-900 right-font">
                {/* Content 1 */}
                Gain insights from experienced financial advisors tailored to your needs.
              </p>
            </div>
            <div className="bg-gray-100 border border-blue-100 rounded-lg shadow-lg shadow-blue-100 p-4">
              <h2 className="text-lg font-semibold  left-font">Enhanced Engagement:</h2> {/* Add your heading here */}
              <p className="text-sm text-blue-900 right-font">
                {/* Content 1 */}
                Reach users at crucial financial moments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
