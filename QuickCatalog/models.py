# Create your models here.
# coding:utf-8
import json
import decimal

from django.db import models
from django.db.models.base import ModelState


class ProgramInfo(models.Model):
    Name = "桐乡"
    ID = "123"
    Title = "通向新闻2-2-2-"


# 由于从数据库中读出的Datatime类型数据无法序列化，为json.dumps函数添加编码方法
class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if hasattr(obj, 'isoformat'):
            return obj.isoformat()
        elif isinstance(obj, decimal.Decimal):
            return float(obj)
        elif isinstance(obj, ModelState):
            return None
        else:
            return json.JSONEncoder.default(self, obj)
