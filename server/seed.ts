import {db} from './db';

const hasRows = (table: string) => {
  const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${table}`);
  const result = stmt.get() as {count: number};
  return result.count > 0;
};

export function seedDb() {
  if (hasRows('users')) {
    return;
  }

  const users = db.prepare(`
    INSERT INTO users (full_name, email, role, department, phone)
    VALUES (@full_name, @email, @role, @department, @phone)
  `);

  const userRows = [
    {full_name: 'أحمد محمود', email: 'admin@workdesk.local', role: 'مدير النظام', department: 'IT', phone: '01000000001'},
    {full_name: 'سارة علي', email: 'sara@workdesk.local', role: 'فني دعم', department: 'HelpDesk', phone: '01000000002'},
    {full_name: 'محمد خالد', email: 'mohamed@workdesk.local', role: 'موظف', department: 'Finance', phone: '01000000003'}
  ];
  userRows.forEach((row) => users.run(row));

  db.exec(`
    INSERT INTO devices (name, type, model, serial_number, assigned_user_id, status, received_date, notes)
    VALUES
      ('Dell Latitude 7440', 'Laptop', '7440', 'SN-DL-7440-001', 1, 'قيد الاستخدام', '2026-01-10', 'جهاز الإدارة'),
      ('HP ProDesk 600', 'Desktop', 'G5', 'SN-HP-600-889', 2, 'تحت الصيانة', '2025-12-22', 'مشكلة في مزود الطاقة'),
      ('Cisco Switch 2960', 'Network', '2960X', 'SN-CS-2960-101', NULL, 'جاهز', '2025-11-01', '24 منفذ');

    INSERT INTO tasks (title, description, status, priority, start_date, due_date, assignee_id)
    VALUES
      ('مراجعة النسخ الاحتياطي الأسبوعي', 'التحقق من نجاح نسخ السيرفرات', 'قيد التنفيذ', 'عالية', '2026-04-09', '2026-04-11', 2),
      ('تحديث مضاد الفيروسات', 'تحديث تعريفات جميع الأجهزة', 'جديد', 'متوسطة', '2026-04-10', '2026-04-13', 1),
      ('تجهيز جهاز موظف جديد', 'إعداد حسابات وبرامج أساسية', 'مكتمل', 'منخفضة', '2026-04-04', '2026-04-06', 2);

    INSERT INTO tickets (ticket_number, issue_type, description, status, priority, requester_id, opened_at, closed_at)
    VALUES
      ('TCK-2026-001', 'شبكة', 'انقطاع الشبكة في قسم المالية', 'مفتوحة', 'حرجة', 3, '2026-04-10 08:40', NULL),
      ('TCK-2026-002', 'هاردوير', 'الجهاز لا يعمل بعد انقطاع الكهرباء', 'قيد المعالجة', 'عالية', 2, '2026-04-09 13:15', NULL),
      ('TCK-2026-003', 'برمجيات', 'بطء في Outlook', 'مغلقة', 'متوسطة', 1, '2026-04-07 10:20', '2026-04-07 12:30');

    INSERT INTO maintenance (device_id, maintenance_type, maintenance_date, technician_id, status, notes)
    VALUES
      (2, 'صيانة وقائية', '2026-04-12', 2, 'مجدولة', 'تنظيف داخلي وفحص الباور'),
      (1, 'تحديث نظام', '2026-04-08', 1, 'منتهية', 'تم تحديث BIOS بنجاح');

    INSERT INTO alerts (title, alert_type, alert_date, status, related_entity, related_id)
    VALUES
      ('موعد صيانة جهاز HP ProDesk', 'صيانة', '2026-04-12 09:00', 'غير مقروء', 'maintenance', 1),
      ('مهمة متأخرة: تحديث مضاد الفيروسات', 'مهام', '2026-04-13 10:00', 'غير مقروء', 'tasks', 2);

    INSERT INTO attachments (file_name, file_type, size_kb, linked_module, linked_id, uploaded_by)
    VALUES
      ('network-incident-report.pdf', 'application/pdf', 245, 'tickets', 1, 1),
      ('maintenance-checklist.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 88, 'maintenance', 1, 2);

    INSERT INTO activity_logs (actor_id, action, module_name, entity_id, details)
    VALUES
      (1, 'إنشاء', 'tickets', 1, 'تم إنشاء تذكرة عطل شبكة'),
      (2, 'تحديث حالة', 'tasks', 1, 'تحويل المهمة إلى قيد التنفيذ'),
      (1, 'إغلاق', 'tickets', 3, 'تم حل مشكلة Outlook');
  `);
}
