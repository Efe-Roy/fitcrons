# Generated by Django 3.2.22 on 2023-12-12 07:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fitness', '0005_alter_exercise_member'),
    ]

    operations = [
        migrations.CreateModel(
            name='GymActivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('muscule_group', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.RenameField(
            model_name='exercise',
            old_name='elementD',
            new_name='element',
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='beginning',
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='data_rir',
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='data_sec',
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='member',
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='sector',
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='subSector',
        ),
        migrations.AddField(
            model_name='exercise',
            name='exercise',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='exercise',
            name='principle',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='exercise',
            name='rir',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='exercise',
            name='seg',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='exercise',
            name='weight',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='exercise',
            name='data_d',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='exercise',
            name='data_r',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='exercise',
            name='data_s',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.CreateModel(
            name='WeekDay',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('week_days', models.CharField(blank=True, max_length=255, null=True)),
                ('gym_activities', models.ManyToManyField(to='fitness.GymActivity')),
            ],
        ),
        migrations.AddField(
            model_name='gymactivity',
            name='nestedArray',
            field=models.ManyToManyField(to='fitness.Exercise'),
        ),
    ]
