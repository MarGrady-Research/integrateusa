# Generated by Django 4.1.1 on 2022-09-13 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CountyNames',
            fields=[
                ('county_id', models.IntegerField(primary_key=True, serialize=False)),
                ('county_name', models.TextField()),
            ],
            options={
                'db_table': 'county_names',
            },
        ),
        migrations.CreateModel(
            name='CountySegSchools',
            fields=[
                ('county_key', models.TextField(primary_key=True, serialize=False)),
                ('year', models.IntegerField()),
                ('grade', models.CharField(max_length=2)),
                ('county_id', models.IntegerField()),
                ('county_name', models.TextField()),
                ('state_abb', models.CharField(max_length=2)),
                ('num_schools', models.IntegerField(blank=True, null=True)),
                ('enr_prop_as', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('enr_prop_bl', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('enr_prop_hi', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('enr_prop_or', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('enr_prop_wh', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('exp_as_as', models.FloatField(blank=True, null=True)),
                ('exp_non_as_as', models.FloatField(blank=True, null=True)),
                ('norm_exp_as', models.FloatField(blank=True, null=True)),
                ('exp_bl_bl', models.FloatField(blank=True, null=True)),
                ('exp_non_bl_bl', models.FloatField(blank=True, null=True)),
                ('norm_exp_bl', models.FloatField(blank=True, null=True)),
                ('exp_hi_hi', models.FloatField(blank=True, null=True)),
                ('exp_non_hi_hi', models.FloatField(blank=True, null=True)),
                ('norm_exp_hi', models.FloatField(blank=True, null=True)),
                ('exp_or_or', models.FloatField(blank=True, null=True)),
                ('exp_non_or_or', models.FloatField(blank=True, null=True)),
                ('norm_exp_or', models.FloatField(blank=True, null=True)),
                ('exp_wh_wh', models.FloatField(blank=True, null=True)),
                ('exp_non_wh_wh', models.FloatField(blank=True, null=True)),
                ('norm_exp_wh', models.FloatField(blank=True, null=True)),
                ('exp_aw_aw', models.FloatField(blank=True, null=True)),
                ('exp_non_aw_aw', models.FloatField(blank=True, null=True)),
                ('norm_exp_aw', models.FloatField(blank=True, null=True)),
                ('exp_bho_bho', models.FloatField(blank=True, null=True)),
                ('exp_non_bho_bho', models.FloatField(blank=True, null=True)),
                ('norm_exp_bho', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'county_seg_schools',
            },
        ),
        migrations.CreateModel(
            name='DistDirectory',
            fields=[
                ('year', models.IntegerField(primary_key=True, serialize=False)),
                ('dist_id', models.IntegerField()),
                ('cod_id', models.IntegerField(blank=True, null=True)),
                ('state_abb', models.CharField(blank=True, max_length=2, null=True)),
            ],
            options={
                'db_table': 'dist_directory',
            },
        ),
        migrations.CreateModel(
            name='DistNames',
            fields=[
                ('dist_id', models.IntegerField(primary_key=True, serialize=False)),
                ('dist_name', models.TextField()),
            ],
            options={
                'db_table': 'district_names',
            },
        ),
        migrations.CreateModel(
            name='DistSeg',
            fields=[
                ('dist_key', models.TextField(primary_key=True, serialize=False)),
                ('year', models.IntegerField()),
                ('grade', models.CharField(max_length=2)),
                ('dist_id', models.IntegerField()),
                ('dist_name', models.TextField()),
                ('num_schools', models.IntegerField(blank=True, null=True)),
                ('enr_prop_as', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('enr_prop_bl', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('enr_prop_hi', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('enr_prop_or', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('enr_prop_wh', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('exp_as_as', models.FloatField(blank=True, null=True)),
                ('exp_non_as_as', models.FloatField(blank=True, null=True)),
                ('norm_exp_as', models.FloatField(blank=True, null=True)),
                ('exp_bl_bl', models.FloatField(blank=True, null=True)),
                ('exp_non_bl_bl', models.FloatField(blank=True, null=True)),
                ('norm_exp_bl', models.FloatField(blank=True, null=True)),
                ('exp_hi_hi', models.FloatField(blank=True, null=True)),
                ('exp_non_hi_hi', models.FloatField(blank=True, null=True)),
                ('norm_exp_hi', models.FloatField(blank=True, null=True)),
                ('exp_or_or', models.FloatField(blank=True, null=True)),
                ('exp_non_or_or', models.FloatField(blank=True, null=True)),
                ('norm_exp_or', models.FloatField(blank=True, null=True)),
                ('exp_wh_wh', models.FloatField(blank=True, null=True)),
                ('exp_non_wh_wh', models.FloatField(blank=True, null=True)),
                ('norm_exp_wh', models.FloatField(blank=True, null=True)),
                ('exp_aw_aw', models.FloatField(blank=True, null=True)),
                ('exp_non_aw_aw', models.FloatField(blank=True, null=True)),
                ('norm_exp_aw', models.FloatField(blank=True, null=True)),
                ('exp_bho_bho', models.FloatField(blank=True, null=True)),
                ('exp_non_bho_bho', models.FloatField(blank=True, null=True)),
                ('norm_exp_bho', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'dist_seg',
            },
        ),
        migrations.CreateModel(
            name='Schools',
            fields=[
                ('school_key', models.TextField(primary_key=True, serialize=False)),
                ('year', models.IntegerField(db_index=True)),
                ('grade', models.CharField(db_index=True, max_length=2)),
                ('nces_id', models.BigIntegerField()),
                ('dist_id', models.IntegerField(db_index=True)),
                ('county_id', models.IntegerField(db_index=True)),
                ('state_abb', models.CharField(db_index=True, max_length=2)),
                ('asian', models.IntegerField(blank=True, null=True)),
                ('black', models.IntegerField(blank=True, null=True)),
                ('hispanic', models.IntegerField(blank=True, null=True)),
                ('other', models.IntegerField(blank=True, null=True)),
                ('white', models.IntegerField(blank=True, null=True)),
                ('tot_enr', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'schools',
            },
        ),
        migrations.CreateModel(
            name='StateNames',
            fields=[
                ('state_abb', models.CharField(max_length=2, primary_key=True, serialize=False)),
                ('fips', models.IntegerField(blank=True, null=True)),
                ('state_name', models.TextField()),
            ],
            options={
                'db_table': 'state_names',
            },
        ),
        migrations.CreateModel(
            name='StateSeg',
            fields=[
                ('state_key', models.TextField(primary_key=True, serialize=False)),
                ('year', models.IntegerField()),
                ('grade', models.CharField(max_length=2)),
                ('state_abb', models.CharField(max_length=2)),
                ('num_schools', models.IntegerField(blank=True, null=True)),
                ('enr_prop_as', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('enr_prop_bl', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('enr_prop_hi', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('enr_prop_or', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('enr_prop_wh', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('exp_as_as', models.FloatField(blank=True, null=True)),
                ('exp_non_as_as', models.FloatField(blank=True, null=True)),
                ('norm_exp_as', models.FloatField(blank=True, null=True)),
                ('exp_bl_bl', models.FloatField(blank=True, null=True)),
                ('exp_non_bl_bl', models.FloatField(blank=True, null=True)),
                ('norm_exp_bl', models.FloatField(blank=True, null=True)),
                ('exp_hi_hi', models.FloatField(blank=True, null=True)),
                ('exp_non_hi_hi', models.FloatField(blank=True, null=True)),
                ('norm_exp_hi', models.FloatField(blank=True, null=True)),
                ('exp_or_or', models.FloatField(blank=True, null=True)),
                ('exp_non_or_or', models.FloatField(blank=True, null=True)),
                ('norm_exp_or', models.FloatField(blank=True, null=True)),
                ('exp_wh_wh', models.FloatField(blank=True, null=True)),
                ('exp_non_wh_wh', models.FloatField(blank=True, null=True)),
                ('norm_exp_wh', models.FloatField(blank=True, null=True)),
                ('exp_aw_aw', models.FloatField(blank=True, null=True)),
                ('exp_non_aw_aw', models.FloatField(blank=True, null=True)),
                ('norm_exp_aw', models.FloatField(blank=True, null=True)),
                ('exp_bho_bho', models.FloatField(blank=True, null=True)),
                ('exp_non_bho_bho', models.FloatField(blank=True, null=True)),
                ('norm_exp_bho', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'state_seg',
            },
        ),
    ]
