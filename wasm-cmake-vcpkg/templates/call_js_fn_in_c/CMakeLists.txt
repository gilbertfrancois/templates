set(target_name call_js_fn_in_c)

# No native C support for now, since it does not have an external JS function to link to.

if(DEFINED EMSCRIPTEN)
  add_executable(${target_name} src/c/main.c)
  set(CMAKE_EXECUTABLE_SUFFIX ".js")
  # -s ERROR_ON_UNDEFINED_SYMBOLS=0 is needed to prevent the linker from complaining about missing JS functions.
  set_target_properties(${target_name} PROPERTIES LINK_FLAGS "-s ERROR_ON_UNDEFINED_SYMBOLS=0 ")

  # Don't install the js file.
  install(FILES ${CMAKE_CURRENT_BINARY_DIR}/${target_name}.wasm DESTINATION ${CMAKE_SOURCE_DIR}/dist)
  install(FILES ${CMAKE_CURRENT_SOURCE_DIR}/src/html/${target_name}.html DESTINATION ${CMAKE_SOURCE_DIR}/dist)
endif()
