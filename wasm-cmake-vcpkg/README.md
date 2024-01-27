# WebAssembly Cookbook

_Gilbert Francois Duivesteijn_



## About

This is a template that can act as starting point to create native and/or WebAssembly (WASM) applications, using:

- ***cmake*** for building your binaries.
- ***vcpkg*** for C and C++ package management, like for adding e.g. opencv, sdl2, etc.
- ***emscripten*** for compiling to WASM.

This repository has a set of the smallest possible projects to get started with the build tools in place.



## Templates

- **main run once**: Call the `int main()` function from the WASM binary and exit the program.
- **main loop**: An infinite main loop runs in C a bit different than in WASM. In C, one can use a `while(true) {}` loop, in WASM, we have to let the browser take care of the loop.
- **call C function in JS**: Create a WASM library and call the C functions from JS.
- **call JS function in C**: Call a JS function inside your C program, using the `extern ...` keyword.
- **memory**: How to give a JS array to WASM and back, using the WASM heap.
- **memory malloc**: How to give a JS array to WASM and back, using `malloc` and `free` from C.



## First time project setup (macOS, Linux)

On Linux (Ubuntu, Debian), run first:

```sh
sudo apt install -y nodejs cmake ninja-build gcc build-essential git zip unzip curl
```

On Linux ARM, set the environment variable:

```sh
export VCPKG_FORCE_SYSTEM_BINARIES=arm
```



On all systems, run:

```sh
# Clone the template.
git clone https://github.com/gilbertfrancois/wasm-cmake-vcpkg-template.git

cd wasm-cmake-vcpkg-template

# Important! Clone and init subrepositories.
git submodule update --init --recursive

# Install the emscripten SDK.
./3rdparty/emsdk/emsdk install latest
```



## Compile C programs for desktop

```sh
cmake -S . -B build
cmake --build build
cmake --install build
```



## Compile C programs for the web

```sh
# Important! Activate the emscripten environment and set paths.
./3rdparty/emsdk/emsdk activate latest
source 3rdparty/emsdk/emsdk_env.sh

cmake -S . -B build -DWASM=true
cmake --build build
cmake --install build
```



## Test

To see the compiled output of the WASM binary, run:

```
cd dist
python -m http.server 8000
```

Open a browser: `http://localhost:8000` and open the html files in the dist/ folder.



## References

- [Emscripten with CMake](https://stunlock.gg/posts/emscripten_with_cmake/)

- [WebAssembly Tutorial](https://www.youtube.com/playlist?list=PLysLvOneEETPM_YbEyZcJ35_3pSdrj33O)
- [sdl-canvas-wasm minimal example](https://github.com/timhutton/sdl-canvas-wasm)
- [WebAssembly with SDL2 + sound](https://github.com/AlbertVeli/wasm_sdl2_test)
- [How to pass image frames camera to a function in wasm (C++)?](https://stackoverflow.com/questions/55845033/how-to-pass-image-frames-camera-to-a-function-in-wasm-c)
