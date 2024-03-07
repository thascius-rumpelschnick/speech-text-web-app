from django.db import models


class Transcription(models.Model):
    """Transcription"""

    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Transcription {self.id}'

    class Meta:
        verbose_name = 'Transcription'
        verbose_name_plural = 'Transcriptions'
