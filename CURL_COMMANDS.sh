#!/bin/bash
# API Base URL
BASE_URL="http://localhost:3000"

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Task Management API - cURL Commands ===${NC}\n"

# Register
echo -e "${GREEN}1. REGISTER USER${NC}"
echo "Command:"
echo "curl -X POST $BASE_URL/api/auth/register \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"email\":\"user@example.com\",\"password\":\"password123\"}'"
echo ""

# Login
echo -e "${GREEN}2. LOGIN USER${NC}"
echo "Command:"
echo "curl -X POST $BASE_URL/api/auth/login \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"email\":\"user@example.com\",\"password\":\"password123\"}'"
echo ""
echo "Save the token from response as: TOKEN=\"your_token_here\""
echo ""

# Create task
echo -e "${GREEN}3. CREATE TASK${NC}"
echo "Command:"
echo "curl -X POST $BASE_URL/api/tasks \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Authorization: Bearer \$TOKEN' \\"
echo "  -d '{\"title\":\"My Task\",\"description\":\"Task description\",\"status\":\"pending\"}'"
echo ""

# Get all tasks
echo -e "${GREEN}4. GET ALL TASKS (with pagination)${NC}"
echo "Command:"
echo "curl -X GET '$BASE_URL/api/tasks?page=1&limit=10' \\"
echo "  -H 'Authorization: Bearer \$TOKEN'"
echo ""

# Get task by ID
echo -e "${GREEN}5. GET TASK BY ID${NC}"
echo "Command:"
echo "curl -X GET $BASE_URL/api/tasks/1 \\"
echo "  -H 'Authorization: Bearer \$TOKEN'"
echo ""

# Update task status
echo -e "${GREEN}6. UPDATE TASK STATUS${NC}"
echo "Command:"
echo "curl -X PATCH $BASE_URL/api/tasks/1/status \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Authorization: Bearer \$TOKEN' \\"
echo "  -d '{\"status\":\"in-progress\"}'"
echo ""
echo "Valid statuses: pending, in-progress, completed"
echo ""

# Update task
echo -e "${GREEN}7. UPDATE TASK${NC}"
echo "Command:"
echo "curl -X PUT $BASE_URL/api/tasks/1 \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Authorization: Bearer \$TOKEN' \\"
echo "  -d '{\"title\":\"Updated Title\",\"description\":\"Updated description\",\"status\":\"in-progress\"}'"
echo ""

# Delete task
echo -e "${GREEN}8. DELETE TASK${NC}"
echo "Command:"
echo "curl -X DELETE $BASE_URL/api/tasks/1 \\"
echo "  -H 'Authorization: Bearer \$TOKEN'"
echo ""

# Health check
echo -e "${GREEN}9. HEALTH CHECK${NC}"
echo "Command:"
echo "curl $BASE_URL/health"
echo ""

echo -e "${GREEN}=== Full Workflow Example ===${NC}\n"
echo "# 1. Register"
echo "TOKEN=\$(curl -s -X POST $BASE_URL/api/auth/register -H 'Content-Type: application/json' -d '{\"email\":\"user@example.com\",\"password\":\"password123\"}' | jq -r '.data.token')"
echo ""
echo "# 2. Login"
echo "TOKEN=\$(curl -s -X POST $BASE_URL/api/auth/login -H 'Content-Type: application/json' -d '{\"email\":\"user@example.com\",\"password\":\"password123\"}' | jq -r '.data.token')"
echo ""
echo "# 3. Create task"
echo "curl -s -X POST $BASE_URL/api/tasks -H 'Content-Type: application/json' -H \"Authorization: Bearer \$TOKEN\" -d '{\"title\":\"My Task\",\"status\":\"pending\"}' | jq"
echo ""
echo "# 4. Get all tasks"
echo "curl -s -X GET \"$BASE_URL/api/tasks?page=1&limit=10\" -H \"Authorization: Bearer \$TOKEN\" | jq"
echo ""
echo "# 5. Update task status"
echo "curl -s -X PATCH $BASE_URL/api/tasks/1/status -H 'Content-Type: application/json' -H \"Authorization: Bearer \$TOKEN\" -d '{\"status\":\"completed\"}' | jq"
echo ""
