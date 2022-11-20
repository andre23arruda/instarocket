from django.contrib import admin
from django.conf.locale.pt_BR import formats as portuguese
from django.conf.locale.en import formats as english
from rangefilter.filters import DateRangeFilter
from .models import PostModel

portuguese.DATE_FORMAT = 'd/m/Y'
english.DATE_FORMAT = 'd/m/Y'


@admin.register(PostModel)
class PostRegister(admin.ModelAdmin):
    class Media:
        js = ['admin/js/progressbar.js']

    autocomplete_fields = ['likes']
    list_display = ['id', 'author', 'created_at', 'place', 'likes_count']
    list_display_links = ['id', 'author']
    list_filter = [
        'author',
        ('created_at', DateRangeFilter),
    ]
    list_per_page = 25
    ordering = ['id']
    search_fields = ['id', 'author', 'place']

    def likes_count(self, obj):
        return obj.likes.all().count()
    likes_count.short_description = 'Likes'
