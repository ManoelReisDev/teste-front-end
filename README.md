<img src="./src/assets/logo/logo.svg" alt="Econverse" width="180" />

# Teste Front-End — Econverse

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-SCSS%20Modules-CC6699?logo=sass&logoColor=white)

Página de e-commerce desenvolvida para o teste técnico da Econverse, com foco na fidelidade ao layout, componentização, responsividade e acessibilidade. A vitrine consome o JSON fornecido pelo desafio e permite consultar os detalhes de cada produto em um modal.

**Deploy:** [Acessar o projeto na Vercel](https://teste-front-end-peach.vercel.app/).

**Referências:** [layout no Figma](https://www.figma.com/file/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0%3A1) · [vitrine de referência](https://app.econverse.com.br/teste-front-end/junior/tecnologia/layout/vitrine-produtos.png) · [JSON de produtos](https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json).

## Tecnologias

| Tecnologia | Uso no projeto |
|---|---|
| React 19 | Componentes funcionais, composição e gerenciamento de estado com hooks |
| TypeScript | Tipagem da interface, dos estados de carregamento e dos modelos de produto |
| Vite 7 | Desenvolvimento, build e preview local |
| Sass / SCSS Modules | Estilos isolados por componente, tokens e mixins compartilhados |
| Fetch API | Consulta dos produtos, com cancelamento via `AbortController` |
| ESLint | Verificação estática do código e das regras de hooks |

Os componentes visuais foram implementados sem bibliotecas de UI. O carrossel utiliza rolagem nativa e o modal utiliza o elemento HTML `<dialog>`.

## Estrutura

```text
src/
  app/                # Composição da aplicação
  pages/home/         # Composição e estilos da Home
  components/         # Seções, vitrine, carrossel e modal de produto
    layout/           # Header, Footer e newsletter
    ui/               # Controles reutilizáveis e diálogo nativo
    structured-data/  # Dados estruturados do catálogo
  features/products/  # Requisição, validação, modelo e hook de produtos
  styles/             # Tokens, mixins e estilos globais
  assets/             # Fontes, imagens e ícones importados
public/               # Banners, favicon e arquivos estáticos
```

## Desempenho e SEO

As fontes são servidas localmente em WOFF2, com subconjuntos latinos e `unicode-range` para carregar outras faixas apenas quando necessário. `font-display: swap` permite exibir o texto durante o carregamento. A fonte Poppins 600 e a imagem principal recebem preload; imagens secundárias utilizam carregamento adiado, e os banners possuem versões WebP para diferentes resoluções.

O documento inclui idioma `pt-BR`, título, descrição, metadados sociais e dados estruturados de organização e site. Após carregar os produtos, a página adiciona um `ItemList` em JSON-LD com os itens e seus preços.

### Como medir SEO e desempenho

Gere o build e sirva a versão de produção localmente:

```bash
npm run build
npm run preview
```

Abra o endereço informado no terminal, normalmente `http://localhost:4173`, no Chrome. Nas ferramentas de desenvolvedor (`F12`), acesse **Lighthouse**, selecione o modo **Navigation** e as categorias **Performance**, **Accessibility**, **Best Practices** e **SEO**. Execute uma auditoria com o perfil **Desktop** e outra com **Mobile**, conforme a [documentação do Lighthouse](https://developer.chrome.com/docs/lighthouse/overview).

`npm run preview` serve o build; as notas são calculadas pelo Lighthouse. Para comparar resultados, mantenha a mesma versão da ferramenta e as mesmas condições de cache e execução, sem extensões interferindo na página.

### Resultados locais

Auditorias realizadas em **11/10/2026**, com **Lighthouse 13.5.0**, no build de produção servido por `npm run preview`. Cada coluna corresponde a uma execução, com o perfil padrão de desktop ou mobile e limitação simulada de rede e CPU. O endpoint de produtos respondeu com HTTP 200 em ambas.

| Categoria (0–100) | PC / Desktop | Mobile |
|---|---:|---:|
| SEO | 100 | 100 |
| Desempenho | 100 | 93 |
| Acessibilidade | 97 | 97 |
| Boas práticas | 100 | 100 |

| Métrica de desempenho | PC / Desktop | Mobile |
|---|---:|---:|
| Primeira pintura de conteúdo (FCP) | 0,5 s | 2,3 s |
| Maior pintura de conteúdo (LCP) | 0,5 s | 2,8 s |
| Tempo total de bloqueio (TBT) | 0 ms | 20 ms |
| Mudança cumulativa de layout (CLS) | 0,002 | 0,001 |

A auditoria de acessibilidade apontou contraste insuficiente em alguns elementos. Os resultados são medições de laboratório local e podem variar com a máquina, rede, serviço de produtos e hospedagem; a nota de SEO indica aprovação nas verificações automatizadas, sem garantir posicionamento em buscadores.

## Como executar

**Pré-requisitos:** Node.js 20 a partir de `20.19.0`, ou Node.js `>=22.12.0`, e npm. Esses intervalos correspondem aos requisitos do Vite e do plugin React instalados. O `package-lock.json` fixa as versões das dependências para uma instalação reproduzível com `npm ci`.

Na raiz do projeto:

```bash
npm ci
npm run dev
```

Acesse o endereço informado pelo Vite no terminal, normalmente `http://localhost:5173`. A consulta dos produtos e suas imagens depende de acesso à internet.

Para avaliar em outra máquina, basta obter os arquivos do projeto e executar os dois comandos acima. Fontes, ícones e imagens locais já estão incluídos no repositório; não há etapa adicional de geração de assets. A execução local não exige arquivo `.env`, credenciais, backend próprio ou ferramentas além de Node.js e npm. É necessário acesso à internet para instalar as dependências e consultar o serviço de produtos da Econverse.

### Validação e build

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
npm run test
npm run test:coverage
```

O build já executa a checagem de tipos e gera os arquivos de produção em `dist/`. O preview permite conferir essa versão localmente. Os testes de componentes usam Vitest, React Testing Library, `user-event` e jsdom; `npm run test:watch` inicia o modo interativo e `npm run test:coverage` gera os relatórios HTML, texto e `json-summary` em `coverage/`.

A suíte comprova contratos de componentes, interações e estados no DOM simulado. Ela não substitui a verificação em navegador de responsividade, zoom, contraste, hover, foco visível, navegação real ou comportamento completo do top layer do `dialog`.

### Testes automatizados

Depois de instalar as dependências com `npm ci`, execute os testes unitários dos componentes com:

```bash
npm run test
```

Para manter o runner observando alterações durante o desenvolvimento:

```bash
npm run test:watch
```

Para executar a suíte e gerar cobertura em `coverage/`:

```bash
npm run test:coverage
```

Os testes não fazem requisições ao serviço remoto de produtos. Eles usam jsdom para verificar markup acessível, estados, callbacks, validações e interações de teclado. Responsividade, zoom, contraste, hover, foco visível e navegação real devem ser conferidos no navegador.

### Variáveis de ambiente

Nenhuma variável é obrigatória para executar o projeto com o serviço original. Para alterar a configuração, crie um arquivo `.env.local`:

```env
VITE_PRODUCTS_URL=/api/products
PRODUCTS_UPSTREAM_URL=https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json
```

| Variável | Finalidade |
|---|---|
| `VITE_PRODUCTS_URL` | Endereço consultado pelo frontend; incorporado ao build |
| `PRODUCTS_UPSTREAM_URL` | Destino do proxy local do Vite, usado em desenvolvimento e preview |

Reinicie o servidor após alterar as variáveis. Alterar o destino em produção também exige ajustar o rewrite da hospedagem.

## Funcionalidades e escopo

- Home com header, banner principal, categorias, vitrines, parceiros, marcas e footer.
- Carrosséis de produtos com controles de navegação e adaptação à largura disponível.
- Consumo do JSON remoto, skeletons de carregamento, estado vazio e erro com opção de tentar novamente.
- Modal com imagem, nome, descrição, preço e seletor de quantidade de 1 a 99.
- Seleção visual de categorias e abas, com navegação por teclado nas abas.
- Newsletter com campos de nome, e-mail e consentimento, preparada para receber uma integração de envio.

O escopo é a página e a interação de consulta dos produtos. Busca, conta, favoritos, carrinho, checkout e envio da newsletter não possuem integração nesta entrega; controles sem ação configurada são apresentados como indisponíveis. Categorias e abas alteram a seleção visual, mas não filtram o catálogo. No modal, o botão **Comprar** apenas fecha a janela.

## Decisões técnicas

### Organização e estado

`app/` monta a aplicação e `pages/home/` compõe a página. Componentes visuais ficam em `components/`, com layout global em `components/layout/` e controles reutilizáveis em `components/ui/`. O domínio de produtos fica em `features/products/`, separado da apresentação.

A Home realiza uma consulta compartilhada pelas três vitrines e controla o produto selecionado. O hook `useProducts` coordena carregamento, erro e nova tentativa, cancelando a requisição ao desmontar. Isso evita que cada vitrine faça sua própria consulta ou conheça o endpoint.

### Dados externos e apresentação

A resposta do serviço é recebida como `unknown`, validada e convertida para o modelo interno `Product` antes da renderização. Entradas incompatíveis são descartadas, e falhas de conexão, HTTP ou formato recebem mensagens próprias.

Os preços são tratados em centavos e exibidos em reais com `Intl.NumberFormat('pt-BR')`. Como o JSON não fornece preço anterior, parcelamento ou frete, o adapter centraliza os valores usados para reproduzir o card: preço anterior calculado em 110% do preço atual, duas parcelas com arredondamento para cima e indicação de frete grátis. Essas condições são demonstrativas e não representam regras comerciais fornecidas pelo serviço.

### Fidelidade visual e tipografia

SCSS Modules mantém os estilos locais, enquanto cores, espaçamentos e medidas compartilhadas ficam nos tokens aprovados em `src/styles/_tokens.scss`. O mixin de container mantém o alinhamento entre seções, com largura máxima de 1280px e margens fluidas. Grid, Flexbox e media queries adaptam a composição a telas menores.

> [!NOTE]
> O Figma utiliza fontes diferentes em partes do layout. Entendi essa variação como uma decisão de design e preservei as famílias indicadas, pois padronizar a tipografia não fazia parte do escopo da implementação.

A interface utiliza **Poppins** como fonte principal, **Work Sans** em parte dos links do footer e **Outfit** no título da newsletter. As diferenças foram mantidas para respeitar a referência visual.

### Acessibilidade

O modal usa `showModal()` para ativar o comportamento nativo de foco e bloquear a interação com o restante da página. Pode ser fechado pelo botão, por `Escape` ou pelo backdrop, e devolve o foco ao controle que o abriu.

Títulos e descrições são associados ao diálogo por IDs gerados com `useId`. A interface também utiliza landmarks semânticos, labels nos campos, nomes acessíveis nos controles, foco visível e navegação das abas por setas, `Home` e `End`. O carrossel respeita a preferência por movimento reduzido.

### Proxy de produtos

O frontend consulta `/api/products` por padrão. No desenvolvimento e no preview, o proxy do Vite encaminha essa chamada ao JSON da Econverse, mantendo a requisição do navegador na mesma origem. Há também rewrites em `vercel.json` e `public/_redirects` para publicação em Vercel e Netlify, respectivamente.

Em outra hospedagem, é necessário configurar um encaminhamento equivalente ou apontar `VITE_PRODUCTS_URL` para um endpoint que permita acesso pelo navegador. O proxy do Vite não é incluído nos arquivos estáticos do build.
