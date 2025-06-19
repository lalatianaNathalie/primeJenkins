primex/docker-compose up -d
http://localhost:3000

PhpMyAdmin
http://localhost:8080/
root
yourpassword

Création user postman
http://localhost:3001/employe/   POST
{
  "idEmploye": "1",
  "nomEmploye": "Nathalie",
  "emailEmploye": "natha@gmail.com",
  "motDePasse": "123456",
  "typeEmploye": "Administrateur"
}

après user creéé
http://localhost:3000
