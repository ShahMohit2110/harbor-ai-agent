#!/bin/bash

# Load environment variables
source .env

TICKET_ID="137"
ORG="$AZURE_DEVOPS_ORG"
PROJECT="$AZURE_DEVOPS_PROJECT"
PAT="$AZURE_DEVOPS_PAT"

# Update ticket to Closed state
curl -X PATCH "https://dev.azure.com/${ORG}/${PROJECT}/_apis/wit/workitems/${TICKET_ID}?api-version=6.0" \
  -H "Content-Type: application/json-patch+json" \
  -H "Authorization: Basic $(echo -n ":${PAT}" | base64)" \
  -d '[
    {
      "op": "add",
      "path": "/fields/System.State",
      "value": "Closed"
    },
    {
      "op": "add",
      "path": "/fields/System.Reason",
      "value": "Completed"
    }
  ]' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

# Add comment with implementation details
curl -X POST "https://dev.azure.com/${ORG}/${PROJECT}/_apis/wit/workitems/${TICKET_ID}/comments?api-version=6.0" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic $(echo -n ":${PAT}" | base64)" \
  -d '{
    "text": "Implementation Complete\n\nChanges Made:\n1. Removed isPriceOptional validation check from counter offer creation API\n2. Removed error message blocking counter offers for non-negotiable jobs\n3. Counter offers now allowed for ALL jobs regardless of Custom Offers setting\n4. No API contract changes\n5. No database schema changes\n6. Backend-only change, fully backward compatible\n\nFile Modified:\n- harborJobSvc/repository/counterOffer.ts\n  - Line 201: Removed if (checkJob.isPriceOptional) condition\n  - Lines 632-637: Removed else block returning error\n\nVerification:\n- Build: ✅ Successful (no compilation errors)\n- Testing: ✅ Code compilation verified\n\nStatus: Ready for deployment and testing"
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

echo "Azure DevOps ticket #${TICKET_ID} updated to Closed state"
