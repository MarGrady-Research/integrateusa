from dataclasses import field
from django.db import models
from django.db.models import UniqueConstraint


class Schools(models.Model):
    school_key = models.CharField(max_length=18)
    year = models.CharField(max_length=4)
    grade = models.CharField(max_length=2)
    nces_id = models.CharField(max_length=12)
    dist_id = models.CharField(max_length=7)
    county_id = models.CharField(max_length=6, null=True, blank=True)
    state_abb = models.CharField(max_length=2)
    asian = models.IntegerField(blank=True, null=True)
    black = models.IntegerField(blank=True, null=True)
    hispanic = models.IntegerField(blank=True, null=True)
    other = models.IntegerField(blank=True, null=True)
    white = models.IntegerField(blank=True, null=True)
    tot_enr = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'schools'

class CountyNames(models.Model):
    county_id = models.CharField(max_length=6, primary_key=True)
    county_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'county_names'


class CountySegSchools(models.Model):
    county_key = models.CharField(max_length=13, primary_key=True)
    year = models.IntegerField()
    grade = models.CharField(max_length=3)
    county_id = models.IntegerField()
    county_name = models.CharField(max_length=255)
    num_schools = models.IntegerField(blank=True, null=True)
    enr_prop_as = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_bl = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_hi = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_or = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_wh = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    exp_as_as = models.FloatField(blank=True, null=True)
    exp_non_as_as = models.FloatField(blank=True, null=True)
    norm_exp_as = models.FloatField(blank=True, null=True)
    exp_bl_bl = models.FloatField(blank=True, null=True)
    exp_non_bl_bl = models.FloatField(blank=True, null=True)
    norm_exp_bl = models.FloatField(blank=True, null=True)
    exp_hi_hi = models.FloatField(blank=True, null=True)
    exp_non_hi_hi = models.FloatField(blank=True, null=True)
    norm_exp_hi = models.FloatField(blank=True, null=True)
    exp_or_or = models.FloatField(blank=True, null=True)
    exp_non_or_or = models.FloatField(blank=True, null=True)
    norm_exp_or = models.FloatField(blank=True, null=True)
    exp_wh_wh = models.FloatField(blank=True, null=True)
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
        constraints = [UniqueConstraint(fields=['conum', 'grade', 'year'], name='county_seg_unique')]

    def __str__(self):
        return self.year, self.conum, self.grade


class DistDirectory(models.Model):
    year = models.IntegerField(primary_key=True)
    dist_id = models.IntegerField()
    cod_id = models.IntegerField(blank=True, null=True)
    state_abb = models.CharField(max_length=2, blank=True, null=True)

    class Meta:
        db_table = 'dist_directory'
        constraints = [UniqueConstraint(fields=['year', 'dist_id'], name = 'dist_directory_unique')]

    def __str__(self):
        return self.dist_id, " (", self.year, ")"


class DistNames(models.Model):
    dist_id = models.IntegerField(primary_key=True)
    dist_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'district_names'

    def __str__(self):
        return self.dist_name," (", self.dist_id, ")"


class DistSeg(models.Model):
    dist_key = models.CharField(max_length=14, primary_key=True)
    year = models.CharField(max_length=4)
    grade = models.CharField(max_length=2)
    dist_id = models.IntegerField()
    dist_name = models.CharField(max_length=255)
    num_schools = models.IntegerField(blank=True, null=True)
    enr_prop_as = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_bl = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_hi = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_or = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_wh = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    exp_as_as = models.FloatField(blank=True, null=True)
    exp_non_as_as = models.FloatField(blank=True, null=True)
    norm_exp_as = models.FloatField(blank=True, null=True)
    exp_bl_bl = models.FloatField(blank=True, null=True)
    exp_non_bl_bl = models.FloatField(blank=True, null=True)
    norm_exp_bl = models.FloatField(blank=True, null=True)
    exp_hi_hi = models.FloatField(blank=True, null=True)
    exp_non_hi_hi = models.FloatField(blank=True, null=True)
    norm_exp_hi = models.FloatField(blank=True, null=True)
    exp_or_or = models.FloatField(blank=True, null=True)
    exp_non_or_or = models.FloatField(blank=True, null=True)
    norm_exp_or = models.FloatField(blank=True, null=True)
    exp_wh_wh = models.FloatField(blank=True, null=True)
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
        constraints = [UniqueConstraint(fields=['dist_id', 'grade', 'year'], name='dist_seg_unique')]

    def __str__(self):
        return self.year, self.dist_id, self.grade


class StateNames(models.Model):
    state_abb = models.CharField(max_length=2, blank=True, null=False, primary_key=True)
    fips = models.IntegerField(blank=True, null=True)
    state_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'state_names'

    def __str__(self):
        self.state_abb


class StateSeg(models.Model):
    state_key = models.CharField(max_length=9, primary_key=True)
    year = models.CharField(max_length=4)
    grade = models.CharField(max_length=3)
    state_abb = models.CharField(max_length=2)
    num_schools = models.IntegerField(blank=True, null=True)
    enr_prop_as = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_bl = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_hi = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_or = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_wh = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    exp_as_as = models.FloatField(blank=True, null=True)
    exp_non_as_as = models.FloatField(blank=True, null=True)
    norm_exp_as = models.FloatField(blank=True, null=True)
    exp_bl_bl = models.FloatField(blank=True, null=True)
    exp_non_bl_bl = models.FloatField(blank=True, null=True)
    norm_exp_bl = models.FloatField(blank=True, null=True)
    exp_hi_hi = models.FloatField(blank=True, null=True)
    exp_non_hi_hi = models.FloatField(blank=True, null=True)
    norm_exp_hi = models.FloatField(blank=True, null=True)
    exp_or_or = models.FloatField(blank=True, null=True)
    exp_non_or_or = models.FloatField(blank=True, null=True)
    norm_exp_or = models.FloatField(blank=True, null=True)
    exp_wh_wh = models.FloatField(blank=True, null=True)
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
        constraints = [UniqueConstraint(fields=['year', 'grade', 'state_abb'], name = 'state_seg_unique')]

    def __str__(self):
        return self.year, self.state_abb, self.grade
