from dataclasses import field
from django.db import models
from django.db.models import UniqueConstraint
from django.contrib.postgres.search import SearchVector, SearchVectorField
from django.contrib.postgres.indexes import GinIndex


# School Models

class SchoolInfo(models.Model):
    nces_id = models.TextField(primary_key=True)
    sch_name = models.TextField()
    dist_name = models.TextField()
    state_abb = models.TextField()
    year_open = models.IntegerField()
    year_close = models.IntegerField()

    class Meta:
        db_table = 'school_info'
        indexes = [
            models.Index(fields=['nces_id'], name='school_info_idx')
        ]

class SchoolTrends(models.Model):
    school_key = models.TextField(primary_key=True)
    nces_id = models.TextField()
    dist_id = models.TextField()
    county_id = models.TextField()
    cod_id = models.TextField()
    state_abb = models.TextField()
    year = models.IntegerField()
    grade = models.TextField()
    sch_name = models.TextField()
    level = models.TextField()
    asian = models.IntegerField()
    black = models.IntegerField()
    hispanic = models.IntegerField()
    other = models.IntegerField()
    white = models.IntegerField()
    tot_enr = models.IntegerField()

    class Meta: 
        db_table = 'school_trends'
        indexes = [
            models.Index(fields=['year'], name ='year_sch_trends_idx'),
            models.Index(fields=['grade'], name='grade_sch_trends_idx'),
            models.Index(fields=['dist_id'], name='dist_sch_trends_idx'),
            models.Index(fields=['county_id'], name='county_sch_trends_idx'),
            models.Index(fields=['state_abb'], name='state_sch_trends_idx'),
            models.Index(fields=['nces_id'], name='school_sch_trends_idx')
        ]

# Name Models

class CountyNames(models.Model):
    county_id = models.TextField(primary_key=True)
    county_name = models.TextField()
    lngmin = models.FloatField()
    latmin = models.FloatField()
    lngmax = models.FloatField()
    latmax = models.FloatField()

    class Meta:
        db_table = 'county_names'

class DistNames(models.Model):
    dist_id = models.TextField(primary_key=True)
    dist_name = models.TextField()
    dist_type = models.TextField()
    lngmin = models.FloatField()
    latmin = models.FloatField()
    lngmax = models.FloatField()
    latmax = models.FloatField()

    class Meta:
        db_table = 'district_names'

    def __str__(self):
        return self.dist_name," (", self.dist_id, ")"

class DistNamesAlt(models.Model):
    dist_id = models.TextField(primary_key=True)
    dist_name = models.TextField()
    lngmin = models.FloatField()
    latmin = models.FloatField()
    lngmax = models.FloatField()
    latmax = models.FloatField()

    class Meta:
        db_table = 'district_names_alt'

    def __str__(self):
        return self.dist_name," (", self.dist_id, ")"

class SchoolNames(models.Model):
    nces_id  = models.TextField(primary_key=True)
    sch_name  = models.TextField()
    dist_id  = models.TextField()
    dist_name  = models.TextField()
    state_abb  = models.TextField()
    lngmin = models.FloatField()
    latmin = models.FloatField()
    lngmax = models.FloatField()
    latmax = models.FloatField()
    lat_new = models.FloatField()
    lon_new = models.FloatField()

    class Meta:
        db_table = 'school_names'


class StateNames(models.Model):
    state_abb = models.CharField(max_length = 2, primary_key=True)
    fips = models.IntegerField(blank=True, null=True)
    state_name = models.TextField()
    lngmin = models.FloatField()
    latmin = models.FloatField()
    lngmax = models.FloatField()
    latmax = models.FloatField()

    class Meta:
        db_table = 'state_names'

    def __str__(self):
        self.state_abb


# Trend Models

class DistrictTrends(models.Model):
    dist_key = models.TextField(primary_key=True)
    dist_id = models.TextField()
    year = models.IntegerField()
    grade = models.TextField()
    asian = models.IntegerField()
    black = models.IntegerField()
    hispanic = models.IntegerField()
    other = models.IntegerField()
    white = models.IntegerField()

    class Meta:
        db_table = 'dist_trends'
        indexes = [
            models.Index(fields=['dist_id'], name='dist_trends_idx'),
        ]

class DistrictTrendsAlt(models.Model):
    dist_key = models.TextField(primary_key=True)
    year = models.IntegerField()
    grade = models.TextField()
    dist_id = models.TextField()
    dist_name = models.TextField()
    asian = models.IntegerField()
    black = models.IntegerField()
    hispanic = models.IntegerField()
    other = models.IntegerField()
    white = models.IntegerField()

    class Meta:
        db_table = 'dist_trends_alt'

class CountyTrends(models.Model):
    county_key = models.TextField(primary_key=True)
    county_id = models.TextField()
    year = models.IntegerField()
    grade = models.TextField()
    county_name = models.TextField()
    asian = models.IntegerField()
    black = models.IntegerField()
    hispanic = models.IntegerField()
    other = models.IntegerField()
    white = models.IntegerField()

    class Meta:
        db_table = 'county_trends'
        indexes = [
            models.Index(fields=['county_id'], name='county_trends_idx'),
        ]


class StateTrends(models.Model):
    state_key = models.TextField(primary_key=True)
    state_abb = models.CharField(max_length=2)
    year = models.IntegerField()
    grade = models.TextField()
    asian = models.IntegerField()
    black = models.IntegerField()
    hispanic = models.IntegerField()
    other = models.IntegerField()
    white = models.IntegerField()

    class Meta:
        db_table = 'state_trends'
        indexes = [
            models.Index(fields=['state_abb'], name='state_trends_idx'),
        ]


# Segregation Models

class CountySegSchools(models.Model):
    county_key = models.TextField(primary_key=True)
    year = models.IntegerField()
    grade = models.CharField(max_length=2)
    county_id = models.TextField()
    county_name = models.TextField()
    state_abb = models.CharField(max_length=2)
    num_schools = models.IntegerField(blank=True, null=True)
    enr_prop_as = models.FloatField(blank=True, null=True)
    enr_prop_bl = models.FloatField(blank=True, null=True)
    enr_prop_hi = models.FloatField(blank=True, null=True)
    enr_prop_or = models.FloatField(blank=True, null=True)
    enr_prop_wh = models.FloatField(blank=True, null=True)
    exp_as_as = models.FloatField(blank=True, null=True)
    exp_as_bl = models.FloatField(blank=True, null=True)
    exp_as_hi = models.FloatField(blank=True, null=True)
    exp_as_or = models.FloatField(blank=True, null=True)
    exp_as_wh = models.FloatField(blank=True, null=True)
    exp_non_as_as = models.FloatField(blank=True, null=True)
    norm_exp_as = models.FloatField(blank=True, null=True)
    exp_bl_bl = models.FloatField(blank=True, null=True)
    exp_bl_as = models.FloatField(blank=True, null=True)
    exp_bl_hi = models.FloatField(blank=True, null=True)
    exp_bl_or = models.FloatField(blank=True, null=True)
    exp_bl_wh = models.FloatField(blank=True, null=True)
    exp_non_bl_bl = models.FloatField(blank=True, null=True)
    norm_exp_bl = models.FloatField(blank=True, null=True)
    exp_hi_hi = models.FloatField(blank=True, null=True)
    exp_hi_as = models.FloatField(blank=True, null=True)
    exp_hi_bl = models.FloatField(blank=True, null=True)
    exp_hi_or = models.FloatField(blank=True, null=True)
    exp_hi_wh = models.FloatField(blank=True, null=True)
    exp_non_hi_hi = models.FloatField(blank=True, null=True)
    norm_exp_hi = models.FloatField(blank=True, null=True)
    exp_or_or = models.FloatField(blank=True, null=True)
    exp_or_as = models.FloatField(blank=True, null=True)
    exp_or_bl = models.FloatField(blank=True, null=True)
    exp_or_hi = models.FloatField(blank=True, null=True)
    exp_or_wh = models.FloatField(blank=True, null=True)
    exp_non_or_or = models.FloatField(blank=True, null=True)
    norm_exp_or = models.FloatField(blank=True, null=True)
    exp_wh_wh = models.FloatField(blank=True, null=True)
    exp_wh_as = models.FloatField(blank=True, null=True)
    exp_wh_bl = models.FloatField(blank=True, null=True)
    exp_wh_hi = models.FloatField(blank=True, null=True)
    exp_wh_or = models.FloatField(blank=True, null=True)
    exp_non_wh_wh = models.FloatField(blank=True, null=True)
    norm_exp_wh = models.FloatField(blank=True, null=True)
    exp_aw_aw = models.FloatField(blank=True, null=True)
    exp_non_aw_aw = models.FloatField(blank=True, null=True)
    norm_exp_aw = models.FloatField(blank=True, null=True)
    exp_bho_bho = models.FloatField(blank=True, null=True)
    exp_non_bho_bho = models.FloatField(blank=True, null=True)
    norm_exp_bho = models.FloatField(blank=True, null=True)

    class Meta:
        db_table = 'county_seg_schools'
        indexes = [
            models.Index(fields=['year'], name ='year_county_seg_idx'),
            models.Index(fields=['grade'], name='grade_county_seg_idx'),
            models.Index(fields=['county_id'], name='county_id_county_seg_idx'),
        ]

    def __str__(self):
        return self.year, self.county_id, self.grade


class DistDirectory(models.Model):
    year = models.IntegerField(primary_key=True)
    dist_id = models.IntegerField()
    cod_id = models.IntegerField(blank=True, null=True)
    state_abb = models.CharField(max_length=2, blank=True, null=True)

    class Meta:
        db_table = 'dist_directory'

    def __str__(self):
        return self.dist_id, " (", self.year, ")"


class DistSeg(models.Model):
    dist_key = models.TextField(primary_key=True)
    year = models.IntegerField()
    grade = models.CharField(max_length=2)
    dist_id = models.TextField()
    dist_name = models.TextField()
    num_schools = models.IntegerField(blank=True, null=True)
    enr_prop_as = models.FloatField(blank=True, null=True)
    enr_prop_bl = models.FloatField(blank=True, null=True)
    enr_prop_hi = models.FloatField(blank=True, null=True)
    enr_prop_or = models.FloatField(blank=True, null=True)
    enr_prop_wh = models.FloatField(blank=True, null=True)
    exp_as_as = models.FloatField(blank=True, null=True)
    exp_as_bl = models.FloatField(blank=True, null=True)
    exp_as_hi = models.FloatField(blank=True, null=True)
    exp_as_or = models.FloatField(blank=True, null=True)
    exp_as_wh = models.FloatField(blank=True, null=True)
    exp_non_as_as = models.FloatField(blank=True, null=True)
    norm_exp_as = models.FloatField(blank=True, null=True)
    exp_bl_bl = models.FloatField(blank=True, null=True)
    exp_bl_as = models.FloatField(blank=True, null=True)
    exp_bl_hi = models.FloatField(blank=True, null=True)
    exp_bl_or = models.FloatField(blank=True, null=True)
    exp_bl_wh = models.FloatField(blank=True, null=True)
    exp_non_bl_bl = models.FloatField(blank=True, null=True)
    norm_exp_bl = models.FloatField(blank=True, null=True)
    exp_hi_hi = models.FloatField(blank=True, null=True)
    exp_hi_as = models.FloatField(blank=True, null=True)
    exp_hi_bl = models.FloatField(blank=True, null=True)
    exp_hi_or = models.FloatField(blank=True, null=True)
    exp_hi_wh = models.FloatField(blank=True, null=True)
    exp_non_hi_hi = models.FloatField(blank=True, null=True)
    norm_exp_hi = models.FloatField(blank=True, null=True)
    exp_or_or = models.FloatField(blank=True, null=True)
    exp_or_as = models.FloatField(blank=True, null=True)
    exp_or_bl = models.FloatField(blank=True, null=True)
    exp_or_hi = models.FloatField(blank=True, null=True)
    exp_or_wh = models.FloatField(blank=True, null=True)
    exp_non_or_or = models.FloatField(blank=True, null=True)
    norm_exp_or = models.FloatField(blank=True, null=True)
    exp_wh_wh = models.FloatField(blank=True, null=True)
    exp_wh_as = models.FloatField(blank=True, null=True)
    exp_wh_bl = models.FloatField(blank=True, null=True)
    exp_wh_hi = models.FloatField(blank=True, null=True)
    exp_wh_or = models.FloatField(blank=True, null=True)
    exp_non_wh_wh = models.FloatField(blank=True, null=True)
    norm_exp_wh = models.FloatField(blank=True, null=True)
    exp_aw_aw = models.FloatField(blank=True, null=True)
    exp_non_aw_aw = models.FloatField(blank=True, null=True)
    norm_exp_aw = models.FloatField(blank=True, null=True)
    exp_bho_bho = models.FloatField(blank=True, null=True)
    exp_non_bho_bho = models.FloatField(blank=True, null=True)
    norm_exp_bho = models.FloatField(blank=True, null=True)

    class Meta:
        db_table = 'dist_seg'
        indexes = [
            models.Index(fields=['year'], name ='year_dist_seg_idx'),
            models.Index(fields=['grade'], name='grade_dist_seg_idx'),
            models.Index(fields=['dist_id'], name='dist_id_dist_seg_idx'),
        ]

    def __str__(self):
        return self.year, self.dist_id, self.grade


class StateSeg(models.Model):
    state_key = models.TextField(primary_key=True)
    year = models.IntegerField()
    grade = models.CharField(max_length = 2)
    state_abb = models.CharField(max_length=2)
    state_name = models.TextField()
    num_schools = models.IntegerField(blank=True, null=True)
    enr_prop_as = models.FloatField(blank=True, null=True)
    enr_prop_bl = models.FloatField(blank=True, null=True)
    enr_prop_hi = models.FloatField(blank=True, null=True)
    enr_prop_or = models.FloatField(blank=True, null=True)
    enr_prop_wh = models.FloatField(blank=True, null=True)
    exp_as_as = models.FloatField(blank=True, null=True)
    exp_as_bl = models.FloatField(blank=True, null=True)
    exp_as_hi = models.FloatField(blank=True, null=True)
    exp_as_or = models.FloatField(blank=True, null=True)
    exp_as_wh = models.FloatField(blank=True, null=True)
    exp_non_as_as = models.FloatField(blank=True, null=True)
    norm_exp_as = models.FloatField(blank=True, null=True)
    exp_bl_bl = models.FloatField(blank=True, null=True)
    exp_bl_as = models.FloatField(blank=True, null=True)
    exp_bl_hi = models.FloatField(blank=True, null=True)
    exp_bl_or = models.FloatField(blank=True, null=True)
    exp_bl_wh = models.FloatField(blank=True, null=True)
    exp_non_bl_bl = models.FloatField(blank=True, null=True)
    norm_exp_bl = models.FloatField(blank=True, null=True)
    exp_hi_hi = models.FloatField(blank=True, null=True)
    exp_hi_as = models.FloatField(blank=True, null=True)
    exp_hi_bl = models.FloatField(blank=True, null=True)
    exp_hi_or = models.FloatField(blank=True, null=True)
    exp_hi_wh = models.FloatField(blank=True, null=True)
    exp_non_hi_hi = models.FloatField(blank=True, null=True)
    norm_exp_hi = models.FloatField(blank=True, null=True)
    exp_or_or = models.FloatField(blank=True, null=True)
    exp_or_as = models.FloatField(blank=True, null=True)
    exp_or_bl = models.FloatField(blank=True, null=True)
    exp_or_hi = models.FloatField(blank=True, null=True)
    exp_or_wh = models.FloatField(blank=True, null=True)
    exp_non_or_or = models.FloatField(blank=True, null=True)
    norm_exp_or = models.FloatField(blank=True, null=True)
    exp_wh_wh = models.FloatField(blank=True, null=True)
    exp_wh_as = models.FloatField(blank=True, null=True)
    exp_wh_bl = models.FloatField(blank=True, null=True)
    exp_wh_hi = models.FloatField(blank=True, null=True)
    exp_wh_or = models.FloatField(blank=True, null=True)
    exp_non_wh_wh = models.FloatField(blank=True, null=True)
    norm_exp_wh = models.FloatField(blank=True, null=True)
    exp_aw_aw = models.FloatField(blank=True, null=True)
    exp_non_aw_aw = models.FloatField(blank=True, null=True)
    norm_exp_aw = models.FloatField(blank=True, null=True)
    exp_bho_bho = models.FloatField(blank=True, null=True)
    exp_non_bho_bho = models.FloatField(blank=True, null=True)
    norm_exp_bho = models.FloatField(blank=True, null=True)

    class Meta:
        db_table = 'state_seg'
        indexes = [
            models.Index(fields=['year'], name ='year_state_seg_idx'),
            models.Index(fields=['grade'], name='grade_state_seg_idx'),
            models.Index(fields=['state_abb'], name='state_abb_state_seg_idx'),
        ]

    def __str__(self):
        return self.year, self.state_abb, self.grade



# Geographic Data

class MapSchools(models.Model):
    nces_id = models.TextField(primary_key = True)
    dist_id = models.TextField()
    county_id = models.TextField()
    state_abb = models.TextField()
    sch_name = models.TextField()
    dist_name = models.TextField()
    county_name = models.TextField()
    lon_new = models.FloatField()
    lat_new = models.FloatField()
    xminimum = models.FloatField()
    yminimum = models.FloatField()
    xmaximum = models.FloatField()
    ymaximum = models.FloatField()
    asian = models.IntegerField()
    black = models.IntegerField()
    hispanic = models.IntegerField()
    other = models.IntegerField()
    white = models.IntegerField()
    charter = models.IntegerField()

    class Meta:
        db_table = 'map' 
