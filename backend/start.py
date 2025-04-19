import sys
import os

# Ensure Python can find backend/app
sys.path.append(os.path.join(os.path.dirname(__file__), "app"))

from main import app  # From app/main.py
