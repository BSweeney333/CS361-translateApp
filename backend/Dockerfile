FROM python:3.9

WORKDIR /app

RUN pip install requests flask argostranslate flask-cors

COPY . .

EXPOSE 5000

ENV FLASK_APP=app.py

CMD ["flask", "run", "--host", "127.0.0.1", "-p", "5000"]