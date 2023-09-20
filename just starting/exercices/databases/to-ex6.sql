CREATE TABLE usuarios (
    nome VARCHAR(50),
    email VARCHAR(100),
    idade INT
);


INSERT INTO usuarios(nome, email, idade) VALUES (
    "Cleiton Bom de Guerra",
    "cleitin.zl@gmail.com",
    33
);

INSERT INTO usuarios(nome, email, idade) VALUES (
    "Jorji do Glimps Óvãs",
    "sadboiolinha@gmail.com",
    31
);

INSERT INTO usuarios(nome, email, idade) VALUES (
    "Liu Pipi",
    "hellboy@gmail.com",
    21
);

INSERT INTO usuarios(nome, email, idade) VALUES (
    "Post do Marrone",
    "post.chaplover@gmail.com",
    28
);

INSERT INTO usuarios(nome, email, idade) VALUES (
    "Victor",
    "vitin@gmail.com",
    14
);

SELECT * FROM usuarios WHERE idade = 28;

DELETE FROM usuarios WHERE nome = "Victor";

UPDATE usuarios SET email = "" WHERE nome ="Victor";