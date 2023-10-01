# Generated by Django 4.2.5 on 2023-09-25 20:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('weddingplanner', '0002_wedding_useraccount_wedding'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChecklistItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.IntegerField(choices=[(1, 'Open'), (2, 'Completed')], default=1)),
                ('title', models.CharField(max_length=150)),
                ('priority', models.IntegerField(default=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='checklist_created_by', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='checklist_updated_by', to=settings.AUTH_USER_MODEL)),
                ('wedding', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='weddingplanner.wedding')),
            ],
        ),
    ]