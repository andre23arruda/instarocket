from django.contrib.auth.models import User
from rest_framework import authentication, generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .models import PostModel
from .serializers import PostSerializer, UserSerializer


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []
    authentication_classes = []


class PostsViewSet(viewsets.ModelViewSet):
    '''API endpoint that allows Post to be viewed or edited.'''
    authentication_classes = [
        authentication.SessionAuthentication,
        JSONWebTokenAuthentication,
    ]
    http_method_names = ['get', 'post', 'patch']
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    queryset = PostModel.objects.all().order_by('-created_at')
    serializer_class = PostSerializer

    def get_serializer_context(self):
        context = super(PostsViewSet, self).get_serializer_context()
        context.update({'request': self.request})
        return context

    @action(detail=True, methods=['get'])
    def like(self, request, *args, **kwargs):
        '''Like em Post'''
        instance = self.get_object()
        liked = instance.add_like(request.user)
        return Response({'liked': liked})
