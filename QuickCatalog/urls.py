__author__ = 'ho'

from django.conf.urls import patterns, url

from QuickCatalog import views


urlpatterns = patterns('',
                       url(r'^$', views.index, name='index'),
                       url(r'^(?P<id>\d+)/programinfo/$', views.getProgramInfo, name='getProgramInfo'),
                       url(r'^getCatalogList/$', views.getCatalogList, name='getCatalogList'),
                       )