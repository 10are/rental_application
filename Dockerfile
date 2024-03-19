FROM python:3.9

WORKDIR /code

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

CMD ["gunicorn", "-b", "0.0.0.0:8000", "core.wsgi:application"]
