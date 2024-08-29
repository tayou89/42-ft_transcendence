# 42 Pong

<img width="1300"alt="Screen Shot 2024-08-29 at 3 12 45 PM" src="https://github.com/user-attachments/assets/c2ade439-ad81-434a-82f2-a87cb2b4d8bd">

## Description

42 Pong is a modern, multiplayer implementation of the classic Pong game, developed as part of the ft_transcendence project at 42 School. This project showcases advanced web development techniques, microservices architecture, and robust security measures.

## Features

- **Multiplayer Pong Game**: Play against friends or other players online.
- **User Authentication**: Secure login system with 2FA and JWT.
- **User Profiles**: Customizable user profiles with stats tracking.
- **Real-time Gameplay**: Smooth, server-side game logic for fair play.
- **Responsive Design**: Enjoy the game on various devices and screen sizes.
- **Real-time Updates**: Game room and gameplay pages utilize socket.io for WebSocket communication and React useState for real-time rendering.

## Technology Stack

- **Backend**: Django (Python)
- **Frontend**: React, Bootstrap
- **Real-time Communication**: socket.io
- **State Management**: React useState
- **Database**: PostgreSQL
- **Caching**: Redis
- **Containerization**: Docker
- **Security**: WAF/ModSecurity, HashiCorp Vault
- **Monitoring**: ELK Stack (Elasticsearch, Logstash, Kibana), Grafana, Prometheus
- **Microservices Architecture**: Multiple interconnected services

## Getting Started

**Note**: Due to security considerations, the `.env` file containing necessary environment variables is not included in this repository. Therefore, running the project locally is not possible without proper configuration.

To explore the project structure and code:

1. Clone the repository
   ```
   git clone https://github.com/yourusername/42-pong.git
   cd 42-pong
   ```

2. Review the code and project structure

## Gameplay Instructions

- Use `W` or `Up Arrow` to move the paddle up
- Use `S` or `Down Arrow` to move the paddle down

## Implemented Modules

1. **Web Framework and Database**
   - Major: Backend Framework (Django)
   - Minor: Frontend Framework (React with Bootstrap)
   - Minor: Backend Database (PostgreSQL)

2. **User Management and Authentication**
   - Major: Standard user management, authentication across tournaments
   - Major: Two-Factor Authentication (2FA) and JWT implementation

3. **Gameplay**
   - Major: Remote players support
   - Real-time game room and gameplay updates using socket.io and React useState

4. **Cybersecurity**
   - Major: WAF/ModSecurity implementation with HashiCorp Vault for Secrets Management
   - Minor: GDPR Compliance Options (User Anonymization, Local Data Management, Account Deletion)

5. **DevOps**
   - Major: Infrastructure Setup for Log Management (ELK Stack)
   - Minor: Monitoring system (Grafana/Prometheus)
   - Major: Designing the Backend as Microservices

6. **Server-Side Game Logic**
   - Major: Replacing Basic Pong with Server-Side Pong and Implementing an API
   - WebSocket integration for real-time game state updates

## Real-time Features

The game room and gameplay pages are implemented using a combination of server-side logic and real-time client updates:

- **WebSocket Communication**: socket.io is used to establish real-time, bidirectional communication between the client and server.
- **React State Management**: useState hooks in React are utilized to manage and update the game state in real-time on the client side.
- **Server-Side Game Logic**: The core game logic is processed on the server, ensuring fair play and preventing client-side manipulation.

This architecture allows for a responsive and synchronized multiplayer experience, with minimal latency and consistent game state across all connected clients.

## Screenshots

Login Page
<img width="1300" alt="Screen Shot 2024-08-29 at 3 12 45 PM" src="https://github.com/user-attachments/assets/170e25b0-b457-455a-b114-b3773ddbd533">

2FA Page
<img width="1300" alt="Screen Shot 2024-08-29 at 3 13 42 PM" src="https://github.com/user-attachments/assets/3964798a-4f63-4069-9ffe-5192c5cefb88">

Main Page
<img width="1348" alt="Screen Shot 2024-08-29 at 3 13 51 PM" src="https://github.com/user-attachments/assets/4b8cf69e-251a-4493-a2f4-11e0c0dcb476">

Creating Room Pop-Up
<img width="1343" alt="Screen Shot 2024-08-29 at 3 14 22 PM" src="https://github.com/user-attachments/assets/b2cb05d7-bafd-4725-ae99-6ea1d5225fd6">

Game Room Page
<img width="2553" alt="Screen Shot 2024-08-29 at 4 01 35 PM" src="https://github.com/user-attachments/assets/332af8b1-93a2-40a7-922a-e81eda8b1710">

Game Playing Page
<img width="2330" alt="Screen Shot 2024-08-29 at 4 00 19 PM" src="https://github.com/user-attachments/assets/82400de6-26f4-459b-ae1b-389a002b240f">

Game Result Pop-Up
<img width="2182" alt="Screen Shot 2024-08-29 at 4 00 50 PM" src="https://github.com/user-attachments/assets/3a10e06c-3370-4f65-bad0-d0d79493165d">

User Info Page
<img width="1422" alt="Screen Shot 2024-08-29 at 4 06 47 PM" src="https://github.com/user-attachments/assets/a1897feb-3e71-4364-9630-29b24fb75cbe">

Tournament Game Room Page
<img width="2556" alt="Screen Shot 2024-08-29 at 4 03 40 PM" src="https://github.com/user-attachments/assets/20a5fd42-1923-4583-9423-98a731ba7b26">

## Contributors

- Tayou at 42 Seoul
- Seonlim at 42 Seoul
- Byejeon at 42 Seoul
- Sayoon at 42 Seoul