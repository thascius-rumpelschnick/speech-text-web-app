FROM python:3.12.0-bookworm

ARG USER=appuser
ARG WORKDIR=django_application

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir ${WORKDIR}
WORKDIR ${WORKDIR}
COPY . .

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

RUN adduser -u 5678 --system --group --no-create-home --disabled-password --gecos "" ${USER} && chown -R ${USER} /${WORKDIR}
USER ${USER}

#RUN mkdir -p /vol/web/media
#RUN mkdir -p /vol/web/static

#RUN chown -R user:user /vol/
#RUN chmod -R 755 /vol/web
