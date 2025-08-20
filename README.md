# Painel de Gerenciamento de Investimentos

Este projeto é um CRUD (Create, Read, Update, Delete) de investimentos, desenvolvido como parte de um teste técnico para uma vaga de estágio Full Stack. A aplicação front-end permite ao usuário cadastrar, visualizar, editar e excluir seus ativos financeiros, consumindo uma API backend.

## Stack Utilizada

Este projeto foi construído com as seguintes tecnologias:

-   **React.js:** Biblioteca para a construção da interface de usuário.
-   **Vite:** Ferramenta de build para um desenvolvimento rápido e moderno.
-   **TypeScript:** Superset do JavaScript que adiciona tipagem estática ao código.
-   **Tailwind CSS:** Framework CSS para estilização rápida e customizável.

## Como Rodar o Projeto

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
-   [Yarn](https://classic.yarnpkg.com/en/docs/install)
-   [API Rodando](https://github.com/lucas-jurgensen/backend-desafio-tecnico-estagio)

### Instalação e Execução

1.  **Clone o repositório para sua máquina local:**

    ```bash
    git clone https://github.com/lucas-jurgensen/frontend-desafio-tecnico-estagio
    ```

2.  **Navegue até o diretório do projeto:**

    ```bash
    cd frontend-desafio-tecnico-estagio
    ```

3.  **Instale as dependências do projeto:**
    Este projeto utiliza **Yarn** para gerenciar os pacotes.

    ```bash
    yarn
    ```

4.  **Inicie o servidor de desenvolvimento:**

    ```bash
    yarn dev
    ```

5.  **Abra o navegador:**
    A aplicação estará disponível em [http://localhost:5173](http://localhost:5173).

## Conexão com o Backend

Para que todas as funcionalidades (listar, criar, editar, excluir) operem corretamente, é necessário que a **API do backend esteja em execução** na porta `3000`.

A aplicação front-end fará requisições para o endereço `http://localhost:3000/investimentos`.

## Repositório do Backend

O código-fonte da API backend para este projeto pode ser encontrado no seguinte repositório:

-   **Link:** `https://github.com/lucas-jurgensen/backend-desafio-tecnico-estagio`

Siga as instruções no `README.md` do repositório do backend para configurar e executar o servidor **antes** de iniciar o front-end.
