from typing import List


class Token:
    sub: str
    exp: int


class RefreshToken(Token):
    clientId: str


class AccessToken(Token):
    householdIds: List[int]
