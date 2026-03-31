#!/bin/bash

##############################################################################
# Harbor Agent Automatic Tracker v3.0 - GLOBAL VERSION
##############################################################################
#
# SMART AUTO-DETECTION - Works globally for ANY Harbor setup!
#
# This tracker will automatically:
# 1. Detect Harbor repos path (no hardcoded paths)
# 2. Determine service from ticket title/area path
# 3. Assign correct repo to each ticket
# 4. Work on ANY machine with Harbor services
#
# Usage: ./auto-tracker-global.sh [start|stop|status|check|sync|logs]
#
##############################################################################

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TRACKER_SCRIPT="${SCRIPT_DIR}/automatic-tracker-global.js"
PID_FILE="/tmp/harbor-auto-tracker.pid"
LOG_FILE="/tmp/harbor-agent-tracker.log"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

##############################################################################
# Functions
##############################################################################

print_header() {
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}  Harbor Agent Automatic Tracker v3.0${NC}"
    echo -e "${CYAN}  (GLOBAL - Smart Auto-Detection)${NC}"
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

is_running() {
    if [ -f "$PID_FILE" ]; then
        local pid=$(cat "$PID_FILE")
        if ps -p "$pid" > /dev/null 2>&1; then
            return 0
        else
            rm -f "$PID_FILE"
            return 1
        fi
    fi
    return 1
}

start_tracker() {
    print_header

    if is_running; then
        print_warning "Automatic tracker is already running"
        echo ""
        print_info "Run '$0 status' to see the current status"
        exit 0
    fi

    print_info "Starting automatic tracker v3.0 - GLOBAL MODE..."
    echo ""

    # Check if Node.js is available
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed or not in PATH"
        exit 1
    fi

    # Check if the tracker script exists
    if [ ! -f "$TRACKER_SCRIPT" ]; then
        print_error "Tracker script not found: $TRACKER_SCRIPT"
        exit 1
    fi

    # Start the tracker in background
    nohup node "$TRACKER_SCRIPT" start >> "$LOG_FILE" 2>&1 &
    local pid=$!

    # Save PID
    echo $pid > "$PID_FILE"

    # Wait a moment and check if it's still running
    sleep 3

    if ps -p $pid > /dev/null 2>&1; then
        print_success "Automatic tracker v3.0 started successfully"
        echo ""
        print_info "PID: $pid"
        print_info "Log file: $LOG_FILE"
        echo ""
        print_info "🌍 GLOBAL MODE - Smart features:"
        echo "  • Auto-detects Harbor repos path"
        echo "  • Auto-determines service from ticket"
        echo "  • Auto-assigns correct repo"
        echo "  • Works on ANY machine with Harbor"
        echo ""
        print_info "The tracker will now:"
        echo "  • Fetch ALL active tickets from Azure DevOps"
        echo "  • Create them in the tracker automatically"
        echo "  • Assign to correct repos (smart detection)"
        echo "  • Monitor Git commits automatically"
        echo "  • Update ticket progress in real-time"
        echo "  • Track file changes"
        echo "  • Keep everything in sync"
        echo ""
        print_info "Commands:"
        echo "  $0 status  - Check tracker status"
        echo "  $0 sync    - Manually sync Azure DevOps tickets"
        echo "  $0 logs    - View tracker logs"
        echo "  $0 stop    - Stop the tracker"
        echo ""
        print_success "Tracker is now running in GLOBAL mode!"
    else
        print_error "Failed to start tracker"
        print_info "Check the log file: $LOG_FILE"
        rm -f "$PID_FILE"
        exit 1
    fi
}

stop_tracker() {
    print_header

    if ! is_running; then
        print_warning "Automatic tracker is not running"
        exit 0
    fi

    print_info "Stopping automatic tracker..."

    local pid=$(cat "$PID_FILE")
    kill $pid 2>/dev/null || true

    # Wait for process to stop
    local count=0
    while ps -p $pid > /dev/null 2>&1 && [ $count -lt 10 ]; do
        sleep 1
        count=$((count + 1))
    done

    # Force kill if still running
    if ps -p $pid > /dev/null 2>&1; then
        print_warning "Force stopping..."
        kill -9 $pid 2>/dev/null || true
    fi

    rm -f "$PID_FILE"

    print_success "Automatic tracker stopped"
}

show_status() {
    print_header

    if is_running; then
        local pid=$(cat "$PID_FILE")
        print_success "Automatic tracker v3.0 is running"
        echo ""
        echo "PID: $pid"
        echo "Log file: $LOG_FILE"
        echo ""

        # Show recent logs
        if [ -f "$LOG_FILE" ]; then
            echo "Recent activity:"
            echo "━"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            tail -n 15 "$LOG_FILE" 2>/dev/null || echo "No logs yet"
        fi
    else
        print_warning "Automatic tracker is not running"
        echo ""
        print_info "Start it with: $0 start"
    fi

    echo ""

    # Show tracker API status
    print_info "Checking Ticket Tracker API..."

    if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
        print_success "Ticket Tracker API is running"
    else
        print_warning "Ticket Tracker API is not running"
        print_info "Start it with: cd /path/to/harbor-ticket-tracker/backend && npm run dev"
    fi

    echo ""

    # Run the tracker's status command
    node "$TRACKER_SCRIPT" status 2>/dev/null || true
}

show_logs() {
    if [ ! -f "$LOG_FILE" ]; then
        print_error "Log file not found: $LOG_FILE"
        exit 1
    fi

    print_header
    print_info "Showing tracker logs (press Ctrl+C to exit)..."
    echo ""
    echo "━"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    tail -f "$LOG_FILE"
}

check_once() {
    print_header
    print_info "Checking for progress (one-time)..."
    echo ""

    node "$TRACKER_SCRIPT" check
}

sync_now() {
    print_header
    print_info "Syncing all active Azure DevOps tickets..."
    echo ""

    node "$TRACKER_SCRIPT" sync
}

##############################################################################
# Main
##############################################################################

case "${1:-status}" in
    start)
        start_tracker
        ;;

    stop)
        stop_tracker
        ;;

    status)
        show_status
        ;;

    logs)
        show_logs
        ;;

    check)
        check_once
        ;;

    sync)
        sync_now
        ;;

    restart)
        stop_tracker
        sleep 1
        start_tracker
        ;;

    *)
        echo "Usage: $0 [start|stop|status|logs|check|sync|restart]"
        echo ""
        echo "Commands:"
        echo "  start   - Start automatic tracking (GLOBAL mode)"
        echo "  stop    - Stop automatic tracking"
        echo "  status  - Show tracking status"
        echo "  logs    - View live logs"
        echo "  check   - Check for progress once"
        echo "  sync    - Manually sync Azure DevOps tickets"
        echo "  restart - Restart the tracker"
        exit 1
        ;;
esac
