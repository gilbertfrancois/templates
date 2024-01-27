cmake_minimum_required(VERSION 3.22)

if(WASM)
  set(VCPKG_TARGET_TRIPLET "wasm32-emscripten")
  set(VCPKG_CHAINLOAD_TOOLCHAIN_FILE
      "${CMAKE_CURRENT_SOURCE_DIR}/3rdparty/emsdk/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake"
      CACHE STRING "emscripten toolchain file")
endif()
set(CMAKE_TOOLCHAIN_FILE
    "${CMAKE_CURRENT_SOURCE_DIR}/3rdparty/vcpkg/scripts/buildsystems/vcpkg.cmake"
    CACHE STRING "Vcpkg toolchain file")

project(webassembly-cookbook)

add_subdirectory(templates/main_run_once)
add_subdirectory(templates/main_loop)
add_subdirectory(templates/call_c_fn_in_js)
add_subdirectory(templates/call_js_fn_in_c)
add_subdirectory(templates/memory)
add_subdirectory(templates/memory_malloc)
