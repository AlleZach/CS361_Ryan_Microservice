const express = require('express')
const app = express()
const mongoose = require('mongoose')
const gameData = require('./models/game.model.js')

const Secure_token = "RyanCS361BearerToken"

// Middleware
app.use(express.json())

//Authorization
function verify_token(token){
    if(token == Secure_token){
        return true
    }
    return false
}

//Root test
app.get('/', (req, res) => {
    res.send('Hello from the gameData API!');
})

//Create new game
app.post('/api/v1/game/new', async (req, res) => {
    try {
        //Authorize
        const authHeader = req.headers['authorization'];
        const givenToken = authHeader && authHeader.split(' ')[1]
        if(!verify_token(givenToken)){
            return res.status(401).json({message: "Missing or invalid token"})
        }

        //Format new game data
        const newGame = new gameData({
            id: req.body.id,
            startTime: new Date(),
            settings:{
                gamemode: req.body.settings.gamemode,
                game_type: req.body.settings.type,
                bestOf: req.body.settings.bestOf,
                playerOne: req.body.settings.playerOne,
                playerTwo: req.body.settings.playerTwo
            },
            results:{},
            gameStates:[]
        })

        //Send response
        const savedGame = await gameData.create(newGame)
        res.status(200).json({id: savedGame.id})
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//Add to game states 
app.patch('/api/v1/game/state/:id', async (req, res) => {
    try {
        //Authorize
        const authHeader = req.headers['authorization'];
        const givenToken = authHeader && authHeader.split(' ')[1]
        if(!verify_token(givenToken)){
            return res.status(401).json({message: "Missing or invalid token"})
        }
        
        //Find game
        const gameId = req.params.id
        const internal_id = await gameData.findOne({'id' : gameId}, '_id') 
        const game = await gameData.findById(internal_id)
        if (!game){
            return res.status(404).json({message: "Game not found"})
        }
        
        //Update
        let gameStates = game.gameStates
        gameStates.push(req.body)
        updateJson = {'gameStates': gameStates}
        console.log(gameStates)
        const updatedGame = await gameData.findByIdAndUpdate(internal_id, updateJson)

        //Check save and send response
        const savedUpdate = await gameData.findById(internal_id)
        res.status(200).json(savedUpdate)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//End game
app.patch('/api/v1/game/end/:id', async (req, res) => {
    try{
        //Authorize
        const authHeader = req.headers['authorization'];
        const givenToken = authHeader && authHeader.split(' ')[1]
        if(!verify_token(givenToken)){
            return res.status(401).json({message: "Missing or invalid token"})
        }
        
        //Find game
        const gameId = req.params.id
        const internal_id = await gameData.findOne({'id' : gameId}, '_id') 
        const game = await gameData.findById(internal_id)
        if (!game){
            return res.status(404).json({message: "Game not found"})
        }

        //Adjust endtime
        const endTime = {'endTime': new Date()}
        const endedGame = await gameData.findByIdAndUpdate(internal_id, endTime)
        //Append result
        const result = {'result': req.body}
        const endedAndRecordedGame = await gameData.findByIdAndUpdate(internal_id, result)

        //Check save and send response
        const savedUpdate = await gameData.findById(internal_id)
        res.status(200).json(savedUpdate)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all games
app.get('/api/v1/games', async (req, res) => {
    try {
        // Find all games in collection
        const games = await gameData.find({})
        // Send response
        res.status(200).json(games)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get game by id
app.get('/api/v1/game/:id', async (req, res) => {
    try {
        //Find game by external id
        const gameId = req.params.id
        const game = await gameData.findOne({'id': gameId})
        if (!game){
            return res.status(404).json({message: "Game not found"})
        }
        //Send response
        res.status(200).json(game)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get games by player id
app.get('/api/v1/game/puu-id/:pid', async (req,res) => {
    try {
        //Find any games with player id
        const playerId = req.params.pid
        const all_games = await gameData.find({
            $or: [
                {"settings.playerOne": playerId},
                {"settings.playerTwo": playerId}
            ]
        })
        //Send response
        res.status(200).json(all_games)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//Delete game by id
app.delete('/api/v1/game/:id', async (req, res) => {
    //Find game
    const gameId = req.params.id
    const internal_id = await gameData.findOne({'id' : gameId}, '_id')
    //Delete game
    const game = await gameData.findByIdAndDelete(internal_id) 
    if (!game){
        return res.status(404).json({message: "Game not found"})
    }
    res.status(200).json({message: "Game deleted successfully"})
})


mongoose.connect('mongodb+srv://allezach:CyeTm4ogUNIxDZAY@rps-game-data.jnn0d.mongodb.net/Ryan_Microservice?retryWrites=true&w=majority&appName=RPS-Game-Data')
.then(() =>{
    console.log("Connected to database!")
    app.listen(54321, () => {
    console.log('Server is running on port 54321')
});
})
.catch(() => {
    console.log("Connection failed.")
})