# Generated by Django 4.2.7 on 2023-11-26 14:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='answer',
            old_name='name',
            new_name='answer',
        ),
        migrations.RenameField(
            model_name='question',
            old_name='name',
            new_name='question',
        ),
    ]
