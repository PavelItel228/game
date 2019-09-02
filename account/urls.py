from django.urls import path
from django.conf.urls import include
from django.contrib.auth import urls as account_urls
from . import views

urlpatterns = [
    path('login', views.login, name="login"),
    path('reg', views.registration, name = "registrtion"),
    path('profile', views.redir , name ='redirect'),
    path('auth/', include('social_django.urls', namespace='social')),
]
