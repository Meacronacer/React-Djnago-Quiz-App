from .models import *
from rest_framework import serializers
from django.core.serializers import serialize

class QuizSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    class Meta:
        model = Quiz
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    quiz = serializers.StringRelatedField()
    answers = serializers.SerializerMethodField()

    def get_answers(self, obj):
        data = Answer.objects.all()
        return [{count:i.answer, 'correct':i.is_right} for count, i in enumerate(Answer.objects.filter(question__question=obj.question))]


    class Meta:
        model = Question
        fields = ['id', 'quiz', 'question', 'score', 'answers']
