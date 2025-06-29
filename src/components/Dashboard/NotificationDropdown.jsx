export default function NotificationDropdown() {
    return (
      <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-20 p-4 transition-all duration-200 ease-out">
        <h3 className="font-bold mb-2">Notifications</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="border-b pb-1">Strategy ABC backtest completed.</li>
          <li className="border-b pb-1">Market closed higher today.</li>
          <li>New update available.</li>
        </ul>
      </div>
    );
  }
  