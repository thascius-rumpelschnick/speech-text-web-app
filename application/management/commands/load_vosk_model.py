"""
Command for downloading the Vosk German speech model.
"""

import shutil
from django.core.management.base import BaseCommand, CommandError

from application.domain.utils import directory_exists, download_and_unpack_zip

DEFAULT_MODEL = 'vosk-model-de-0.21'
DEFAULT_MODEL_DIR = 'model'


def download_vosk_model(model: str = DEFAULT_MODEL, destination: str = DEFAULT_MODEL_DIR) -> None:
    """download_vosk_model"""

    if not directory_exists(destination):
        print(f'Downloading Vosk model {model}...')
        download_and_unpack_zip(f'https://alphacephei.com/vosk/models/{model}.zip')

        print(f'Moving {model} to {destination}...')
        shutil.move(f'./{model}', f'./{destination}')

        print('Done.')


class Command(BaseCommand):
    help = 'Load Vosk speech model in specific directory'

    def add_arguments(self, parser) -> None:
        parser.add_argument('-d', '--default_model_dir', type=str)
        parser.add_argument('-m', '--default_model', type=str)

    def handle(self, *args, **options) -> None:
        default_model_dir = options['default_model_dir'] if options['default_model_dir'] else DEFAULT_MODEL_DIR
        default_model = options['default_model'] if options['default_model'] else DEFAULT_MODEL

        self.stdout.write(self.style.INFO('Starting to load Vosk model...'))

        try:
            download_vosk_model(default_model, default_model_dir)
        except:
            raise CommandError('Could not load model')

        self.stdout.write(self.style.SUCCESS('Successfully loaded model'))
