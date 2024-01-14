from rest_framework.response import Response
from .models import *
from . serializers import  *
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import generics
# Create your views here.


class BlogView(APIView):
    def post(self, request, format=None):
        serializer = BlogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Posted', 'status': 'success', 'blog': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, format=None):
        blogs = Blog.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response({'status': 'success', 'blogs': serializer.data}, status=status.HTTP_200_OK)
    
    def delete(self, request, pk, format=None):
        try:
            blog = Blog.objects.get(pk=pk)
        except Blog.DoesNotExist:
            return Response({'status': 'error', 'message': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)

        blog.delete()
        return Response({'status': 'success', 'message': 'Blog deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class BlogUpdateView(generics.UpdateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    
