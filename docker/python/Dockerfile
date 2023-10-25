FROM python:3.12.0-bookworm

ARG USER=user
ARG WORKDIR=django_application

RUN adduser --system --group --no-create-home ${USER}

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir ${WORKDIR}
WORKDIR ${WORKDIR}
COPY . .

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

#RUN mkdir -p /vol/web/media
#RUN mkdir -p /vol/web/static

#RUN chown -R user:user /vol/
#RUN chmod -R 755 /vol/web

#USER user
