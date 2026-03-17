# Todo List - Gerenciador de Tarefas 
Uma aplicação full-stack de gerenciamento de tarefas no estilo Kanban que permite aos usuários organizar tarefas em listas com funcionalidade de arrastar e soltar, níveis de prioridade e datas de vencimento.
## Build with
### Backend
- [NestJS](https://nestjs.com/) - Framework Node.js
- [Prisma](https://www.prisma.io/) - ORM
- [Sqlite](https://sqlite.org/) - Banco de dados
- [Passport.js](http://www.passportjs.org/) - Autenticação (JWT)
### Frontend
- [React](https://react.dev/) - Biblioteca de UI
- [Vite](https://vitejs.dev/) - Ferramenta de build
- [Tailwind CSS](https://tailwindcss.com/) - Estilização
- [@dnd-kit](https://dndkit.com/) - Arrastar e soltar
### Bibliotecas Adicionais
- date-fns - Utilitários de data
- React Icons - Biblioteca de icones
## Getting Started
### Pre-requisitos
- Node.js (v18+)
### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/joaovitorssilva/desafio-catijr
   ```
2. Configure o backend:
   ```bash
   cd backend
   npm install
   ```
3. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```
4. Inicie o backend:
   ```bash
   npm run start:dev
   ```
5. Configure o frontend (em um novo terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
A aplicação estará disponível em:
- Frontend: http://localhost:3000
- API do Backend: http://localhost:8000
## Contribuindo
1. Crie um fork do repositório
2. Crie uma branch de funcionalidade (`git checkout -b feature/nova-funcionalidade`)
3. Comite suas alterações (`git commit -m 'Adicionar nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request
