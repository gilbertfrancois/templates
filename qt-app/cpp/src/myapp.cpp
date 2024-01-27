//
// Created by Gilbert François Duivesteijn on 20.11.18.
//

#include "myapp.h"


MyApp::MyApp(int &argc, char **argv) : QApplication(argc, argv) {

    setOrganizationDomain("com.mycompany");
    setOrganizationName("My Company");
    setApplicationName("My App");
    setApplicationVersion("0.1");
}
