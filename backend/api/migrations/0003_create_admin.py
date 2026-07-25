from django.db import migrations

def create_superuser(apps, schema_editor):
    from django.contrib.auth import get_user_model
    User = get_user_model()
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'uiccrafted.design@gmail.com', 'admin123')

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0002_portfoliovisitor'),
    ]

    operations = [
        migrations.RunPython(create_superuser),
    ]
