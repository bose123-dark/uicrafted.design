from django.db import migrations

def update_credentials(apps, schema_editor):
    from django.contrib.auth import get_user_model
    User = get_user_model()
    User.objects.filter(username='admin').delete()
    user, created = User.objects.get_or_create(
        username='uicrafted.design',
        defaults={'email': 'uiccrafted.design@gmail.com', 'is_staff': True, 'is_superuser': True}
    )
    user.set_password('uiccrafted123')
    user.is_staff = True
    user.is_superuser = True
    user.save()

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0003_create_admin'),
    ]

    operations = [
        migrations.RunPython(update_credentials),
    ]
