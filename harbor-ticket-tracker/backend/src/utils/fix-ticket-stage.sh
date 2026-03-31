#!/bin/bash

##############################################################################
# Harbor Ticket Tracker - Fix Stuck Tickets
##############################################################################
#
# This script fixes tickets that are:
# - Completed but showing wrong stage (not Deployment)
# - 100% progress but showing wrong stage
# - In completed state but with wrong data
#
# Usage: ./fix-ticket-stage.sh [ticket-id]
#
# If no ticket ID provided, fixes ALL stuck tickets
#
##############################################################################

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_BASE="http://localhost:3001/api"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

print_header() {
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}  Harbor Ticket Tracker - Fix Stuck Tickets${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

check_api() {
    print_info "Checking if Ticket Tracker API is running..."

    if curl -s "${API_BASE}/health" > /dev/null 2>&1; then
        print_success "API is running"
        return 0
    else
        print_error "API is not running. Please start the backend first"
        return 1
    fi
}

fix_ticket() {
    local ticket_id=$1

    print_info "Fetching ticket ${ticket_id}..."

    local response=$(curl -s "${API_BASE}/tickets/${ticket_id}")

    if ! echo "$response" | grep -q '"success":true'; then
        print_error "Ticket ${ticket_id} not found"
        return 1
    fi

    # Parse ticket data
    local status=$(echo "$response" | jq -r '.data.status // empty')
    local stage=$(echo "$response" | jq -r '.data.stage // empty')
    local progress=$(echo "$response" | jq -r '.data.progress // 0')

    echo ""
    print_info "Current state:"
    echo "  Status: ${status}"
    echo "  Stage: ${stage}"
    echo "  Progress: ${progress}%"
    echo ""

    # Check if ticket needs fixing
    local needs_fix=false

    if [ "$status" = "Completed" ] && [ "$stage" != "Deployment" ]; then
        print_warning "Ticket is Completed but stage is '${stage}' instead of 'Deployment'"
        needs_fix=true
    fi

    if [ "$progress" -ge 100 ] && [ "$stage" != "Deployment" ]; then
        print_warning "Progress is ${progress}% but stage is '${stage}' instead of 'Deployment'"
        needs_fix=true
    fi

    if [ "$progress" -ge 100 ] && [ "$status" != "Completed" ]; then
        print_warning "Progress is ${progress}% but status is '${status}' instead of 'Completed'"
        needs_fix=true
    fi

    if [ "$needs_fix" = false ]; then
        print_success "Ticket ${ticket_id} is already in correct state"
        return 0
    fi

    echo ""
    print_info "Fixing ticket ${ticket_id}..."

    # Fix the ticket
    local fix_response=$(curl -s -X PUT "${API_BASE}/tickets/${ticket_id}" \
        -H "Content-Type: application/json" \
        -d "{
            \"status\": \"Completed\",
            \"stage\": \"Deployment\",
            \"progress\": 100
        }")

    if echo "$fix_response" | grep -q '"success":true'; then
        print_success "Fixed ticket ${ticket_id}"

        # Show updated state
        echo ""
        print_info "Updated state:"
        curl -s "${API_BASE}/tickets/${ticket_id}" | jq '.data | {status, stage, progress}'
        echo ""

        return 0
    else
        print_error "Failed to fix ticket ${ticket_id}"
        echo "$fix_response" | jq '.error' 2>/dev/null || echo "$fix_response"
        return 1
    fi
}

fix_all_stuck_tickets() {
    print_info "Fetching all tickets to find stuck ones..."

    local response=$(curl -s "${API_BASE}/tickets")

    if ! echo "$response" | grep -q '"success":true'; then
        print_error "Failed to fetch tickets"
        return 1
    fi

    local ticket_count=$(echo "$response" | jq '.data | length')
    local stuck_count=0

    echo ""
    print_info "Scanning ${ticket_count} tickets..."
    echo ""

    # Check each ticket
    for i in $(seq 0 $((ticket_count - 1))); do
        local ticket_id=$(echo "$response" | jq -r ".data[${i}].id")
        local status=$(echo "$response" | jq -r ".data[${i}].status // empty")
        local stage=$(echo "$response" | jq -r ".data[${i}].stage // empty")
        local progress=$(echo "$response" | jq -r ".data[${i}].progress // 0")

        local needs_fix=false

        if [ "$status" = "Completed" ] && [ "$stage" != "Deployment" ]; then
            needs_fix=true
        elif [ "$progress" -ge 100 ] && [ "$stage" != "Deployment" ]; then
            needs_fix=true
        elif [ "$progress" -ge 100 ] && [ "$status" != "Completed" ]; then
            needs_fix=true
        fi

        if [ "$needs_fix" = true ]; then
            print_warning "Found stuck ticket: ${ticket_id}"
            stuck_count=$((stuck_count + 1))

            echo "  Before: Status=${status}, Stage=${stage}, Progress=${progress}%"

            # Fix it
            local fix_response=$(curl -s -X PUT "${API_BASE}/tickets/${ticket_id}" \
                -H "Content-Type: application/json" \
                -d "{
                    \"status\": \"Completed\",
                    \"stage\": \"Deployment\",
                    \"progress\": 100
                }")

            if echo "$fix_response" | grep -q '"success":true'; then
                print_success "  → Fixed! Now: Status=Completed, Stage=Deployment, Progress=100%"
            else
                print_error "  → Failed to fix ${ticket_id}"
            fi

            echo ""
        fi
    done

    if [ "$stuck_count" -eq 0 ]; then
        print_success "No stuck tickets found! All tickets are in correct state."
    else
        echo ""
        print_success "Fixed ${stuck_count} stuck ticket(s)"
    fi
}

main() {
    print_header

    if ! check_api; then
        exit 1
    fi

    local ticket_id=$1

    if [ -z "$ticket_id" ]; then
        # No ticket ID provided, fix all stuck tickets
        print_info "No ticket ID provided. Will scan and fix ALL stuck tickets..."
        echo ""
        fix_all_stuck_tickets
    else
        # Fix specific ticket
        fix_ticket "$ticket_id"
    fi

    echo ""
    print_success "Done! Check the UI to verify the fixes."
}

main "$@"
