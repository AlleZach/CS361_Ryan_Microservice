Ryan Microservice A - gameData REST API
----------------------------------------
How to use:
The API has seven endpoints, some with authorization and some with json bodies. Here are the URL's for all of them plus sample python snippets on how to call them.
API URL's:
Base URL: http://localhost:54321/api/v1
POST /game/new
POST /game/state/{id}
POST /game/end/{id}
GET /games
GET /game/{id}
GET /games/by-puuid/{player id}
DELETE /game/{id}

###########################################################################
# 1 - POST new game
new_game_url = base_url + '/game/new'
print(new_game_url)
headers = {
    'Authorization': f'Bearer RyanCS361BearerToken',
    'Content-Type': 'application/json'
}
# Example body given by Ryan
body = { 
  "id": "7c651ff4-6c53-4da3-80c7-b35d138debeb",
  "settings": {
    "gamemode": "rps",
    "type": "pvp",
    "bestOf": 5,
    "playerOne": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "playerTwo": "ef333aab-06bf-4046-878c-b241b996cbf2"
  }
}
response = requests.post(new_game_url, headers=headers, data=json.dumps(body))
print(response.status_code)
print(response.json())
###########################################################################

###########################################################################
# 2 - PATCH game state
state_url = base_url + '/game/state/7c651ff4-6c53-4da3-80c7-b35d138debeb'
print(state_url)
headers = {
    'Authorization': f'Bearer RyanCS361BearerToken',
    'Content-Type': 'application/json'
}
#Example body given by Ryan
body = {
      "id": 0,
      "playerOneChoice": "rock",
      "playerTwoChoice": "rock",
      "winner": "draw",
      "score": {
        "playerOne": 0,
        "playerTwo": 0,
        "draw": 1
      }
}
response = requests.patch(state_url, headers=headers, data=json.dumps(body))
print(response.status_code)
print(response.json())
###########################################################################

###########################################################################
# 3 - PATCH game end
end_url = base_url + '/game/end/7c651ff4-6c53-4da3-80c7-b35d138debeb'
print(end_url)
headers = {
    'Authorization': f'Bearer RyanCS361BearerToken',
    'Content-Type': 'application/json'
}
#Example body given by Ryan
body = {
    "numRounds": 5,
    "winner": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "score": {
      "playerOne": 3,
      "playerTwo": 1,
      "draw": 1
		}
}
response = requests.patch(end_url, headers=headers, data=json.dumps(body))
print(response.status_code)
print(response.json())
###########################################################################

###########################################################################
# 4 - GET all games
games_url = base_url + '/games'
print(games_url)
ponse = requests.get(games_url)
print(response.status_code)
print(response.json())
###########################################################################

###########################################################################
# 5 - GET game by id
game_url = base_url + '/game/7c651ff4-6c53-4da3-80c7-b35d138debeb'
print(game_url)
response = requests.get(game_url)
print(response.status_code)
print(response.json())
###########################################################################

###########################################################################
# 6 - GET games by player id
player_game_url = base_url + '/games/by-puuid/3fa85f64-5717-4562-b3fc-2c963f66afa6'
print(player_game_url)
ponse = requests.get(player_game_url)
print(response.status_code)
print(response.json())
###########################################################################

###########################################################################
# 7 - DELETE game by id
delete_url = base_url + '/game/7c651ff4-6c53-4da3-80c7-b35d138debeb'
print(delete_url)
ponse = requests.delete(delete_url)
print(response.status_code)
print(response.json())
###########################################################################
