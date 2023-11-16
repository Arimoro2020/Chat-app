
Description: 

Chat application for private messaging of text type built on React and Flask-SQLAlchemy Python.

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/arimoro2020/Chat-app/security_scan.yml?logo=github&label=GitHub%20Action%20Security%20Scan%20Workflow%20Status)

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/Arimoro2020/Chat-app/code_quality.yml?logo=GitHub&label=GitHub%20Actions%20Code%20Quality%20Scan%20Workflow%20Status)






User stories:

- As a user, I'm able to register and/or login
- As a user, I can search through users of the app, see their profiles, and add a user as a contact
- As a user, I can send, read, update, and delete messages between me and users in a conversation 
- As a user, I can update my user profile.


Wireframe:

![image](https://github.com/Arimoro2020/Chat-app/assets/73043768/a0616482-062a-4853-ba78-438b2a8d9126)



React tree:

![Alt text](Tree.drawio.png)






Client side routes:

![Alt text](client_new.drawio.png)


Entity Relationship Diagram:

![Alt text](new.drawio.png)



API Routes:
| **Name** | **API endpoint**   | **HTTP verb** | **Purpose**                                                                          |
|----------|--------------------|---------------|--------------------------------------------------------------------------------------|
| RETRIEVE | /users             | **GET**       | [{...}, {...}, ...]                                                                  |
| CREATE   | /users             | **POST**      | {'id', 'username','password', 'avatar'}                                              |
| RETRIEVE | /users/:id         | **GET**       | {'id', 'username', 'password', 'avatar'}                                             |
| DELETE   | /users/:id         | **DELETE**    | {}                                                                                   |
| UPDATE   | /users/:id         | **PATCH**     | {'id', 'username', 'password', 'avatar'}                                             |
| RETRIEVE | /messages          | **GET**       | [{...}, {...}, ...]                                                                  |
| CREATE   | /messages          | **POST**      | {'id','content_data', 'content_type', 'conversation_id', 'sender_id', 'created_at'}  |
| RETRIEVE | /messages/:id      | **GET**       | {'id', 'content_data', 'content_type', 'conversation_id', 'sender_id', 'created_at'} |
| UPDATE   | /messages/:id      | **PATCH**     | {'id','content_data', 'content_type', 'conversation_id', 'sender_id', 'created_at'}  |
| DELETE   | /messages/:id      | **DELETE**    | {}                                                                                   |
| RETRIEVE | /user_conversations      | **GET**       | [{...},{...},...]                                                                    |
| CREATE   | /user_conversations/:id  | **POST**      | {'id','conversation_id', 'user_id'}                                                  |
| RETRIEVE | /user_conversations/:id  | **GET**       | {'id', 'conversation_id', 'user_id'}                                                 |
| UPDATE   | /user_conversations/:id  | **PATCH**     | {'id','conversation_id', 'user_id'}                                                  |
| DELETE   | /user_conversations/:id  | **DELETE**    | {}                                                                                   |
| RETRIEVE | /conversations     | **GET**       | [{...},{...},...]                                                                    |
| CREATE   | /conversations     | **POST**      | {'id', 'conversation_name'}                                                          |
| PATCH    | /conversations/:id | **PATCH**     | {'id', 'conversation_name'}                                                          |
| DELETE   | /conversations/:id | **DELETE**    | {}                                                                                   |
| RETRIEVE | /conversations/:id | **GET**       | {'id', 'conversation_name'}                                                          |

Stretch Goals:
- Extend message types to media and document types
-Encryption of messages
-Read Receipts
-Message reactions

Board:

![Alt text](image-2.png)

