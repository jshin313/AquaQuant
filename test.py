import requests, json

payload1 = {
    'date': '10-14-2020',
}

payload2 = {
    'data': json.dumps({
        'date': '10-14-2020',
        'start_time': '17:00:20',
        'end_time': '17:00:59',
        'water_source': 'faucet',
    })
}

# # Get request test for Day
# r = requests.get('http://localhost:5000/api/day', data=payload1).json()
# print(" --- GET TEST for Day --- ")
# for row in json.loads(r['data']):
#     print(row)
# print()

# # Post request test for Day
# print(" --- POST TEST for Day --- ")
# r = requests.post('http://localhost:5000/api/day', data=payload2).json()
# print(r)
# print()

# # Get request test for Year
# print(" --- GET TEST for Year --- ")
# r = requests.get('http://localhost:5000/api/year', data={'year': '2020'}).json()
# print(r)
# print()

# # Get request test for On
# print(" --- GET TEST for On --- ")
# r = requests.get('http://localhost:5000/api/on', data={'water_source': 'faucet'}).json()
# print(r)
# print()

# POST request test for On
print(" --- POST TEST for On --- ")
r = requests.post('https://aquaquant.herokuapp.com/api/on', data={'water_source': 'toilet', 'on':'True'}).json()
print(r)
print()

# # Get request test for On
# print(" --- GET TEST for On --- ")
# r = requests.get('http://localhost:5000/api/on', data={'water_source': 'faucet'}).json()
# print(r)
# print()

