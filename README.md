#  NSB e-commerce
---- No store behind ----

**Servicio de compras  y gestion de tiendas virtuales para micro-empresarios**

![](banner01.jpg)

## Instrucciones para probar en local
En este punto puedes abrir un IDE de confianza como Visual Studio o Pycharm.

1. Clonar repositorio

Clona este repositorio en tu  pc con el siguiente comando desde la terminal (preferible Git bash):
```commandline
git clone https://github.com/No-Country/c15-45-ft-python-react.git
```

2. Carga de entorno virtual

Una vez descargado el  repositorio, ejecuta el siguiente comando:

a. Si es tu primera vez, crea el entorno virtual:
```commandline
python -m venv name-venv
```
``name-venv`` corresponde al nombre que deseas dar a tu entorno virtual

b. Cuentas con entorno virtual creado:

```commandline
source name-venv/Scripts/activate
```
Una vez se haya cargado el entorno virtual debes verificar con el siguiente comando:

Puedes usar
```commandline
which python
```
o,
```commandline
echo $VIRTUAL_ENV
```
Debe arrojar algo similar a esta cadena de texto:

```
/home/tu_usuario/name-venv/Scripts/python
(name-venv)
```

3. Instalación de requerimientos

```commandline
pip install -r requirements.txt
```
``requirements.txt`` contiene los paquetes a instalar.

Tambien se puede generar el archivo ``requirements.txt`` para compatibilidad 
con otros sistemas, de la siguiente forma:

```commandline
poetry export -f requirements.txt --output requirements.txt --without-hashes
```

4. Carga de dependencias con ``Poetry``, (mantenimiento de paquetes):

a. Si aún no instalas Poetry, ejecuta el comando para instalarlo:

```commandline
pip install poetry
```
Para cargar las dependencias ejecuta:

````commandline
poetry install
````
Esto instalará los paquetes especificados en el archivo ``pyproject.toml``.

Tambien se puede agregar dependencias con el comando
````commandline
poetry add
````
5. Probar aplicativo

Dentro de la carpeta ``NoStoreBehind`` realiza lo siguiente:

a. Ejecuta el comando:

````commandline
py manage.py runserver
````
Si se presenta un error referente a migración ejecuta previamente este comando:

````commandline
py manage.py migrate
````
b. Accede en local

Digita en el navegador http://127.0.0.1:8000/index
o, http://localhost:8000/index

* _El número de puerto (8000) puede variar_ 


