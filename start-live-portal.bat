@echo off
title TRRCT Institutional Portal Runner
echo =======================================================
echo [TRRCT] Starting Campus ERP Backend & MongoDB Engine...
echo =======================================================
start "TRRCT Backend" /min node backend/server.js
timeout /t 2 /nobreak > nul
echo =======================================================
echo [TRRCT] Starting Public Cloudflare Live Tunnel...
echo =======================================================
start "TRRCT Public Tunnel" cloudflared.exe tunnel --url http://localhost:5000
echo =======================================================
echo Portal service initiated successfully.
echo =======================================================
