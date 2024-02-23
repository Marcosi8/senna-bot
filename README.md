# Senna Bot - WhatsApp Bot 🤖

<p align="center"> 
  <img src="https://komarev.com/ghpvc/?username=FG98F&color=brightgreen" />
</p>

<p align="center">
  <a href="https://github.com/FG98F"><img title="Autor" src="https://img.shields.io/badge/Senna%20Bot-Preto?style=for-the-badge&logo=whatsApp"></a>
</p>

<p align="center">
  <a href="https://github.com/FG98F?tab=followers"><img title="Seguidores" src="https://img.shields.io/github/followers/FG98F?label=Seguidores&style=social"></a>
  <a href="https://github.com/FG98F/senna-bot/stargazers/"><img title="Estrelas" src="https://img.shields.io/github/stars/FG98F/senna-bot?&style=social"></a>
  <a href="https://github.com/FG98F/senna-bot/network/members"><img title="Fork" src="https://img.shields.io/github/forks/FG98F/senna-bot?style=social"></a>
  <a href="https://github.com/FG98F/senna-bot/watchers"><img title="Visualizando" src="https://img.shields.io/github/watchers/FG98F/senna-bot?label=Visualizando&style=social"></a>
</p>

## Sobre o Projeto
Este é o Senna Bot, um bot para WhatsApp que oferece uma variedade de recursos úteis para os usuários. Com suporte a vários idiomas, o bot é altamente personalizável e fácil de implantar.

## Funcionalidades
- Altere o número do proprietário em [Config](https://github.com/FG98F/senna-bot/blob/main/config.js#L6)
- Atualize para a última versão do Baileys editando o package.json [neste trecho](https://github.com/FG98F/senna-bot/blob/main/package.json#L42)

## Contatos
- [![WhatsApp](https://img.shields.io/badge/WhatsApp-30302f?style=flat&logo=whatsapp)](https://whatsapp.com/channel/0029VaCeuZd6mYPQiWqxXj1F)
- [![Instagram](https://img.shields.io/badge/Instagram-30302f?style=flat&logo=instagram)](http://www.instagram.com/fg98_ff)
- [![Facebook](https://img.shields.io/badge/Facebook-30302f?style=flat&logo=facebook)](https://m.facebook.com/fg98f)

## API REST
Explore nossa API REST em [api.fgmods.xyz](https://api.fgmods.xyz)

## Exemplo
Experimente nosso bot de demonstração [aqui](https://instabio.cc/fg98ff) 

## Idiomas Suportados
- Espanhol
- Indonésio
- Inglês
- Português
- Árabe
- (Mais idiomas em breve)

## Implantação
### Heroku
[![Implante](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/FG98F/senna-bot)

### Buildpacks do Heroku
- **FFMPEG**: [clique](https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest)
- **IMAGEMAGICK**: [clique](https://github.com/DuckyTeam/heroku-buildpack-imagemagick)

## Configuração no Termux
1. Execute os seguintes comandos:

```sh
$ pkg upgrade -y && pkg update -y
$ pkg install git -y
$ pkg install nodejs -y
$ pkg install ffmpeg -y
$ pkg install imagemagick -y
$ git clone https://github.com/FG98F/senna-bot
$ cd senna-bot
$ npm i 
$ npm start
