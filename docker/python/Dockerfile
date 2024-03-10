FROM python:3.12.1-bookworm

ARG USER=appuser
ARG WORKDIR=django_application
ARG NONEXISTENT=nonexistent

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir ${NONEXISTENT}
RUN mkdir ${WORKDIR}
WORKDIR ${WORKDIR}
COPY . .

RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    flac \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

RUN adduser -u 5678 --system --group --no-create-home --disabled-password --gecos "" ${USER} && chown -cR ${USER}:${USER} /${WORKDIR} && chown -cR ${USER}:${USER} /${NONEXISTENT}
USER ${USER}

#RUN mkdir -p /vol/web/media
#RUN mkdir -p /vol/web/static

#RUN chown -R user:user /vol/
#RUN chmod -R 755 /vol/web
