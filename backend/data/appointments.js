let todayStr = new Date().toISOString().replace(/T.*$/, '') //YYYY-MM-DD of today

const appointments =
    [
        // {
        //     title: 'All Day Appointment',
        //     startTime: todayStr,
        //     endTime: new Date("2022-03-25"),
        //     priceFull: 0,
        //     canceled: false,
        //     cancellationReason: 'None',
        // },
        {
            startTime: todayStr + 'T12:00:00',
            endTime: Date(),
            priceFull: 10,
            canceled: true,
            cancellationReason: 'None'
        }
    ]

export default appointments;