from django.db import models
from django.contrib.auth.models import User, AnonymousUser
from django.utils.translation import ugettext_lazy as _
from rest_framework.authtoken.models import Token


class PostModel(models.Model):
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    author = models.CharField(max_length=100)
    place = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    hashtags = models.CharField(max_length=100)
    image = models.ImageField(upload_to='uploads/posts/%Y/%m/%d/')
    likes = models.ManyToManyField(User, null=True, blank=True)

    class Meta:
        verbose_name = _('Post')
        verbose_name_plural = _('Posts')

    def __str__(self):
        return f'{ self.id } - { self.author }'

    # def add_like(self, token, user):
    #     liked = True
    #     if not isinstance(user, AnonymousUser):
    #         if not self.likes.filter(username=user):
    #             self.likes.add(user)
    #         else:
    #             self.likes.remove(user)
    #             liked = False
    #     else:
    #         token = Token.objects.filter(pk=token)
    #         if not self.likes.filter(username=token[0].user):
    #             self.likes.add(token[0].user)
    #         else:
    #             self.likes.remove(token[0].user)
    #             liked = False
    #     self.save()
    #     return liked

    def add_like(self, user):
        liked = True
        if not self.likes.filter(username=user):
            self.likes.add(user)
        else:
            self.likes.remove(user)
            liked = False
        self.save()
        return liked


    def liked_by_user(self, user):
        response = True if self.likes.filter(username=user) else False
        return response
