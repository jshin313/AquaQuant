import requests, json

payload1 = {
    'date': '10-14-2020',
}

payload2 = {
    'data': json.dumps({
        'date': '10-14-2020',
        'start_time': '17:00:20',
        'end_time': '17:00:59',
        'watersource': 'faucet',
    })
}

r = requests.get('http://localhost:5000/api/day', data=payload1).json()
# r = requests.post('http://localhost:5000/api/day', data=payload2).json()

# print(r['date'])
# print(json.loads(r['data'])['start_time'])
print(r)
