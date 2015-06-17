__author__ = 'ho'

from django.conf.urls import patterns, url

from QuickCatalog import views


urlpatterns = patterns('',
                       url(r'^$', views.index, name='index'),
                       url(r'^(?P<id>\d+)/programinfo/$', views.getProgramInfo, name='getProgramInfo'),
                       url(r'^getPreCatalogList/$', views.getPreCatalogList, name='getPreCatalogList'),
                       url(r'^getPreCatalogDetail/$', views.getPreCatalogDetail, name='getPreCatalogDetail'),
                       url(r'^getPreCatalogFile/$', views.getPreCatalogFile, name='getPreCatalogFile'),
                       url(r'^saveProgramInfo/$', views.saveProgramInfo, name='saveProgramInfo'),
                       url(r'^deleteSectionInfo/$', views.deleteSectionInfo, name='deleteSectionInfo'),
                       url(r'^deleteSceneInfo/$', views.deleteSceneInfo, name='deleteSceneInfo'),
                       url(r'^deleteKeyframe/$', views.deleteKeyframe, name='deleteKeyframe'),
                       url(r'^uploadfile/$', views.uploadfile, name='uploadfile'),

                       )