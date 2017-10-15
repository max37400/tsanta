from rest_framework import serializers

from api import models


def deserialize(serializer_class, data):

    serializer = serializer_class(data=data)
    serializer.is_valid(raise_exception=True)

    return serializer


def serialize(serializer_class, instance, data=None, **kwargs):

    if data is None:
        serializer = serializer_class(instance, **kwargs)
    else:
        serializer = serializer_class(instance, data=data, **kwargs)
        serializer.is_valid(raise_exception=True)

    return serializer


class OnlyQSer(serializers.Serializer):

    q = serializers.CharField()


class CitySer(serializers.ModelSerializer):

    class Meta:

        model = models.City
        fields = ('id', 'name')


class GroupSer(serializers.Serializer):

    id = serializers.IntegerField(read_only=True)
    short_name = serializers.CharField()
    alt_names = serializers.ListField(serializers.CharField)
    city = CitySer()
    slug = serializers.SlugField()


class ExistsSer(serializers.Serializer):

    is_exists = serializers.BooleanField()


class CheckSlug(serializers.Serializer):

    is_exists = serializers.BooleanField()
    is_correct = serializers.BooleanField()
    is_ok = serializers.BooleanField()
