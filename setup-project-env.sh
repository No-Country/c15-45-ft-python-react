#!/bin/bash

# Iniciar entorno virtual
echo -e "********** Iniciando entorno **********\n"
source nsb-commerce-venv/Scripts/activate
which python
sleep 2

# Instalar dependencias
echo -e ">>> Instalación de requerimientos\n"
pip install -r requirements.txt

# Verificar e instalar poetry si no está instalado
if ! command -v poetry &> /dev/null; then
  # poetry no está instalado, instalarlo
  echo "El paquete 'poetry' no está instalado. Lo instalaré ahora."
  sleep 2
  pip install poetry
fi

sleep 2
# Instalar dependencias con poetry
echo -e ">>> Instalando dependencias con poetry\n"
poetry install

# Preguntar al usuario qué proyecto levantar
respuesta=""
echo -e "¿Desea levantar el proyecto FrontEnd(f)/ Backend(b)/ Ninguno(n)? (f/b/n): "
while true; do
  read -r respuesta
  respuesta=${respuesta,,}  # Convertir la respuesta a minúsculas para hacerla insensible a mayúsculas
  if [[ $respuesta == "f" || $respuesta == "b" || $respuesta == "n" ]]; then
    break
  else
    echo -e "Respuesta no válida. Por favor, ingrese 'f', 'b' o 'n'."
  fi
done

# Ejecutar acción correspondiente según respuesta de usuario
if [[ $respuesta == "n" ]]; then
  echo -e "No se levantarán proyectos. \nInicie el entorno virtual manualmente. \n"
  echo -e ">>> source nsb-commerce-venv/Scripts/activate"
  exit
fi

if [[ $respuesta == "f" ]]; then
  # Desactivar entorno virtual
  deactivate
  echo ">>> Preparate. Levantando proyecto Frontend <<<"
  echo -e "\n"
  cd frontend
  if [ -d "node_modules" ]; then
    echo "node_modules verificado."
  else
    # Directorio node_modules no existe
    echo -e "node_modules no existe. \nSe instalarán dependencias."
    # cd frontend
    npm i
  fi
  sleep 2
  # cd frontend
  npm run dev
fi

if [[ $respuesta == "b" ]]; then
  echo -e ">>> Preparate. Levantando proyecto Backend <<<\n\n"
  # Levantar el proyecto Django
  sleep 2
  cd NoStoreBehind
  python manage.py runserver
fi

