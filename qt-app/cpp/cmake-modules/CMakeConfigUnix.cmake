# Configuration file for Linux/Unix

add_executable(${APP_NAME} ${SOURCES})

target_link_libraries(
        ${APP_NAME}
        Qt5::Widgets
)