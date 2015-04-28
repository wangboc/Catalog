from django.shortcuts import render
from django.http import HttpResponse

from QuickCatalog.models import DateTimeEncoder



# Create your views here.
import json
from django.db import connection


def index(request):
    cursor = connection.cursor()
    cursor.execute("select * from mediainfo where id = %d" % 26383)
    result = cursor.fetchone()
    cursor.close()

    program = dict(Name="wang")

    programJson = json.dumps(program)

    return render(request, 'QuickCatalog/index.html', program)



    # return HttpResponse(programJson, content_type="application/json")
    # 26383


def getProgramInfo(request, id):
    cursor = connection.cursor()
    cursor.execute("select * from mediainfo where id = " + id)
    DESC = cursor.description
    program = [dict(zip([col[0] for col in DESC], ROW)) for ROW in cursor.fetchall()]
    cursor.close()
    programJson = json.dumps(program[0], ensure_ascii=False, cls=DateTimeEncoder)
    return HttpResponse(programJson, content_type="application/json")

