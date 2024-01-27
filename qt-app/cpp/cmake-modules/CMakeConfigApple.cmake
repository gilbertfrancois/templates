# ============================================================================
# ------------------------------ Compiler and App Bundle Flags ---------------

set(CMAKE_OSX_DEPLOYMENT_TARGET 10.13)
set(CMAKE_OSX_ARCHITECTURES x86_64)
set(APP_BUNDLE_PATH ${CMAKE_CURRENT_BINARY_DIR}/${APP_NAME}.app)

# Set the location of the info.plist template
set(CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/resources/macOS")

# Set the source and destination location of the app icon
set(ICNS_FILE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/resources/macOS/icon.icns")
set_source_files_properties(${ICNS_FILE_PATH} PROPERTIES MACOSX_PACKAGE_LOCATION "Resources")


# ============================================================================
# ------------------------------ Compile and Link ----------------------------

add_executable(${APP_NAME} MACOSX_BUNDLE ${ICNS_FILE_PATH} ${SOURCES})

target_link_libraries(
        ${APP_NAME}
        Qt5::Widgets
)

# ============================================================================
# ------------------------------ Post build ----------------------------------

if (CMAKE_BUILD_TYPE MATCHES Release)

    # Add Qt dynamic libraries to the app bundle
    add_custom_command(TARGET ${APP_NAME}
            POST_BUILD
            COMMAND macdeployqt
            ARGS ${APP_BUNDLE_PATH}
            )

    # Code signing
    add_custom_command(TARGET ${APP_NAME}
            POST_BUILD
            COMMAND ${CMAKE_CURRENT_SOURCE_DIR}/resources/macOS/post_build_codesign.sh
            ARGS ${APP_BUNDLE_PATH}
            )
endif ()
