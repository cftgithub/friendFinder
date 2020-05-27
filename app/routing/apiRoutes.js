var friendsData = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            difference: 100,
            sameAns: 0
        };

        var scores = [];

        console.log(req.body);

        var userData = req.body;
        var userScores = userData.scores;

        //   Loops through friendsData array
        for (var i = 0; i < friendsData.length; i++) {
            // console.log(friendsData[i]);
            var diff = [];

            //   Loops through scores for friend to determine bestMatch
            for (var j = 0; j < friendsData[i].scores[j]; j++) {
                var totalDiff = Math.abs(parseInt(userScores[j]) - parseInt(friendsData[i].scores[j]));
                diff.push(totalDiff);
            }
            scores.push(diff);
        }

        for (var i = 0; i < scores.length; i++) {
            var friend = scores[i];
            var same = 0;
            for (var j = 0; j < friend[j].length; j++) {
                if (friend[j] === userScores[j]) {
                    same++;
                }
            }
            if (same > bestMatch.sameAns) {
                bestMatch.name = friendsData[i].name;
                bestMatch.photo = friendsData[i].photo;
                const add = (a, b) => (a + b);
                const sum = friend.reduce(add);
                bestMatch.difference = sum;
                bestMatch.sameAns = same;
            } else if (same === bestMatch.sameAns) {
                const add = (a, b) => (a + b);
                const sum = friend.reduce(add);
                if (sum < bestMatch.difference) {
                    bestMatch.name = friendsData[i].name;
                    bestMatch.photo = friendsData[i].photo;
                    bestMatch.difference = sum;
                    bestMatch.sameAns = same;
                }
            }
        }

        // saves userData to the array after check has been completed so user will not be selected as bestMatch
        friendsData.push(userData);
        res.json(bestMatch);
    });

};
