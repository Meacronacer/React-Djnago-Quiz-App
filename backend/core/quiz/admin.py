from django.contrib import admin
from .models import *
from .forms import *

class QuizAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}

class AnswerInlineAdmin(admin.TabularInline):
    model = Answer
    formset = QuestionFormSet
    extra = 1

class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInlineAdmin]

admin.site.register(Question, QuestionAdmin)
admin.site.register(Category)
admin.site.register(Quiz, QuizAdmin)
admin.site.register(Answer)
