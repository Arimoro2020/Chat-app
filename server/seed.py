#!/usr/bin/env python3

from faker import Faker
import secrets
from config import bcrypt
from app import app
from models import db, User, UserConversation, Message, Conversation

fake = Faker()

if __name__ == '__main__':

    with app.app_context():

        User.query.delete()

        UserConversation.query.delete()

        Message.query.delete()

        Conversation.query.delete()

        names = ['Jerry Jones', 'Peter Duck',
                 'John Doe', 'Mel Needle', 'Ian Smith']

        status = ['online', 'offline', 'busy']

        url = "https://img.freepik.com/free-photo"

        path1A = "/happy-woman-gray-polo-shirt"
        path1B = "-with-pink-pin-button_53876-102858.jpg"

        path2A = "/smiling-stubble-young-man-white-"
        path2B = "t-shirt-against-plain-wall_23-2148213411.jpg"

        pictures = [
            url + "/worldface-spanish-guy-white-background_53876-137665.jpg",
            url + "/free-photo/portrait-man-laughing_23-2148859448.jpg",
            url + "/worldface-british-guy-white-background_53876-14467.jpg",
            url + "/handsome-adult-male-posing_23-2148729713.jpg",
            url + "/front-view-handsome-man-posing_23-2148692174.jpg",
            url + path1A + path1B,
            url + path2A + path2B,
            url + "/portrait-young-african-american-man_23-2148932869.jpg",
            url + "/worldface-australian-girl-white-background_53876-139752.jpg",
            url + "/worldface-british-guy-white-background_53876-14467.jpg"
        ]

        password = secrets.choice(status)

        users = [
            User(
                name=name,
                username=fake.word(),
                avatar=secrets.choice(pictures),
                _password_hash=bcrypt.generate_password_hash(
                    password.encode('utf-8')).decode('utf-8'),
                background=fake.sentence(),
                online_status=secrets.choice(status)
                )
            for name in names
        ]

        db.session.add_all(users)

        db.session.commit()

        conversations = [
            Conversation(conversation_name="Jerry Jones"),
            Conversation(conversation_name='Mel Needle'),
            Conversation(conversation_name='Ian Smith')
        ]

        db.session.add_all(conversations)

        db.session.commit()

        user_conversations = [
            UserConversation(conversation_id=1, user_id=1),
            UserConversation(conversation_id=2, user_id=4),
            UserConversation(conversation_id=3, user_id=5)
        ]

        db.session.add_all(user_conversations)

        db.session.commit()

        messages = [
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=1,
                user_id=1
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=1,
                user_id=4
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=1,
                user_id=1
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=1,
                user_id=4
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=1,
                user_id=4
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=1,
                user_id=1
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=1,
                user_id=4
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=1,
                user_id=1
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=1,
                user_id=4,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=1,
                user_id=1,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=1,
                user_id=4,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=1,
                user_id=1,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=1,
                user_id=4,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=2,
                user_id=3,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=2,
                user_id=4,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=2,
                user_id=3,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=2,
                user_id=4,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=2,
                user_id=3,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=2,
                user_id=4,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=2,
                user_id=3,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=2,
                user_id=4,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=3,
                user_id=3,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=3,
                user_id=5,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=3,
                user_id=3,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=3,
                user_id=5,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=3,
                user_id=3,
            ),
            Message(
                content_data=fake.sentence(),
                content_type='String',
                conversation_id=3,
                user_id=5,
            )
        ]

        db.session.add_all(messages)

        db.session.commit()
