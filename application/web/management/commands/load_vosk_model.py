"""
Utility functions for the project.
"""

import shutil
import zipfile
import io
import os
import requests
from django.core.management.base import BaseCommand, CommandError

DEFAULT_MODEL = 'vosk-model-de-0.21'
DEFAULT_MODEL_DIR = 'model'


def download_vosk_models(model: str = DEFAULT_MODEL, destination: str = DEFAULT_MODEL_DIR) -> None:
    """download_vosk_models"""

    if not directory_exists(f'./{destination}'):
        print(f'Downloading Vosk model {model}...')
        download_and_unpack_zip(f'https://alphacephei.com/vosk/models/{model}.zip')

        print(f'Moving {model} to {destination}...')
        shutil.move(f'./{model}', f'./{destination}')

        print('Done.')


def directory_exists(directory) -> bool:
    """directory_exists"""

    return os.path.isdir(directory)


def download_and_unpack_zip(source, extract_to='.') -> None:
    """download_and_unpack_zip"""

    response = requests.get(source, timeout=300)

    with zipfile.ZipFile(io.BytesIO(response.content)) as zip_ref:
        zip_ref.extractall(extract_to)


class Command(BaseCommand):
    help = 'Load Vosk speech model in specific directory'

    def add_arguments(self, parser) -> None:
        parser.add_argument('-d', '--default_model_dir', type=str)
        parser.add_argument('-m', '--default_model', type=str)

    def handle(self, *args, **options) -> None:
        default_model_dir = options['default_model_dir'] if options['default_model_dir'] else DEFAULT_MODEL_DIR
        default_model = options['default_model'] if options['default_model'] else DEFAULT_MODEL

        try:
            download_vosk_models(default_model, default_model_dir)
        except:
            raise CommandError('Could not load model')

        self.stdout.write(
            self.style.SUCCESS('Successfully loaded model')
        )
