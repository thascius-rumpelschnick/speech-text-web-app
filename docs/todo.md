# ToDo's

- [x] Basic Frontend Scaffolding
- [x] Audio Recording
- [x] WYSIWYG
- [x] User authentication
- [x] Text to Speech
- [ ] PDF

## Styles

- [Cover](https://getbootstrap.com/docs/5.3/examples/cover/)
- [Sign-in](https://getbootstrap.com/docs/5.3/examples/sign-in/)
- [Album](https://getbootstrap.com/docs/5.3/examples/album/)
- [Bootstrap Examples](https://getbootstrap.com/docs/5.3/examples/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

## Dev Environment

Env File: `.env.dev`

```bash
    # Application Environment
    APPLICATION_ENV=development
    
    # Application
    SECRET_KEY=django-insecure-36l34bzn8j5r4@^5pabbfcnev+*1ue*p2$!@v$+reu1@a898%!
    DEBUG=TRUE
    ALLOWED_HOSTS=*
    STATIC_ROOT=
    
    # API Key
    GOOGLE_APPLICATION_CREDENTIALS=
    
    # Database configuration Django
    DB_HOST=postgres
    DB_NAME=speech_text
    DB_USER=user
    DB_PASS=password
    DB_PORT=5432
    
    # PostgreSQL
    POSTGRES_USER=user
    POSTGRES_PASSWORD=password
    POSTGRES_DB=speech_text
```

## Dependencies

Version 1.1.0

### Backend

```
arabic-reshaper==3.0.0
asgiref==3.7.2
asn1crypto==1.5.1
cachetools==5.3.2
certifi==2024.2.2
cffi==1.16.0
chardet==5.2.0
charset-normalizer==3.3.2
click==8.1.7
cryptography==42.0.5
cssselect2==0.7.0
Django==5.0.2
django-debug-toolbar==4.3.0
filelock==3.13.1
flake8==7.0.0
fsspec==2024.2.0
google-api-core==2.17.1
google-auth==2.28.1
google-cloud-speech==2.25.0
googleapis-common-protos==1.62.0
grpcio==1.62.0
grpcio-status==1.62.0
gunicorn==21.2.0
html5lib==1.1
idna==3.6
Jinja2==3.1.3
llvmlite==0.42.0
lxml==5.1.0
MarkupSafe==2.1.5
mccabe==0.7.0
more-itertools==10.2.0
mpmath==1.3.0
networkx==3.2.1
numba==0.59.0
numpy==1.26.4
openai-whisper==20231117
oscrypto==1.3.0
packaging==23.2
pillow==10.2.0
proto-plus==1.23.0
protobuf==4.25.3
psycopg==3.1.18
psycopg-binary==3.1.18
pyasn1==0.5.1
pyasn1-modules==0.3.0
pycodestyle==2.11.1
pycparser==2.21
pydub==0.25.1
pyflakes==3.2.0
pyHanko==0.23.0
pyhanko-certvalidator==0.26.3
pypdf==4.1.0
pypng==0.20220715.0
python-bidi==0.4.2
python-dotenv==1.0.1
PyYAML==6.0.1
qrcode==7.4.2
regex==2023.12.25
reportlab==4.0.9
requests==2.31.0
rsa==4.9
setuptools==69.0.3
six==1.16.0
soundfile==0.12.1
SpeechRecognition==3.10.1
sqlparse==0.4.4
srt==3.5.3
svglib==1.5.1
sympy==1.12
tiktoken==0.6.0
tinycss2==1.2.1
torch==2.2.1
tqdm==4.66.2
typing_extensions==4.10.0
tzlocal==5.2
uritools==4.0.2
urllib3==2.2.1
vosk==0.3.45
webencodings==0.5.1
websockets==12.0
wheel==0.42.0
xhtml2pdf==0.2.15
```

### Frontend

```json
{
   "dependencies": {
    "@lexical/react": "^0.13.1",
    "axios": "^1.6.7",
    "bootstrap": "^5.3.3",
    "bootstrap-icons": "^1.11.3",
    "jquery": "^3.7.1",
    "lexical": "^0.13.1",
    "lodash": "^4.17.21",
    "moment": "^2.30.1",
    "popper.js": "^1.16.1",
    "react": "^18.2.0",
    "react-bootstrap": "^2.10.1",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.50.1"
  },
  "devDependencies": {
    "@babel/core": "^7.23.9",
    "@babel/preset-env": "^7.23.9",
    "@babel/preset-react": "^7.23.3",
    "@storybook/addon-essentials": "^7.6.17",
    "@storybook/addon-interactions": "^7.6.17",
    "@storybook/addon-links": "^7.6.17",
    "@storybook/addon-mdx-gfm": "^7.6.17",
    "@storybook/addon-onboarding": "^1.0.11",
    "@storybook/blocks": "^7.6.17",
    "@storybook/preset-scss": "^1.0.3",
    "@storybook/react": "^7.6.17",
    "@storybook/react-webpack5": "^7.6.17",
    "@storybook/testing-library": "^0.2.2",
    "@stylistic/eslint-plugin": "^1.6.2",
    "@types/react": "^18.2.57",
    "@types/react-dom": "^18.2.19",
    "@typescript-eslint/eslint-plugin": "^7.0.2",
    "@typescript-eslint/parser": "^7.0.2",
    "babel-jest": "^29.7.0",
    "babel-loader": "^9.1.3",
    "clean-webpack-plugin": "^4.0.0",
    "copy-webpack-plugin": "^12.0.2",
    "css-loader": "^6.10.0",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-react": "^7.33.2",
    "file-loader": "^6.2.0",
    "globals": "^14.0.0",
    "jest": "^29.7.0",
    "lodash-webpack-plugin": "^0.11.6",
    "mini-css-extract-plugin": "^2.8.0",
    "mocha": "^10.3.0",
    "node-sass": "^9.0.0",
    "prettier": "^3.2.5",
    "sass-loader": "^14.1.1",
    "storybook": "^7.6.17",
    "style-loader": "^3.3.4",
    "ts-loader": "^9.5.1",
    "typescript": "^5.3.3",
    "url-loader": "^4.1.1",
    "webpack": "^5.90.3",
    "webpack-cli": "^5.1.4"
  }
}
```

### Nginx

```
server {
    listen         80;
    listen         [::]:80;
    server_name    example.com www.example.com;

    access_log /var/log/nginx/speech-text-web-app.log;

    root           /var/www/public/;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

   location /static {
        alias       /var/www/public/;
    }

    gzip             on;
    gzip_comp_level  3;
    gzip_types       text/plain text/css application/javascript image/*;
}
```

## Flake8 Pycharm

https://stackoverflow.com/a/59034852/7469905