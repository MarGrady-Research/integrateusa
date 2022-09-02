from dataclasses import field
from django.db import models
from django.db.models import UniqueConstraint


class Schools(models.Model):
    school_key = models.TextField(primary_key=True)
    year = models.TextField()
    grade = models.TextField()
    nces_id = models.TextField()
    dist_id = models.TextField()
    county_id = models.TextField()
    state_abb = models.TextField()
    asian = models.IntegerField(blank=True, null=True)
    black = models.IntegerField(blank=True, null=True)
    hispanic = models.IntegerField(blank=True, null=True)
    other = models.IntegerField(blank=True, null=True)
    white = models.IntegerField(blank=True, null=True)
    tot_enr = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'schools'

class CountyNames(models.Model):
    county_id = models.TextField(primary_key=True)
    county_name = models.TextField()

    class Meta:
        db_table = 'county_names'


class CountySegSchools(models.Model):
    county_key = models.TextField(primary_key=True)
    year = models.TextField()
    grade = models.TextField()
    county_id = models.TextField()
    county_name = models.TextField()
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
    dist_id = models.TextField(primary_key=True)
    dist_name = models.TextField()

    class Meta:
        db_table = 'district_names'

    def __str__(self):
        return self.dist_name," (", self.dist_id, ")"


class DistSeg(models.Model):
    dist_key = models.TextField(primary_key=True)
    year = models.TextField()
    grade = models.TextField()
    dist_id = models.TextField()
    dist_name = models.TextField()
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
    state_abb = models.TextField(primary_key=True)
    fips = models.IntegerField(blank=True, null=True)
    state_name = models.TextField()

    class Meta:
        db_table = 'state_names'

    def __str__(self):
        self.state_abb


class StateSeg(models.Model):
    state_key = models.TextField(primary_key=True)
    year = models.TextField()
    grade = models.TextField()
    state_abb = models.TextField()
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
