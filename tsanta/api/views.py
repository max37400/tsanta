from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from api import serializers
from api.models import City, Group
from api.serializers import serialize, deserialize


class CityView(APIView):

    def get(self, request):

        req_serializer = deserialize(serializers.OnlyQSer, request.query_params)

        items = City.suggest(req_serializer.data['q'])

        ans_serializer = serialize(serializers.CitySer, items, many=True)

        return Response(ans_serializer.data)


@api_view()
@permission_classes([])
def check_slug(request):
    # Данный метод выполняется для неавторизованного пользователя

    req_serializer = deserialize(serializers.OnlyQSer, request.query_params)

    ans = Group.check_slug(req_serializer.data['q'])

    ans_serializer = serialize(serializers.CheckSlug, ans)

    return Response(ans_serializer.data)


class GroupView(APIView):

    def get(self, request):

        items = Group.get_my_groups(request.user)
        ans_serializer = serialize(serializers.GroupSer, items, many=True)

        return Response(ans_serializer.data)
