"""
Utility functions for the project.
"""
import io
import os
import zipfile

import requests


# Directories

def make_directory(directory_name: str) -> None:
    """make_directory"""

    os.makedirs(f'./{directory_name}', exist_ok=True)


def remove_directory(directory_name: str) -> None:
    """remove_directory"""

    os.rmdir(f'./{directory_name}')


def directory_exists(directory: str) -> bool:
    """directory_exists"""

    return os.path.isdir(f'./{directory}')


# Files

def download_and_unpack_zip(source: str, extract_to='.') -> None:
    """download_and_unpack_zip"""

    response = requests.get(source, timeout=300)

    with zipfile.ZipFile(io.BytesIO(response.content)) as zip_ref:
        zip_ref.extractall(extract_to)
