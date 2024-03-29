# Generated by Django 5.0.1 on 2024-01-14 17:38

import tinymce.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('subtitle', models.CharField(max_length=255)),
                ('content', tinymce.models.HTMLField(default='')),
                ('image', models.ImageField(default='images/blog/doc.png', max_length=255, upload_to='images/blog')),
            ],
            options={
                'verbose_name_plural': 'Blog',
                'ordering': ['title'],
            },
        ),
    ]
