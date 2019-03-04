import datetime
from django.conf import settings
from django.utils import timezone
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler  = api_settings.JWT_ENCODE_HANDLER


expire_delta = settings.JWT_AUTH['JWT_REFRESH_EXPIRATION_DELTA']

def jwt_response_payload_handler(token,user=None,request=None):
	return {
		'token': token,
		'id': user.pk
	}

def JwtToken(user=None):
	payload = jwt_payload_handler(user)
	token = jwt_encode_handler(payload)
	response_payload = jwt_response_payload_handler(token, user)

	return response_payload