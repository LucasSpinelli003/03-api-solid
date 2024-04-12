# App

Gympass style app

# RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [X] Deve ser possível o usuário obter o seu histórico de check-ins;
- [X] Deve ser possível o usuário buscar academias próximas (até 10km);
- [X] Deve ser possível o usuário buscar academias pelo nome;
- [X] Deve ser possível o usuário realizar check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastrar uma academia; 

# RNs (Regras de negócio)

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;    
- [X] O usuário não pode fazer dois check-ins no mesmo dia;    
- [X] O usuário não pode fazer o check-in se não estiver perto(100m) da academia;
- [X] O check-in só pode ser validado até 20 min após criado;
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

# RNFs (Requisitos não funcionais)

- [X] A senha do usuário deve estar criptografada;
- [X] Os dados da aplicação devem estar persistidos em um banco PostegreSQL;
- [X] Todas as listas devem estar páginadas com 20 itens por página;
- [ ] O usuário deve ser identificado pro um JWT (JSON Web Token);
