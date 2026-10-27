@echo off
TITLE BrainByte ScamShield - Dual Server Launcher
color 0A

echo ========================================================
echo        BRAINBYTE SCAMSHIELD - LOCAL RUNNER
echo   AI that detects scams in messages, links and calls
echo ========================================================
echo.

echo [1/2] Starting Python FastAPI Backend on http://127.0.0.1:8000 ...
start "ScamShield Backend (FastAPI)" cmd /k "cd backend && python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 3 /nobreak > nul

echo [2/2] Starting React + Vite Frontend on http://localhost:3000 ...
start "ScamShield Frontend (Vite)" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo   ScamShield is now running!
echo   - Web App:  http://localhost:3000
echo   - Backend:  http://127.0.0.1:8000
echo   - Docs:     http://127.0.0.1:8000/docs
echo ========================================================
pause
