const express = require('express');
const app = express();
app.use(express.json());

// ===== Mock Response Helper =====
const successResponse = (data) => ({
  success: true,
  message: "OK",
  data: data,
  server_time: new Date().toISOString(),
  error: null
});

// ===== تسجيل الدخول / التفعيل =====
app.post('/v/api/activate', (req, res) => {
  console.log('Activate request:', req.body);
  res.json(successResponse({
    user: {
      id: "mock-user-001",
      username: req.body.username || "demo_user",
      name: "مستخدم تجريبي",
      status: "active",
      activation_code: req.body.code || "DEMO123",
      android_id: req.body.android_id || "",
      company_id: "mock-company-001",
      start_date: "2025-01-01",
      end_date: "2030-12-31",
      expires_at: "2030-12-31T23:59:59",
      remaining_seconds: 99999999,
      is_trial: false,
      signal_id: "mock-signal-001",
      can_broadcast: true,
      support_link_url: null,
      support_link_icon: null,
      support_link_color: null,
      support_link_label: null
    },
    subscription: {
      id: "mock-sub-001",
      status: "active",
      start_date: "2025-01-01",
      end_date: "2030-12-31",
      expires_at: "2030-12-31T23:59:59",
      remaining_seconds: 99999999,
      remaining_days: 1825,
      max_assets: 100,
      can_broadcast: true,
      is_trial: false,
      validity_days: 1825,
      company_id: "mock-company-001",
      activation_code: req.body.code || "DEMO123"
    }
  }));
});

// ===== Heartbeat =====
app.post('/v/api/heartbeat', (req, res) => {
  console.log('Heartbeat:', req.body);
  res.json(successResponse({
    action: "continue",
    next_check_in: 300,
    reason: null
  }));
});

// ===== بيانات المستخدم =====
app.get('/v/api/subscriber-data', (req, res) => {
  res.json(successResponse({
    user: {
      id: "mock-user-001",
      username: "demo_user",
      name: "مستخدم تجريبي",
      status: "active",
      display_name: "مستخدم تجريبي",
      android_id: "",
      can_broadcast: true
    },
    subscription: {
      id: "mock-sub-001",
      status: "active",
      remaining_seconds: 99999999,
      remaining_days: 1825,
      can_broadcast: true,
      is_trial: false
    },
    assets: [],
    plates: [],
    assets_count: 0,
    plates_count: 0,
    app_update: null,
    support_link: null
  }));
});

// ===== System Settings =====
app.get('/v/api/system-settings', (req, res) => {
  res.json(successResponse({ value: "active", success: true, error: null }));
});

// ===== Assets =====
app.post('/v/api/assets', (req, res) => {
  res.json(successResponse({ id: "mock-asset-001" }));
});

app.delete('/v/api/assets/:id', (req, res) => {
  res.json(successResponse({ deleted: true }));
});

// ===== Profile Update =====
app.put('/v/api/profile', (req, res) => {
  res.json(successResponse({ updated: true }));
});

// ===== Catch All =====
app.all('*', (req, res) => {
  console.log('Unknown route:', req.method, req.path);
  res.json(successResponse({}));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mock Server running on port ${PORT}`);
});
