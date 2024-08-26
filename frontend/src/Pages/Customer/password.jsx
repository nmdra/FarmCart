{
    /* Change Password */
}
;<div className="bg-white p-6 rounded-lg shadow-sm col-span-2 border-2">
    <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Change Password
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
        <div>
            <label className="block text-gray-700">Current Password</label>
            <input
                type="password"
                placeholder="Current Password"
                className="border p-2 rounded-md w-full"
            />
        </div>
        <div>
            <label className="block text-gray-700">New Password</label>
            <input
                type="password"
                placeholder="New Password"
                className="border p-2 rounded-md w-full"
            />
        </div>
        <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
                type="password"
                placeholder="Confirm Password"
                className="border p-2 rounded-md w-full"
            />
        </div>
    </div>
    <button className="mt-4 bg-green-500 text-white p-2 rounded-md">
        Change Password
    </button>
</div>
