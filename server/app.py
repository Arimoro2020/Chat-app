
from flask import jsonify, make_response, request, session
from flask_restful import Resource
from models import User, UserConversation, Conversation, Message
from config import app, db, api


class Users(Resource):


    def get(self):

        q = User.query.all()

        if not q:

            return make_response({'error': 'User not found'}, 404)

        q_dict = [
            user.to_dict(only=('id', 'name', 'username', 'background', 'online_status', 'avatar'))
            for user in q
        ]

        response = make_response(q_dict, 200)

        return response

    def post(self):

        data = request.get_json()

        try:

            new = User(
                name=data.get('name'),
                username=data.get('username'),
                background=data.get('background'),
                online_status=data.get('online_status'),
                avatar=data.get('avatar')
            )

            db.session.add(new.to_dict())
            db.session.commit()

        except Exception as e:

            return make_response({"errors": ["validation errors"]}, 400)

        response = make_response(
            data.to_dict(only=('id', 'name', 'username', 'background', 'online_status', 'avatar')),
            201
        )

        return response


api.add_resource(Users, '/users')


class UserById(Resource):


    def get(self, id):

        user = User.query.filter(User.id == id).first()

        if not user:

            return make_response({'error': 'User not found'}, 404)

        response = make_response(
                user.to_dict(only=('id', 'name', 'username', 'background', 'online_status', 'avatar', '_password_hash')),
                200
        )

        return response

    def patch(self,id):

            user = User.query.filter(User.id == id).first()

            if not user:

                return make_response({'error': 'User not found'}, 404)

            data = request.get_json()

            try:

                for attr in data:

                    setattr(user, attr, data.get(attr))

                db.session.add(user)

                db.session.commit()

            except Exception as e:

                return make_response({"errors": ["validation errors"]}, 400)

            response = make_response(
                user.to_dict(only=('id', 'name', 'username', 'background', 'online_status', 'avatar')),
                202
            )

            return response


    def delete(self,id):

        user = User.query.filter(User.id == id).first()

        if not user:

            return make_response({'error': 'User not found'}, 404)

        db.session.delete(user)

        db.session.commit()

        response = make_response({}, 204)

        return response


api.add_resource(UserById, '/users/<int:id>')


class UserByUsername(Resource):


    def get(self, username):

        user = User.query.filter(User.username == username).first()

        if not user:

            return make_response({'error': 'User not found'}, 404)

        response = make_response(
            user.to_dict(only=('id', 'name', 'username', 'background', 'online_status', 'avatar', '_password_hash')),
            200
        )

        return response


api.add_resource(UserByUsername, '/users/<string:username>')


class Messages(Resource):


    def get(self):

        q = Message.query.all()

        if not q:

            return make_response({'error': 'Message not found'}, 404)

        q_dict = [message.to_dict() for message in q]

        response = make_response(q_dict, 200)

        return response


    def post(self):

        data = request.get_json()

        try:

            new_message = Message(
                content_data=data.get('content_data'),
                content_type=data.get('content_type'),
                conversation_id=data.get('conversation_id'),
                user_id=data.get('user_id')
            )

            db.session.add(new_message)

            db.session.commit()

            new_message_dict = new_message.to_dict()

            return make_response(new_message_dict, 201)

        except Exception as e:

            return make_response({"errors": ["validation errors"]}, 400)


api.add_resource(Messages, '/messages')


class MessageById(Resource):


    def get(self, id):

        message = Message.query.filter(Message.id == id).first()

        if not message:

            return make_response({'error': 'Message not found'}, 404)

        response = make_response(message.to_dict(), 200)

        return response


    def patch(self,id):

        message = Message.query.filter(Message.id == id).first()

        if not message:

            return make_response({'error': 'Message not found'}, 404)

        data = request.get_json()

        try:

            for attr in data:

                setattr(message, attr, data.get(attr))

            db.session.add(message)

            db.session.commit()

        except Exception as e:

               return make_response({"errors": ["validation errors"]}, 400)

        response = make_response(message.to_dict(), 202)

        return response


    def delete(self,id):

        message = Message.query.filter(Message.id == id).first()

        if not message:

            return make_response({'error': 'Message not found'}, 404)

        db.session.delete(message)

        db.session.commit()

        response = make_response({}, 204)

        return response


api.add_resource(MessageById, '/messages/<int:id>')


class UserConversations(Resource):


    def get(self):

        q = UserConversation.query.all()

        if not q:

            return make_response({'error': 'UserConversation not found'}, 404)

        q_dict = [user_conversation.to_dict() for user_conversation in q]

        response = make_response(q_dict, 200)

        return response


    def post(self):

        data = request.get_json()

        try:

            new_user_conversation = UserConversation(
                conversation_id=data.get('conversation_id'),
                user_id=data.get('user_id')
            )

            db.session.add(new_user_conversation)

            db.session.commit()

            new_user_conversation_dict = new_user_conversation.to_dict()

            return make_response(new_user_conversation_dict, 201)

        except Exception as e:

            return make_response({"errors": ["validation errors"]}, 400)


api.add_resource(UserConversations, '/user_conversations')


class UserConversationById(Resource):


    def get(self, id):

        user_conversation = UserConversation.query.filter(UserConversation.id == id).first()

        if not user_conversation:

            return make_response({'error':'UserConversation not found'}, 404)

        response = make_response(user_conversation.to_dict(), 200)

        return response


    def patch(self,id):

        user_conversation = UserConversation.query.filter(UserConversation.id == id).first()

        if not user_conversation:

            return make_response({'error': 'UserConversation not found'}, 404)

        try:

            data = request.get_json()

            for attr in data:

                setattr(user_conversation, attr, data.get(attr))

            db.session.add(user_conversation)

            db.session.commit()

        except Exception as e:

               return make_response({"errors": ["validation errors"]}, 400)

        response = make_response(user_conversation.to_dict(), 202)

        return response


    def delete(self,id):

        user_conversation = UserConversation.query.filter(UserConversation.id == id).first()

        if not user_conversation:

            return make_response({'error': 'UserConversation not found'}, 404)

        db.session.delete(user_conversation)

        db.session.commit()

        response = make_response({}, 204)

        return response


api.add_resource(UserConversationById, '/user_conversations/<int:id>')


class Conversations(Resource):

    def get(self):

        q = Conversation.query.all()

        if not q:

            return make_response({'error': 'Conversation not found'}, 404)

        q_dict = [conversation.to_dict(only=('id', 'conversation_name')) for conversation in q]

        response = make_response(q_dict, 200)

        return response


    def post(self):

        data = request.get_json()

        try:

            new_conversation = Conversation(
                conversation_name=data.get('conversation_name')
            )

            db.session.add(new_conversation)

            db.session.commit()

            new_conversation_dict = new_conversation.to_dict("id", "conversation_name")

            return make_response(new_conversation_dict, 201)

        except Exception as e:

            return make_response({"errors": ["validation errors"]}, 400)


api.add_resource(Conversations, '/conversations')


class ConversationById(Resource):

    def get(self, id):

        conversation = Conversation.query.filter(Conversation.id == id).first()

        if not conversation:

            return make_response({'error': 'Conversation not found'}, 404)

        response = make_response(conversation.to_dict(only=('id', 'conversation_name')), 200)

        return response


    def patch(self,id):

        conversation = Conversation.query.filter(Conversation.id == id).first()

        if not conversation:

            return make_response({'error': 'Conversation not found'}, 404)

        try:
            data = request.get_json()

            for attr in data:

                setattr(conversation, attr, data.get(attr))

            db.session.add(conversation)

            db.session.commit()

        except Exception as e:

               return make_response({"errors": ["validation errors"]}, 400)

        response = make_response(conversation.to_dict(only=('id', 'conversation_name')), 202)

        return response


    def delete(self,id):

        conversation = Conversation.query.filter(Conversation.id == id).first()

        if not conversation:

            return make_response({'error': 'Conversation not found'}, 404)

        try:

            db.session.delete(conversation)

            db.session.commit()

            response = make_response({}, 204)

        except Exception as e:

            db.session.rollback()  # Rollback the session in case of an exception to avoid leaving the session in an inconsistent state

            response = make_response(
                {'error': 'An error occurred while deleting the conversation'},
                500
            )  # Return a 500 status code for server errors

        return response


api.add_resource(ConversationById, '/conversations/<int:id>')


@app.route('/messages/conversations/<int:id>', methods = ['GET'])

def get_conversations(id):

    q = Message.query.filter(Message.conversation_id == id).all()

    if not q:

        return make_response({'error': 'Message not found'}, 404)

    q_dict = [message.to_dict() for message in q]

    response = make_response(jsonify(q_dict), 200)

    return response


class Signup(Resource):


    def post(self):

        data = request.get_json()

        new_user = User(name=data.get('name'), username=data.get('username'))
        # 6b. hash the given password and save it to _password_hash
        new_user.password_hash = data.get('password')
        # db.session add and commit
        db.session.add(new_user)

        db.session.commit()
        # 6c. save the user_id in session
        session['user_id'] = new_user.id
        #return response
        return make_response(new_user.to_dict(rules=('-_password_hash', )), 201)


api.add_resource(Signup, '/signup')


class Login(Resource):


    def post(self):
        # 7a. check if user exists
        data = request.get_json()
        try:
            user = User.query.filter_by(username=data.get('username')).first()
            # 7b. check if password is authentic
            if user.authenticate(data.get('password')) == False:

                return make_response ({'error': 'Invalid password'}, 401)
                # 7c. set session's user id
            session['user_id'] = user.id

            return make_response(
                user.to_dict(only=('id', 'name', 'username', 'background', 'online_status', 'avatar')),
                200
            )

        except Exception as e:

            return make_response ({'error': 'Invalid username'}, 401)


api.add_resource(Login, '/login')


class CheckSession(Resource):


    def get(self):

        try:

            user = User.query.filter(User.id == session.get('user_id')).first()

            response = make_response(
                user.to_dict(only=('id', 'name', 'username', 'background', 'online_status', 'avatar')),
                200
            )

            return response

        except Exception as e:

            return make_response({'message': '401: Not Authorized'}, 401)


api.add_resource(CheckSession, '/check_session')


class Logout(Resource):


    def delete(self): # just add this line!

        session['user_id'] = None

        return make_response({'message': '204: No Content'}, 204)


api.add_resource(Logout, '/logout')


if __name__ == '__main__':

    app.run(port=5555, debug=False)




















