
from rest_framework import routers

from notes_api import views

router = routers.DefaultRouter()
router.register('notes_api', views.TodoViewSet, basename='notes_api')

urlpatterns = []

urlpatterns += router.urls
