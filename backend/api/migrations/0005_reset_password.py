from django.db import migrations

def reset_password(apps, schema_editor):
    from django.contrib.auth import get_user_model
    User = get_user_model()
    
    # Create or update uicrafted.design
    u1, _ = User.objects.get_or_create(username='uicrafted.design', defaults={'email': 'uiccrafted.design@gmail.com'})
    u1.set_password('uicrafted123')
    u1.is_staff = True
    u1.is_superuser = True
    u1.is_active = True
    u1.save()

    # Create or update uiccrafted.design
    u2, _ = User.objects.get_or_create(username='uiccrafted.design', defaults={'email': 'uiccrafted.design@gmail.com'})
    u2.set_password('uiccrafted123')
    u2.is_staff = True
    u2.is_superuser = True
    u2.is_active = True
    u2.save()

    # Also keep admin user active with uicrafted123
    u3, _ = User.objects.get_or_create(username='admin', defaults={'email': 'admin@uiccrafted.design'})
    u3.set_password('uicrafted123')
    u3.is_staff = True
    u3.is_superuser = True
    u3.is_active = True
    u3.save()

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0004_update_credentials'),
    ]

    operations = [
        migrations.RunPython(reset_password),
    ]
