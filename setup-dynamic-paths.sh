#!/bin/bash

###############################################################################
# Harbor AI - Dynamic Path Setup Script
###############################################################################
# This script sets up dynamic environment variables for Harbor AI Agent
# Works on ANY system - no hardcoded paths!
#
# Usage:
#   source setup-dynamic-paths.sh
#   OR
#   . setup-dynamic-paths.sh
###############################################################################

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Harbor AI - Dynamic Path Configuration (v11.2.0)          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Detect Harbor AI root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export HARBOR_AI_ROOT="$SCRIPT_DIR"

# Detect Harbor Ticket Tracker utils path
TRACKER_UTILS="$SCRIPT_DIR/harbor-ticket-tracker/backend/src/utils"

if [ ! -d "$TRACKER_UTILS" ]; then
    echo -e "${YELLOW}⚠️  Warning: Ticket tracker utils not found at expected path${NC}"
    echo -e "${YELLOW}   Looking in: $TRACKER_UTILS${NC}"
    echo ""
    echo -e "${YELLOW}Trying alternative locations...${NC}"

    # Try alternative locations
    ALTERNATIVE_PATHS=(
        "$SCRIPT_DIR/../harbor-ticket-tracker/backend/src/utils"
        "$SCRIPT_DIR/../../harbor-ticket-tracker/backend/src/utils"
        "./harbor-ticket-tracker/backend/src/utils"
        "../harbor-ticket-tracker/backend/src/utils"
    )

    for alt_path in "${ALTERNATIVE_PATHS[@]}"; do
        if [ -d "$alt_path" ]; then
            TRACKER_UTILS="$(cd "$alt_path" && pwd)"
            echo -e "${GREEN}✅ Found at: $TRACKER_UTILS${NC}"
            break
        fi
    done

    if [ ! -d "$TRACKER_UTILS" ]; then
        echo -e "${RED}❌ Error: Could not find harbor-ticket-tracker directory${NC}"
        echo -e "${RED}   Please ensure you're running this from the harbor-ai directory${NC}"
        exit 1
    fi
fi

# Set environment variables
export HARBOR_AI_ROOT
export HARBOR_TRACKER_UTILS="$TRACKER_UTILS"

echo -e "${GREEN}✅ Dynamic paths configured successfully!${NC}"
echo ""
echo -e "${BLUE}📁 Environment Variables Set:${NC}"
echo -e "   HARBOR_AI_ROOT        = ${GREEN}$HARBOR_AI_ROOT${NC}"
echo -e "   HARBOR_TRACKER_UTILS  = ${GREEN}$HARBOR_TRACKER_UTILS${NC}"
echo ""

# Verify critical files exist
echo -e "${BLUE}🔍 Verifying critical files...${NC}"

CRITICAL_FILES=(
    "$HARBOR_TRACKER_UTILS/ticketTrackerIntegration.js"
    "$HARBOR_TRACKER_UTILS/mandatory-ticket-creation.sh"
    "$HARBOR_TRACKER_UTILS/automatic-tracker-global.js"
)

ALL_FOUND=true
for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "   ${GREEN}✅${NC} $(basename "$file")"
    else
        echo -e "   ${RED}❌${NC} $(basename "$file") - NOT FOUND"
        ALL_FOUND=false
    fi
done

echo ""

if [ "$ALL_FOUND" = true ]; then
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✅ All systems ready! Harbor AI Agent can now use dynamic paths  ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}📝 Note: These variables are available in the current shell session.${NC}"
    echo -e "${YELLOW}         To make them permanent, add to your ~/.bashrc or ~/.zshrc:${NC}"
    echo ""
    echo -e "${BLUE}   echo \"export HARBOR_AI_ROOT=$HARBOR_AI_ROOT\" >> ~/.bashrc${NC}"
    echo -e "${BLUE}   echo \"export HARBOR_TRACKER_UTILS=$HARBOR_TRACKER_UTILS\" >> ~/.bashrc${NC}"
    echo ""
else
    echo -e "${RED}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ❌ Some critical files are missing. Check your installation.   ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════════════╝${NC}"
    exit 1
fi
