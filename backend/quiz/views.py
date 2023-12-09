from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets
from rest_framework import permissions

class QuizResultView(viewsets.ModelViewSet):
    queryset = QuizResult.objects.all()
    serializer_class = QuizResultsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class GetAllQuiz(generics.ListAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class GetQuizDetail(generics.RetrieveAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    lookup_field = 'slug'


class GetAllQuestionsFromQuiz(generics.ListAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        quiz_slug = self.kwargs['slug']
        return Question.objects.filter(quiz__slug=quiz_slug)
