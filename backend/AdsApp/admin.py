from django.contrib import admin
from .models import *
from django.utils.html import format_html

class SubcategoryInline(admin.TabularInline):
    model = Subcategory
    extra = 1  # The number of empty forms to show by default in the inline section.

class StateInline(admin.TabularInline):
    model = State
    extra = 1  # The number of empty forms to show by default in the inline section.

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')  # Columns to display in the list view
    search_fields = ['name']  # Search fields in the admin panel
    list_filter = ('created_at', 'updated_at')  # Filters on the right sidebar
    inlines = [SubcategoryInline]  # This will allow adding subcategories directly from the category admin page

class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'created_at', 'updated_at')  # Columns to display in the list view
    search_fields = ['name', 'category__name']  # Search fields
    list_filter = ('category', 'created_at', 'updated_at')  # Filters

class CountryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')  # Columns to display in the list view
    search_fields = ['name']  # Search fields in the admin panel
    list_filter = ('created_at', 'updated_at')  # Filters on the right sidebar
    inlines = [StateInline]  # This will allow adding subcategories directly from the category admin page

class StateAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'created_at', 'updated_at')  # Columns to display in the list view
    search_fields = ['name', 'country__name']  # Search fields
    list_filter = ('country', 'created_at', 'updated_at')  # Filters


# Inline admin to display images related to Ads
class AdsImagesInline(admin.TabularInline):
    model = AdsImages
    extra = 1  # Number of empty forms to show for adding images
    fields = ('image',)

# Admin interface for Ads model
class AdsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'category', 'subcategory', 'Country', 'State', 'duration', 'caption', 'cost', 'is_featured')
    list_filter = ('category', 'Country', 'State', 'is_featured')  # Filters on the right sidebar
    search_fields = ('caption', 'details', 'contact_details')  # Searchable fields
    ordering = ('-duration',)  # Default ordering by duration (most recent first)
    list_per_page = 25  # Number of items per page
    inlines = [AdsImagesInline]  # Display AdsImages as inline in the Ads model

    # Add custom method to display the image in the list display (optional)
    def image_tag(self, obj):
        if obj.ads_images.exists():
            return format_html('<img src="{}" width="100" height="100"/>', obj.ads_images.first().image.url)
        return '-'

    image_tag.short_description = 'Image Preview'

# Admin interface for AdsImages model
class AdsImagesAdmin(admin.ModelAdmin):
    list_display = ('id', 'Ad', 'image')  # Display Ad ID and the image field
    search_fields = ('Ad__caption',)  # Allow search by Ad caption
    list_filter = ('Ad__category',)  # Filter by Ad category

# Register the models and their respective admin classes
admin.site.register(Ads, AdsAdmin)
admin.site.register(AdsImages, AdsImagesAdmin)


# Register the models with the admin site
admin.site.register(Category, CategoryAdmin)
admin.site.register(Subcategory, SubcategoryAdmin)
admin.site.register(Country, CountryAdmin)
admin.site.register(State, StateAdmin)


