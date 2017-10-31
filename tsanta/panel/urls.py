from django.conf.urls import url

from panel import views


urlpatterns = [
    url('^', views.index_view)
]
