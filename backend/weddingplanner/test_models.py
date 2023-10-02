from django.test import TestCase

from .models import ChecklistItem, UserAccount, Wedding

class WeddingTestCase(TestCase):
    def setUp(self):
        UserAccount.objects.create_user(
            email='test@test.com',
            first_name='Jane',
            last_name='Doe',
            password='a1b2c3d4'
        )

    def test_create_wedding(self):
        user = UserAccount.objects.get(email='test@test.com')
        wedding = Wedding.create_wedding(user=user)
        self.assertEquals(user.wedding.id, wedding.id, 'Failed asserting wedding/user relationship established')
        checklist_items = wedding.checklist_items.all()
        self.assertEquals(checklist_items.count(), 9, 'Failed asserting all default checklist items were created')

class ChecklistItemTestCase(TestCase):
    def setUp(self):
        user = UserAccount.objects.create_user(
            email='test@test.com',
            first_name='Jane',
            last_name='Doe',
            password='a1b2c3d4'
        )
        wedding = Wedding.create_wedding(user=user)
        ChecklistItem.objects.create(
            title='New checklist item',
            wedding=wedding,
            created_by=user,
        )
    def test_complete_checklist_item(self):
        user = UserAccount.objects.get(email='test@test.com')
        checklist_item = ChecklistItem.objects.get(title='New checklist item')
        checklist_item.complete(updated_by=user)
        self.assertEquals(checklist_item.status, ChecklistItem.ChecklistStatus.COMPLETED, 'Failed asserting the status has changed to completed')
        self.assertEquals(checklist_item.updated_by, user, 'Failed asserting updated by set as user')
