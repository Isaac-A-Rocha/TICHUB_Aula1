# 🛒 Cart Domain - TypeScript

Implementação de um domínio de carrinho de compras utilizando TypeScript com foco em boas práticas de modelagem, tipagem forte e regras de negócio explícitas.

## 🚀 Tecnologias

- Node.js
- TypeScript
- ESModules (NodeNext)

## 🧠 Conceitos aplicados

- Tipagem rigorosa (sem `any`)
- Value Objects (`Money`)
- Imutabilidade
- Encapsulamento de regras de negócio
- High-Order Functions (`reduce`, `some`, `map`)

## 📦 Estrutura


src/
├── domain/
│ ├── entities/
│ ├── value-objects/
│ └── types/
├── application/
└── main.ts


## ⚙️ Como rodar

```bash
npm install
npm run dev
🧪 Funcionalidades
Adicionar produtos ao carrinho
Evitar duplicação de itens
Somar quantidades automaticamente
Calcular total de itens
Calcular valor total da compra
Validação de regras (ex: quantidade inválida)
📌 Exemplo de saída
Itens: 13
Total: 170
🔥 Próximos passos
Criar API com Express/Fastify
Implementar testes automatizados (Jest)
Adicionar persistência (Repository Pattern)
Evoluir para integração com frontend

Projeto com foco em construção de base sólida para sistemas de e-commerce.
