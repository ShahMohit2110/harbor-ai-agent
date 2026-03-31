#!/bin/bash

# Harbor Agent Ticket Tracker Integration - Bash Wrapper
# Usage: ./ticket-tracker.sh <command> <args>

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NODE_SCRIPT="$SCRIPT_DIR/ticketTrackerIntegration.js"

case "$1" in
  create)
    # Usage: ./ticket-tracker.sh create <ticketData.json>
    node "$NODE_SCRIPT" create "$2"
    ;;

  start)
    # Usage: ./ticket-tracker.sh start <ticketId> [stage] [message]
    node "$NODE_SCRIPT" start "$2" "$3" "$4"
    ;;

  update)
    # Usage: ./ticket-tracker.sh update <ticketId> <progress> <stage> <message> [fileChanges.json]
    node "$NODE_SCRIPT" update "$2" "$3" "$4" "$5" "$6"
    ;;

  complete)
    # Usage: ./ticket-tracker.sh complete <ticketId> [message] [fileChanges.json]
    node "$NODE_SCRIPT" complete "$2" "$3" "$4"
    ;;

  *)
    echo "Usage: $0 {create|start|update|complete} ..."
    echo "  create  - Create new ticket (requires ticketData.json)"
    echo "  start   - Start working on ticket"
    echo "  update  - Update ticket progress"
    echo "  complete - Complete ticket"
    exit 1
    ;;
esac
