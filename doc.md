Rodar o arquivo com:
    npm run dev

npm install

npm init y 
    Para criar um arquivo package.json com as informações do projeto

instalar Tailwind CSS
    npm install -D tailwindcss

instalar (Para criar o arquivo tailwind.config.js)
    npx tailwindcss init

** Configurar o arquivo tailwind.config.js
    content: ["./**/*.{html,js}"]

** Criar o arquivo css e colocar os imports
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

** Em package.json criar um script para rodar o tailwindcss
    "scripts": {
    "dev": "npx tailwindcss -i ./styles.css/style.css -o ./styles/output.css --watch"
    }