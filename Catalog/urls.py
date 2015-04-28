from django.conf.urls import patterns, include, url
from django.contrib import admin


urlpatterns = patterns(
    # Examples:
    # url(r'^$', 'Catalog.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    '',
    url(r'^quickcatalog/', include('QuickCatalog.urls')),
    url(r'^admin/', include(admin.site.urls)),

)
