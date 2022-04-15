from rest_framework import serializers


class AuthSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)
    applicationId = serializers.CharField(write_only=True)
    access_token = serializers.CharField(read_only=True)
    refresh_token = serializers.CharField(read_only=True)


class RefreshSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()
    access_token = serializers.CharField(read_only=True)
