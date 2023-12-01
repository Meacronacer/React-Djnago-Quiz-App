from django.urls import path
from .views import *
urlpatterns = [
    path('quiz/', GetAllQuiz.as_view()),
    path('quiz/<str:slug>/', GetQuizDetail.as_view()),
    path('questions/<str:slug>/', GetAllQuestionsFromQuiz.as_view())
]  