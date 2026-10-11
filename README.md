# Teste Econverse: Vaga Desenvolvedor Front-End

## Desenvolvimento local

Pré-requisito: Node.js `>=20.19.0` e npm.

```bash
npm ci
npm run dev
```

Para validar o projeto e gerar a versão de produção:

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

A Home atual integra Header, conteúdo principal mínimo e Footer com newsletter. A vitrine de produtos, o consumo do JSON remoto e o modal serão implementados nas próximas especificações.

## Estilização

Os componentes usam SCSS Modules e consomem os tokens aprovados de `src/styles/_tokens.scss` com namespace explícito. O mixin `container` em `src/styles/_mixins.scss` centraliza a largura máxima de 1280px e as margens laterais fluidas com `clamp()`, preservando 80px de margem no desktop de referência.

Header, Footer e Newsletter compartilham esse alinhamento. O Header distribui logo, busca e ações por Grid; campos e colunas usam `minmax(0, 1fr)` para adaptar a largura disponível. Os breakpoints reorganizam o conteúdo sem ocultá-lo. As faixas do Footer mantêm os fundos na largura da página.

Estilos do conteúdo principal ficam no módulo da Home. Aparência e estados dos controles permanecem em `src/shared/ui/`; os módulos de layout cuidam da composição. Valores específicos do design permanecem locais quando não correspondem aos tokens existentes. Novos tokens exigem aprovação explícita.

### Vem ser #Econverse!

Segue abaixo as instruções para a execução do teste.

## Instruções
- Faça um fork desse projeto para a sua conta pessoal do GitHub.
- Desenvolva a página conforme as **Especificações Técnicas** 
- Crie um README com as instruções para compilar, testar e rodar o projeto.
- O link do repositório deverá ser enviado para o e-mail gustavo.cipriano@econverse.com.br com o título **Teste Vaga FrontEnd**

## Especificações Técnicas
- Desenvolver a pagina em React e TypeScript conforme o [layout](https://www.figma.com/file/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0%3A1). Para conseguir pegar os elementos do Figma, basta copiar o layout para sua conta que terá acesso de edição.
- Montar a [vitrine](https://app.econverse.com.br/teste-front-end/junior/tecnologia/layout/vitrine-produtos.png) de produtos consumindo as informações dos produtos em json atraves desse [Link](https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json).
- Desenvolver a interação ao clicar em um produto conforme layout. A interação consiste em abrir um modal com as principais informações do produto presente no arquivo [JSON](https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json) conforme o produto que clicar.
- Utilizar Pré-processador Sass, Less ou Stylus.
- Respeitar o Layout pixel a pixel, tamanho das fontes, cores e botões.
- Não Utilizar bibliotecas UI como Bootstrap, Foundation, ou afins.

## Pontos Extras
- Utilizar Boas práticas de SEO
- Uso de HTML semântico

## O que avaliaremos em seu teste
- Organização do projeto
- Lógica do código
- Componentização
- Alcance dos objetivos propostos

**Boa sorte! ;)**
