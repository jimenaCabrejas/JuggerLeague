Al clonar el repositorio, realizar un npm install

NOTA IMPORTANTE 26/03/2017:
Con intencion de organizar el desarrollo, para cada página se hará una rama
(branch) nueva, en la cual se desarollará todo lo necesario para su funcionamiento,
es decir, desde su interfaz grafica hasta os controladores en contacto con la base de datos.
Ademas de las ramas para las páginas, se crea una rama principal de desarrollo (indev),
a la cuala se harán todos los pull request para resolver conflictos y pruebas de integración
antes de pasar a la rama master.

TO DO List:
--Controladores:
streaming

--Rutas

/streaming

DOING List:
Aprender git

DONE List:

--Controladores:
calendario
liga - dividida en dos
tienda
configuracion

--Rutas

/calendario
/liga - en lugar de eso /combates y /clasificacion
/tienda
/config

--Para probar la tienda añadir al usuario un nivel y créditos:
(en mongo.exe -- use todos)
db.users.update({"username":"Prueba"}, { $set : {creditos : 30}})
db.users.update({"username":"Prueba"}, { $set : {nivel : 2}})

Añadir a la tienda productos:
db.shops.insert({"producto":"Pala", "precio": 40, "nivel": 1})
db.shops.insert({"producto":"Pinzas", "precio": 20, "nivel": 1})
db.shops.insert({"producto":"Laser", "precio": 80, "nivel": 5})
