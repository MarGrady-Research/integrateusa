from dataclasses import field
from django.db import models
from django.db.models import UniqueConstraint


class CountySeg(models.Model):
    year = models.IntegerField()
    grade = models.CharField(max_length=3)
    conum = models.IntegerField(primary_key=True)
    num_schools = models.IntegerField(blank=True, null=True)
    enr_prop_as = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_bl = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_hi = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_or = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_wh = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    seg_index_as = models.FloatField(blank=True, null=True)
    seg_index_bl = models.FloatField(blank=True, null=True)
    seg_index_hi = models.FloatField(blank=True, null=True)
    seg_index_or = models.FloatField(blank=True, null=True)
    seg_index_wh = models.FloatField(blank=True, null=True)
    seg_index_aw_bho = models.FloatField(blank=True, null=True)
    seg_index_tot = models.FloatField(blank=True, null=True)
    diversity_index = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)

    class Meta:
        db_table = 'county_seg'
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
        db_table = 'dist_names'

    def __str__(self):
        return self.dist_name," (", self.dist_id, ")"


class DistSeg(models.Model):
    year = models.IntegerField()
    grade = models.CharField(max_length=3)
    dist_id = models.IntegerField(primary_key=True)
    num_schools = models.IntegerField(blank=True, null=True)
    enr_prop_as = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_bl = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_hi = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_or = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_wh = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    seg_index_as = models.FloatField(blank=True, null=True)
    seg_index_bl = models.FloatField(blank=True, null=True)
    seg_index_hi = models.FloatField(blank=True, null=True)
    seg_index_or = models.FloatField(blank=True, null=True)
    seg_index_wh = models.FloatField(blank=True, null=True)
    seg_index_aw_bho = models.FloatField(blank=True, null=True)
    seg_index_tot = models.FloatField(blank=True, null=True)
    diversity_index = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)

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
    year = models.IntegerField(primary_key=True)
    grade = models.CharField(max_length=3)
    state_abb = models.CharField(max_length=2)
    num_schools = models.IntegerField(blank=True, null=True)
    enr_prop_as = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_bl = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_hi = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_or = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    enr_prop_wh = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    seg_index_as = models.FloatField(blank=True, null=True)
    seg_index_bl = models.FloatField(blank=True, null=True)
    seg_index_hi = models.FloatField(blank=True, null=True)
    seg_index_or = models.FloatField(blank=True, null=True)
    seg_index_wh = models.FloatField(blank=True, null=True)
    seg_index_aw_bho = models.FloatField(blank=True, null=True)
    seg_index_tot = models.FloatField(blank=True, null=True)
    diversity_index = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)

    class Meta:
        db_table = 'state_seg'
        constraints = [UniqueConstraint(fields=['year', 'grade', 'state_abb'], name = 'state_seg_unique')]

    def __str__(self):
        return self.year, self.state_abb, self.grade
