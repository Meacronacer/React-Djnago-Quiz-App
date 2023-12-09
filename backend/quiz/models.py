from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=70)

    def __str__(self) -> str:
        return self.name


class Quiz(models.Model):
    name = models.CharField(max_length=70)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    slug = models.SlugField(blank=True)


    def __str__(self) -> str:
        return self.name


class Update(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Question(Update):
    question = models.CharField(max_length=255)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.PositiveIntegerField(default=5)

    def __str__(self) -> str:
        return self.question

class Answer(Update):
    answer = models.CharField(max_length=200)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    is_right = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.answer 


class QuizResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    quiz = models.CharField(max_length=80)
    answers = models.JSONField()


    def __str__(self) -> str:
        return str(self.user)
