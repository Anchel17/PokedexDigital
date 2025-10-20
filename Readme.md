# Pokédex Digital

Aplicação full stack desenvolvida com **Flask (Python)** no backend e **Angular 16** no frontend.  
O projeto simula uma Pokédex moderna, permitindo favoritar Pokémons, adicioná-los a um grupo de batalha.

---

## 🚀 Tecnologias Utilizadas

### 🔹 Frontend
- **Angular 16**
- **TypeScript**
- **Angular Material** (componentes e UI)
- **RxJS**
- **Node.js 24.9.0** (versões anteriores também devem funcionar)

### 🔹 Backend
- **Flask (Python 3.14.0)**
- **Flask-JWT-Extended** (autenticação via JWT)
- **SQLAlchemy** (ORM)
- **SQLite** (banco de dados local)
- **Flask-CORS**

---

## ⚙️ Requisitos

Antes de começar, garanta que possui instalado:

- 🐍 **Python 3.14.0+**
- 📦 **pip** (gerenciador de pacotes Python)
- 🧰 **Node.js 18+** (testado em Node 24.9.0)
- ⚙️ **npm**
- 🌀 **Angular CLI** (versão 16 ou superior)

## 🐍 Configurando o back-end

Abra a pasta pokedex-digital-api com seu terminal de preferência
- Crie um ambiente virtual: python -m venv venv
- Ative o ambiente virtual:
  - Windows: venv\Scripts\activate
  - Linux: source venv/bin/activate

- Instale as dependências: pip install -r requirements.txt
- Execute a API: python run.py

A API estará disponível em:
👉 http://localhost:5000

## 🅰️ Configurando o front-end

Abra a pasta pokedex-digital-web com seu terminal de preferência
- rode o comando: npm install
- execute o projeto: ng serve

O app estará disponível em:
👉 http://localhost:4200


# 🧪 Funcionalidades Principais

- ✅ Cadastro e login de usuário
- ✅ Listagem de Pokémons com imagens
- ✅ Favoritar / desfavoritar Pokémons
- ✅ Adicionar / remover do grupo de batalha (limite de 6)
- ✅ Filtros dinâmicos: Todos, Favoritos, Grupo de Batalha
- ✅ Feedback visual com MatSnackBar
- ✅ Backend persistente em SQLite