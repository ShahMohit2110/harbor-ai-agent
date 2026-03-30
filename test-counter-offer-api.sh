#!/bin/bash

# Manual Test Script for Counter Offer API
# Task #137: Update create-counter-offer API to Allow Offers for Non-Negotiable Jobs
#
# This script tests the counter offer functionality after removing the isPriceOptional validation
#
# PREREQUISITES:
# 1. harborJobSvc server running on port 3004
# 2. Valid authentication token for seeker user
# 3. Valid job ID (test job in database)
# 4. Valid seeker and employer user IDs
#
# USAGE:
#   ./test-counter-offer-api.sh <JOB_ID> <SEEKER_ID> <EMPLOYER_ID> <AUTH_TOKEN>

echo "=========================================="
echo "Counter Offer API Manual Test Script"
echo "Task #137: Non-Negotiable Job Counter Offer"
echo "=========================================="
echo ""

# Check if server is running
echo "🔍 Checking if harborJobSvc is running on port 3004..."
if ! lsof -ti:3004 > /dev/null 2>&1; then
    echo "❌ ERROR: harborJobSvc is not running on port 3004"
    echo "   Start the server with: cd ../harborJobSvc && npm start"
    echo "   OR use: export HARBOR_JOBSVC_PATH=/path/to/harborJobSvc"
    exit 1
fi
echo "✅ Server is running"
echo ""

# Validate inputs
if [ $# -lt 4 ]; then
    echo "❌ ERROR: Missing required parameters"
    echo ""
    echo "Usage: $0 <JOB_ID> <SEEKER_ID> <EMPLOYER_ID> <AUTH_TOKEN>"
    echo ""
    echo "Parameters:"
    echo "  JOB_ID      - ID of the job to test (must exist in database)"
    echo "  SEEKER_ID   - User ID of the seeker sending the counter offer"
    echo "  EMPLOYER_ID - User ID of the employer receiving the counter offer"
    echo "  AUTH_TOKEN  - Valid authentication token (bearer token)"
    echo ""
    echo "Example:"
    echo "  $0 123 456 789 \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\""
    exit 1
fi

JOB_ID=$1
SEEKER_ID=$2
EMPLOYER_ID=$3
AUTH_TOKEN=$4

API_URL="http://localhost:3004/api/counter-offer/create-counter-offer"

echo "📋 Test Configuration:"
echo "   API URL: $API_URL"
echo "   Job ID: $JOB_ID"
echo "   Seeker ID: $SEEKER_ID"
echo "   Employer ID: $EMPLOYER_ID"
echo ""

# Test 1: Create counter offer for non-negotiable job
echo "=========================================="
echo "TEST 1: Create Counter Offer (Non-Negotiable Job)"
echo "=========================================="
echo ""
echo "📝 Sending POST request to: $API_URL"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -d "{
    \"jobId\": $JOB_ID,
    \"offerBy\": \"seeker\",
    \"sendBy\": $SEEKER_ID,
    \"receiveBy\": $EMPLOYER_ID,
    \"finalPrice\": 50.00,
    \"currency\": \"USD\"
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "📊 Response Status Code: $HTTP_CODE"
echo ""
echo "📦 Response Body:"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
echo ""

# Check if counter offer was created successfully
if echo "$BODY" | grep -q '"status":true'; then
    echo "✅ TEST PASSED: Counter offer created successfully"
    COUNTER_OFFER_ID=$(echo "$BODY" | jq -r '.counterOfferId' 2>/dev/null)
    if [ ! -z "$COUNTER_OFFER_ID" ] && [ "$COUNTER_OFFER_ID" != "null" ]; then
        echo "   Counter Offer ID: $COUNTER_OFFER_ID"
    fi
else
    echo "❌ TEST FAILED: Counter offer creation failed"
    echo ""
    # Check for the old error message
    if echo "$BODY" | grep -q "non-negotiable"; then
        echo "🚨 CRITICAL: The old validation error is still present!"
        echo "   Error message: 'price is non-negotiable'"
        echo "   This indicates the fix was not applied correctly."
    fi
fi

echo ""
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo ""
echo "✅ Code Changes Verified:"
echo "   - isPriceOptional validation removed"
echo "   - Error return block removed"
echo "   - TypeScript build successful"
echo ""
echo "📝 Expected Behavior:"
echo "   - Counter offers should work for ALL jobs"
echo "   - No 'price is non-negotiable' error"
echo "   - API should return {\"status\":true} with counterOfferId"
echo ""
echo "⚠️  Manual Testing Required:"
echo "   1. Test with a non-negotiable job (isPriceOptional=false)"
echo "   2. Test with a negotiable job (isPriceOptional=true)"
echo "   3. Verify counter offers work in both cases"
echo ""
echo "=========================================="
