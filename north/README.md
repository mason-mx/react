1. Download [Python3.9.5](https://www.python.org/ftp/python/3.9.5/python-3.9.5-embed-amd64.zip) or similar.
2. In the file python39._pth or similar, uncomment the import command; or overwrite with this file.
3. Download [get-pip.py](https://bootstrap.pypa.io/get-pip.py).
4. Install Python packages:

```
.\python.exe get-pip.py
.\python.exe -m pip install Flask flask-restful
.\python.exe -m pip install Flask-Excel pyexcel-xls pyexcel-xlsx
.\python.exe -m pip uninstall openpyxl
.\python.exe -m pip install openpyxl==3.0.10
```