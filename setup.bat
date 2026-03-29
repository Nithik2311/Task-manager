@echo off
REM Setup script for Windows

color 0A
echo Task Management API - Windows Setup

REM Check if .env file exists
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo [OK] .env file created. Please update with your credentials.
) else (
    echo [OK] .env file already exists
)

REM Install dependencies
echo Installing npm dependencies...
call npm install

if %errorlevel% equ 0 (
    echo [OK] Dependencies installed successfully
) else (
    echo [ERROR] Error installing dependencies
    exit /b 1
)

echo.
echo [OK] Setup complete!
echo Next steps:
echo 1. Update .env file with your MySQL credentials
echo 2. Create the database: mysql -u root -p ^< database/init.sql
echo 3. Start the server: npm start
echo.
pause
