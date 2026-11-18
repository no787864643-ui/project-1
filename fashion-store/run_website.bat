@echo off
title ÉLÉVATION ATELIER - Fashion Store Local Server
cls
echo ========================================================
echo   ÉLÉVATION ATELIER - LOCAL TESTING LAUNCHER
echo ========================================================
echo   Starting local server and opening your web browser...
echo.

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Python detected. Launching local HTTP server...
    python server.py
) else (
    echo Python was not found in PATH.
    echo Opening index.html directly in your default browser...
    start index.html
    pause
)
