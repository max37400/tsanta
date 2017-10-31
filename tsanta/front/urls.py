from django.conf.urls import url

from . import views


urlpatterns = [
    url('^$', views.index),
    url('^thanks$', views.thanks),
    url('^', views.application)
]
