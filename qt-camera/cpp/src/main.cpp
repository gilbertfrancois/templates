#include <iostream>
#include "src/mainwindow.h"
#include "src/myapp.h"


int main(int argc, char *argv[]) {
    MyApp app(argc, argv);
    MainWindow mainWin;
    mainWin.show();

    return MyApp::exec();
}