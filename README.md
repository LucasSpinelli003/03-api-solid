# App

Gympass style app

# RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter o seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia; 

# RNs (Regras de negócio)

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;    
- [ ] O usuário não pode fazer dois check-ins no mesmo dia;    
- [ ] O usuário não pode fazer o check-in se não estiver perto(100m) da academia;
- [ ] O check-in só pode ser validado até 20 min após criado;
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

# RNFs (Requisitos não funcionais)

- [X] A senha do usuário deve estar criptografada;
- [X] Os dados da aplicação devem estar persistidos em um banco PostegreSQL;
- [ ] Todas as listas devem estar páginadas com 20 itens por página;
- [ ] O usuário deve ser identificado pro um JWT (JSON Web Token);
