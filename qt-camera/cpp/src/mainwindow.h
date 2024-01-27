//
// Created by Gilbert François Duivesteijn on 20.11.18.
//

#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

namespace Ui {
    class MainWindow;
}


class MainWindow : public QMainWindow {
Q_OBJECT
public:
    explicit MainWindow(QWidget *parent = nullptr);

    ~MainWindow() override;


private:
    Ui::MainWindow *ui;
};

#endif
