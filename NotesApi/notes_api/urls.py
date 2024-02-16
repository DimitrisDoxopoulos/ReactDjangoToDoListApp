
from rest_framework import routers

from notes_api import views

router = routers.DefaultRouter()
router.register('notes', views.TodoViewSet, basename='notes')

urlpatterns = []

urlpatterns += router.urls
