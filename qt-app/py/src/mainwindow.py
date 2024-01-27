from ui_mainwindow import Ui_MainWindow
from PySide2.QtWidgets import *


class MainWindow(QMainWindow, Ui_MainWindow):

    def __init__(self):
        super(MainWindow, self).__init__()

        self.setupUi(self)
        # Connect button signal to appropriate slot
        self.myButton.released.connect(self.myButtonPushed)

    def myButtonPushed(self):
        self.myTextEdit.append("Lorum ipsum")
