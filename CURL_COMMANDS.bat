@REM API Base URL
@set BASE_URL=http://localhost:3000
@color 0A

@echo Task Management API - cURL Commands
@echo.

@echo [1] REGISTER USER
@echo curl -X POST %BASE_URL%/api/auth/register ^
@echo   -H "Content-Type: application/json" ^
@echo   -d "{\"email\":\"user@example.com\",\"password\":\"password123\"}"
@echo.

@echo [2] LOGIN USER
@echo curl -X POST %BASE_URL%/api/auth/login ^
@echo   -H "Content-Type: application/json" ^
@echo   -d "{\"email\":\"user@example.com\",\"password\":\"password123\"}"
@echo Save the token and set: set TOKEN=your_token_here
@echo.

@echo [3] CREATE TASK
@echo curl -X POST %BASE_URL%/api/tasks ^
@echo   -H "Content-Type: application/json" ^
@echo   -H "Authorization: Bearer %%TOKEN%%" ^
@echo   -d "{\"title\":\"My Task\",\"description\":\"Task description\",\"status\":\"pending\"}"
@echo.

@echo [4] GET ALL TASKS
@echo curl -X GET "%BASE_URL%/api/tasks?page=1^&limit=10" ^
@echo   -H "Authorization: Bearer %%TOKEN%%"
@echo.

@echo [5] GET TASK BY ID
@echo curl -X GET %BASE_URL%/api/tasks/1 ^
@echo   -H "Authorization: Bearer %%TOKEN%%"
@echo.

@echo [6] UPDATE TASK STATUS
@echo curl -X PATCH %BASE_URL%/api/tasks/1/status ^
@echo   -H "Content-Type: application/json" ^
@echo   -H "Authorization: Bearer %%TOKEN%%" ^
@echo   -d "{\"status\":\"in-progress\"}"
@echo Valid statuses: pending, in-progress, completed
@echo.

@echo [7] UPDATE TASK
@echo curl -X PUT %BASE_URL%/api/tasks/1 ^
@echo   -H "Content-Type: application/json" ^
@echo   -H "Authorization: Bearer %%TOKEN%%" ^
@echo   -d "{\"title\":\"Updated Title\",\"description\":\"Updated\",\"status\":\"in-progress\"}"
@echo.

@echo [8] DELETE TASK
@echo curl -X DELETE %BASE_URL%/api/tasks/1 ^
@echo   -H "Authorization: Bearer %%TOKEN%%"
@echo.

@echo [9] HEALTH CHECK
@echo curl %BASE_URL%/health
@echo.

@pause
