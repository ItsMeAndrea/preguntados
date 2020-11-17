CREATE DATABASE preguntados;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,   
     email VARCHAR(100),    
     password VARCHAR(100),    
     username VARCHAR(100)
     );