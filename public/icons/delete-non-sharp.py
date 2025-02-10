import os

files = os.listdir()

delete = []

for file in files:
    if "sharp" not in file and ".py" not in file:
        os.remove(file)

print(delete)

