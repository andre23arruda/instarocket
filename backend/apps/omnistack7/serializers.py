from django.contrib.auth.models import User
from rest_framework import serializers
from .models import PostModel


class PostSerializer(serializers.ModelSerializer):
    '''Post Serializer'''
    likes = serializers.SerializerMethodField()
    def get_likes(self, obj):
        return obj.likes.all().count()

    liked_by_user = serializers.SerializerMethodField()
    def get_liked_by_user(self, obj):
        request = self.context['request']
        token = request.headers.get('Authorization')
        user = request.user
        return obj.liked_by_user(token, user)

    class Meta:
        model = PostModel
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'password']

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user