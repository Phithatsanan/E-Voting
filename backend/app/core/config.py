# backend/app/core/config.py
import os
from typing import List, Optional
from pydantic import PostgresDsn, AnyHttpUrl, Field
from pydantic_settings import BaseSettings
from phe import paillier


class Settings(BaseSettings):
    DATABASE_URL: str
    JWT_SECRET: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    CORS_ORIGINS: str
    SMTP_HOST: str
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASS: str
    EMAIL_FROM: str
    AUDIT_EXPORT_SECRET: str

    # ✅ These must use Field with `default=None` to support complex types
    PAILLIER_PUBLIC_KEY: Optional[paillier.PaillierPublicKey] = Field(default=None)
    PAILLIER_PRIVATE_KEY: Optional[paillier.PaillierPrivateKey] = Field(default=None)

    class Config:
        env_file = ".env"
        case_sensitive = True

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

settings = Settings()
settings.PAILLIER_PUBLIC_KEY, settings.PAILLIER_PRIVATE_KEY = paillier.generate_paillier_keypair()
