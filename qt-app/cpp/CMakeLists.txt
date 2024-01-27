CMAKE_MINIMUM_REQUIRED(VERSION 3.12)

PROJECT(myApp)
set(APP_NAME myApp)

set(CMAKE_CXX_STANDARD 11)

set(CMAKE_INCLUDE_CURRENT_DIR ON)
set(CMAKE_MODULES_PATH ${CMAKE_CURRENT_SOURCE_DIR}/cmake-modules)


# ============================================================================
# ------------------------------ Qt settings ---------------------------------

find_package(Qt5Widgets PATHS $ENV{QT_LIBRARY_PATH})

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTORCC ON)


# ============================================================================
# ------------------------------ Sources -------------------------------------

set(SOURCES
        src/main.cpp
        src/myapp.cpp
        src/mainwindow.cpp
        )

# ============================================================================
# ------------------------------ Platform specific modules -------------------

if (APPLE) # Apple is a Unix, too. So dont ask only first UNIX
    include(${CMAKE_MODULES_PATH}/CMakeConfigApple.cmake)
elseif (UNIX)
    include(${CMAKE_MODULES_PATH}/CMakeConfigUnix.cmake)
elseif (WIN32)
    include(${CMAKE_MODULES_PATH}/CMakeConfigWindows.cmake)
else ()
    message(FATAL_ERROR "Operating System not supported")
endif ()






