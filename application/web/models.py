from django.db import models

from application.domain.audio_transcription import Language, Transcriber


class Transcription(models.Model):
    """Transcription"""

    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    content = models.TextField()
    content_as_html = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Transcription {self.id}'

    class Meta:
        verbose_name = 'Transcription'
        verbose_name_plural = 'Transcriptions'


class Setting(models.Model):
    """Setting"""

    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    model = models.CharField(
        max_length=20,
        choices=[(transcriber.name, transcriber.value) for transcriber in Transcriber]
    )
    language = models.CharField(
        max_length=20,
        choices=[(language.name, language.value[0]) for language in Language]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Setting {self.id}'

    class Meta:
        verbose_name = 'Setting'
        verbose_name_plural = 'Settings'
