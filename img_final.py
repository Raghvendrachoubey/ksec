import base64
import sys 

name = sys.argv[1]
text_file = sys.argv[2]

data = open(text_file,'r').read() 

with open(name, "wb") as fh:
    fh.write(data.decode('base64'))