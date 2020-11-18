# Converts time to gallons based estimated water flow rate of water source

# In Gallons Per Minute (GPM) or gallons per use. Info from following link:
# https://extension.psu.edu/water-system-planning-estimating-water-needs
flow_rates = {
    "bathroom_faucet": 2,
    "kitchen_faucet": 3,
    "faucet": 2.5,
    "shower": 5,
    "toilet": 5,
    "toilet_standard": 5,
    "toilet_low": 1.6,
}

# Returns total gallons that a water source used up over a period of time
def convert_to_gallons(start_time, end_time, water_source):
    # If water source is a toilet, there is only one flush
    if (water_source == 'toilet_low' or water_source == 'toilet_standard' or water_source == 'toilet'):
        return flow_rates[water_source]

    # Isolate seconds, minutes, hours, 
    start = start_time.split(":")
    end = end_time.split(":")
    hours = int(end[0]) - int(start[0])
    minutes = int(end[1]) - int(start[1])
    seconds = int(end[2]) - int(start[2])

    # print(hours)
    # print(minutes)
    # print(seconds)

    # Time in minutes water source was on
    total_time = seconds/60.0 + minutes + hours * 60
    print(total_time)

    return flow_rates[water_source] * total_time
