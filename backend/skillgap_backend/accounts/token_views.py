from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field='email'
    @classmethod
    def get_token(cls, user):
        token=super().get_token(user)
        token["email"]=user.email
        token["is_staff"]=user.is_staff
        return token
class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class=EmailTokenObtainPairSerializer

    