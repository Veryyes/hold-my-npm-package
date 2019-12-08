from flask import Flask, request
from flask_cors import CORS
import requests
from waitress import serve
from datetime import datetime
import json

app = Flask("Backend")
CORS(app)

logfile = "logs.txt"

@app.route("/<package>")
def getPackage(package):
	url = "https://www.npmjs.com/package/{}".format(package)
	r = requests.get(url)
	log = "[{}] fetched: {} : <{}>".format(datetime.now(), url, r.status_code)
	print(log)
	with open(logfile, 'a') as f:
		f.write(log)
	return str(r.status_code)

if __name__ == "__main__":
	#app.run(host="0.0.0.0", debug=False)
	serve(app, host="0.0.0.0", port=5000)
	
	
