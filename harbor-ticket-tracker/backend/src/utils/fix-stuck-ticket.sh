#!/bin/bash

##############################################################################
# Harbor Ticket Tracker - Fix Stuck Ticket Script
##############################################################################
#
# This script fixes stuck tickets by manually updating their progress
# and completion status in the tracker.
#
# Usage: ./fix-stuck-ticket.sh <ticket-id> [progress] [message]
#
##############################################################################

set -e  # Exit on error

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_BASE="http://localhost:3001/api"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

##############################################################################
# Helper Functions
##############################################################################

print_header() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  Harbor Ticket Tracker - Fix Stuck Ticket${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
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

##############################################################################
# API Call Functions
##############################################################################

check_api() {
    print_info "Checking if Ticket Tracker API is running..."

    if curl -s "${API_BASE}/health" > /dev/null 2>&1; then
        print_success "API is running"
        return 0
    else
        print_error "API is not running. Please start the backend first:"
        echo "   cd /Users/mohitshah/Documents/HarborService/harbor-ai/harbor-ticket-tracker/backend"
        echo "   npm run dev"
        return 1
    fi
}

get_ticket_status() {
    local ticket_id=$1

    print_info "Fetching current status of ${ticket_id}..."

    local response=$(curl -s "${API_BASE}/tickets/${ticket_id}")

    if echo "$response" | grep -q '"success":true'; then
        echo "$response" | jq '.data' 2>/dev/null || echo "$response"
        return 0
    else
        print_error "Ticket ${ticket_id} not found"
        return 1
    fi
}

update_progress() {
    local ticket_id=$1
    local progress=$2
    local stage=$3
    local message=$4

    print_info "Updating ${ticket_id} progress to ${progress}%..."

    local response=$(curl -s -X PUT "${API_BASE}/tickets/${ticket_id}/progress" \
        -H "Content-Type: application/json" \
        -d "{
            \"progress\": ${progress},
            \"stage\": \"${stage}\",
            \"message\": \"${message}\"
        }")

    if echo "$response" | grep -q '"success":true'; then
        print_success "Progress updated successfully"
        return 0
    else
        print_error "Failed to update progress"
        echo "$response" | jq '.error' 2>/dev/null || echo "$response"
        return 1
    fi
}

complete_ticket() {
    local ticket_id=$1
    local message=$2

    print_info "Completing ${ticket_id}..."

    local response=$(curl -s -X POST "${API_BASE}/harbor-agent/complete" \
        -H "Content-Type: application/json" \
        -d "{
            \"ticketId\": \"${ticket_id}\",
            \"message\": \"${message}\"
        }")

    if echo "$response" | grep -q '"success":true'; then
        print_success "Ticket completed successfully"
        return 0
    else
        print_error "Failed to complete ticket"
        echo "$response" | jq '.error' 2>/dev/null || echo "$response"
        return 1
    fi
}

##############################################################################
# Main Execution
##############################################################################

main() {
    print_header

    # Check if API is running
    if ! check_api; then
        exit 1
    fi

    echo ""

    # Get parameters
    if [ $# -lt 1 ]; then
        print_error "Usage: $0 <ticket-id> [progress] [message]"
        echo ""
        echo "Examples:"
        echo "  $0 TKT-137                    # Complete the ticket"
        echo "  $0 TKT-137 50 \"Halfway done\"  # Update to 50% progress"
        echo ""
        exit 1
    fi

    TICKET_ID=$1
    PROGRESS=${2:-100}
    MESSAGE=${3:-"Completed via fix script"}

    # Show current status
    echo -e "${YELLOW}📊 Current Ticket Status:${NC}"
    echo ""
    get_ticket_status "$TICKET_ID"
    echo ""
    echo ""

    # Ask for confirmation
    if [ "$PROGRESS" = "100" ]; then
        print_warning "About to COMPLETE ticket ${TICKET_ID}"
    else
        print_warning "About to update ${TICKET_ID} to ${PROGRESS}% progress"
    fi

    read -p "Continue? (y/N) " -n 1 -r
    echo ""

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Cancelled"
        exit 0
    fi

    echo ""

    # Execute update
    if [ "$PROGRESS" = "100" ]; then
        if complete_ticket "$TICKET_ID" "$MESSAGE"; then
            echo ""
            print_success "Ticket ${TICKET_ID} marked as completed!"
        else
            exit 1
        fi
    else
        if update_progress "$TICKET_ID" "$PROGRESS" "Development" "$MESSAGE"; then
            echo ""
            print_success "Ticket ${TICKET_ID} updated to ${PROGRESS}%!"
        else
            exit 1
        fi
    fi

    echo ""

    # Show updated status
    echo -e "${YELLOW}📊 Updated Ticket Status:${NC}"
    echo ""
    get_ticket_status "$TICKET_ID"
    echo ""
    echo ""

    print_success "Done! Check the UI at http://localhost:5173"
}

# Run main function
main "$@"
