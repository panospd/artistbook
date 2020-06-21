const stats = require("../services/stats");

describe("Calculate stats", function () {
    it("works", () => {
        const albums = [{
                id: "1",
                title: "Album 1",
                date: "2000",
                tracks: [{
                        id: "1",
                        title: "Track 1",
                        words: 10
                    },
                    {
                        id: "2",
                        title: "Track 2",
                        words: 5
                    }
                ]
            },
            {
                id: "1",
                title: "Album 1",
                date: "2000",
                tracks: [{
                    id: "1",
                    title: "Track 1",
                    words: 15
                }]
            }
        ]

        const result = stats.calculate(albums)

        console.log(result)

        expect(result).toEqual({
            avg: 10,
            min: 5,
            max: 10,
            stDeviation: 4.08,
            variance: 16.67
        });
    });

    it("Returns error message", () => {
        const albums = [{
                id: "1",
                title: "Album 1",
                date: "2000",
                tracks: []
            },
            {
                id: "1",
                title: "Album 1",
                date: "2000",
                tracks: []
            }
        ]

        const result = stats.calculate(albums)

        console.log(result)

        expect(result).toEqual({
            error: "Problem finding tracks for this artist"
        });
    });
});