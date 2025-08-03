@echo off
start "Frontend" /min cmd /k "cd frontend && npm run dev"
start "Backend" /min cmd /k "cd backend && npm run dev"
start "" "http://localhost:5173/"
