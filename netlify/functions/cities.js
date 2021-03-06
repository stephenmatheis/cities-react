exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify(
            [
                {
                    "section": "cupertino",
                    "label": "Cupertino",
                    "area": "America",
                    "api": "Los_Angeles"
                },
                {
                    "section": "new-york-city",
                    "label": "New York City",
                    "area": "America",
                    "api": "New_York"
                },
                {
                    "section": "london",
                    "label": "London",
                    "area": "Europe"
                },
                {
                    "section": "amsterdam",
                    "label": "Amsterdam",
                    "area": "Europe"
                },
                {
                    "section": "tokyo",
                    "label": "Tokyo",
                    "area": "Asia"
                },
                {
                    "section": "hong-kong",
                    "label": "Hong Kong",
                    "area": "Asia",
                    "api": "Hong_Kong"
                },
                {
                    "section": "sydney",
                    "label": "Sydney",
                    "area": "Australia"
                }
            ]
        ),
    };
}