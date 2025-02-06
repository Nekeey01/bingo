cd fastApiBingo
call .venv\Scripts\activate.bat

.venv\Scripts\python.exe -m uvicorn main:app --reload

