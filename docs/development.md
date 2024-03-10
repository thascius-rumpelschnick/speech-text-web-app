# Development

## Speech Recognition

- <https://realpython.com/python-speech-recognition/>
- <https://thepythoncode.com/article/using-speech-recognition-to-convert-speech-to-text-python>
- <https://ulife.ai/stories/how-to-create-tts-in-python-with-coqui-tts>

## PDF

- <https://realpython.com/creating-modifying-pdf/>

## WYSIWYG

- <https://github.com/facebook/lexical>
- <https://blog.logrocket.com/best-text-editors-react/>

## Recording Audio

- <https://dev.to/jleonardo007/create-a-voice-recorder-with-react-32j6>
- <https://blog.logrocket.com/how-to-create-video-audio-recorder-react/>

## Backend

### Python

- Django
- python-dotenv

## Frontend

- React
- Storybook
- Webpack
- Typescript

- <https://createapp.dev/webpack/react--babel--bootstrap--cleanwebpackplugin--code-split-vendors--copywebpackplugin--jest--lodash--minicssextractplugin--mocha--moment--png--prettier--sass--svg--typescript>
- <https://storybook.js.org/blog/storybook-for-webpack-5/>

### Forms

- <https://react-hook-form.com/>

### Style & Linter

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

## VS Code Settings

### launch.json

```json
{
    "configurations": [
        {
            "name": "Python: Django",
            "type": "python",
            "request": "launch",
            "program": "${workspaceFolder}/manage.py",
            "args": [
                "runserver",
                "0.0.0.0:8000"
            ],
            "django": true,
            "justMyCode": true
        },
        {
            "name": "Docker: Python - Django",
            "type": "docker",
            "request": "launch",
            "preLaunchTask": "python-run: debug",
            "python": {
                "pathMappings": [
                    {
                        "localRoot": "${workspaceFolder}",
                        "remoteRoot": "/django_application"
                    }
                ],
                "projectType": "django",
            }
        },
        {
            "name": "Python: Remote Attach",
            "type": "python",
            "request": "attach",
            "connect": {
                "host": "localhost",
                "port": 5678
            },
            "pathMappings": [
                {
                    "localRoot": "${workspaceFolder}",
                    "remoteRoot": "/django_application"
                }
            ],
            "justMyCode": true
        }
    ]
}
``````

### settings.json

```json
{
    "importSorter.importStringConfiguration.quoteMark": "double",
    "javascript.preferences.quoteStyle": "double",
    "prettier.jsxSingleQuote": false,
    "prettier.singleQuote": true,
    "typescript.preferences.quoteStyle": "double"
}
``````

### tasks.json

```json
{
 "version": "2.0.0",
 "tasks": [
  {
   "type": "docker-build",
   "label": "python-build",
   "platform": "python",
   "dockerBuild": {
    "tag": "speechtextwebapp:latest",
    "dockerfile": "${workspaceFolder}/docker/python/Dockerfile",
    "context": "${workspaceFolder}",
    "pull": true
   }
  },
  {
   "type": "docker-run",
   "label": "python-run: debug",
   "dependsOn": [
    "python-build"
   ],
   "python": {
    "args": [
     "runserver",
     "0.0.0.0:8000",
     "--nothreading",
     "--noreload"
    ],
    "file": "manage.py"
   }
  },
  {
   "label": "Run docker-compose up",
   "type": "docker-compose",
   "dockerCompose": {
    "up": {
     "detached": true,
     "build": true,
     "services": [
      "python",
      "node"
     ]
    },
    "files": [
     "${workspaceFolder}/docker-compose.yml",
     "${workspaceFolder}/docker-compose.debug.yml"
    ]
   }
  }
 ]
}
``````
