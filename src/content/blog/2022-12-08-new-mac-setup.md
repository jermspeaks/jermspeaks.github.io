---
date: 2022-12-08
description: 'Setting up a new mac - 2022 Apple Macbook Pro 13"'
draft: false
heroImage: ""
postType: "blog"
pubDate: "2022-12-08"
title: "2022 New Mac Setup"
---

I got a new Macbook at work, 13" w/ M2 Chip, and I thought it would be great to spend the day setting it up. The following is a document I had continued to write as I was going through every step of the way. This might inspire you to do the same, the next Macbook you start from fresh.

## Order of operation

- Setup Apple ID
  - Setups family sharing automatically
- Upgrade MacOS to latest version (Ventura 13.0.1)
- Change Keyboard settings - caps lock to escape
- Setup Fingerprinting
- Setup Internet Accounts
  - Work Gmail (contacts and calendar)
  - Personal Gmail (contacts and calendar)
- Setup bluetooth keyboard and trackpad
- Install 1Password
- Install Obsidian
  - Login to Obsidian Sync (Takes a few minutes)
- Turn on [3 finger drag](https://support.apple.com/en-us/HT204609)
- Install Brave
- Install iTerm2
- Connecting to [Github via ssh](https://github.com/settings/keys)
- Connecting to [Bitbucket via ssh](https://bitbucket.org/account/settings/ssh-keys/)
- Clone [orb](https://bitbucket.org/helmsdeep/orb/src/master/)
- Install [fnm](https://github.com/Schniz/fnm)
- Install [node](https://nodejs.org/en/)
- Install [Superhuman](https://superhuman.com/download)
- Install [yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)
- Install my own [dotfiles](https://github.com/jermspeaks/dotfiles)
  - Modify `.vimrc` since Vundle is not installed
- Install Zoom - actually it was already installed
- Install Slack - pre-installed
- Install [VSCode](https://code.visualstudio.com/download)
- Install Fantastical 3
  - Login to the different google accounts
- Install Drafts
- Copy over VSCode Extensions
- Install Reader

## Installs

In order of installation (as appears in "Order of Operation")

### 1Password

- Setup with sign-in was extremely easy, since the Internet accounts and family sync was already setup

### Obsidian

- Some settings need to be changed
- When syncing, select `cl-work-pkm` (personal vault)
- Sync the setting from main macbook
- [x] Obsidian sync appearance settings
- [x] Obsidian sync extensions
- Hotkey changes
  - Move line up
  - Move line down
  - Quick Switcher: Open Quick Switcher
  - Command Palette: Open Command Palette
- [x] Obsidian keybinding changes

### Brave

- Setup Work Profile
- Setup Chain Code ([Brave Sync](brave://settings/braveSync/setup))
- Setup Home Profile
- Appearance Changes
  - Toggle Off: Bookmarks button
  - Toggle Off: Side panel button
  - Toggle Off: Always show bookmarks on new tab page
  - Toggle On: Speedreader
- Login to

  - Work Google
  - Personal Google
  - Github
  - Twitter

- Brave Sync Code (Beware, this code should be private)

  > beach cheap hidden retire giggle gorilla tone pass length what spread march illegal episode fruit enjoy exact drive humble endless razor today follow treat boy

- [x] Brave shortcuts in URL bar

#### Brave Extensions

- [ ] React Dev Tools
- [ ] Redux Dev Tools
- [ ] Apollo Dev Tools
- [x] Reader

### iTerm2

- Install pip3 through XCode Command Line Tools (CLT)
- Create `workspaces` directory
- Check if XCode is already installed

```bash
xcode-select -p
```

- A M2 chip issue on brew is solved with the following

```bash
# Warning: /opt/homebrew/bin is not in your PATH.
# - Run these three commands in your terminal to add Homebrew to your PATH:
echo '# Set PATH, MANPATH, etc., for Homebrew.' >> /Users/jeremywong/.zprofile
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/jeremywong/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

- Modify Fonts
  - [NerdFonts](https://www.nerdfonts.com/font-downloads) - Iconic font aggregator, collection, & patcher. 3,600+ icons, 50+ patched fonts: Hack, Source Code Pro, more. Glyph collections: Font Awesome, Material Design Icons, Octicons, & more
    - Font used: [Hack](https://github.com/source-foundry/Hack) (added to Font Book)
  - Profiles -> Text -> Allow _Italic Text_
  - Profiles -> Font -> **Hack NFM**

#### Homebrew

- Install [Homebrew](https://brew.sh/) - `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
  - Install CLT through brew
  - Go to other Macbook and run `brew list`. Dump them in a `packages.txt` and then `brew install $(cat packages.txt)`

#### Export Brew List

```bash
==> Formulae
adns gflags libcroco lz4 rav1e
aom ghostscript libde265 lzo readline
apr giflib libev m4 rtmpdump
apr-util gifsicle libevent metis rubberband
argon2 gl2ps libffi minikube sdl2
aspell glew libgcrypt mpdecimal shared-mime-info
autoconf glib libgpg-error mpfr sip
automake glog libheif mysql six
bdw-gc gmp libidn netcdf snappy
boost gnu-getopt libidn2 netlifyctl spark
brotli gnupg libksba netpbm speex
c-ares gnutls liblqr nettle sphinx-doc
ca-certificates go libmetalink nghttp2 sqlite
cairo gobject-introspection libmpc node srt
ceres-solver graphite2 libnghttp2 npth suite-sparse
cmake graphviz libogg numpy szip
composer grc libomp oniguruma tbb
coreutils gts libpng openblas tesseract
curl guile libpq opencore-amr theora
curl-openssl harfbuzz libpthread-stubs opencv tidy-html5
dav1d hdf5 librsvg openexr tldr
deno helm libsamplerate openjpeg tree
docbook icu4c libsndfile openldap unbound
docbook-xsl ilmbase libsodium openssl@1.1 unixodbc
double-conversion imagemagick libsoxr opus utf8cpp
eigen imath libssh2 p11-kit vtk
exercism isl libtasn1 pango wangle
fb303 jansson libtiff pcre watchman
fbthrift jasper libtool pcre2 webp
ffmpeg jbig2dec libunistring php wget
fizz jemalloc libusb pinentry x264
flac jpeg libvidstab pixman x265
fmt jpeg-xl libvmaf pkg-config xmlto
folly jq libvorbis potrace xorgproto
fontconfig jsoncpp libvpx protobuf xvid
freetds krb5 libx11 pugixml xz
freetype kubernetes-cli libxau pwgen yarn
frei0r kubernetes-helm libxcb pyqt youtube-dl
fribidi lame libxdmcp pyqt@5 yt-dlp
fzf lazydocker libxext python@2 zeromq
gcc leptonica libxrender python@3.10 zimg
gd libass libyaml python@3.8 zlib
gdbm libassuan libzip python@3.9 zstd
gdk-pixbuf libavif little-cms qt
gettext libbluray little-cms2 qt@5

==> Casks
calibre insomnia jet minikube
```

#### Ohmyzsh and zsh

- Install [ohmyzsh](https://ohmyz.sh/#install) - `sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`
- Install [spaceship-prompt](https://github.com/spaceship-prompt/spaceship-prompt) theme
  - Git is having trouble showing the icons (up, down, etc.)

### Git

- Setup github configuration

```bash
git config --global init.defaultBranch main
git config --global user.name <redacted>
git config --global user.email <redacted>
```

- [Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
  - Adding your SSH key to the ssh-agent

```bash
ssh-keygen -t ed25519 -C "<redacted>"
```

```bash
eval "$(ssh-agent -s)"
```

### node

- Install [node](https://nodejs.org/en/) using [fnm](https://github.com/Schniz/fnm)
  - upgrade `npm`
  - ~~install `n`~~
  - Alternative: [fnm](https://github.com/Schniz/fnm)

```bash
fnm install 16
npm login
npm config set loglevel="warn"
# sudo npm install netlify-cli -g
# netlify login
# npm i -g sign-bunny fortune-node parrotsay # fun little cli utilities to use
# npm i -g undollar # for removing $
# npm install -g npm-check-updates # for updating deps
# sudo npm install -g trash-cli # to add a `trash` command to so you dont permanently delete files
```

### [yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)

```bash
brew install yarn --ignore-dependencies
```

#### Google Cloud SDK

- [Install SDK](https://cloud.google.com/sdk/docs/install)
  - macOS 64-bit (ARM64, Apple M1 silicon)
  - new `gsutil`

### Zoom

- Upgrade
- Sign in and activate from another device
- [Screen sharing](https://support.apple.com/en-sg/guide/mac-help/mh11848/mac) - needs a program restart
  - [Screen share permission](https://medium.com/@nehaguptag/zoom-problems-with-catlina-macos-screen-share-permissions-fa544af043aa)

### Slack

- Selected Current Company Slack

### Visual Studio Code (VSCode)

- And download CLI
- Open Visual Studio Code
- In Command Palette, run **Shell Command: Install 'code' command in PATH**
- Export

```bash
code --list-extensions | xargs -L 1 echo code --install-extension
```

- Sign in to Github Copilot

#### Output

```bash
code --install-extension ahmadalli.vscode-nginx-conf
code --install-extension albymor.increment-selection
code --install-extension asvetliakov.snapshot-tools
code --install-extension atlassian.atlascode
code --install-extension azemoh.one-monokai
code --install-extension bradlc.vscode-tailwindcss
code --install-extension christian-kohler.npm-intellisense
code --install-extension christian-kohler.path-intellisense
code --install-extension DavidAnson.vscode-markdownlint
code --install-extension dbaeumer.vscode-eslint
code --install-extension denoland.vscode-deno
code --install-extension DotJoshJohnson.xml
code --install-extension eamodio.gitlens
code --install-extension EditorConfig.EditorConfig
code --install-extension eg2.vscode-npm-script
code --install-extension emmanuelbeziat.vscode-great-icons
code --install-extension esbenp.prettier-vscode
code --install-extension formulahendry.auto-close-tag
code --install-extension GitHub.copilot
code --install-extension GitHub.remotehub
code --install-extension jpoissonnier.vscode-styled-components
code --install-extension kevinkyang.auto-comment-blocks
code --install-extension kortina.vscode-markdown-notes
code --install-extension kumar-harsh.graphql-for-vscode
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode-remote.remote-containers
code --install-extension ms-vscode.remote-repositories
code --install-extension ms-vscode.sublime-keybindings
code --install-extension ms-vsliveshare.vsliveshare
code --install-extension naumovs.color-highlight
code --install-extension pnp.polacode
code --install-extension richie5um2.vscode-sort-json
code --install-extension sandy081.todotasks
code --install-extension shanoor.vscode-nginx
code --install-extension silvenon.mdx
code --install-extension svelte.svelte-vscode
code --install-extension VisualStudioExptTeam.intellicode-api-usage-examples
code --install-extension VisualStudioExptTeam.vscodeintellicode
code --install-extension vscodevim.vim
code --install-extension wayou.vscode-todo-highlight
code --install-extension william-voyek.vscode-nginx
code --install-extension xabikos.JavaScriptSnippets
code --install-extension yzhang.markdown-all-in-one
```

With Monokai as my default theme

- [x] VS Code Extension installation

## [Raycast](https://www.raycast.com/)

- Replace [hotkey](https://manual.raycast.com/hotkey)
  - Disable hotkey for Spotlight
    - _**System Settings > Keyboard > Keyboard Shortcuts > Spotlight**_ and disable spotlight
  - Ensure "Ask Siri" is not using the same shortcut
    - Changed to fn or world + space
  - Then change hotkey using Raycast preferences

## Outstanding Items

- [x] Install Readwise
- [x] Should we install Dotfiles?
- [x] Install [Rosetta 2](https://support.apple.com/en-us/HT211861) - No longer needed for M2 since it is packaged w/ OS
- [x] SSH keys
- [x] Install iTerm2
- [x] Install Fantastical 3
- [x] Go to other Macbook and run `brew list`.
- [x] Install Reader
- [x] Dump `brew list` in a `packages.txt` and then `brew install $(cat packages.txt)`
- [x] [z](https://github.com/rupa/z) - jump around. Tracks your most used directories, based on 'frecency'.
- [x] Install Go (Golang)
- [x] Setup Documents to be PARA
  - [x] setup iCloud w/ it?
- [x] Raycast? [Alternative breakdown](https://www.theverge.com/23170431/raycast-how-to-macos-search-extensions-alfred-spotlight)
- [x] Install Dropbox
  - [x] Selective sync
- [x] Install Things
- [x] Install Figma
  - [ ] [Open Links in the Desktop app](https://help.figma.com/hc/en-us/articles/360039824334-Open-links-in-the-desktop-app)
- [x] Add vscode workspace files for settings
- [x] VS Code Configuration (default)
- [x] [Brave Extensions](brave://extensions/)
- [x] Copy over service account keys
- [x] Install Google Cloud SDK

## Optional Items

- [x] Raycast [Hotkey](https://manual.raycast.com/hotkey)
- [x] ~~Install Alfred~~
- [x] Install Postman - as needed
  - [x] Export current postman collections?
- [x] Install Spotify - as needed
- [x] Install Kindle - as needed
- [x] Install ConnectWise Control Client - this can be done later on an as-needed basis
- [x] Three Finger Swipe - Accessibility -> Pointer -> Trackpad Options -> Dragging Style -> Three Finger Drag.
- [ ] Install Java
- [ ] Install [diff-so-fancy](https://github.com/so-fancy/diff-so-fancy) for a good `git diff`
  - [ ] set `git config --global core.pager "diff-so-fancy | less --tabs=4 -RFX"` - makes for much nicer git diff
- [ ] Install KeyCastr
- [ ] Install Insomnia - as needed
  - [ ] Export laptop insomnia json
- [ ] ngrok? Do I need it?
- [ ] Readwise - iBooks Sync
- [ ] Install [Clipboard](https://github.com/Slackadays/clipboard?utm_source=tldrnewsletter)

## Resources

- [Mac Installation Guide](https://mac.install.guide/) from Yax
- [New Mac Setup](https://www.swyx.io/new-mac-setup) from swyx
- [Christoph Nakazawa](https://twitter.com/cpojer/status/1569797978881400832)’s setup: [Part 1](https://cpojer.net/posts/set-up-a-new-mac-fast), [Part 2](https://cpojer.net/posts/the-perfect-development-environment)
- [Robin Wieruch](https://www.robinwieruch.de/mac-setup-web-development/)’s setup
- [Mina Markham](https://github.com/minamarkham/formation)’s automated mac setup
- [Tania Rascia’s setup](https://www.taniarascia.com/setting-up-a-brand-new-mac-for-development/?ck_subscriber_id=591519942)
- [Nick Nisi’s dotfiles](https://github.com/nicknisi/dotfiles)
- [Mathias Bynens macos defaults](https://github.com/mathiasbynens/dotfiles/blob/master/.macos)
- [Jamon’s MacOS maintenance tips](https://twitter.com/jamonholmgren/status/1175077165848653824)
- VMWare Tanzu house script: [https://github.com/pivotal/workstation-setup](https://github.com/pivotal/workstation-setup)
- Vendasta: [https://github.com/vendasta/setup-new-computer-script](https://github.com/vendasta/setup-new-computer-script)
- You can [automate dotfiles/homebrew setup with Sheldon Hull’s tool](https://www.sheldonhull.com/docs/shell/#installing-brew-packages)
- Physical equipment setups from prominent people: [https://setups.co/](https://setups.co/)
- [A decade of dotfiles](https://evanhahn.com/a-decade-of-dotfiles/) by Evan Hahn
- [New Mac Setup](https://www.swyx.io/new-mac-setup) from swyx
- [The Perfect Development Environment - Setup tips for frontend development and React](https://cpojer.net/posts/the-perfect-development-environment)
- [Set up a new Mac, Fast](https://cpojer.net/posts/set-up-a-new-mac-fast)
