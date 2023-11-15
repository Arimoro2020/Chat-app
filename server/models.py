from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates, backref
from sqlalchemy.ext.hybrid import hybrid_property
# from sqlalchemy.dialects.postgresql import JSONB
from config import db, bcrypt


class User(db.Model, SerializerMixin):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String, nullable=False)

    username = db.Column(db.String, unique=True, nullable=False)

    _password_hash = db.Column(db.String, nullable=False)

    background = db.Column(db.String, nullable=True)

    online_status = db.Column(db.String, nullable=True)

    avatar = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())

    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_conversations = db.relationship(
        'UserConversation',
        backref=backref("user"),
        cascade="all, delete-orphan"
    )

    messages = db.relationship(
        'Message',
        backref=backref("user"),
        cascade="all, delete-orphan"
    )

    serialize_rules = ('-user_conversations.user', '-messages', '-updated_at',)

    @validates('background')
    def validate_background(self, key, background):

        if len(background) > 800:

            raise ValueError('background must not be more than 800 characters')

        return background

    @validates('username')
    def validate_username(self, key, username):

        if not username:

            raise ValueError("username cannot be empty")

        existing_user = User.query.filter_by(username=username).first()

        if existing_user:

            raise ValueError('username must be unique')

        return username

    @validates('avatar')
    def validate_avatar(self, key, avatar):

        if avatar == '':

            raise ValueError("avatar cannot be empty")

        elif('jpg' not in avatar and 'png' not in avatar and 'jpeg' not in avatar):

            raise ValueError('avatar must be png or jpg')

        return avatar

    @validates('online_status')
    def validate_online_status(self, key, status):

        if status not in ['online', 'offline', 'busy']:

            raise ValueError('status must be one of online, offline, or busy')

        return status

    @hybrid_property
    def password_hash(self):

        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )

        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):

        return bcrypt.check_password_hash(
            self._password_hash,
            password.encode('utf-8')
        )


class UserConversation(db.Model, SerializerMixin):

    __tablename__ = "user_conversations"

    id = db.Column(db.Integer, primary_key=True)

    conversation_id = db.Column(db.Integer, db.ForeignKey(
        'conversations.id'), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    serialize_rules = ('-conversation.user_conversations',)

    def to_dict(self, deep=False):

        serialized = super(UserConversation, self).to_dict(deep)

        if deep:

            serialized['user'] = self.user.to_dict()

        return serialized


class Conversation(db.Model, SerializerMixin):

    __tablename__ = "conversations"

    id = db.Column(db.Integer, primary_key=True)

    conversation_name = db.Column(db.String, nullable=False)

    user_conversations = db.relationship(
        'UserConversation',
        backref=backref("conversation"),
        cascade="all, delete-orphan"
    )

    messages = db.relationship(
        'Message',
        backref=backref("conversation"),
        cascade="all, delete-orphan"
    )

    serialize_rules = ('-user_conversations.conversation', '-messages')

    @validates('conversation_name')
    def validate_conversation_name(self, key, conversation_name):

        if not conversation_name:

            raise ValueError("conversation_name cannot be empty")

        elif len(conversation_name) > 20:

            raise ValueError(
                'conversation_name must be less than 20 characters')

        return conversation_name


class Message(db.Model, SerializerMixin):

    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)

    content_data = db.Column(db.String, nullable=False)

    content_type = db.Column(db.String,  nullable=False)

    conversation_id = db.Column(db.Integer, db.ForeignKey(
        'conversations.id'), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())

    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    serialize_rules = ('-conversation.messages', '-updated_at',)

    def to_dict(self, deep=False):

        serialized = super(Message, self).to_dict(deep)

        if deep:

            serialized['user'] = self.user.to_dict()

        return serialized

    @validates('content_data')
    def validate_content_data(self, key, content):

        if len(content) > 2000:

            raise ValueError('content must be less than 2000 characters')

        return content
