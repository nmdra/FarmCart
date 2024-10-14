const OverviewCards = () => {
    return (
        <div>
            <div className="">
                <div className="grid grid-cols-3 gap-6 ">
                    <div className="p-6 border rounded-lg ">
                        <h1>Total Tickets</h1>
                        <h1 className="text-6xl font-semibold text-[#75b100] pt-3">
                            100
                        </h1>
                    </div>
                    <div className="p-6 border rounded-lg ">
                        <h1>Resolve Tickets</h1>
                        <h1 className="text-6xl font-semibold text-[#75b100] pt-3">
                            100
                        </h1>
                    </div>
                    <div className="p-6 border rounded-lg ">
                        <h1>Close Tickets</h1>
                        <h1 className="text-6xl font-semibold text-[#75b100] pt-3">
                            100
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewCards
