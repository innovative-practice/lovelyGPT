
import pickle
path = 'test2.pkl'

f = open(path, 'rb')
data = pickle.load(f)

print(data)
