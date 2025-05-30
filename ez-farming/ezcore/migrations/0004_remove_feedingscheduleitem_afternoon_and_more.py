# Generated by Django 5.2 on 2025-05-03 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ezcore', '0003_alter_user_managers_user_can_manage_animals_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feedingscheduleitem',
            name='afternoon',
        ),
        migrations.RemoveField(
            model_name='feedingscheduleitem',
            name='evening',
        ),
        migrations.RemoveField(
            model_name='feedingscheduleitem',
            name='morning',
        ),
        migrations.RemoveField(
            model_name='feedingscheduleitem',
            name='notes',
        ),
        migrations.AddField(
            model_name='feedingscheduleitem',
            name='time_of_day',
            field=models.CharField(choices=[('morning', 'Morning'), ('afternoon', 'Afternoon'), ('evening', 'Evening'), ('other', 'Other')], default='morning', max_length=20, verbose_name='time of day'),
        ),
    ]
