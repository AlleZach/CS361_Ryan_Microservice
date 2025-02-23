const mongoose = require('mongoose')

const gameSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: [true, "Please enter an id."]
        },
        startTime: {
            type: Date,
            required: [true, "Please enter a start time."]
        },
        endTime: {
            type: Date,
            required: false
        },
        settings: {
            gamemode: {
                type: String,
                required: [true, "Please enter a gamemode."]
            },
            game_type: {
                type: String,
                required: [true, "Please enter a type."]
            },
            bestOf: {
                type: Number,
                required: [true, "Please enter the maximum number of games (bestOf)."],
                default: 0
            },
            playerOne: {
                type: String,
                required: [true, "Please enter the id of player 1"]
            },
            playerTwo: {
                type: String,
                required: [true, "Please enter the id of player 2"]
            }
        },
        result: {},
        gameStates: []
    },
    {
        timestamps: true
    }
)

const gameData = mongoose.model('Game', gameSchema)
module.exports = gameData