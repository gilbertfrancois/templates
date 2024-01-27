

*NOTE: The C++ implementation is not finished yet.* 



# Webcam Qt App in C++ and Python

This project shows the similarity between a Qt app, written in C++ and Python, using a webcam. Both implementations use the same `mainwindow.ui` file, created in QtDesigner. 

## QtDesigner

Design your app in QtDesigner. In the `Property Editor -> Object -> objectName`, give every object a useful name. This is the variable name that refers to the widget in the code. Save the file in `*.ui` format.

![QtDesigner](./resources/qtdesigner.png)

## C++

The C++ project uses cmake. In the file `{project_dir}/cpp/CMakeList.txt` change the line
```cmake
find_package(Qt5Widgets PATHS ../../../lib/Qt5.11.2/5.11.2/clang_64)
```
to the path where the Qt5 library is installed on your computer.

## Python

Install pyside2 in your virtual environment. 

To convert mainwindow.ui file into a python source file, run from the `{project_dir}/py` folder:
```bash
pyside2-uic ./ui/mainwindow.ui > ./src/ui_mainwindow.py 
```

Run the project with:
```bash
cd src
python main.py
```

## To do

- [ ] Finish C++ implementation