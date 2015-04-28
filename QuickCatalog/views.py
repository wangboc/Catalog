from django.shortcuts import render
from QuickCatalog.models import ProgramInfo
from django.core.serializers import serialize,deserialize

# Create your views here.
import json
from django.http import HttpResponse
from django.db import connection

def index(request):
    cursor = connection.cursor()
    cursor.execute("select * from mediainfo where id = %d" % 26383)
    result = cursor.fetchone()
    cursor.close()

    program = dict(Name="wang")

    programJson = json.dumps(program)

    return render(request, 'QuickCatalog/index.html', program)



    #return HttpResponse(programJson, content_type="application/json")
