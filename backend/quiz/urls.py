from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'results', QuizResultView)

urlpatterns = [
    path('quiz/', GetAllQuiz.as_view()),
    path('quiz/<str:slug>/', GetQuizDetail.as_view()),
    path('questions/<str:slug>/', GetAllQuestionsFromQuiz.as_view()),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('quizs/', include(router.urls))
]  