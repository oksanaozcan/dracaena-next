
export const revalidate = 0;

interface MyDataAndPrivacyPageProps {
  params: {}
}

const MyDataAndPrivacyPage: React.FC<MyDataAndPrivacyPageProps> = async ({
  params,
}) => {  

  return (
    <>
    <h1>Data and Privacy</h1> 
    <h2>Cookies</h2>
    <p className="pb-4">It's not just plants that are important. Cookies make sure that plant owners have the best experience on our site. If you continue we can assume you are happy with the cookies. If you have any questions about our cookie policy, get in touch. We are more than happy to assist you.</p>
    <div className="py-4 border-b-2">              
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer"/>
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 font-bold">Functional cookies</span>               
      </label>
      <div className="text-sm font-medium text-gray-900 dark:text-gray-300">Accept all necessary cookies to make this site and the shop function, like storing your shopping cart, wishlist and customer data.</div>
    </div>
    <div className="py-4 border-b-2">              
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer"/>
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 font-bold">Analytics</span>               
      </label>
      <div className="text-sm font-medium text-gray-900 dark:text-gray-300">Analytics cookies are used to analyze and measure your engagement with our content. The intention is to enhance your browsing experience.</div>
    </div>
    <div className="py-4 border-b-2">              
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer"/>
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 font-bold">Marketing</span>               
      </label>
      <div className="text-sm font-medium text-gray-900 dark:text-gray-300">Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.</div>
    </div>

    <div>
      <button type="button" className="py-2.5 px-5 me-2 mb-2 mt-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Forget current settings
      </button>
      <span>This will reload the page.</span>
    </div>

    <h2>Delete your DRACAENA.com account</h2>
    <p className="mb-4">
    We are sad to see you go. You can delete your PLNTS.com account by clicking the 'delete account' at the bottom. Once you delete your account it cannot be recovered at a later date. So think twice before making your decision.
    </p>

    <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
      Delete Account
    </button>
  </>
  )
}

export default MyDataAndPrivacyPage;