from django.utils import timezone

from django.db import models

# Create your models here.
class Todo(models.Model):
    body = models.CharField(max_length=300)
    dateOfTodo = models.DateTimeField(default=timezone.now)
    completed = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.body