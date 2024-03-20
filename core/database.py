from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres1_tpep',
        'USER': 'postgres1_tpep_user',
        'PASSWORD': 'rltehgsZAeac5BtYcJpAyhDVYotajTZh',
        'HOST': 'dpg-cntjqq7sc6pc73cbpokg-a.oregon-postgres.render.com',
        'PORT': '5432',
    }
}
