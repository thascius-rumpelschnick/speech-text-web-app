"""audio_transcription.py"""

from enum import Enum

import speech_recognition as sr


class Transcriber(Enum):
    """Transcriber"""

    GOOGLE = 'google'
    VOSK = 'vosk'


class AbstractAudioTranscriber:
    """AbstractAudioTranscriber"""

    AUDIO_FILE = 'test.wav'
    TEXT_FILE = 'test.txt'

    def __init__(self) -> None:
        self._recognizer: sr.Recognizer = sr.Recognizer()

    def transcribe(self) -> None:
        """transcribe()"""

        raise NotImplementedError(
            'AbstractAudioTranscriber.transcribe() must be implemented.')


class GoogleAudioTranscriber(AbstractAudioTranscriber):
    """GoogleAudioTranscriber"""

    def transcribe(self) -> None:
        with sr.AudioFile(self.AUDIO_FILE) as source:
            audio = self._recognizer.record(source, duration=30)

        try:
            with open(self.TEXT_FILE, 'w', encoding='utf-8') as file:
                file.write (self._recognizer.recognize_google_cloud(
                    audio, language='de-DE'))

            print('Google Speech Recognition completed.')
        except sr.UnknownValueError:
            print('Google Speech Recognition could not understand audio.')
        except sr.RequestError as e:
            print(
                f'Could not request results from Google Speech Recognition service: {e}.')


class VoskAudioTranscriber(AbstractAudioTranscriber):
    """VoskAudioTranscriber"""

    def transcribe(self) -> None:
        with sr.AudioFile(self.AUDIO_FILE) as source:
            audio = self._recognizer.record(source, duration=30)

        try:
            with open(self.TEXT_FILE, 'w', encoding='utf-8') as file:
                file.write(self._recognizer.recognize_vosk(
                    audio, language='de-DE'))

            print('Vosk Speech Recognition completed.')
        except sr.UnknownValueError:
            print('Vosk Speech Recognition could not understand audio.')
        except sr.RequestError as e:
            print(
                f'Could not request results from Vosk Speech Recognition service: {e}.')


def transcribe(transcriber: Transcriber) -> None:
    """transcribe()"""

    if transcriber == Transcriber.VOSK:
        transcriber = VoskAudioTranscriber()
    else:
        transcriber = GoogleAudioTranscriber()

    transcriber.transcribe()
