from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

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


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class QuizResultsSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
    source="user.username",
    read_only=True, 
    default=serializers.CurrentUserDefault()
    )

    class Meta: 
        model = QuizResult
        fields = '__all__'