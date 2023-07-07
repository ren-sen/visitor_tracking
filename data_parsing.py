import pandas as pd
import numpy as np
def countMacsInAP(AP):
    return df[df['Access Point ID'] == AP]['MAC Address'].nunique()

data = [
    ['2023-07-06 14:26:30', 'AB:CD:EF:12:34:56', 'AP2', -68],
    ['2023-07-06 14:25:30', 'AB:CD:EF:12:34:56', 'AP1', -67],
    ['2023-07-06 14:25:45', '98:76:54:32:10:AA', 'AP2', -80],
    ['2023-07-06 14:26:02', 'AB:CD:EF:12:34:56', 'AP3', -65],
    ['2023-07-06 14:28:22', 'AB:CD:EF:12:34:56', 'MAIN', -65],
    ['2023-07-06 14:26:12', '12:34:56:78:9A:BC', 'AP1', -72],
    ['2023-07-06 14:26:45', '98:76:54:32:10:AA', 'MAIN', -80],
    ['2023-07-06 14:28:12', '12:34:56:78:9A:BC', 'MAIN', -72]
]

df = pd.DataFrame(data, columns=['Timestamp', 'MAC Address', 'Access Point ID', 'Signal Strength'])
df['Timestamp'] = pd.to_datetime(df['Timestamp']) # converting the timestamp to a datetime type
mac_addresses = np.array(df['MAC Address'].unique()) # returns an array for every mac address found


total_visitors_overall = df['MAC Address'].nunique() #total visitors throughout the entire day

totalAP1 = countMacsInAP("AP1") # can count the number of visitors in that specific AP overall
totalAP2 = countMacsInAP("AP2")
totalAP3 = countMacsInAP("AP3")

combined_df = pd.DataFrame()

for mac_addr in mac_addresses:
    time_df = df[df['MAC Address'] == mac_addr].sort_values(by='Timestamp').reset_index(drop=True)
    time_df['Time Difference'] = time_df.groupby('MAC Address')['Timestamp'].diff() # find the time difference between each row so we can get when the user disconnects into another access point
    time_df['Time Difference'] = time_df.groupby('MAC Address')['Time Difference'].shift(-1) # have to move it up
    time_df['Time Difference'] = time_df['Time Difference'].fillna(pd.Timedelta(0))
    time_df['Time Difference'] = time_df['Time Difference'].dt.total_seconds()
    time_df = time_df.groupby('Access Point ID').agg({
    'Time Difference': 'sum',
    'MAC Address': 'first',
    'Signal Strength': 'mean'
    }).reset_index()
    time_df = time_df.pivot_table(index='MAC Address', columns='Access Point ID', values='Time Difference', aggfunc='first')
    combined_df = pd.concat([combined_df, time_df], axis=1)
    
combined_df = combined_df.groupby('MAC Address').first().reset_index() 
print("Number of visitors overall: ", total_visitors_overall)
print("-----------------")
print("This would have the total times each individual spent in each access point")
print(combined_df)
print("-----------------")
print("This is the number of visitors that were in Access Point 1: ", totalAP1 )
("-----------------")
print("Access point 2: ", totalAP2)
("-----------------")
print("Access point 3: ", totalAP3)
