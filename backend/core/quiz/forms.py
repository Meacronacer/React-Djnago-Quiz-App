from typing import Any
from django.forms.models import BaseInlineFormSet
from .models import *
from django.core.exceptions import ValidationError

class QuestionFormSet(BaseInlineFormSet):
    
    def clean(self) -> dict[str, Any]:
        try:
            cleaned_data = [i for i in self.cleaned_data if i]
        except:
            raise ValidationError('You cannot save correct answer with blank input')
        count = 0
        for i in cleaned_data:
            count += 1 if i.get('is_right') else 0
        
        if count == 0 or count == len(cleaned_data):
            raise ValidationError('There must be one correct answer or several, but it cannot be that all the answers were correct')

        return super().clean()