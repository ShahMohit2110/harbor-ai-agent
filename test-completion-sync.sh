#!/bin/bash

# Test Script: Completion Synchronization
# Tests that Status="Completed" always sets Progress=100% and Stage="Deployment"

echo "🧪 TESTING COMPLETION SYNCHRONIZATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test 1: Set status to "Completed" via progress update endpoint
echo "📝 Test 1: Set status to 'Completed' (Progress Update Endpoint)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -s -X PUT http://localhost:3001/api/tickets/TKT-137/progress \
  -H "Content-Type: application/json" \
  -d '{"status": "Completed"}' > /tmp/test1.json

echo "Request: Set status to 'Completed'"
echo "Response:"
cat /tmp/test1.json | jq '{status, progress, stage}' 2>/dev/null || cat /tmp/test1.json
echo ""

# Verify
if curl -s http://localhost:3001/api/tickets/TKT-137 | grep -q '"status":"Completed"' && \
   curl -s http://localhost:3001/api/tickets/TKT-137 | grep -q '"progress":100' && \
   curl -s http://localhost:3001/api/tickets/TKT-137 | grep -q '"stage":"Deployment"'; then
  echo "✅ PASS: All fields synchronized correctly"
else
  echo "❌ FAIL: Synchronization failed"
fi
echo ""

# Test 2: Set progress to 100% via progress update endpoint
echo "📝 Test 2: Set progress to 100% (Progress Update Endpoint)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -s -X PUT http://localhost:3001/api/tickets/TKT-137/progress \
  -H "Content-Type: application/json" \
  -d '{"progress": 100}' > /tmp/test2.json

echo "Request: Set progress to 100%"
echo "Response:"
cat /tmp/test2.json | jq '{status, progress, stage}' 2>/dev/null || cat /tmp/test2.json
echo ""

# Verify
if curl -s http://localhost:3001/api/tickets/TKT-137 | grep -q '"status":"Completed"' && \
   curl -s http://localhost:3001/api/tickets/TKT-137 | grep -q '"progress":100' && \
   curl -s http://localhost:3001/api/tickets/TKT-137 | grep -q '"stage":"Deployment"'; then
  echo "✅ PASS: All fields synchronized correctly"
else
  echo "❌ FAIL: Synchronization failed"
fi
echo ""

# Test 3: Set status to "Completed" via regular ticket update endpoint
echo "📝 Test 3: Set status to 'Completed' (Regular Update Endpoint)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -s -X PUT http://localhost:3001/api/tickets/TKT-137 \
  -H "Content-Type: application/json" \
  -d '{"status": "Completed"}' > /tmp/test3.json

echo "Request: Set status to 'Completed' (via /api/tickets/:id)"
echo "Response:"
cat /tmp/test3.json | jq '{status, progress, stage}' 2>/dev/null || cat /tmp/test3.json
echo ""

# Verify
if curl -s http://localhost:3001/api/tickets/TKT-137 | grep -q '"status":"Completed"' && \
   curl -s http://localhost:3001/api/tickets/TKT-137 | grep -q '"progress":100' && \
   curl -s http://localhost:3001/api/tickets/TKT-137 | grep -q '"stage":"Deployment"'; then
  echo "✅ PASS: All fields synchronized correctly"
else
  echo "❌ FAIL: Synchronization failed"
fi
echo ""

# Test 4: Use complete endpoint (should already work)
echo "📝 Test 4: Use complete endpoint"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -s -X POST http://localhost:3001/api/harbor-agent/complete \
  -H "Content-Type: application/json" \
  -d '{"ticketId": "TKT-137", "message": "Testing completion sync"}' > /tmp/test4.json

echo "Request: Call /harbor-agent/complete endpoint"
echo "Response:"
cat /tmp/test4.json | jq '{status, progress, stage}' 2>/dev/null || cat /tmp/test4.json
echo ""

# Verify
if curl -s http://localhost:3001/api/tickets/TKT-137 | grep -q '"status":"Completed"' && \
   curl -s http://localhost:3001/api/tickets/TKT-137 | grep -q '"progress":100' && \
   curl -s http://localhost:3001/api/tickets/TKT-137 | grep -q '"stage":"Deployment"'; then
  echo "✅ PASS: All fields synchronized correctly"
else
  echo "❌ FAIL: Synchronization failed"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ TESTING COMPLETE"
echo ""
echo "📊 Final Ticket State:"
curl -s http://localhost:3001/api/tickets/TKT-137 | jq '{status, progress, stage, harborAgentActive}' 2>/dev/null
echo ""
echo "✅ Expected: status=Completed, progress=100, stage=Deployment"
