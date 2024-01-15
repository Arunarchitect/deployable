from django.urls import path
from . views import *

urlpatterns = [
    path('blog/', BlogView.as_view(),name='blog'),
    path('list/', BlogView.as_view(),name='list'),
    path('blog/<int:pk>/', BlogView.as_view(), name='blog-view'),
    path('blog/update/<int:pk>/', BlogUpdateView.as_view(), name='blog-update'),   
]