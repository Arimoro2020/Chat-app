import os
from flask_cors import CORS
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy



app = Flask(__name__)
cors = CORS(app, resources={r'*':{'origins':'*'}})
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URL')
# postgresql://chat_app_db_ljvm_user:1jTH7lqIlqXxnpgcIK2SAAF0TMxHMETO@dpg-ck1j75fhdsdc73d2h6hg-a.oregon-postgres.render.com/chat_app_db_ljvm
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db = SQLAlchemy()
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)
