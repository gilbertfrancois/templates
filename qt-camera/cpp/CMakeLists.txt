CMAKE_MINIMUM_REQUIRED(VERSION 3.12)

PROJECT(myApp)

SET(CMAKE_CXX_STANDARD 11)

set(CMAKE_INCLUDE_CURRENT_DIR ON)

find_package(Qt5Widgets PATHS ../../../lib/Qt5.11.2/5.11.2/clang_64)
find_package(OpenCV REQUIRED)

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTORCC ON)

ADD_EXECUTABLE(myApp
        src/main.cpp
        src/myapp.cpp
        src/mainwindow.cpp
        )

target_link_libraries(myApp
        Qt5::Widgets
        ${OpenCV_LIBS}
        )
