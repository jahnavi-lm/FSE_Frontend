function FundActionBar() {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 flex justify-center space-x-4 mt-10">
      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
        Buy More
      </button>
      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
        Sell Units
      </button>
    </div>
  );
}

export default FundActionBar;