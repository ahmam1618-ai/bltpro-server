const http = require('http');

const user = {
  id: "mock-user-001",
  username: "demo_user",
  name: "مستخدم تجريبي",
  status: "active",
  activation_code: "DEMO123",
  android_id: "",
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
};

const subscription = {
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
  activation_code: "DEMO123"
};

const apiResponse = (data) => JSON.stringify({
  success: true,
  data: data,
  error: null,
  message: "OK",
  message_ar: null,
  server_time: Date.now(),
  action: null,
  reason: null
});

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS' || req.method === 'HEAD') {
    res.writeHead(200);
    res.end();
    return;
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    let parsed = {};
    try { parsed = JSON.parse(body); } catch(e) {}

    const url = req.url.split('?')[0];
    console.log(req.method, url);
    console.log('Body:', body);

    if (url.includes('activation') || url.includes('activate') || url.includes('login')) {
      const resp = apiResponse({ user, subscription });
      console.log('Response:', resp);
      res.writeHead(200);
      res.end(resp);

    } else if (url.includes('subscriber')) {
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        data: {
          user,
          subscription,
          assets: [],
          plates: [],
          assets_count: 0,
          plates_count: 0,
          app_update: null,
          support_link: null
        },
        error: null,
        meta: null,
        server_time: Date.now()
      }));

    } else if (url.includes('settings')) {
      const key = req.url.includes('version_code') ? '14' : '';
      res.writeHead(200);
      res.end(apiResponse({ value: key, success: true, error: null }));

    } else if (url.includes('heartbeat')) {
      res.writeHead(200);
      res.end(apiResponse({ action: "continue", next_check_in: 300, reason: null }));

    } else if (url.includes('asset')) {
      res.writeHead(200);
      res.end(apiResponse({ id: "mock-asset-001" }));

    } else if (url.includes('profile')) {
      res.writeHead(200);
      res.end(apiResponse({ updated: true }));

    } else {
      res.writeHead(200);
      res.end(apiResponse({ user, subscription }));
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Mock Server running on port ' + PORT));
