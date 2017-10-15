from django.contrib.auth.models import User
from django.db import models


class Participant(models.Model):

    SEX_CHOICES = (
        (0, "Мужчина"),
        (1, "Женщина"),
        (2, "Не определено")
    )

    user = models.OneToOneField(User)
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    social_network_link = models.CharField(max_length=200)
    age = models.SmallIntegerField()
    sex = models.SmallIntegerField(choices=SEX_CHOICES)
    participation_confirmed = models.BooleanField(default=False)


class City(models.Model):

    name = models.CharField(max_length=100)


class Group(models.Model):

    short_name = models.CharField(max_length=500)
    alt_names = models.TextField()
    city = models.ForeignKey(City)
    slug = models.SlugField()
    owner = models.ForeignKey(Participant)
    event_lock = models.BooleanField(default=False)


class Event(models.Model):

    name = models.CharField(max_length=100)
    date_start = models.DateTimeField()
    date_end = models.DateTimeField()
    groups = models.ManyToManyField(Group)


class Question(models.Model):

    QUESTION_TYPES = (
        (0, "Text"),
        (1, "Radio")
    )

    type = models.SmallIntegerField(choices=QUESTION_TYPES, default=QUESTION_TYPES[0])
    json = models.TextField()


class Questionnaire(models.Model):

    participant = models.ForeignKey(Participant)
    event = models.ForeignKey(Event)
    ward = models.ForeignKey("self", null=True)
    questions = models.ManyToManyField(Question)
    group = models.ForeignKey(Group)
    is_closed = models.BooleanField(default=False)


class Notifications(models.Model):

    name = models.CharField(max_length=100)
    event = models.ForeignKey(Event)
    questionnaire = models.ForeignKey(Questionnaire)
    date_created = models.DateTimeField(auto_now_add=True)
    date_sended = models.DateTimeField(null=True)
    date_delivered = models.DateTimeField(null=True)
    date_opened = models.DateTimeField(null=True)
