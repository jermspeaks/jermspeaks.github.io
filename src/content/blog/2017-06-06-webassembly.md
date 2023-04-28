---
title: Intro to Webassembly
published: true
draft: false
categories: learning
tags: ["webassembly"]
permalink: /:categories/:title.html
date: 2017-06-06
description: ""
pubDate: "2017-06-06"
heroImage: ""
postType: "learning"
---

# Intro to WebAssembly

After reading [a lengthy comic](https://hacks.mozilla.org/2017/02/a-cartoon-intro-to-webassembly/) from [Lin Clark](https://code-cartoons.com/) about WebAssembly,
I thought it might be great to do a deep dive with it.
Thank goodness the folks behind the project have a very nice _[Getting Started](http://webassembly.org/getting-started/developers-guide/)_ tutorial.

## Prerequisites

> To compile to WebAssembly, we will at the moment need to compile LLVM from source. The following tools are needed as a prerequisite:

I'm on OSX. Check the link for above for your prerequisites.

- Git
- CMake
- Xcode
- Python (2.7.x)

## Compile Emscripten from Source

> Building Emscripten from source is automated via the Emscripten SDK. The required steps are as follows.

```bash
$ git clone https://github.com/juj/emsdk.git
$ cd emsdk
$ ./emsdk install sdk-incoming-64bit binaryen-master-64bit
$ ./emsdk activate sdk-incoming-64bit binaryen-master-64bit
```

> After these steps, the installation is complete. To enter an Emscripten compiler environment in the current command line prompt, type

```bash
$ source ./emsdk_env.sh
```

> This command adds relevant environment variables and directory entries to PATH to set up the current terminal for easy access to the compiler tools.

Note, the installation process will take a while. Go make yourself some tea.

```bash
To conveniently access the selected set of tools from the command line,
consider adding the following directories to PATH, or call 'source
./emsdk_env.sh' to do this for you.
```

### Compile and run a simple program

> We now have a full toolchain we can use to compile a simple program to WebAssembly. There are a few remaining caveats, however:

> - We have to pass the linker flag `-s WASM=1` to `emcc` (otherwise by default emcc will emit asm.js).
> - If we want Emscripten to generate an HTML page that runs our program, in addition to the wasm binary and JavaScript wrapper, we have to specify an output filename with a `.html` extension.
> - Finally, to actually run the program, we cannot simply open the HTML file in a web browser because cross-origin requests are not supported for the file protocol scheme. We have to actually serve the output files over HTTP.
> - The commands below will create a simple “hello world” program and compile it. The compilation step is highlighted in bold.

```bash
$ mkdir hello
$ cd hello
$ echo '#include <stdio.h>' > hello.c
$ echo 'int main(int argc, char ** argv) {' >> hello.c
$ echo 'printf("Hello, world!\n");' >> hello.c
$ echo '}' >> hello.c
$ emcc hello.c -s WASM=1 -o hello.html
```

> To serve the compiled files over HTTP, we can use the emrun web server provided with the Emscripten SDK:

```bash
$ emrun --no_browser --port 8080 .
```

> Once the HTTP server is running, you can open it in your browser. If you see “Hello, world!” printed to the Emscripten console, then congratulations! You’ve successfully compiled to WebAssembly!

Here's how my logs looked when running the program

```bash
➜  hello-wasm emcc hello.c -s WASM=1 -o hello.html
INFO:root:generating system library: libc.bc... (this will be cached in "/Users/Jeremy/.emscripten_cache/asmjs/libc.bc" for subsequent builds)
INFO:root: - ok
INFO:root:generating system library: dlmalloc.bc... (this will be cached in "/Users/Jeremy/.emscripten_cache/asmjs/dlmalloc.bc" for subsequent builds)
INFO:root: - ok
INFO:root:generating system library: wasm-libc.bc... (this will be cached in "/Users/Jeremy/.emscripten_cache/asmjs/wasm-libc.bc" for subsequent builds)
INFO:root: - ok
```
