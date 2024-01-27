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
    connect(ui->myButton, SIGNAL (released()), this, SLOT (myButtonPushed()));
}

void MainWindow::myButtonPushed() {
    ui->myTextEdit->append("Lorum ipsum");
}

MainWindow::~MainWindow() {
    delete ui;
}

