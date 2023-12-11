# Laravel/Vue.js fullstack API demo. Dashboard panel with authentication, sign up, and settings update.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

EN: A full demonstration of Laravel and Vue.js integrated via API. It has a dashboard with authentication, sign up, and "my settings" functionality. It has the backend and frontend environments separated.

PT: Uma demonstração completa da integração entre Laravel e Vue.js via API. Possui um painel com funcionalidades de autenticação, cadastro e alteração de configurações. Os ambientes de backend e frontend são separados.

## Table of Contents

- [Features/Funcionalidades](#features)
- [Requirements/Requisitos](#requirements)
- [How_to_use/Como_utilizar](#how_to_use)
- [Important/Importante](#important)
- [Images/Imagens](#images)

## Features

EN:
- One general public page.
- Public sign up.
- Login screen.
- Full dashboard panel.
- My settings page.
- Dashboard account deactivation.
- API calls throttling.
- Nice frontend notification system.
- Light/dark toggle switch.
- Remember session.
- Local storage encrypted auth key.
- Docker ready for running backend and frontend in separated containers.

PT:
- Uma página pública geral.
- Cadastro público.
- Tela de login.
- Painel completo do dashboard.
- Página de minhas configurações.
- Desativação da conta no dashboard.
- Limitação de chamadas à API.
- Sistema de notificações frontend agradável.
- Interruptor de alternância entre modo claro/escuro.
- Lembrar sessão.
- Chave de autenticação criptografada no armazenamento local.
- Preparado para o Docker rodar o backend e frontend em containers separados.

## Requirements

EN: This project uses:
PT: Este projeto utiliza:

- Vue.js 3
    - Vite
    - Vue Router
    - Picocss
    - Font Awesome
    - Axios
    - Toastify JS
- Laravel 10
- SQL database

## How_to_use

EN:
- After download this project files to your machine, you need to install the dependencies by running "composer install" inside backend Laravel folder, and "npm run install" inside Vue.js fronend folder.
- You need to set up your database and connect it to Laravel backend. After this, you need to run "php artisan migrate".
- The Laravel backend works only with API calls and is planned to be stateless, therefore the cache system was set (in the .env file) to use the database.
- For Vue.js, when you want to have the frontend ready for production, you run "npm run build", so the new files inside of "public" folder in project root, will be your new files you can use for production. 
- Remember to check the .env.example files in backend and frontend folders, and replace with your own credentials and configuration.
- Also, you can check a docker-compose example to run your project using Nginx Proxy Manager.

PT:
- Após baixar os arquivos deste projeto para a sua máquina, você precisa instalar as dependências executando "composer install" dentro da pasta backend Laravel e "npm install" dentro da pasta frontend Vue.js.
- Você precisa configurar o seu banco de dados e conectá-lo ao backend Laravel. Após isso, você precisa executar "php artisan migrate".
- O backend Laravel funciona apenas com chamadas à API e é planejado para ser stateless, portanto, o sistema de cache foi configurado (no arquivo .env) para usar o banco de dados.
- Para o Vue.js, quando você quiser ter o frontend pronto para produção, execute "npm run build", para que os novos arquivos dentro da pasta "public" na raiz do projeto se tornem seus novos arquivos para uso em produção.
- Lembre-se de verificar os arquivos .env.example nas pastas backend e frontend e substituir pelas suas próprias credenciais e configurações.
- Além disso, você pode conferir um exemplo de docker-compose para executar seu projeto usando o Nginx Proxy Manager.

## Important

EN: This project uses the local storage in browser to save the authentication key. It works like this: When you log in with your credentials, the backend awnsers the request by providing an authentication key to be stored and used for all the further requests. This key is managed in the backend for checking it's validation and expiry. For this project, it's been chosen to use "localStorage" to store the key. <b>This is not the safest way, given that it's vulnerable to XSS attacks,</b> but it's definitely the easiest approach to implement. Laravel comes with this approach by default. Therefore, <b>by proceeding using this method, please always be highly sure that your frontend has no any XSS vulnerability.</b>. The key is encrypted to provide further protection, but won't be secure in a XSS scenario. 

PT: Este projeto utiliza o armazenamento local do navegador para salvar a chave de autenticação. Funciona da seguinte maneira: quando você faz login com suas credenciais, o backend responde à solicitação fornecendo uma chave de autenticação para ser armazenada e usada em todas as solicitações subsequentes. Essa chave é gerenciada no backend para verificar sua validação e expiração. Para este projeto, foi escolhido usar "localStorage" para armazenar a chave. <b>Este não é o método mais seguro, pois é vulnerável a ataques XSS,</b> mas é definitivamente a abordagem mais fácil de implementar. O Laravel utiliza essa abordagem por padrão. Portanto, <b>ao prosseguir com esse método, certifique-se sempre de que seu frontend não tenha nenhuma vulnerabilidade XSS.</b> A chave é criptografada para fornecer proteção adicional, mas não será segura em um cenário de XSS.