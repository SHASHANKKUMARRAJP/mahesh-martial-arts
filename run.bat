@echo off
echo =========================================
echo Setting up Mahesh Martial Arts Website...
echo =========================================
echo.

echo [1/2] Installing dependencies (this might take a minute)...
call npm install
if %errorlevel% neq 0 (
    echo Error during npm install.
    pause
    exit /b %errorlevel%
)
echo.

echo [2/2] Starting development server...
echo The website should open in your browser shortly!
call npm run dev

pause
