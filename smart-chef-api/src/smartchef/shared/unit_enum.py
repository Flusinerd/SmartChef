from enum import Enum


class UnitEnum(Enum):
    """
    Enum for unit types.
    """
    GRAM = 'GRAM'
    KILOGRAM = 'KILOGRAM'
    LITER = 'LITER'
    MILLILITER = 'MILLILITER'
    PIECE = 'PIECE'

    @classmethod
    def choices(cls):
        """
        Returns a list of tuples with the choices.
        """
        return [(choice.value, choice.name) for choice in cls]
