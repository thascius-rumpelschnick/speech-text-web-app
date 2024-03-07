"""audio_transcription.py"""

from __future__ import annotations

import json
import os
from enum import Enum

import speech_recognition as sr
from pydub import AudioSegment

from application.domain.utils import directory_exists, make_directory


class Transcriber(Enum):
    """Transcriber"""

    GOOGLE = 'google'
    VOSK = 'vosk'


class Language(Enum):
    """Language"""

    GERMAN = 'de-DE'
    ENGLISH = 'en-US'


class AbstractAudioTranscriber:
    """AbstractAudioTranscriber"""

    def __init__(self, language: Language, tmp_dir: str) -> None:
        self._language: Language = language
        self._tmp_dir = tmp_dir

        self._audio_file = None
        self._audio_file_name: str | None = None
        self._transcription: str | None = None

        self._recognizer: sr.Recognizer = sr.Recognizer()

    def transcribe(self, audio_file_name: str, audio_file=None) -> str:
        """transcribe_to_text"""

        self._audio_file_name = audio_file_name
        self._audio_file = audio_file

        self.record()
        self.process_transcription()

        return self._transcription

    def record(self, duration: int = 120) -> None:
        audio_source = self._audio_file if self._audio_file else f'./{self._tmp_dir}/{self._audio_file_name}'

        with sr.AudioFile(audio_source) as source:
            self._audio_file = self._recognizer.record(source, duration=duration)

    def process_transcription(self) -> None:
        """transcribe()"""

        raise NotImplementedError('AbstractAudioTranscriber.transcribe() must be implemented.')


class GoogleAudioTranscriber(AbstractAudioTranscriber):
    """GoogleAudioTranscriber"""

    def process_transcription(self) -> None:
        try:
            # self._transcription = self._recognizer.recognize_google_cloud(
            #     self._audio_file,
            #     language=self._language.value
            # )
            self._transcription = self._recognizer.recognize_google(
                self._audio_file,
                language=self._language.value
            )

            print('Google Speech Recognition completed.')
        except sr.UnknownValueError:
            print('Google Speech Recognition could not understand audio.')
        except sr.RequestError as e:
            print(
                f'Could not request results from Google Speech Recognition service: {e}.')


class VoskAudioTranscriber(AbstractAudioTranscriber):
    """VoskAudioTranscriber"""

    def process_transcription(self) -> None:

        try:
            transcription = self._recognizer.recognize_vosk(
                self._audio_file,
                language=self._language.value
            )

            json_decoded = json.loads(transcription)

            self._transcription = json_decoded['text']

            print('Vosk Speech Recognition completed.')
        except sr.UnknownValueError:
            print('Vosk Speech Recognition could not understand audio.')
        except sr.RequestError as e:
            print(
                f'Could not request results from Vosk Speech Recognition service: {e}.')


class AudioFileHandler:
    """FileHandler"""

    def __init__(self, working_dir: str) -> None:
        self._working_dir = working_dir

    def save_audio_to_file(self, audio) -> None:
        """save_audio_file"""

        if not directory_exists(self._working_dir):
            make_directory(self._working_dir)

        with open(f'./{self._working_dir}/{audio.name}', 'wb') as file:
            for chunk in audio.chunks():
                file.write(chunk)

    def convert_ogg_to_flac(self, audio) -> None:
        """convert_ogg_to_flac"""

        # Read ogg file and convert to flac
        file_name = audio.name.replace('.ogg', '.flac')

        sound = AudioSegment.from_file(f'./{self._working_dir}/{audio.name}')
        sound.export(f'./{self._working_dir}/{file_name}', format="flac")

        # Remove the original ogg file
        self.remove_file(audio.name)

    def remove_file(self, file_name: str) -> None:
        """remove_file"""

        os.remove(f'./{self._working_dir}/{file_name}')


class AudioTranscription:
    """AudioTranscription"""

    TMP_DIR = 'tmp'

    def __init__(self, transcriber: AbstractAudioTranscriber) -> None:
        self._transcriber: AbstractAudioTranscriber = transcriber

        self._file_handler = AudioFileHandler(self.TMP_DIR)

    def transcribe_to_text(self, audio) -> str:
        """transcribe_to_text"""

        self._file_handler.save_audio_to_file(audio)
        self._file_handler.convert_ogg_to_flac(audio)

        audio_file_name = audio.name.replace('.ogg', '.flac')
        transcription = self._transcriber.transcribe(audio_file_name)

        print('TRANSCRIPTION:', transcription)

        self._file_handler.remove_file(audio_file_name)

        return transcription

    def transcribe_to_file(self, audio) -> None:
        """transcribe_to_text"""

        transcription = self.transcribe_to_text(audio)

        text_file_name = audio.name.replace('.ogg', '.txt')
        with open(f'./{self.TMP_DIR}/{text_file_name}', 'w', encoding='utf-8') as file:
            file.write(transcription)

    @classmethod
    def get(
            cls,
            transcriber: Transcriber = Transcriber.VOSK,
            language: Language = Language.GERMAN
    ) -> AudioTranscription:
        """transcribe()"""

        if transcriber == Transcriber.VOSK:
            return AudioTranscription(VoskAudioTranscriber(language, AudioTranscription.TMP_DIR))
        else:
            return AudioTranscription(GoogleAudioTranscriber(language, AudioTranscription.TMP_DIR))
