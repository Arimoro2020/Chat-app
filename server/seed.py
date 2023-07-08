#!/usr/bin/env python3

from faker import Faker
import random
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import User, UserConversation, Message, Conversation

fake = Faker()

if __name__ == '__main__':
    
    engine = create_engine('postgresql://localhost:5432/chat.db')
    Session = sessionmaker(bind=engine)
    session = Session()
    
    session.query(User).delete()
    session.query(UserConversation).delete()
    session.query(Message).delete()
    session.query(Conversation).delete()
    session.commit()

    status = ['online', 'offline', 'Busy']

    users = [
    User(
        name=fake.name(),
        username=fake.Username(),
        _password_hash=fake.password(),
          background=fake.profession(),
        online_status=random.choice(status)
            )
        for _ in range(10)]
    
    session.add_all(users)
    session.commit()

    
    conversations = [
    Conversation(
        conversation_name=fake.name()
            )
        for _ in range(10)]
    
    session.add_all(conversations)
    session.commit()

    
    user_conversations = [
    UserConversation(
        conversation_id=random.randint(0, 10),
        user_id = random.randint(0, 10)
            )
        for _ in range(10)]
    
    session.add_all(user_conversations)
    session.commit()

    
    messages = [
    Message(
        content_data=fake.sentence(),
        content_type= 'String',
        conversation_id = random.randint(1, 10),
        user_id = random.randint(1, 10)
            )
        for _ in range(10)]

    session.add_all(Message)
    session.commit()


