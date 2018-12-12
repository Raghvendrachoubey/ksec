import requests
import sys

query = sys.argv[1]

url = 'https://www.kotak.com/content/kotakcl/en/search/_jcr_content/mid_par/search.filterclick.all.0.10.esc.json/' + query
r = requests.post(url)

print (r)

