# HannaH SEO Site — versão reorganizada

## Correções desta versão

- Aba **Músicas Infantis**: agora contém o conjunto que antes aparecia incorretamente em Pretend Play (26 vídeos).
- Aba **Pretend Play**: agora contém o conjunto que antes aparecia incorretamente em Músicas (30 vídeos).
- **Canções Infantis** acompanha o mesmo conjunto musical da aba Músicas.
- `videos.json` foi sincronizado com todas as abas.
- As páginas individuais dos 160 vídeos foram regeneradas com categorias coerentes.
- `index.html`, páginas de categoria, páginas de vídeo, CSS, JS, JSON e sitemap foram organizados linha por linha.
- Layout responsivo para desktop amplo, notebook, tablet, celular, celular pequeno e modo paisagem.
- O menu não desaparece no celular: fica rolável horizontalmente.

## Estrutura

- `index.html` — home
- `style.css` — estilos responsivos
- `script.js` — ano do rodapé
- `video-page.js` — player e schema dinâmico
- `videos.json` — índice semântico dos 160 vídeos
- `musicas-infantis/` — vídeos musicais
- `pretend-play/` — vídeos de faz de conta
- `videos/<ID>/` — página individual de cada vídeo
- `sitemap.xml` e `robots.txt` — rastreamento
