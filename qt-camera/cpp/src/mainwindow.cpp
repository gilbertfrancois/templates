//
// Created by Gilbert François Duivesteijn on 20.11.18.
//

#include "mainwindow.h"
#include "../ui/ui_mainwindow.h"

#include <QtWidgets>

MainWindow::MainWindow(QWidget *parent)
        : QMainWindow(parent), ui(new Ui::MainWindow) {

    ui->setupUi(this);
    // Connect button signal to appropriate slot
}


MainWindow::~MainWindow() {
    delete ui;
}

