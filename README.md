Ryan Microservice A - gameData REST API<br/>
----------------------------------------<br/>
How to use:<br/>
The API has seven endpoints, some with authorization and some with json bodies. Here are the URL's for all of them plus sample python snippets on how to call them.<br/>
API URL's:<br/>
Base URL: http://localhost:54321/api/v1<br/>
POST /game/new<br/>
POST /game/state/{id}<br/>
POST /game/end/{id}<br/>
GET /games<br/>
GET /game/{id}<br/>
GET /games/by-puuid/{player id}<br/>
DELETE /game/{id}<br/>
<br/>
###########################################################################<br/>
# 1 - POST new game<br/>
new_game_url = base_url + '/game/new'<br/>
print(new_game_url)<br/>
headers = {<br/>
    'Authorization': f'Bearer RyanCS361BearerToken',<br/>
    'Content-Type': 'application/json'<br/>
}<br/>
body = { <br/>
  "id": "7c651ff4-6c53-4da3-80c7-b35d138debeb",<br/>
  "settings": {<br/>
    "gamemode": "rps",<br/>
    "type": "pvp",<br/>
    "bestOf": 5,<br/>
    "playerOne": "3fa85f64-5717-4562-b3fc-2c963f66afa6",<br/>
    "playerTwo": "ef333aab-06bf-4046-878c-b241b996cbf2"<br/>
  }<br/>
}<br/>
response = requests.post(new_game_url, headers=headers, data=json.dumps(body))<br/>
print(response.status_code)<br/>
print(response.json())<br/>
###########################################################################<br/>
<br/>
###########################################################################<br/>
# 2 - PATCH game state<br/>
state_url = base_url + '/game/state/7c651ff4-6c53-4da3-80c7-b35d138debeb'<br/>
print(state_url)<br/>
headers = {<br/>
    'Authorization': f'Bearer RyanCS361BearerToken',<br/>
    'Content-Type': 'application/json'<br/>
}<br/>
body = {<br/>
      "id": 0,<br/>
      "playerOneChoice": "rock",<br/>
      "playerTwoChoice": "rock",<br/>
      "winner": "draw",<br/>
      "score": {<br/>
        "playerOne": 0,<br/>
        "playerTwo": 0,<br/>
        "draw": 1<br/>
      }<br/>
}<br/>
response = requests.patch(state_url, headers=headers, data=json.dumps(body))<br/>
print(response.status_code)<br/>
print(response.json())<br/>
###########################################################################<br/>
<br/>
###########################################################################<br/>
# 3 - PATCH game end<br/>
end_url = base_url + '/game/end/7c651ff4-6c53-4da3-80c7-b35d138debeb'<br/>
print(end_url)<br/>
headers = {<br/>
    'Authorization': f'Bearer RyanCS361BearerToken',<br/>
    'Content-Type': 'application/json'<br/>
}<br/>
body = {<br/>
    "numRounds": 5,<br/>
    "winner": "3fa85f64-5717-4562-b3fc-2c963f66afa6",<br/>
    "score": {<br/>
      "playerOne": 3,<br/>
      "playerTwo": 1,<br/>
      "draw": 1<br/>
		}<br/>
}<br/>
response = requests.patch(end_url, headers=headers, data=json.dumps(body))<br/>
print(response.status_code)<br/>
print(response.json())<br/>
###########################################################################<br/>
<br/>
###########################################################################<br/>
# 4 - GET all games<br/>
games_url = base_url + '/games'<br/>
print(games_url)<br/>
ponse = requests.get(games_url)<br/>
print(response.status_code)<br/>
print(response.json())<br/>
###########################################################################<br/>
<br/>
###########################################################################<br/>
# 5 - GET game by id<br/>
game_url = base_url + '/game/7c651ff4-6c53-4da3-80c7-b35d138debeb'<br/>
print(game_url)<br/>
response = requests.get(game_url)<br/>
print(response.status_code)<br/>
print(response.json())<br/>
###########################################################################<br/>
<br/>
###########################################################################<br/>
# 6 - GET games by player id<br/>
player_game_url = base_url + '/games/by-puuid/3fa85f64-5717-4562-b3fc-2c963f66afa6'<br/>
print(player_game_url)<br/>
ponse = requests.get(player_game_url)<br/>
print(response.status_code)<br/>
print(response.json())<br/>
###########################################################################<br/>
<br/>
###########################################################################<br/>
# 7 - DELETE game by id<br/>
delete_url = base_url + '/game/7c651ff4-6c53-4da3-80c7-b35d138debeb'<br/>
print(delete_url)<br/>
ponse = requests.delete(delete_url)<br/>
print(response.status_code)<br/>
print(response.json())<br/>
###########################################################################<br/>
