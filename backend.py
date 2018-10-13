from flask import Flask, request
from flask_cors import CORS
import requests

import json

app = Flask("Backend")
CORS(app)

@app.route("/<package>")
def getPackage(package):
	#payload = {}
	r = requests.get("https://www.npmjs.com/package/{}".format(package))
	#payload["code"] = r.status_code
	return str(r.status_code)

app.run(host="0.0.0.0")
	
	
