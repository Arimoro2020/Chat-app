import os
from flask import Flask, render_template
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv


load_dotenv()

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)

cors = CORS(app, resources={r'*':{'origins':'*'}})

app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URL')

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy()

migrate = Migrate(app, db)

db.init_app(app)


@app.errorhandler(404)
def not_found(e):

    return render_template("index.html")


bcrypt = Bcrypt(app)

api = Api(app)


