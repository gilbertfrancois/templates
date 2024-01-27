from ui_mainwindow import Ui_MainWindow
from PySide2.QtWidgets import *
from PySide2.QtCore import *
from PySide2.QtGui import *
import cv2


class MainWindow(QMainWindow, Ui_MainWindow):

    def __init__(self):
        super(MainWindow, self).__init__()

        self.setupUi(self)
        # Connect button signal to appropriate slot
        # self.myButton.released.connect(self.myButtonPushed)
        self.start_webcam()

    def start_webcam(self):
        self.cap = cv2.VideoCapture(0)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update_frame)
        self.timer.start(5)

    def update_frame(self):
        _, self.frame = self.cap.read()
        self.frame = cv2.flip(self.frame, 1)
        self.frame = cv2.cvtColor(self.frame, cv2.COLOR_BGR2RGB)
        self.display_frame()

    def display_frame(self):
        image = QImage(
            self.frame,
            self.frame.shape[1],
            self.frame.shape[0],
            self.frame.shape[1] * 3,
            QImage.Format_RGB888
        )
        self.viewFinder.setPixmap(QPixmap.fromImage(image))
