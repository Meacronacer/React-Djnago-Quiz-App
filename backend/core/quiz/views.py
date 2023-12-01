from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from .pagination import QuestionPagination
from rest_framework.response import Response

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
