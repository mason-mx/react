rem FILE: startup.bat
set FLASK_ENV=development
set FLASK_DEBUG=1
set "FLASK_APP=myapp.py"
.\python.exe %FLASK_APP%
