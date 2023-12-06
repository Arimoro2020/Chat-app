
# Description: 

Chat application for private messaging of text type built on React and Flask-SQLAlchemy Python.

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/arimoro2020/Chat-app/security_scan.yml?logo=github&label=GitHub%20Action%20Security%20Scan%20Workflow%20Status)

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/Arimoro2020/Chat-app/code_quality.yml?logo=GitHub&label=GitHub%20Actions%20Code%20Quality%20Scan%20Workflow%20Status)






# User stories:

- As a user, I'm able to register and/or login
- As a user, I can search through users of the app, see their profiles, and add a user as a contact
- As a user, I can send, read, update, and delete messages between me and users in a conversation 
- As a user, I can update my user profile.


# Wireframe:

![image](https://github.com/Arimoro2020/Chat-app/assets/73043768/20d065cd-aaa5-4253-81bd-7e8026f6d854)




# React tree:
![Trees](https://github.com/Arimoro2020/Chat-app/assets/73043768/85548573-9a9e-478d-a99c-9904fb31fdaf)









# Client-side routes:

![New_routes](https://github.com/Arimoro2020/Chat-app/assets/73043768/1a3cf199-9a54-4153-b7ca-55fd5f383231)





# Entity Relationship Diagram:

![ERD2](https://github.com/Arimoro2020/Chat-app/assets/73043768/a31fd0c4-1e55-459c-b984-cad47bcffa59)




# API Routes:
| **Name** | **API endpoint**   | **COLOR** | **HTTP verb** | **Purpose**                                                                          |
|----------| ----------------------:|:--:|-------------------:|--------------------------------------------------------------------------------------|
| RETRIEVE | /users             |🟩 | **GET** | [{...}, {...}, ...]                                                                  |
| CREATE   | /users             |🟧 | **POST**      | {'id', 'username','password', 'avatar'}                                              |
| RETRIEVE | /users/:id         |🟩 |**GET**       | {'id', 'username', 'password', 'avatar'}                                             |
| DELETE   | /users/:id         |🟥 | **DELETE**    | {}                                                                                   |
| UPDATE   | /users/:id         |🟦 | **PATCH**     | {'id', 'username', 'password', 'avatar'}                                             |
| RETRIEVE | /messages          |🟩 | **GET**       | [{...}, {...}, ...]                                                                  |
| CREATE   | /messages          |🟧 | **POST**      | {'id','content_data', 'content_type', 'conversation_id', 'sender_id', 'created_at'}  |
| RETRIEVE | /messages/:id      |🟩 | **GET**       | {'id', 'content_data', 'content_type', 'conversation_id', 'sender_id', 'created_at'} |
| UPDATE   | /messages/:id      |🟦 | **PATCH**     | {'id','content_data', 'content_type', 'conversation_id', 'sender_id', 'created_at'}  |
| DELETE   | /messages/:id      |🟥 | **DELETE**    | {}                                                                                   |
| RETRIEVE | /user_conversations      |🟩 | **GET**       | [{...},{...},...]                                                                    |
| CREATE   | /user_conversations/:id  |🟧 |  **POST**      | {'id','conversation_id', 'user_id'}                                                  |
| RETRIEVE | /user_conversations/:id  |🟩 | **GET**       | {'id', 'conversation_id', 'user_id'}                                                 |
| UPDATE   | /user_conversations/:id  |🟦 | **PATCH**     | {'id','conversation_id', 'user_id'}                                                  |
| DELETE   | /user_conversations/:id  |🟥| **DELETE**    | {}                                                                                   |
| RETRIEVE | /conversations     |🟩 | **GET**       | [{...},{...},...]                                                                    |
| CREATE   | /conversations     |🟧 |  **POST**      | {'id', 'conversation_name'}                                                          |
| PATCH    | /conversations/:id |🟦 | **PATCH**     | {'id', 'conversation_name'}                                                          |
| DELETE   | /conversations/:id |🟥 | **DELETE**    | {}                                                                                   |
| RETRIEVE | /conversations/:id |🟩 | **GET**       | {'id', 'conversation_name'}                                                          |

# Stretch Goals:
- Extend message types to media and document types
-Encryption of messages
-Read Receipts
-Message reactions

# Board:

![Alt text](image-2.png)

# Frontend Icons:
![login_locked](client/src/assets/login_locked.svg){alt='icon
show a locked padlock implying you are currently logged out'}

