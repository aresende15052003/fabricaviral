# Fábrica Viral — página de vendas

HTML, CSS e JavaScript puros. Sem build e sem dependências.

## Configurar

Tudo fica em `config.js`: link do checkout (Wiapy), repasse de UTMs para o
checkout, Meta Pixel e Google Analytics (vazios = desligados).

Antes de ligar Pixel ou Analytics, atualize o item 4 de `privacidade.html`.

## Publicar na Vercel

1. Suba esta pasta para um repositório no GitHub.
2. Em vercel.com → **Add New → Project** → importe o repositório.
   Framework Preset: **Other**. Build Command e Output Directory: vazios.
3. Teste no endereço `.vercel.app` antes de conectar o domínio.

## Conectar o domínio

Vercel → Project → **Settings → Domains** → adicione o domínio e crie no
registrador os registros DNS que a Vercel mostrar.

O `vercel.json` faz `/termos` e `/privacidade` funcionarem sem `.html`.
