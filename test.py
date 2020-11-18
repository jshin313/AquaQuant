import requests, json

payload = {
    'date': '10-14-2020',
    'data': json.dumps({
        'start_time': '17:00:20',
        'end_time': '17:00:59',
        'watersource': 'faucet',
    })
}

r = requests.post('http://localhost:5000/api/day', data=payload).json()

print(r['date'])
print(r['data']['start_time'])
