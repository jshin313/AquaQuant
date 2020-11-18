import requests, json

payload = {
    'date': '11-17-2020',
    'data': json.dumps({
        'start_time': 'testing',
        'end_time': 'testing',
        'watersource': 'faucet',
    })
}

r = requests.post('http://localhost:5000/api/day', data=payload).json()

print(r['date'])
print(json.loads(r['data'])['start_time'])
