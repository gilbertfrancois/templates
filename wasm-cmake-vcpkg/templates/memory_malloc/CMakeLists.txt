set(target_name memory_malloc)

if(DEFINED EMSCRIPTEN)
  add_executable(${target_name} src/c/main.c)
  # Compile js and wasm file to create a wasm module that prevents a Promise error.
  set(CMAKE_EXECUTABLE_SUFFIX ".js")
else()
  add_library(${target_name} SHARED src/c/main.c)
endif()

if(DEFINED EMSCRIPTEN)
  # Don't install the js file.
  install(FILES ${CMAKE_CURRENT_BINARY_DIR}/${target_name}.wasm DESTINATION ${CMAKE_SOURCE_DIR}/dist)
  install(FILES ${CMAKE_CURRENT_SOURCE_DIR}/src/html/${target_name}.html DESTINATION ${CMAKE_SOURCE_DIR}/dist)
else()
  install(TARGETS ${target_name} DESTINATION ${CMAKE_SOURCE_DIR}/dist)
endif()
