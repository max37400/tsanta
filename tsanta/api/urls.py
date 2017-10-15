from django.conf.urls import url
from api import views


urlpatterns = [
    url(r'^cities$', views.CityView.as_view()),
    url(r'^groups$', views.GroupView.as_view()),
    url(r'^groups/check_slug$', views.check_slug)
]
