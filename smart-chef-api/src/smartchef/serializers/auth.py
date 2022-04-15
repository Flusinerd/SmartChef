from rest_framework import serializers


class LoginRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=100)
    applicationId = serializers.UUIDField()


class TokenPairSerializer(serializers.Serializer):
    accessToken = serializers.CharField(max_length=100)
    refreshToken = serializers.CharField(max_length=100)


class AuthSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)
    applicationId = serializers.CharField(write_only=True)
    access_token = serializers.CharField(read_only=True)
    refresh_token = serializers.CharField(read_only=True)


class RefreshTokenSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()
