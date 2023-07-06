from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates, backref
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    background = db.Column(db.String, nullable=True)
    online_status = db.Column(db.string, nullable=True)
    avatar = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, default_server= db.func.now())
    updated_at = db.Column(db.DateTime, onupdated=db.func.now())

    participants = db.relationship('Participant', backref=backref("user"), cascade="all, delete-orphan")
    messages = db.relationship('Message', backref=backref("user"), cascade="all, delete-orphan")

    serialize_rules = ('-participants.user', '-messages.user', '-created_at', '-updated_at')



class Participant(db.Model, SerializerMixin):
    __tablename__ = "participants"

    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    serialize_rules = ('-user.participants', '-conversation.participants')

   



class Conversation(db.Model, SerializerMixin):
    __tablename__ = "conversations"

    id = db.Column(db.Integer, primary_key=True)
    conversation_name = db.Column(db.String, nullable=False)

    participants = db.relationship('Participant', backref=backref("conversation"), cascade="all, delete-orphan")
    messages = db.relationship('Message', backref=backref("conversation"), cascade="all, delete-orphan")

    serialize_rules = ('-participants.conversation', '-messages.conversation')

class Message(db.Model, SerializerMixin):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    content_data = db.Column(db.JSONB, nullable=False)
    content_type = db.Column(db.String)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default_server= db.func.now())
    updated_at = db.Column(db.DateTime, onupdated=db.func.now())

    serialize_rules = ('-user.messages', '-conversation.messages', '-updated_at')

    



