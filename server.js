const http = require('http');

const userV4 = {
  id: "mock-user-001",
  username: "demo_user",
  display_name: "مستخدم تجريبي",
  android_id: "",
  status: "active",
  created_at: "2025-01-01T00:00:00"
};

const subscriptionV4 = {
  id: "mock-sub-001",
  activation_code: "VIP-123456",
  start_date: "2025-01-01",
  end_date: "2030-12-31",
  expires_at: "2030-12-31T23:59:59",
  remaining_seconds: 99999999,
  remaining_days: 1825,
  max_assets: 100,
  status: "active",
  paused_at: null,
  company_id: "mock-company-001",
  can_broadcast: true,
  is_trial: false,
  validity_days: 1825
};

const subscriberDataV4 = {
  user: userV4,
  subscription: subscriptionV4,
  assets: [],
  assets_count: 0,
  plates: [],
  plates_count: 0,
  support_link: null,
  app_update: null
};

const subscriberResponse = () => JSON.stringify({
  success: true,
  data: subscriberDataV4,
  error: null,
  meta: null,
  server_time: Date.now()
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
    const url = req.url.split('?')[0];
    console.log(req.method, url);
    console.log('Body:', body);

    if (url.includes('activation') || url.includes('activate') || url.includes('login')) {
      const resp = JSON.stringify({
        success: true,
        message: "OK",
        data: subscriberDataV4,
        error: null,
        server_time: Date.now()
      });
      console.log('Response:', resp);
      res.writeHead(200);
      res.end(resp);

    } else if (url.includes('subscriber')) {
      res.writeHead(200);
      res.end(subscriberResponse());

    } else if (url.includes('settings')) {
      const value = req.url.includes('version_code') ? '14' : '';
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, value: value, error: null }));

    } else if (url.includes('heartbeat')) {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: { action: "continue", next_check_in: 300, reason: null }, error: null, server_time: Date.now() }));

    } else if (url.includes('asset')) {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: { id: "mock-asset-001" }, error: null }));

    } else if (url.includes('profile')) {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: { updated: true }, error: null }));

    } else {
      res.writeHead(200);
      res.end(subscriberResponse());
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Mock Server running on port ' + PORT));
