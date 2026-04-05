#!/bin/bash
# Harbor Ticket Tracker - Update Ticket Script
# This is a wrapper script that can be called from any directory
# Usage: ./update-ticket.sh <ticketId> <progress> <stage> <message> [phaseSummary]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/src/utils" && pwd)"
cd "$SCRIPT_DIR" || exit 1

node ticketTrackerIntegration.js update "$@"
